
import { useState } from "react";

import {
  scheduleInterview,
} from "../../api/hrApi";

const InterviewForm = ({
  analysis = [],
}) => {

  const [loading, setLoading] =
    useState(false);

  const [
    selectedApplication,
    setSelectedApplication,
  ] = useState(null);

  const [formData, setFormData] =
    useState({

      applicationId: "",

      candidateName: "",

      candidateId: "",

      jobId: "",

      jobTitle: "",

      email: "",

      department: "",

      score: 0,

      date: "",

      time: "",

      mode: "Online",
    });

  // ========================================
  // SELECT APPLICATION
  // ========================================

  const handleApplicationSelect =
    (e) => {

      const applicationId =
        e.target.value;

      const selected =
        analysis.find(
          (item) =>

            String(
              item.applicationId
            ) ===

            String(
              applicationId
            )
        );

      console.log(
        "SELECTED APPLICATION:",
        selected
      );

      setSelectedApplication(
        selected
      );

      if (selected) {

        setFormData({

          ...formData,

          applicationId:
            selected.applicationId ||
            "",

          candidateName:
            selected.candidate ||
            "",

          candidateId:
            selected.candidateId ||
            "",

          jobId:
            selected.jobId ||
            "",

          jobTitle:
            selected.jobTitle ||
            "",

          email:
            selected.email ||
            "",

          department:
            selected.department ||
            "",

          score:
            selected.score || 0,
        });
      }
    };

  // ========================================
  // HANDLE CHANGE
  // ========================================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await scheduleInterview({

          applicationId:
            formData.applicationId,

          candidateName:
            formData.candidateName,

          candidateId:
            formData.candidateId,

          email:
            formData.email,

          jobId:
            formData.jobId,

          jobTitle:
            formData.jobTitle,

          department:
            formData.department,

          score:
            formData.score,

          matchedSkills:
            selectedApplication
              ?.matchedSkills || [],

          date:
            formData.date,

          time:
            formData.time,

          mode:
            formData.mode,
        });

        alert(
          "Interview Scheduled Successfully"
        );

        // RESET

        setFormData({

          applicationId: "",

          candidateName: "",

          candidateId: "",

          jobId: "",

          jobTitle: "",

          email: "",

          department: "",

          score: 0,

          date: "",

          time: "",

          mode: "Online",
        });

        setSelectedApplication(
          null
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to schedule interview"
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
        rounded-2xl
        shadow-md
      "
    >

      {/* HEADER */}

      <div className="mb-6">

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          Schedule Interview
        </h2>

        <p className="text-gray-500">
          Manage candidate interviews
        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* SELECT APPLICATION */}

        <div>

          <label
            className="
              block
              mb-2
              font-semibold
            "
          >
            Select Candidate
            Application ID
          </label>

          <select

            required

            onChange={
              handleApplicationSelect
            }

            value={
              formData.applicationId
            }

            className="
              w-full
              border
              p-3
              rounded-xl
            "
          >

            <option value="">
              Select Candidate
              Application ID
            </option>

            {analysis.map(
              (
                item,
                index
              ) => (

                <option
                  key={
                    item.applicationId ||
                    index
                  }

                  value={
                    item.applicationId
                  }
                >

                  {item.applicationId}

                  {" | "}

                  {item.candidate}

                  {" | "}

                  {item.jobTitle}

                </option>
              )
            )}

          </select>

        </div>

        {/* CANDIDATE NAME */}

        <input
          type="text"

          value={
            formData.candidateName
          }

          readOnly

          placeholder="Candidate Name"

          className="
            w-full
            border
            p-3
            rounded-xl
            bg-gray-100
          "
        />

        {/* EMAIL */}

        <input
          type="text"

          value={
            formData.email
          }

          readOnly

          placeholder="Candidate Email"

          className="
            w-full
            border
            p-3
            rounded-xl
            bg-gray-100
          "
        />

        {/* APPLICATION ID */}

        <input
          type="text"

          value={
            formData.applicationId
          }

          readOnly

          placeholder="Application ID"

          className="
            w-full
            border
            p-3
            rounded-xl
            bg-gray-100
          "
        />

        {/* JOB TITLE */}

        <input
          type="text"

          value={
            formData.jobTitle
          }

          readOnly

          placeholder="Job Title"

          className="
            w-full
            border
            p-3
            rounded-xl
            bg-gray-100
          "
        />

        {/* DEPARTMENT */}

        <input
          type="text"

          value={
            formData.department
          }

          readOnly

          placeholder="Department"

          className="
            w-full
            border
            p-3
            rounded-xl
            bg-gray-100
          "
        />

        {/* SCORE */}

        <input
          type="text"

          value={`${formData.score}%`}

          readOnly

          placeholder="Match Score"

          className="
            w-full
            border
            p-3
            rounded-xl
            bg-gray-100
          "
        />

        {/* DATE */}

        <input
          type="date"

          name="date"

          value={formData.date}

          onChange={
            handleChange
          }

          required

          className="
            w-full
            border
            p-3
            rounded-xl
          "
        />

        {/* TIME */}

        <input
          type="time"

          name="time"

          value={formData.time}

          onChange={
            handleChange
          }

          required

          className="
            w-full
            border
            p-3
            rounded-xl
          "
        />

        {/* MODE */}

        <select

          name="mode"

          value={formData.mode}

          onChange={
            handleChange
          }

          className="
            w-full
            border
            p-3
            rounded-xl
          "
        >

          <option>
            Online
          </option>

          <option>
            Offline
          </option>

        </select>

        {/* BUTTON */}

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
            ? "Scheduling..."
            : "Schedule Interview"}

        </button>

      </form>

    </div>
  );
};

export default InterviewForm;

