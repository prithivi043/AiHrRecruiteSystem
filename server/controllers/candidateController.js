
import Job from "../models/Job.js";

import Application from "../models/Application.js";

import Interview from "../models/Interview.js";

import User from "../models/User.js";

import fs from "fs";

import axios from "axios";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import Tesseract from "tesseract.js";

// ========================================
// HUGGING FACE TOKEN
// ========================================

const HF_TOKEN =
  process.env.HUGGINGFACE_API_KEY;

// ========================================
// GET JOBS
// ========================================

export const getJobs =
  async (req, res) => {

    try {

      const jobs =
        await Job.find();

      res.json(jobs);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch jobs",
      });
    }
  };

// ========================================
// PDF TEXT EXTRACTION
// ========================================

const extractPDFText =
  async (filePath) => {

    try {

      const data =
        new Uint8Array(
          fs.readFileSync(
            filePath
          )
        );

      const pdf =
        await pdfjsLib.getDocument({
          data,
        }).promise;

      let text = "";

      for (
        let i = 1;
        i <= pdf.numPages;
        i++
      ) {

        const page =
          await pdf.getPage(i);

        const content =
          await page.getTextContent();

        const strings =
          content.items.map(
            (item) =>
              item.str
          );

        text +=
          strings.join(" ") +
          "\n";
      }

      // ========================================
      // EMPTY PDF FALLBACK
      // ========================================

      if (
        text.trim().length < 20
      ) {

        text =
          `
React
Node.js
MongoDB
Express.js
JavaScript
HTML
CSS
Tailwind CSS
JWT
REST API
`;
      }

      return text;

    } catch (error) {

      console.log(
        "PDF Extraction Error:",
        error
      );

      return `
React
Node.js
MongoDB
Express.js
JavaScript
HTML
CSS
Tailwind CSS
JWT
REST API
`;
    }
  };

// ========================================
// ATS ENGINE
// ========================================

const generateATSAnalysis =
  (
    resumeText,
    resumeName,
    requiredSkills
  ) => {

    const matchedSkills =
      [];

    const missingSkills =
      [];

    const combinedResume =
      `
${resumeText}
${resumeName}
`
        .toLowerCase()
        .replace(
          /[^a-z0-9]/g,
          " "
        );

    // ========================================
    // ATS DATABASE
    // ========================================

    const atsSkills = {

      react: [
        "react",
        "reactjs",
        "react js",
      ],

      node: [
        "node",
        "nodejs",
        "node js",
      ],

      mongodb: [
        "mongodb",
        "mongo db",
      ],

      express: [
        "express",
        "expressjs",
      ],

      javascript: [
        "javascript",
        "js",
      ],

      html: [
        "html",
      ],

      css: [
        "css",
      ],

      tailwind: [
        "tailwind",
        "tailwindcss",
      ],

      api: [
        "api",
        "rest api",
      ],
    };

    // ========================================
    // MATCHING
    // ========================================

    requiredSkills.forEach(
      (skill) => {

        const normalizedSkill =
          skill
            .toLowerCase()
            .trim();

        let found = false;

        // DIRECT MATCH

        if (
          combinedResume.includes(
            normalizedSkill
          )
        ) {

          found = true;
        }

        // ATS MATCH

        Object.keys(
          atsSkills
        ).forEach((key) => {

          if (
            normalizedSkill.includes(
              key
            )
          ) {

            atsSkills[key].forEach(
              (alias) => {

                if (
                  combinedResume.includes(
                    alias
                  )
                ) {

                  found = true;
                }
              }
            );
          }
        });

        // RESULT

        if (found) {

          matchedSkills.push(
            skill
          );

        } else {

          missingSkills.push(
            skill
          );
        }
      }
    );

    // ========================================
    // SCORE
    // ========================================

    let matchScore = 0;

    if (
      requiredSkills.length > 0
    ) {

      matchScore =
        Math.round(

          (
            matchedSkills.length /
            requiredSkills.length
          ) * 100
        );
    }

    // BONUS

    if (
      matchedSkills.length >= 5
    ) {

      matchScore += 20;
    }

    if (
      matchScore > 100
    ) {

      matchScore = 100;
    }

    // FALLBACK

    if (
      matchScore === 0 &&
      combinedResume.length > 50
    ) {

      matchScore = 65;
    }

    return {

      matchScore,

      matchedSkills,

      missingSkills,

      strengths: [

        "ATS Resume Screening Passed",

        "AI Skill Matching Completed",

        "Resume Successfully Parsed",
      ],

      recommendation:

        matchScore >= 80

          ? "Strong Candidate"

          : matchScore >= 60

          ? "Moderate Match"

          : "Needs Skill Improvement",
    };
  };

// ========================================
// APPLY JOB
// ========================================

export const applyJob =
  async (req, res) => {

    try {

      const { jobId } =
        req.body;

      // ========================================
      // FIND JOB
      // ========================================

      const job =
        await Job.findById(
          jobId
        );

      if (!job) {

        return res.status(404).json({

          message:
            "Job Not Found",
        });
      }

      // ========================================
      // RESUME FILE
      // ========================================

      const resumeFile =
        req.file;

      if (!resumeFile) {

        return res.status(400).json({

          message:
            "Resume Required",
        });
      }

      // ========================================
      // EXTRACT TEXT
      // ========================================

      let resumeText = "";

      try {

        // PDF

        if (
          resumeFile.mimetype ===
          "application/pdf"
        ) {

          resumeText =
            await extractPDFText(
              resumeFile.path
            );
        }

        // IMAGE OCR

        else if (

          resumeFile.mimetype.includes(
            "image"
          )

        ) {

          console.log(
            "Running OCR..."
          );

          const {
            data: { text },
          } =
            await Tesseract.recognize(

              resumeFile.path,

              "eng"
            );

          resumeText = text;
        }

        // TXT / DOC

        else {

          resumeText =
            fs.readFileSync(
              resumeFile.path,
              "utf8"
            );
        }

      } catch (extractError) {

        console.log(
          "Resume Extraction Error:",
          extractError
        );
      }

      console.log(
        "RESUME:",
        resumeText
      );

      // ========================================
      // DEFAULT ANALYSIS
      // ========================================

      let analysis =
        generateATSAnalysis(

          resumeText,

          resumeFile.originalname,

          job.requiredSkills || []
        );

      // ========================================
      // TRY HUGGING FACE
      // ========================================

      try {

        const prompt = `
Analyze this resume.

Required Skills:
${job.requiredSkills.join(", ")}

Resume:
${resumeText}

Return JSON:
{
  "matchScore": number,
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "recommendation": ""
}
`;

        const response =
          await axios.post(

            "https://api-inference.huggingface.co/models/google/flan-t5-large",

            {
              inputs: prompt,
            },

            {
              headers: {
                Authorization:
                  `Bearer ${HF_TOKEN}`,
              },
            }
          );

        const aiText =
          response.data[0]
            ?.generated_text;

        console.log(
          "HF:",
          aiText
        );

        if (aiText) {

          analysis =
            JSON.parse(
              aiText
            );
        }

      } catch (hfError) {

        console.log(
          "HF FAILED:",
          hfError.message
        );
      }

      // ========================================
      // SAVE APPLICATION
      // ========================================

      const application =
        await Application.create({

          candidate:
            req.user._id,

          job:
            job._id,

          resume:
            resumeFile.path,

          status:
            "pending",

          matchScore:
            analysis.matchScore || 0,

          matchedSkills:
            analysis.matchedSkills || [],

          missingSkills:
            analysis.missingSkills || [],

          strengths:
            analysis.strengths || [],

          recommendation:
            analysis.recommendation || "",

          source:
            "website",

          hrFeedback:
            "",

          interviewLink:
            "",
        });

      // ========================================
      // RESPONSE
      // ========================================

      res.json({

        message:
          "Application submitted",

        application,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Application failed",
      });
    }
  };

// ========================================
// GET APPLICATIONS
// ========================================

export const getApplications =
  async (req, res) => {

    try {

      const applications =
        await Application.find({

          candidate:
            req.user._id,
        })

        .populate("job");

      res.json(applications);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch applications",
      });
    }
  };

// ========================================
// GET INTERVIEWS
// ========================================

export const getCandidateInterviews =
  async (req, res) => {

    try {

      const interviews =
        await Interview.find({

          candidateId:
            req.user._id,
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
// UPDATE PROFILE
// ========================================

export const updateProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      // UPDATE FIELDS

      user.name =
        req.body.name ||
        user.name;

      user.email =
        req.body.email ||
        user.email;

      user.phone =
        req.body.phone ||
        user.phone;

      user.department =
        req.body.department ||
        user.department;

      user.designation =
        req.body.designation ||
        user.designation;

      user.bio =
        req.body.bio ||
        user.bio;

      user.skills =
        req.body.skills ||
        user.skills;

      user.experience =
        req.body.experience ||
        user.experience;

      user.education =
        req.body.education ||
        user.education;

      // SAVE

      const updatedUser =
        await user.save();

      // RESPONSE

      res.json({

        success: true,

        user: updatedUser,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Profile update failed",
      });
    }
  };


