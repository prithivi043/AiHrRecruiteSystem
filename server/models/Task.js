
import mongoose from "mongoose";

const taskSchema =
  new mongoose.Schema(

    {
      employee: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      assignedBy: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },

      title: {

        type: String,

        required: true,
      },

      description: {
        type: String,
      },

      priority: {

        type: String,

        enum: [
          "Low",
          "Medium",
          "High",
        ],

        default: "Medium",
      },


        status: {

        type: String,

        enum: [

            "Pending",

            "In Progress",

            "Stopped",

            "Completed",
        ],

        default: "Pending",
        },



      deadline: {
        type: String,
      },
    },

    {
      timestamps: true,
    }
  );

const Task =
  mongoose.model(
    "Task",
    taskSchema
  );

export default Task;

