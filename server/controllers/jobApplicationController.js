import Resume from "../models/Resume.js";
import JobApplication from "../models/JobApplication.js";

import {
  generateJobApplication,
} from "../services/aiService.js";

// ==========================================
// CREATE JOB APPLICATION
// ==========================================

export const createJobApplication = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    const {
      resumeId,
      role,
      company,
      jobDescription,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume is required.",
      });
    }

    if (!role || !role.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job role is required.",
      });
    }

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company is required.",
      });
    }

    if (
      !jobDescription ||
      !jobDescription.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    // ==========================================
    // FIND USER RESUME
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
    // AI GENERATION
    // ==========================================

    console.log(
      "🤖 Generating AI Job Application..."
    );

    const application =
      await generateJobApplication({
        resumeText: resume.resumeText,
        role: role.trim(),
        company: company.trim(),
        jobDescription:
          jobDescription.trim(),
      });

    console.log(
      "✅ AI Job Application generated"
    );

    // ==========================================
    // SAVE APPLICATION
    // ==========================================

    const savedApplication =
      await JobApplication.create({
        user: userId,

        resume: resume._id,

        role: role.trim(),

        company: company.trim(),

        jobDescription:
          jobDescription.trim(),

        applicationReadiness:
          application.applicationReadiness,

        candidateFit:
          application.candidateFit,

        relevantSkills:
          application.relevantSkills,

        relevantExperience:
          application.relevantExperience,

        missingRequirements:
          application.missingRequirements,

        recommendation:
          application.recommendation,

        coverLetter:
          application.coverLetter,

        applicationMessage:
          application.applicationMessage,
      });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,

      message:
        "AI job application generated successfully.",

      application: savedApplication,
    });

  } catch (error) {
    console.error(
      "JOB APPLICATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate AI job application.",
      error: error.message,
    });
  }
};


// ==========================================
// GET APPLICATION HISTORY
// ==========================================

export const getJobApplicationHistory =
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message:
            "Authentication required.",
        });
      }

      const applications =
        await JobApplication.find({
          user: req.user.id,
        })
          .select(
            "_id role company applicationReadiness recommendation createdAt"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        applications,
      });

    } catch (error) {
      console.error(
        "JOB APPLICATION HISTORY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch application history.",
        error: error.message,
      });
    }
  };


// ==========================================
// GET SINGLE APPLICATION
// ==========================================

export const getJobApplicationById =
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message:
            "Authentication required.",
        });
      }

      const application =
        await JobApplication.findOne({
          _id: req.params.id,
          user: req.user.id,
        }).populate(
          "resume",
          "fileName uploadedAt"
        );

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Job application not found.",
        });
      }

      return res.status(200).json({
        success: true,
        application,
      });

    } catch (error) {
      console.error(
        "GET JOB APPLICATION ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch job application.",
        error: error.message,
      });
    }
  };


// ==========================================
// DELETE APPLICATION
// ==========================================

export const deleteJobApplication =
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message:
            "Authentication required.",
        });
      }

      const application =
        await JobApplication.findOneAndDelete({
          _id: req.params.id,
          user: req.user.id,
        });

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Job application not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Job application deleted successfully.",
      });

    } catch (error) {
      console.error(
        "DELETE JOB APPLICATION ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete job application.",
        error: error.message,
      });
    }
  };

  