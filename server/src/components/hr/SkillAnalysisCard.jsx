const SkillAnalysisCard = ({
  analysis = [],
}) => {
  return (
    <div
      className="
        bg-white
        p-6
        rounded-2xl
        shadow-md
      "
    >
      {/* Header */}

      <div className="mb-6">
        <h2
          className="
            text-2xl
            font-bold
            text-gray-800
          "
        >
          AI Skill Analysis
        </h2>

        <p className="text-gray-500">
          Candidate resume evaluation
          & ATS analysis
        </p>
      </div>

      {/* Empty */}

      {analysis.length ===
        0 && (
        <div
          className="
            text-center
            py-10
            text-gray-500
          "
        >
          No Skill Analysis Found
        </div>
      )}

      {/* Analysis Cards */}

      <div className="grid md:grid-cols-2 gap-5">
        {analysis.map(
          (
            item,
            index
          ) => (
            <div
              key={
                item.applicationId ||
                item._id ||
                index
              }
              className="
                border
                rounded-2xl
                p-5
                hover:shadow-lg
                transition
                bg-white
              "
            >
              {/* Candidate */}

              <div className="mb-5">
                <h3
                  className="
                    text-2xl
                    font-bold
                    text-gray-800
                  "
                >
                  {
                    item.candidate ||
                    "Unknown Candidate"
                  }
                </h3>

                <p className="text-gray-500">
                  AI Evaluation Result
                </p>
              </div>

              {/* Score */}

              <div className="mb-5">
                <p className="text-gray-500">
                  Match Score
                </p>

                <h2
                  className={`
                    text-5xl
                    font-bold

                    ${
                      item.score >= 80
                        ? "text-green-600"

                        : item.score >=
                          50
                        ? "text-yellow-500"

                        : "text-red-500"
                    }
                  `}
                >
                  {item.score || 0}%
                </h2>
              </div>

              {/* Candidate Information */}

              <div
                className="
                  bg-gray-50
                  p-4
                  rounded-xl
                  mb-5
                  space-y-3
                "
              >
                <div>
                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Candidate Email
                  </p>

                  <h4 className="font-semibold break-all">
                    {item.email}
                  </h4>
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Applied Job
                  </p>

                  <h4 className="font-semibold">
                    {
                      item.jobTitle
                    }
                  </h4>
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Department
                  </p>

                  <h4 className="font-semibold">
                    {
                      item.department
                    }
                  </h4>
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Application Status
                  </p>

                  <span
                    className={`
                      inline-block
                      mt-1
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold

                      ${
                        item.status ===
                        "shortlisted"
                          ? "bg-green-100 text-green-700"

                          : item.status ===
                            "rejected"
                          ? "bg-red-100 text-red-700"

                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {
                      item.status
                    }
                  </span>
                </div>
              </div>

              {/* IDs */}

              <div
                className="
                  bg-blue-50
                  p-4
                  rounded-xl
                  mb-5
                  space-y-3
                "
              >
                <div>
                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Candidate ID
                  </p>

                  <h4
                    className="
                      text-sm
                      font-semibold
                      break-all
                    "
                  >
                    {
                      item.candidateId
                    }
                  </h4>
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Job ID
                  </p>

                  <h4
                    className="
                      text-sm
                      font-semibold
                      break-all
                    "
                  >
                    {item.jobId}
                  </h4>
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Application ID
                  </p>

                  <h4
                    className="
                      text-sm
                      font-semibold
                      break-all
                    "
                  >
                    {
                      item.applicationId
                    }
                  </h4>
                </div>
              </div>

              {/* Resume */}

              {item.resume && (
                <a
                  href={`http://localhost:5000/${item.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    block
                    w-full
                    text-center
                    bg-black
                    hover:bg-gray-800
                    text-white
                    py-3
                    rounded-xl
                    mb-5
                    transition
                  "
                >
                  View / Download Resume
                </a>
              )}

              {/* Matched Skills */}

              <div className="mb-5">
                <h4
                  className="
                    font-bold
                    mb-3
                  "
                >
                  Matched Skills
                </h4>

                <div className="flex flex-wrap gap-2">
                  {item.matchedSkills
                    ?.length > 0 ? (
                    item.matchedSkills.map(
                      (
                        skill,
                        skillIndex
                      ) => (
                        <span
                          key={
                            skillIndex
                          }
                          className="
                            bg-green-100
                            text-green-700
                            px-3
                            py-1
                            rounded-full
                            text-sm
                          "
                        >
                          {skill}
                        </span>
                      )
                    )
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No matched skills
                    </p>
                  )}
                </div>
              </div>

              {/* Missing Skills */}

              <div className="mb-5">
                <h4
                  className="
                    font-bold
                    mb-3
                  "
                >
                  Missing Skills
                </h4>

                <div className="flex flex-wrap gap-2">
                  {item.missingSkills
                    ?.length > 0 ? (
                    item.missingSkills.map(
                      (
                        skill,
                        skillIndex
                      ) => (
                        <span
                          key={
                            skillIndex
                          }
                          className="
                            bg-red-100
                            text-red-600
                            px-3
                            py-1
                            rounded-full
                            text-sm
                          "
                        >
                          {skill}
                        </span>
                      )
                    )
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No missing skills
                    </p>
                  )}
                </div>
              </div>

              {/* Strengths */}

              <div className="mb-5">
                <h4
                  className="
                    font-bold
                    mb-3
                  "
                >
                  Candidate Strengths
                </h4>

                <ul className="space-y-2">
                  {item.strengths
                    ?.length > 0 ? (
                    item.strengths.map(
                      (
                        strength,
                        strengthIndex
                      ) => (
                        <li
                          key={
                            strengthIndex
                          }
                          className="
                            bg-purple-50
                            text-purple-700
                            px-3
                            py-2
                            rounded-xl
                            text-sm
                          "
                        >
                          {strength}
                        </li>
                      )
                    )
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No strengths detected
                    </p>
                  )}
                </ul>
              </div>

              {/* Recommendation */}

              <div
                className="
                  bg-blue-50
                  p-4
                  rounded-xl
                "
              >
                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  AI Recommendation
                </p>

                <h3
                  className="
                    text-lg
                    font-bold
                    text-blue-700
                  "
                >
                  {
                    item.recommendation ||
                    "No Recommendation"
                  }
                </h3>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SkillAnalysisCard;