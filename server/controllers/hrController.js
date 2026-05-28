import Job from "../models/Job.js";


import Task from "../models/Task.js";

import User from "../models/User.js";



import Application from "../models/Application.js";

import Interview from "../models/Interview.js";

// ========================================
// POST JOB
// ========================================

export const postJob =
  async (req, res) => {
    try {
      const job =
        await Job.create({
          ...req.body,

          postedBy:
            req.user._id,
        });

      res.status(201).json(job);

    } catch (error) {
      res.status(500).json({
        message:
          "Failed to post job",
      });
    }
  };

// ========================================
// GET CANDIDATES
// ========================================

export const getCandidates =
  async (req, res) => {
    try {
      const candidates =
        await Application.find()
          .populate(
            "candidate"
          )
          .populate("job");

      res.json(candidates);

    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch candidates",
      });
    }
  };

// ========================================
// SCHEDULE INTERVIEW
// ========================================

export const scheduleInterview =
  async (req, res) => {

    try {

      console.log(
        "INTERVIEW DATA:",
        req.body
      );

      const interview =
        await Interview.create({

          // APPLICATION

          applicationId:
            req.body.applicationId,

          // CANDIDATE

          candidateName:
            req.body.candidateName,

          candidateId:
            req.body.candidateId,

          email:
            req.body.email,

          // JOB

          jobId:
            req.body.jobId,

          jobTitle:
            req.body.jobTitle,

          department:
            req.body.department,

          // AI SCORE

          score:
            req.body.score,

          // INTERVIEW

          date:
            req.body.date,

          time:
            req.body.time,

          mode:
            req.body.mode,
        });

      res.status(201).json(
        interview
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Interview scheduling failed",
      });
    }
  };



// ========================================
// GET INTERVIEWS
// ========================================

export const getInterviews =
  async (req, res) => {

    try {

      const interviews =
        await Interview.find()

          .populate({
            path: "candidateId",
            select:
              "name email",
          })

          .populate({
            path: "jobId",
            select:
              "title department",
          });

      res.json(interviews);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch interviews",
      });
    }
  };





// ========================================
// ANALYZE SKILLS
// ========================================

export const analyzeSkills =
  async (req, res) => {

    try {

      const applications =
        await Application.find()

          .populate(
            "candidate"
          )

          .populate(
            "job"
          );

      // ========================================
      // FORMAT DATA
      // ========================================

      const analysis =
        applications.map(
          (app) => ({

            // IMPORTANT
            // THIS FIXES DROPDOWN ISSUE

            _id:
              app._id.toString(),

            applicationId:
              app._id.toString(),

            // CANDIDATE

            candidate:
              app.candidate?.name ||
              "Unknown Candidate",

            candidateId:
              app.candidate?._id?.toString() ||
              "",

            email:
              app.candidate?.email ||
              "",

            // JOB

            jobId:
              app.job?._id?.toString() ||
              "",

            jobTitle:
              app.job?.title ||
              "No Job Title",

            department:
              app.job?.department ||
              "No Department",

            // AI ANALYSIS

            score:
              app.matchScore || 0,

            matchedSkills:
              app.matchedSkills || [],

            missingSkills:
              app.missingSkills || [],

            strengths:
              app.strengths || [],

            recommendation:
              app.recommendation ||
              "No Recommendation",

            // STATUS

            status:
              app.status || "pending",

            // RESUME

            resume:
              app.resume || "",
          })
        );

      // DEBUG

      console.log(
        "ANALYSIS:",
        analysis
      );

      // RESPONSE

      res.json(analysis);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Skill analysis failed",
      });
    }
  };


  // ========================================
// UPDATE APPLICATION STATUS
// ========================================

export const updateApplicationStatus =
  async (req, res) => {

    try {

      const { status } =
        req.body;

      const application =
        await Application.findByIdAndUpdate(

          req.params.id,

          {
            status,
          },

          {
            new: true,
          }
        );

      res.json({

        message:
          "Application status updated",

        application,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to update status",
      });
    }
  };





// ========================================
// Employee Works
// ========================================

// ========================================
// ASSIGN TASK
// ========================================

export const assignTask =
  async (req, res) => {

    try {

      const {
        employee,
        title,
        description,
        priority,
        deadline,
      } = req.body;

      const task =
        await Task.create({

          employee,

          assignedBy:
            req.user._id,

          title,

          description,

          priority,

          deadline,
        });

      res.status(201).json({

        success: true,

        message:
          "Task Assigned Successfully",

        task,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Task assignment failed",
      });
    }
  };


// ========================================
// GET EMPLOYEES
// ========================================

export const getEmployees =
  async (req, res) => {

    try {

      const employees =
        await User.find({

          role: "employee",
        })

        .select(
          "name email role"
        );

      res.json(
        employees
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch employees",
      });
    }
  };



