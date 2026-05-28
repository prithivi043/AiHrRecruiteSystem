import {
  FaUserTie,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const CandidateCard = ({
  candidate,
  onShortlist,
  onReject,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        hover:shadow-xl
        transition
      "
    >
      <div className="flex justify-between">
        
        <div className="flex gap-4">
          
          <div
            className="
              w-16
              h-16
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
            "
          >
            <FaUserTie
              size={28}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2
              className="
                text-xl
                font-bold
              "
            >
              {candidate.name}
            </h2>

            <p className="text-gray-500">
              {candidate.email}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {candidate.skills?.map(
                (
                  skill,
                  index
                ) => (
                  <span
                    key={index}
                    className="
                      bg-blue-100
                      text-blue-600
                      px-3 py-1
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
        </div>

        {/* Match Score */}

        <div className="text-center">
          <p className="text-gray-500">
            AI Match
          </p>

          <h2
            className="
              text-3xl
              font-bold
              text-green-600
            "
          >
            {candidate.matchScore}%
          </h2>
        </div>
      </div>

      {/* Actions */}

      <div className="flex gap-3 mt-6">
        
        <button
          onClick={() =>
            onShortlist(
              candidate._id
            )
          }
          className="
            flex-1
            bg-green-500
            hover:bg-green-600
            text-white
            py-3
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <FaCheck />
          Shortlist
        </button>

        <button
          onClick={() =>
            onReject(
              candidate._id
            )
          }
          className="
            flex-1
            bg-red-500
            hover:bg-red-600
            text-white
            py-3
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <FaTimes />
          Reject
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;