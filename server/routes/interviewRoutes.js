import express from "express";
import {
  createInterview,
  getInterviewHistory,
  getInterviewById,
  submitInterviewAnswer,
  completeInterview,
  deleteInterview,
} from "../controllers/interviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createInterview);

router.get("/", protect, getInterviewHistory);

router.get("/:id", protect, getInterviewById);

router.patch("/:id/answer", protect, submitInterviewAnswer);

router.post("/:id/complete", protect, completeInterview);

router.delete("/:id", protect, deleteInterview);

export default router;