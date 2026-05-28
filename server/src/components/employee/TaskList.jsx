
import TaskCard from "./TaskCard";

const TaskList =
  ({
    tasks = [],
  }) => {

    return (

      <div className="space-y-6">

        {/* HEADER */}

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

            <h2
              className="
                text-3xl
                font-bold
                text-gray-800
              "
            >
              Assigned Tasks
            </h2>

            <p className="text-gray-500 mt-2">
              Track and manage
              your assigned work
            </p>

          </div>

          {/* COUNT */}

          <div
            className="
              bg-white
              shadow-md
              rounded-2xl
              px-5
              py-4
              w-fit
            "
          >

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Total Tasks
            </p>

            <h3
              className="
                text-3xl
                font-bold
                text-blue-600
              "
            >
              {tasks.length}
            </h3>

          </div>

        </div>

        {/* EMPTY */}

        {tasks.length ===
          0 && (

          <div
            className="
              bg-white
              rounded-3xl
              shadow-md
              p-10
              text-center
            "
          >

            <div className="text-6xl">
              📋
            </div>

            <h3
              className="
                text-2xl
                font-bold
                mt-5
              "
            >
              No Tasks Assigned
            </h3>

            <p className="text-gray-500 mt-3">
              HR has not assigned
              any tasks yet.
            </p>

          </div>
        )}

        {/* TASKS */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >

          {tasks.map(
            (task) => (

              <TaskCard
                key={task._id}
                task={task}
              />
            )
          )}

        </div>

      </div>
    );
};

export default TaskList;

