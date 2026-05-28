
import {
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaPauseCircle,
  FaTasks,
} from "react-icons/fa";

const PerformanceTracker =
  ({
    tasks = [],
    updateTaskStatus,
  }) => {

    // ========================================
    // COUNTS
    // ========================================

    const totalTasks =
      tasks.length;

    const completedTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "Completed"
      ).length;

    const pendingTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "Pending"
      ).length;

    const progressTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "In Progress"
      ).length;

    const stoppedTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "Stopped"
      ).length;

    return (

      <div className="space-y-8">

        {/* HERO */}

        <div
          className="
            bg-gradient-to-r
            from-blue-700
            via-indigo-700
            to-purple-800
            rounded-[32px]
            p-8
            text-white
            shadow-2xl
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-8
            "
          >

            <div>

              <h1
                className="
                  text-4xl
                  font-extrabold
                "
              >
                Task Performance
              </h1>

              <p
                className="
                  mt-4
                  text-lg
                  text-blue-100
                  max-w-2xl
                "
              >
                Manage work progress,
                update task status,
                and monitor employee
                productivity in real-time.
              </p>

            </div>

            {/* ICON */}

            <div
              className="
                w-32
                h-32
                rounded-3xl
                bg-white/10
                backdrop-blur-md
                border
                border-white/20
                flex
                items-center
                justify-center
                text-6xl
              "
            >

              <FaTasks />

            </div>

          </div>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-5
            gap-6
          "
        >

          {/* TOTAL */}

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-md
            "
          >

            <p className="text-gray-500">
              Total Tasks
            </p>

            <h2
              className="
                text-5xl
                font-bold
                mt-4
              "
            >
              {totalTasks}
            </h2>

          </div>

          {/* COMPLETED */}

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-md
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p className="text-gray-500">
                  Completed
                </p>

                <h2
                  className="
                    text-5xl
                    font-bold
                    mt-4
                    text-green-600
                  "
                >
                  {completedTasks}
                </h2>

              </div>

              <FaCheckCircle
                className="
                  text-4xl
                  text-green-500
                "
              />

            </div>

          </div>

          {/* IN PROGRESS */}

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-md
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p className="text-gray-500">
                  In Progress
                </p>

                <h2
                  className="
                    text-5xl
                    font-bold
                    mt-4
                    text-yellow-500
                  "
                >
                  {progressTasks}
                </h2>

              </div>

              <FaSpinner
                className="
                  text-4xl
                  text-yellow-500
                "
              />

            </div>

          </div>

          {/* STOPPED */}

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-md
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p className="text-gray-500">
                  Stopped
                </p>

                <h2
                  className="
                    text-5xl
                    font-bold
                    mt-4
                    text-orange-500
                  "
                >
                  {stoppedTasks}
                </h2>

              </div>

              <FaPauseCircle
                className="
                  text-4xl
                  text-orange-500
                "
              />

            </div>

          </div>

          {/* PENDING */}

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-md
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p className="text-gray-500">
                  Pending
                </p>

                <h2
                  className="
                    text-5xl
                    font-bold
                    mt-4
                    text-red-500
                  "
                >
                  {pendingTasks}
                </h2>

              </div>

              <FaClock
                className="
                  text-4xl
                  text-red-500
                "
              />

            </div>

          </div>

        </div>

        {/* TASK STATUS UPDATE */}

        <div className="space-y-6">

          {tasks.map(
            (task) => (

              <div
                key={task._id}
                className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-md
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-6
                  "
                >

                  {/* LEFT */}

                  <div>

                    <h2
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      {task.title}
                    </h2>

                    <p
                      className="
                        text-gray-500
                        mt-2
                      "
                    >
                      {task.description}
                    </p>

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-3
                        mt-4
                      "
                    >

                      <span
                        className="
                          px-4
                          py-2
                          rounded-full
                          bg-blue-100
                          text-blue-700
                          text-sm
                          font-semibold
                        "
                      >
                        Priority:
                        {" "}
                        {task.priority}
                      </span>

                      <span
                        className="
                          px-4
                          py-2
                          rounded-full
                          bg-gray-100
                          text-gray-700
                          text-sm
                          font-semibold
                        "
                      >
                        Current:
                        {" "}
                        {task.status}
                      </span>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-3
                    "
                  >

                    <button
                      onClick={() =>
                        updateTaskStatus(
                          task._id,
                          "In Progress"
                        )
                      }
                      className="
                        px-5
                        py-3
                        rounded-2xl
                        bg-yellow-500
                        text-white
                        font-semibold
                      "
                    >
                      In Progress
                    </button>

                    <button
                      onClick={() =>
                        updateTaskStatus(
                          task._id,
                          "Stopped"
                        )
                      }
                      className="
                        px-5
                        py-3
                        rounded-2xl
                        bg-orange-500
                        text-white
                        font-semibold
                      "
                    >
                      Stopped
                    </button>

                    <button
                      onClick={() =>
                        updateTaskStatus(
                          task._id,
                          "Completed"
                        )
                      }
                      className="
                        px-5
                        py-3
                        rounded-2xl
                        bg-green-600
                        text-white
                        font-semibold
                      "
                    >
                      Completed
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>
    );
};

export default PerformanceTracker;

