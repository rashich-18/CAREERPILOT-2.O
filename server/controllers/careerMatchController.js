import Resume from "../models/Resume.js";
import CareerMatch from "../models/CareerMatch.js";
import { analyzeCareerMatch } from "../services/aiService.js";

// ==========================================
// CREATE CAREER MATCH ANALYSIS
// ==========================================

export const createCareerMatch = async (req, res) => {
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

    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found.",
      });
    }

    // ==========================================
    // GET INPUT
    // ==========================================

    const { resumeId, targetRole,targetCompany, jobDescription } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required.",
      });
    }

    if (!targetRole || !targetRole.trim()) {
      return res.status(400).json({
        success: false,
        message: "Target career role is required.",
      });
    }

    // ==========================================
    // FIND USER'S RESUME
    // ==========================================

    const resume = await Resume.findOne({
      _id: resumeId,
      user: userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    // ==========================================
    // AI CAREER MATCH ANALYSIS
    // ==========================================

    console.log("🤖 Generating Career Match...");

    const analysis = await analyzeCareerMatch({
      resumeText: resume.resumeText,
      targetRole: targetRole.trim(),
      targetCompany: targetCompany?.trim() || "",
      jobDescription: jobDescription?.trim() || "",
    });

    console.log("✅ Career Match generated");

    // ==========================================
    // SAVE CAREER MATCH
    // ==========================================

    const careerMatch = await CareerMatch.create({
      user: userId,
      resume: resume._id,

      targetRole: targetRole.trim(),
      targetCompany: targetCompany?.trim() || "",
      jobDescription: jobDescription?.trim() || "",

      ...analysis,
    });

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,
      message: "Career Match analysis generated successfully.",
      careerMatch,
    });
  } catch (error) {
    console.error("CAREER MATCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Career Match analysis.",
      error: error.message,
    });
  }
};


// ==========================================
// GET CAREER MATCH HISTORY
// ==========================================

export const getCareerMatchHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    const careerMatches = await CareerMatch.find({
      user: userId,
    })
      .select(`
        _id
        resume
        targetRole
        targetCompany
        jobDescription
        matchScore
        skillMatch
        experienceMatch
        projectMatch
        strongMatches
        partialMatches
        criticalGaps
        skillsToDevelop
        hiddenGaps
        evidenceGaps
        experienceGaps
        skillPriorities
        applyRecommendation
        resumeSuggestions
        careerInsight
        createdAt
        updatedAt
      `)
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      careerMatches,
    });
  } catch (error) {
    console.error("CAREER MATCH HISTORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Career Match history.",
      error: error.message,
    });
  }
};


// ==========================================
// GET SINGLE CAREER MATCH
// ==========================================

export const getCareerMatchById = async (req, res) => {
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

    const userId = req.user.id;

    // ==========================================
    // FIND CAREER MATCH
    // ==========================================

    const careerMatch = await CareerMatch.findOne({
      _id: req.params.id,
      user: userId,
    }).populate("resume", "fileName uploadedAt");

    // ==========================================
    // CHECK RESULT
    // ==========================================

    if (!careerMatch) {
      return res.status(404).json({
        success: false,
        message: "Career Match analysis not found.",
      });
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      careerMatch,
    });
  } catch (error) {
    console.error("GET CAREER MATCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Career Match analysis.",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE CAREER MATCH
// ==========================================

export const deleteCareerMatch = async (req, res) => {
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

    const userId = req.user.id;

    // ==========================================
    // DELETE ONLY USER'S OWN CAREER MATCH
    // ==========================================

    const careerMatch = await CareerMatch.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!careerMatch) {
      return res.status(404).json({
        success: false,
        message: "Career Match analysis not found.",
      });
    }

    // ==========================================
    // SUCCESS
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Career Match deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE CAREER MATCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete Career Match.",
      error: error.message,
    });
  }
};
