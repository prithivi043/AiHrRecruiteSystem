
import Task from "../models/Task.js";

// ========================================
// GET EMPLOYEE TASKS
// ========================================

export const getTasks =
  async (req, res) => {

    try {

      const tasks =
        await Task.find({

          employee:
            req.user._id,
        })

        .populate(
          "assignedBy",
          "name email"
        )

        .sort({
          createdAt: -1,
        });

      res.json(tasks);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch tasks",
      });
    }
  };


// ========================================
// UPDATE TASK STATUS
// ========================================

export const updateTaskStatus =
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {

        return res
          .status(404)
          .json({

            message:
              "Task not found",
          });
      }

      task.status =
        req.body.status;

      await task.save();

      res.json({

        message:
          "Task status updated",

        task,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to update task",
      });
    }
  };



