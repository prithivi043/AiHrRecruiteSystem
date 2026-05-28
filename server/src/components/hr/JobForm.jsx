import { useState } from "react";

import {
  postJob,
} from "../../api/hrApi";

const JobForm = ({
  refreshJobs,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [skillInput, setSkillInput] =
    useState("");

  const [jobData, setJobData] =
    useState({
      title: "",
      department: "",
      description: "",
      salary: "",
      requiredSkills: [],
    });

  // ====================================

  const handleChange = (e) => {
    setJobData({
      ...jobData,

      [e.target.name]:
        e.target.value,
    });
  };

  // ====================================

  const addSkill = () => {
    if (
      !skillInput.trim()
    ) {
      return;
    }

    setJobData({
      ...jobData,

      requiredSkills: [
        ...jobData.requiredSkills,
        skillInput,
      ],
    });

    setSkillInput("");
  };

  // ====================================

  const removeSkill = (
    index
  ) => {
    const updatedSkills =
      jobData.requiredSkills.filter(
        (_, i) => i !== index
      );

    setJobData({
      ...jobData,

      requiredSkills:
        updatedSkills,
    });
  };

  // ====================================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await postJob(
          jobData
        );

        alert(
          "Job Posted Successfully"
        );

        // Reset Form

        setJobData({
          title: "",
          department: "",
          description: "",
          salary: "",
          requiredSkills: [],
        });

        // Refresh Jobs

        if (refreshJobs) {
          refreshJobs();
        }

      } catch (error) {
        console.log(error);

        alert(
          "Failed to post job"
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
      <h2
        className="
          text-2xl
          font-bold
          mb-5
        "
      >
        Post New Job
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Title */}

        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={
            handleChange
          }
          placeholder="Job Title"
          required
          className="
            w-full
            border
            p-3
            rounded-xl
          "
        />

        {/* Department */}

        <input
          type="text"
          name="department"
          value={
            jobData.department
          }
          onChange={
            handleChange
          }
          placeholder="Department"
          required
          className="
            w-full
            border
            p-3
            rounded-xl
          "
        />

        {/* Description */}

        <textarea
          name="description"
          rows="5"
          value={
            jobData.description
          }
          onChange={
            handleChange
          }
          placeholder="Job Description"
          required
          className="
            w-full
            border
            p-3
            rounded-xl
          "
        />

        {/* Salary */}

        <input
          type="text"
          name="salary"
          value={jobData.salary}
          onChange={
            handleChange
          }
          placeholder="Salary"
          className="
            w-full
            border
            p-3
            rounded-xl
          "
        />

        {/* Skills */}

        <div>
          <div className="flex gap-3">
            <input
              type="text"
              value={skillInput}
              onChange={(e) =>
                setSkillInput(
                  e.target.value
                )
              }
              placeholder="Add Skill"
              className="
                flex-1
                border
                p-3
                rounded-xl
              "
            />

            <button
              type="button"
              onClick={addSkill}
              className="
                bg-blue-600
                text-white
                px-5
                rounded-xl
              "
            >
              Add
            </button>
          </div>

          {/* Skills */}

          <div className="flex flex-wrap gap-2 mt-4">
            {jobData.requiredSkills.map(
              (
                skill,
                index
              ) => (
                <div
                  key={index}
                  className="
                    bg-blue-100
                    text-blue-600
                    px-3
                    py-1
                    rounded-full
                    flex
                    items-center
                    gap-2
                  "
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() =>
                      removeSkill(
                        index
                      )
                    }
                  >
                    ✕
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Submit */}

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
          "
        >
          {loading
            ? "Posting..."
            : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;