
import express from "express";

import {

  applyJob,

  getJobs,

  getApplications,

  updateProfile,

  getCandidateInterviews,

} from "../controllers/candidateController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

// ========================================
// GET JOBS
// ========================================

router.get(

  "/jobs",

 
  getJobs
);

// ========================================
// APPLY JOB
// ========================================

router.post(

  "/apply",

  protect,

  upload.single("resume"),

  applyJob
);

// ========================================
// GET APPLICATIONS
// ========================================

router.get(

  "/applications",

  protect,

  getApplications
);

// ========================================
// GET INTERVIEWS
// ========================================

router.get(

  "/interviews",

  protect,

  getCandidateInterviews
);

// ========================================
// UPDATE PROFILE
// ========================================

router.put(

  "/profile",

  protect,

  updateProfile
);

export default router;

