import express from "express";

import {
  uploadResume,
  getResumeHistory,
  getResumeById,
  deleteResumes,
} from "../controllers/resumeController.js";

import { protect } from "../middleware/authMiddleware.js";

import uploadResumeMiddleware from "../middleware/resumeUploadMiddleware.js";

const router = express.Router();


// ==========================================
// UPLOAD RESUME
// ==========================================

router.post(
  "/upload",
  protect,
  uploadResumeMiddleware.single("resume"),
  uploadResume
);


// ==========================================
// RESUME HISTORY
// ==========================================

router.get(
  "/history",
  protect,
  getResumeHistory
);


// ==========================================
// DELETE SELECTED RESUMES
// ==========================================

router.delete(
  "/delete",
  protect,
  deleteResumes
);

// ==========================================
// SINGLE RESUME + SAVED ANALYSIS
// ==========================================

router.get(
  "/:id",
  protect,
  getResumeById
);


export default router;