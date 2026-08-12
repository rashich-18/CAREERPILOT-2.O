import express from "express";

import {
  completeOnboarding,
  getProfile,
  updateProfile,
} from "../controllers/onboardingController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==========================================
// COMPLETE ONBOARDING
// ==========================================

router.post(
  "/",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ]),
  completeOnboarding
);


// ==========================================
// GET USER PROFILE
// ==========================================

router.get(
  "/profile",
  protect,
  getProfile
);

// ==========================================
// UPDATE USER PROFILE
// ==========================================

router.put(
  "/profile",
  protect,
  updateProfile
);

export default router;