const CandidateList = ({
  candidates = [],
  updateStatus,
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

      {/* HEADER */}

      <div className="mb-6">

        <h2
          className="
            text-2xl
            font-bold
            text-gray-800
          "
        >
          Candidate Applications
        </h2>

        <p className="text-gray-500">
          Review and manage candidates
        </p>

      </div>

      {/* EMPTY */}

      {candidates.length === 0 && (

        <div
          className="
            text-center
            py-10
            text-gray-500
          "
        >
          No Candidates Found
        </div>
      )}

      {/* CANDIDATES */}

      <div className="space-y-5">

        {candidates.map(
          (item, index) => (

            <div
              key={
                item._id || index
              }
              className="
                border
                rounded-2xl
                p-5
                hover:shadow-lg
                transition
              "
            >

              {/* TOP */}

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                "
              >

                {/* INFO */}

                <div>

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-gray-800
                    "
                  >
                    {
                      item
                        ?.candidate
                        ?.name
                    }
                  </h3>

                  <p className="text-gray-500">
                    {
                      item
                        ?.candidate
                        ?.email
                    }
                  </p>

                  <div className="mt-3">

                    <span
                      className="
                        bg-blue-100
                        text-blue-600
                        px-3
                        py-1
                        rounded-full
                        text-sm
                      "
                    >
                      {
                        item?.job
                          ?.title
                      }
                    </span>

                  </div>

                </div>

                {/* SCORE */}

                <div className="text-center">

                  <p className="text-gray-500">
                    AI Match Score
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-bold
                      text-green-600
                    "
                  >
                    {
                      item.matchScore
                    }
                    %
                  </h2>

                </div>

              </div>

              {/* SKILLS */}

              <div className="mt-5">

                <h4
                  className="
                    font-semibold
                    mb-2
                  "
                >
                  Matched Skills
                </h4>

                <div className="flex flex-wrap gap-2">

                  {item?.matchedSkills?.map(
                    (
                      skill,
                      index
                    ) => (

                      <span
                        key={index}
                        className="
                          bg-gray-100
                          text-gray-700
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

              {/* STATUS */}

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                "
              >

                {/* STATUS BADGE */}

                <div>

                  <span
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-medium

                      ${
                        item.status ===
                        "shortlisted"

                          ? "bg-green-100 text-green-600"

                          : item.status ===
                            "rejected"

                          ? "bg-red-100 text-red-600"

                          : "bg-yellow-100 text-yellow-600"
                      }
                    `}
                  >
                    {item.status}
                  </span>

                </div>

                {/* ACTION BUTTONS */}

                <div className="flex gap-3">

  {/* ================================= */}
  {/* PENDING */}
  {/* ================================= */}

  {item.status ===
    "pending" && (

    <>

      {/* SHORTLIST */}

      <button
        onClick={() =>
          updateStatus(
            item._id,
            "shortlisted"
          )
        }
        className="
          bg-green-500
          hover:bg-green-600
          text-white
          px-4
          py-2
          rounded-xl
        "
      >
        Shortlist
      </button>

      {/* REJECT */}

      <button
        onClick={() =>
          updateStatus(
            item._id,
            "rejected"
          )
        }
        className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-4
          py-2
          rounded-xl
        "
      >
        Reject
      </button>

    </>
  )}

  {/* ================================= */}
  {/* SHORTLISTED */}
  {/* ================================= */}

  {item.status ===
    "shortlisted" && (

    <div
      className="
        bg-green-100
        text-green-600
        px-4
        py-2
        rounded-xl
        font-semibold
      "
    >
      Candidate Shortlisted
    </div>
  )}

  {/* ================================= */}
  {/* REJECTED */}
  {/* ================================= */}

  {item.status ===
    "rejected" && (

    <div
      className="
        bg-red-100
        text-red-600
        px-4
        py-2
        rounded-xl
        font-semibold
      "
    >
      Candidate Rejected
    </div>
  )}

</div>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default CandidateList;