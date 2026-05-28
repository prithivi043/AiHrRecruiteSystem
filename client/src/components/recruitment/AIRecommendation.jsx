const AIRecommendation = ({
  existingSkills = [],
  recommendedSkills = [],
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
      <h2
        className="
          text-2xl
          font-bold
          mb-5
        "
      >
        AI Skill Recommendations
      </h2>

      {/* Existing Skills */}

      <div className="mb-6">
        <h3
          className="
            text-lg
            font-semibold
            mb-3
          "
        >
          Existing Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {existingSkills.map(
            (
              skill,
              index
            ) => (
              <span
                key={index}
                className="
                  bg-green-100
                  text-green-600
                  px-3 py-1
                  rounded-full
                "
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Recommended Skills */}

      <div>
        <h3
          className="
            text-lg
            font-semibold
            mb-3
          "
        >
          Recommended Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {recommendedSkills.map(
            (
              skill,
              index
            ) => (
              <span
                key={index}
                className="
                  bg-red-100
                  text-red-600
                  px-3 py-1
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

export default AIRecommendation;