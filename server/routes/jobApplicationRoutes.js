import express from "express";

import {
  createJobApplication,
  getJobApplicationHistory,
  getJobApplicationById,
  deleteJobApplication,
} from "../controllers/jobApplicationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// GET APPLICATION HISTORY
// ==========================================

router.get(
  "/",
  protect,
  getJobApplicationHistory
);

// ==========================================
// CREATE APPLICATION
// ==========================================

router.post(
  "/",
  protect,
  createJobApplication
);

// ==========================================
// GET SINGLE APPLICATION
// ==========================================

router.get(
  "/:id",
  protect,
  getJobApplicationById
);

// ==========================================
// DELETE APPLICATION
// ==========================================

router.delete(
  "/:id",
  protect,
  deleteJobApplication
);

export default router;