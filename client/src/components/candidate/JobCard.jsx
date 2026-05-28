import { useState } from "react";

import {
  applyJob,
} from "../../api/candidateApi";

import {
  FaCloudUploadAlt,
  FaCheckCircle,
  FaSpinner,
  FaFileAlt,
} from "react-icons/fa";

const JobCard = ({
  job,
  refreshApplications,
}) => {

  // ========================================
  // STATES
  // ========================================

  const [resumeFile, setResumeFile] =
    useState(null);

  const [dragActive, setDragActive] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [
    applicationStatus,
    setApplicationStatus,
  ] = useState("");

  const [matchScore,
    setMatchScore] =
    useState(null);

  const [
    recommendation,
    setRecommendation,
  ] = useState("");

  // ========================================
  // FILE CHANGE
  // ========================================

  const handleFileChange = (
    file
  ) => {

    if (!file) return;

    // Validate File Size

    if (
      file.size >
      5 * 1024 * 1024
    ) {

      alert(
        "File size should be less than 5MB"
      );

      return;
    }

    setResumeFile(file);

    setApplicationStatus(
      "Resume Uploaded Successfully"
    );
  };

  // ========================================
  // DRAG EVENTS
  // ========================================

  const handleDragOver = (
    e
  ) => {

    e.preventDefault();

    setDragActive(true);
  };

  const handleDragLeave = (
    e
  ) => {

    e.preventDefault();

    setDragActive(false);
  };

  const handleDrop = (e) => {

    e.preventDefault();

    setDragActive(false);

    const file =
      e.dataTransfer.files[0];

    handleFileChange(file);
  };

  // ========================================
  // APPLY JOB
  // ========================================

  const handleApply =
  async () => {

    try {

      if (!resumeFile) {

        alert(
          "Please upload your resume"
        );

        return;
      }

      setLoading(true);

      setApplicationStatus(
        "AI Reviewing Resume..."
      );

      // ====================================
      // API CALL
      // ====================================

      const response =
        await applyJob({
          jobId: job._id,
          resume: resumeFile,
        });

      console.log(
        "FULL RESPONSE:",
        response
      );

      // ====================================
      // APPLICATION
      // ====================================

      const application =
        response?.application;

      console.log(
        "APPLICATION:",
        application
      );

      // ====================================
      // SCORE
      // ====================================

      const score =
        Number(
          application
            ?.matchScore
        ) || 0;

      console.log(
        "FINAL SCORE:",
        score
      );

      // ====================================
      // SET SCORE
      // ====================================

      setMatchScore(score);

      // ====================================
      // RECOMMENDATION
      // ====================================

      setRecommendation(
        application
          ?.recommendation ||
          "Resume Analysis Completed"
      );

      // ====================================
      // STATUS
      // ====================================

      setApplicationStatus(
        "Application Submitted Successfully"
      );

      // ====================================
      // REFRESH
      // ====================================

      if (
        refreshApplications
      ) {

        refreshApplications();
      }

    } catch (error) {

      console.log(
        "APPLY ERROR:",
        error
      );

      setApplicationStatus(
        "Application Failed"
      );

      alert(
        error.response?.data
          ?.message ||
          "Job Application Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
        bg-white
        p-6
        rounded-3xl
        shadow-md
        border
        hover:shadow-xl
        transition
      "
    >

      {/* ================================= */}
      {/* JOB DETAILS */}
      {/* ================================= */}

      <div className="mb-5">

        <h2
          className="
            text-2xl
            font-bold
            text-gray-800
          "
        >
          {job.title}
        </h2>

        <p className="text-gray-500 mt-1">
          {job.department}
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          {job.description}
        </p>

      </div>

      {/* ================================= */}
      {/* REQUIRED SKILLS */}
      {/* ================================= */}

      <div className="mb-6">

        <h3
          className="
            font-semibold
            mb-3
          "
        >
          Required Skills
        </h3>

        <div className="flex flex-wrap gap-2">

          {job.requiredSkills?.map(
            (
              skill,
              index
            ) => (

              <span
                key={index}
                className="
                  bg-blue-100
                  text-blue-600
                  px-3
                  py-1
                  rounded-full
                  text-sm
                "
              >
                {skill}
              </span>
            )
          )}

        </div>
      </div>

      {/* ================================= */}
      {/* UPLOAD */}
      {/* ================================= */}

      <div
        onDragOver={
          handleDragOver
        }
        onDragLeave={
          handleDragLeave
        }
        onDrop={handleDrop}
        className={`
          border-2
          border-dashed
          rounded-2xl
          p-8
          text-center
          transition

          ${
            dragActive
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300"
          }
        `}
      >

        <FaCloudUploadAlt
          className="
            text-5xl
            mx-auto
            text-blue-500
            mb-4
          "
        />

        <h3
          className="
            text-lg
            font-semibold
          "
        >
          Upload Resume
        </h3>

        <p className="text-gray-500 mt-2">
          Drag & Drop your resume here
        </p>

        <p className="text-gray-400 text-sm mt-1">
          PDF, DOC, DOCX, TXT
          (Max 5MB)
        </p>

        <input
          type="file"
          accept="
            .pdf,
            .doc,
            .docx,
            .txt,
            .jpg,
            .jpeg,
            .png
          "
          onChange={(e) =>
            handleFileChange(
              e.target.files[0]
            )
          }
          className="
            mt-5
            block
            mx-auto
          "
        />

        {/* FILE */}

        {resumeFile && (

          <div
            className="
              mt-5
              bg-green-100
              text-green-700
              py-3
              px-4
              rounded-2xl
              flex
              items-center
              justify-center
              gap-3
            "
          >

            <FaFileAlt />

            <span>
              {resumeFile.name}
            </span>

          </div>
        )}

      </div>

      {/* ================================= */}
      {/* STATUS */}
      {/* ================================= */}

      {applicationStatus && (

        <div
          className="
            mt-6
            bg-gray-100
            rounded-2xl
            p-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            {loading ? (

              <FaSpinner
                className="
                  animate-spin
                  text-blue-600
                "
              />

            ) : (

              <FaCheckCircle
                className="
                  text-green-600
                "
              />
            )}

            <h3
              className="
                font-semibold
              "
            >
              {applicationStatus}
            </h3>

          </div>

          {/* SCORE */}

          {matchScore !== null && (

            <div className="mt-5">

              <p className="text-gray-500">
                AI Resume Match Score
              </p>

              <h1
                className="
                  text-5xl
                  font-bold
                  text-blue-600
                  mt-2
                "
              >
                {matchScore}%
              </h1>

              <p className="mt-3 text-gray-600">

                {recommendation}

              </p>

            </div>
          )}

        </div>
      )}

      {/* ================================= */}
      {/* BUTTON */}
      {/* ================================= */}

      <button
        onClick={handleApply}
        disabled={
          loading ||
          !resumeFile
        }
        className="
          mt-6
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-2xl
          font-semibold
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >

        {loading
          ? "AI Analyzing Resume..."
          : "Apply Job"}

      </button>

    </div>
  );
};

export default JobCard;