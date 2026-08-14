import express from "express";

import {
  createCareerMatch,
  getCareerMatchHistory,
  getCareerMatchById,
  deleteCareerMatch,
} from "../controllers/careerMatchController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// GET CAREER MATCH HISTORY
// ==========================================

router.get("/", protect, getCareerMatchHistory);


// ==========================================
// CREATE CAREER MATCH
// ==========================================

router.post("/", protect, createCareerMatch);


// ==========================================
// GET SINGLE CAREER MATCH
// ==========================================

router.get("/:id", protect, getCareerMatchById);

// ==========================================
// DELETE CAREER MATCH
// ==========================================

router.delete("/:id", protect, deleteCareerMatch);




export default router;