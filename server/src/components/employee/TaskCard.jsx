
const TaskCard =
  ({ task }) => {

    // ========================================
    // PRIORITY COLORS
    // ========================================

    const priorityColor =
      task.priority === "High"
        ? "bg-red-100 text-red-600"

        : task.priority ===
          "Medium"

        ? "bg-yellow-100 text-yellow-700"

        : "bg-green-100 text-green-600";

    // ========================================

    const statusColor =
      task.status ===
      "Completed"

        ? "bg-green-100 text-green-600"

        : task.status ===
          "In Progress"

        ? "bg-blue-100 text-blue-600"

        : "bg-gray-100 text-gray-600";

    return (

      <div
        className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          h-full
          hover:shadow-xl
          transition
        "
      >

        {/* TOP */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
              "
            >
              {task.title}
            </h2>

            <p
              className="
                text-gray-500
                mt-2
                text-sm
              "
            >
              Assigned by:
              {" "}
              {
                task.assignedBy
                  ?.name
              }
            </p>

          </div>

          {/* PRIORITY */}

          <div
            className={`
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              ${priorityColor}
            `}
          >
            {task.priority}
          </div>

        </div>

        {/* DESCRIPTION */}

        <div className="mt-6">

          <p
            className="
              text-gray-600
              leading-relaxed
            "
          >
            {
              task.description
            }
          </p>

        </div>

        {/* DETAILS */}

        <div
          className="
            mt-6
            grid
            grid-cols-2
            gap-4
          "
        >

          {/* STATUS */}

          <div
            className="
              bg-gray-50
              rounded-2xl
              p-4
            "
          >

            <p
              className="
                text-xs
                text-gray-500
              "
            >
              Status
            </p>

            <div
              className={`
                mt-2
                inline-block
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
                ${statusColor}
              `}
            >
              {task.status}
            </div>

          </div>

          {/* DEADLINE */}

          <div
            className="
              bg-gray-50
              rounded-2xl
              p-4
            "
          >

            <p
              className="
                text-xs
                text-gray-500
              "
            >
              Deadline
            </p>

            <h4
              className="
                mt-2
                font-bold
                text-gray-800
              "
            >
              {task.deadline}
            </h4>

          </div>

        </div>

      </div>
    );
};

export default TaskCard;

