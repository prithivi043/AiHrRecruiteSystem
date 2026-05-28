import mongoose from "mongoose";

const applicationSchema =
  new mongoose.Schema(
    {
      // ========================================
      // CANDIDATE
      // ========================================

      candidate: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      // ========================================
      // JOB
      // ========================================

      job: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Job",

        required: true,
      },

      // ========================================
      // RESUME FILE
      // ========================================

      resume: {
        type: String,

        default: "",
      },

      // ========================================
      // APPLICATION STATUS
      // ========================================

      status: {
        type: String,

        enum: [
          "pending",
          "reviewing",
          "shortlisted",
          "interview_scheduled",
          "selected",
          "rejected",
        ],

        default: "pending",
      },

      // ========================================
      // AI MATCH SCORE
      // ========================================

      matchScore: {
        type: Number,

        default: 0,
      },

      // ========================================
      // AI MATCHED SKILLS
      // ========================================

      matchedSkills: [
        {
          type: String,
        },
      ],

      // ========================================
      // AI MISSING SKILLS
      // ========================================

      missingSkills: [
        {
          type: String,
        },
      ],

      // ========================================
      // AI IDENTIFIED STRENGTHS
      // ========================================

      strengths: [
        {
          type: String,
        },
      ],

      // ========================================
      // AI RECOMMENDATION
      // ========================================

      recommendation: {
        type: String,

        default: "",
      },

      // ========================================
      // INTERVIEW DETAILS
      // ========================================

      interviewDate: {
        type: Date,
      },

      interviewMode: {
        type: String,

        enum: [
          "online",
          "offline",
        ],
      },

      interviewLink: {
        type: String,

        default: "",
      },

      // ========================================
      // HR NOTES
      // ========================================

      hrFeedback: {
        type: String,

        default: "",
      },

      // ========================================
      // APPLICATION SOURCE
      // ========================================

      source: {
        type: String,

        default: "website",
      },
    },

    {
      timestamps: true,
    }
  );

const Application =
  mongoose.model(
    "Application",
    applicationSchema
  );

export default Application;