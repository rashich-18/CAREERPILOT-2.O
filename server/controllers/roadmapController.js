import CareerMatch from "../models/CareerMatch.js";
import Roadmap from "../models/Roadmap.js";
import { generateRoadmap } from "../services/aiService.js";

// ==========================================
// GENERATE ROADMAP FROM CAREER MATCH
// ==========================================

export const createRoadmap = async (req, res) => {
  try {
    // ==========================================
    // AUTHENTICATION
    // ==========================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    // ==========================================
    // GET CAREER MATCH ID
    // ==========================================

    let { careerMatchId } = req.body;

    // Handle accidental nested object:
    // { careerMatchId: { careerMatchId: "..." } }
    if (
      careerMatchId &&
      typeof careerMatchId === "object" &&
      careerMatchId.careerMatchId
    ) {
      careerMatchId = careerMatchId.careerMatchId;
    }

    if (!careerMatchId) {
      return res.status(400).json({
        success: false,
        message: "Career Match ID is required.",
      });
    }

    // ==========================================
    // FIND CAREER MATCH
    // ==========================================

    const careerMatch = await CareerMatch.findById(careerMatchId);

    if (!careerMatch) {
      return res.status(404).json({
        success: false,
        message: "Career Match not found.",
      });
    }

    // ==========================================
    // CHECK IF ROADMAP ALREADY EXISTS
    // ==========================================

    const existingRoadmap = await Roadmap.findOne({
      careerMatch: careerMatch._id,
      user: userId,
    });

    if (existingRoadmap) {
      return res.status(200).json({
        success: true,
        message: "Roadmap already exists.",
        roadmap: existingRoadmap,
        alreadyExists: true,
      });
    }

    // ==========================================
    // GENERATE ROADMAP USING AI
    // ==========================================

    console.log("🗺️ Generating Career Roadmap...");

    const roadmapData = await generateRoadmap({
      targetRole: careerMatch.targetRole,

      matchScore: careerMatch.matchScore,
      skillMatch: careerMatch.skillMatch,
      experienceMatch: careerMatch.experienceMatch,
      projectMatch: careerMatch.projectMatch,

      strongMatches: careerMatch.strongMatches,
      partialMatches: careerMatch.partialMatches,

      criticalGaps: careerMatch.criticalGaps,
      hiddenGaps: careerMatch.hiddenGaps,
      evidenceGaps: careerMatch.evidenceGaps,
      experienceGaps: careerMatch.experienceGaps,

      skillPriorities: careerMatch.skillPriorities,

      resumeSuggestions: careerMatch.resumeSuggestions,

      careerInsight: careerMatch.careerInsight,
    });

    console.log("✅ Roadmap generated");

    // ==========================================
    // SAVE ROADMAP
    // ==========================================

    const roadmap = await Roadmap.create({
      user: userId,
      careerMatch: careerMatch._id,
      targetRole: careerMatch.targetRole,

      title:
        roadmapData.title ||
        `${careerMatch.targetRole} Career Roadmap`,

      overview: roadmapData.overview || "",

      progress: 0,
      phases: roadmapData.phases || [],
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "Career Roadmap generated successfully.",
      roadmap,
      alreadyExists: false,
    });
  } catch (error) {
    console.error("CREATE ROADMAP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate Career Roadmap.",
      error: error.message,
    });
  }
};

// ==========================================
// GET USER ROADMAPS
// ==========================================

export const getRoadmapHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    const roadmaps = await Roadmap.find({
      user: userId,
    })
      .populate(
        "careerMatch",
        "targetRole matchScore applyRecommendation"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      roadmaps,
    });
  } catch (error) {
    console.error("ROADMAP HISTORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmap history.",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE ROADMAP
// ==========================================

export const getRoadmapById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      user: userId,
    }).populate(
      "careerMatch",
      "targetRole matchScore skillMatch experienceMatch projectMatch"
    );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    return res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error("GET ROADMAP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmap.",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE TASK PROGRESS
// ==========================================

export const updateRoadmapTask = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    const {
      roadmapId,
      phaseId,
      taskId,
      completed,
    } = req.body;

    if (!roadmapId || !phaseId || !taskId) {
      return res.status(400).json({
        success: false,
        message:
          "Roadmap ID, phase ID and task ID are required.",
      });
    }

    const roadmap = await Roadmap.findOne({
      _id: roadmapId,
      user: userId,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    const phase = roadmap.phases.id(phaseId);

    if (!phase) {
      return res.status(404).json({
        success: false,
        message: "Roadmap phase not found.",
      });
    }

    const task = phase.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Roadmap task not found.",
      });
    }

    task.completed = Boolean(completed);

    // ==========================================
    // CALCULATE OVERALL PROGRESS
    // ==========================================

    let totalTasks = 0;
    let completedTasks = 0;

    roadmap.phases.forEach((currentPhase) => {
      currentPhase.tasks.forEach((currentTask) => {
        totalTasks++;

        if (currentTask.completed) {
          completedTasks++;
        }
      });
    });

    roadmap.progress =
      totalTasks === 0
        ? 0
        : Math.round(
            (completedTasks / totalTasks) * 100
          );

    await roadmap.save();

    return res.status(200).json({
      success: true,
      message: "Task progress updated.",
      roadmap,
    });
  } catch (error) {
    console.error(
      "UPDATE ROADMAP TASK ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update roadmap progress.",
      error: error.message,
    });
  }
};



// ==========================================
// DELETE ROADMAP
// ==========================================

export const deleteRoadmap = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const roadmap = await Roadmap.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully.",
    });

  } catch (error) {
    console.error(
      "DELETE ROADMAP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete roadmap.",
      error: error.message,
    });
  }
};