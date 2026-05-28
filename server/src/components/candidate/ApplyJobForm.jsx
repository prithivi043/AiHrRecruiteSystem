import { useState } from "react";

import {
  applyJob,
} from "../../api/candidateApi";

const ApplyJobForm = ({
  job,
  onApplied,
}) => {
  // ========================================
  // STATES
  // ========================================

  const [resume, setResume] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [score, setScore] =
    useState(null);

  // ========================================
  // HANDLE APPLY
  // ========================================

  const handleApply =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await applyJob({
            jobId: job._id,
            resume,
          });

        setScore(
          response.application
            .matchScore
        );

        alert(
          "Applied Successfully"
        );

        if (onApplied) {
          onApplied();
        }

      } catch (error) {
        console.log(error);

        alert(
          error.message ||
            "Application Failed"
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
      "
    >
      {/* Header */}

      <div className="mb-5">
        <h2
          className="
            text-2xl
            font-bold
          "
        >
          Apply for Job
        </h2>

        <p className="text-gray-500">
          {job.title}
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleApply}
        className="space-y-5"
      >
        {/* Resume */}

        <div>
          <label className="font-medium">
            Resume Content
          </label>

          <textarea
            rows="8"
            value={resume}
            onChange={(e) =>
              setResume(
                e.target.value
              )
            }
            placeholder="
              Paste your resume content here...
            "
            required
            className="
              w-full
              border
              p-4
              rounded-xl
              mt-2
              resize-none
            "
          />
        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-semibold
          "
        >
          {loading
            ? "Applying..."
            : "Apply Now"}
        </button>
      </form>

      {/* AI Score */}

      {score !== null && (
        <div
          className="
            mt-6
            bg-green-100
            p-5
            rounded-2xl
          "
        >
          <h3
            className="
              text-xl
              font-bold
              text-green-700
            "
          >
            AI Match Score
          </h3>

          <p
            className="
              text-4xl
              font-bold
              mt-2
              text-green-600
            "
          >
            {score}%
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplyJobForm;