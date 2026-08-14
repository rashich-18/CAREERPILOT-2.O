import { PDFParse } from "pdf-parse";
import Resume from "../models/Resume.js";
import { analyzeResume } from "../services/aiService.js";


// ==========================================
// UPLOAD + ANALYZE RESUME
// ==========================================

export const uploadResume = async (req, res) => {
  try {

    // ==========================================
    // CHECK AUTHENTICATION
    // ==========================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Your JWT contains "id", but some middleware
    // may provide "_id", so support both.
    const userId = req.user._id || req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in authentication token.",
      });
    }


    // ==========================================
    // CHECK FILE
    // ==========================================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }


    // ==========================================
    // EXTRACT TEXT FROM PDF
    // ==========================================

    const parser = new PDFParse({
      data: req.file.buffer,
    });

    const pdfData = await parser.getText();

    const resumeText = pdfData.text.trim();

    await parser.destroy();


    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from this PDF.",
      });
    }


    // ==========================================
    // AI ANALYSIS
    // ==========================================

    console.log("🤖 Sending resume to Gemini...");

    const analysis = await analyzeResume(resumeText);

    console.log("✅ Gemini analysis completed");


    // ==========================================
    // MARK OLD RESUME AS NOT CURRENT
    // ==========================================

    await Resume.updateMany(
      {
        user: userId,
        isCurrent: true,
      },
      {
        $set: {
          isCurrent: false,
        },
      }
    );


    // ==========================================
    // CREATE NEW RESUME
    // ==========================================

    const resume = await Resume.create({
      user: userId,
      fileName: req.file.originalname,
      resumeText: resumeText,
      isCurrent: true,
      uploadedAt: new Date(),
      analysis: analysis,
    });


    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,
      message: "Resume analyzed successfully.",

      resume: {
        _id: resume._id,
        fileName: resume.fileName,
        uploadedAt: resume.uploadedAt,
        isCurrent: resume.isCurrent,
        analysis: resume.analysis,
      },
    });

  } catch (error) {

    console.error("RESUME UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to process resume.",
      error: error.message,
    });
  }
};

// ==========================================
// GET RESUME HISTORY
// ==========================================

export const getResumeHistory = async (req, res) => {
  try {
    // ==========================================
    // CHECK AUTHENTICATION
    // ==========================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user._id || req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in authentication token.",
      });
    }

    // ==========================================
    // GET ALL USER RESUMES
    // ==========================================

    const resumes = await Resume.find({
      user: userId,
    })
      .select(
        "_id fileName uploadedAt createdAt isCurrent analysis.resumeScore analysis.summary"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,

      resumes: resumes.map((resume) => ({
        ...resume,

        // Convenient top-level score for dashboard
        score:
          resume?.analysis?.resumeScore?.overall ?? 0,
      })),
    });
  } catch (error) {
    console.error("RESUME HISTORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resume history.",
      error: error.message,
    });
  }
};



// ==========================================
// GET SINGLE RESUME + SAVED ANALYSIS
// ==========================================

export const getResumeById = async (req, res) => {
  try {
    // Check authentication
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user._id || req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in authentication token.",
      });
    }

    // Find resume belonging to this user
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });

  } catch (error) {
    console.error("GET RESUME ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resume.",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE SELECTED RESUMES
// ==========================================

export const deleteResumes = async (req, res) => {
  try {
    // ==========================================
    // CHECK AUTHENTICATION
    // ==========================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user._id || req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in authentication token.",
      });
    }

    // ==========================================
    // CHECK RESUME IDS
    // ==========================================

    const { resumeIds } = req.body;

    if (!Array.isArray(resumeIds) || resumeIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one resume.",
      });
    }

    // ==========================================
    // DELETE ONLY USER'S OWN RESUMES
    // ==========================================

    const result = await Resume.deleteMany({
      _id: { $in: resumeIds },
      user: userId,
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} resume(s) deleted successfully.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("DELETE RESUMES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete resumes.",
      error: error.message,
    });
  }
};