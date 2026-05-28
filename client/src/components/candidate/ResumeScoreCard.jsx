const ResumeScoreCard = ({
  score,
  matchedSkills = [],
  missingSkills = [],
}) => {
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

      <div className="mb-6">
        <h2
          className="
            text-2xl
            font-bold
          "
        >
          AI Resume Analysis
        </h2>

        <p className="text-gray-500">
          Resume Skill Matching
        </p>
      </div>

      {/* Score */}

      <div
        className="
          text-center
          mb-8
        "
      >
        <h1
          className="
            text-6xl
            font-bold
            text-green-600
          "
        >
          {score}%
        </h1>

        <p className="text-gray-500 mt-2">
          Match Score
        </p>
      </div>

      {/* Matched Skills */}

      <div className="mb-6">
        <h3
          className="
            text-lg
            font-bold
            mb-3
          "
        >
          Matched Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {matchedSkills.map(
            (
              skill,
              index
            ) => (
              <span
                key={index}
                className="
                  bg-green-100
                  text-green-600
                  px-3
                  py-1
                  rounded-full
                "
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Missing Skills */}

      <div>
        <h3
          className="
            text-lg
            font-bold
            mb-3
          "
        >
          Missing Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {missingSkills.map(
            (
              skill,
              index
            ) => (
              <span
                key={index}
                className="
                  bg-red-100
                  text-red-600
                  px-3
                  py-1
                  rounded-full
                "
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreCard;