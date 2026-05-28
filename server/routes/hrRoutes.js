
import express from "express";

import {

  postJob,

  getCandidates,

  scheduleInterview,

  analyzeSkills,

  updateApplicationStatus,

  assignTask,

  getEmployees,

  getInterviews,

} from "../controllers/hrController.js";

import {

  protect,

} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// ========================================
// POST JOB
// ========================================

router.post(
  "/jobs",
  protect,
  postJob
);

// ========================================
// GET CANDIDATES
// ========================================

router.get(
  "/candidates",
  protect,
  getCandidates
);

// ========================================
// SCHEDULE INTERVIEW
// ========================================

router.post(
  "/interviews",
  protect,
  scheduleInterview
);

// ========================================
// GET INTERVIEWS
// ========================================

router.get(
  "/interviews",
  protect,
  getInterviews
);

// ========================================
// SKILL ANALYSIS
// ========================================

router.get(
  "/skills-analysis",
  protect,
  analyzeSkills
);

// ========================================
// UPDATE APPLICATION STATUS
// ========================================

router.put(
  "/application-status/:id",
  protect,
  updateApplicationStatus
);

// ========================================
// ASSIGN TASK
// ========================================

router.post(
  "/assign-task",
  protect,
  assignTask
);

// ========================================
// GET EMPLOYEES
// ========================================

router.get(
  "/employees",
  protect,
  getEmployees
);

export default router;

