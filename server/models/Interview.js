import mongoose from "mongoose";

const interviewSchema =
  new mongoose.Schema(

    {

      applicationId: {
        type: String,
      },

      candidateName: {
        type: String,
      },

      candidateId: {
        type: String,
      },

      email: {
        type: String,
      },

      jobId: {
        type: String,
      },

      jobTitle: {
        type: String,
      },

      department: {
        type: String,
      },

      score: {
        type: Number,
      },

      date: {
        type: String,
      },

      time: {
        type: String,
      },

      mode: {
        type: String,
      },
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Interview",
  interviewSchema
);  