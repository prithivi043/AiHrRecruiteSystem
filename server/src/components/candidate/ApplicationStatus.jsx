const ApplicationStatus = ({
  applications,
}) => {
  return (
    <div
      className="
        bg-white
        p-6
        rounded-3xl
        shadow-md
      "
    >
      <div className="mb-6">
        <h2
          className="
            text-3xl
            font-bold
          "
        >
          Live Application Status
        </h2>

        <p className="text-gray-500">
          Track your applications in real time
        </p>
      </div>

      {/* Empty */}

      {applications.length ===
        0 && (
        <div
          className="
            text-center
            py-10
            text-gray-500
          "
        >
          No Applications Yet
        </div>
      )}

      {/* Applications */}

      <div className="space-y-5">
        {applications.map(
          (item) => (
            <div
              key={item._id}
              className="
                border
                rounded-2xl
                p-5
                hover:shadow-lg
                transition
              "
            >
              {/* Top */}

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
                <div>
                  <h3
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    {
                      item.job.title
                    }
                  </h3>

                  <p className="text-gray-500">
                    {
                      item.job
                        .department
                    }
                  </p>
                </div>

                {/* Score */}

                <div className="text-center">
                  <p className="text-gray-500">
                    Match Score
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

              {/* Status */}

              <div className="mt-5">
                <span
                  className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold

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
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;