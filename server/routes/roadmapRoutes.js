import express from "express";

import {
  createRoadmap,
  getRoadmapHistory,
  getRoadmapById,
  updateRoadmapTask,
  deleteRoadmap,
} from "../controllers/roadmapController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate roadmap
router.post("/generate", protect, createRoadmap);

// Roadmap history
router.get("/", protect, getRoadmapHistory);

// Single roadmap
router.get("/:id", protect, getRoadmapById);

// Update task progress
router.patch("/task", protect, updateRoadmapTask);

//Delete Roadmap
router.delete("/:id",protect,deleteRoadmap);

export default router;