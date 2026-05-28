
import express from "express";

import {
  getTasks,
  updateTaskStatus,
} from "../controllers/employeeController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// ========================================
// GET TASKS
// ========================================

router.get(
  "/tasks",
  protect,
  getTasks
);


router.put(
  "/tasks/:id",
  protect,
  updateTaskStatus
);



export default router;

