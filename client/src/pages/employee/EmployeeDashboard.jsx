
import DashboardLoader from "../../components/common/DashboardLoader";


import {
  useEffect,
  useState,
} from "react";

import {

  FaTasks,

  FaChartLine,

  FaUserCog,

  FaBars,

  FaTimes,

  FaHome,

} from "react-icons/fa";

// ========================================
// API
// ========================================

import {
  getTasks,
  updateTaskStatus,
} from "../../api/employeeApi";

// ========================================
// COMPONENTS
// ========================================

import TaskList from "../../components/employee/TaskList";

import PerformanceTracker from "../../components/employee/PerformanceTracker";

import EmployeeProfile from "../../components/employee/EmployeeProfile";

// ========================================
// SERVICES
// ========================================

import {
  getUser,
} from "../../services/authService";

// ========================================
// DASHBOARD
// ========================================

const EmployeeDashboard =
  () => {

    const user =
      getUser();

    // ========================================
    // STATES
    // ========================================

    const [tasks,
      setTasks] =
      useState([]);

    const [loading,
      setLoading] =
      useState(true);

    const [
      activeSection,
      setActiveSection,
    ] = useState(
      "overview"
    );

    const [
      sidebarOpen,
      setSidebarOpen,
    ] = useState(false);

    // ========================================
    // FETCH TASKS
    // ========================================

    const fetchTasks =
      async () => {

        try {

          setLoading(true);

          const data =
            await getTasks();

          setTasks(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    // ========================================

    useEffect(() => {

      fetchTasks();

    }, []);

    // ========================================


    // ========================================
    // UPDATE TASK STATUS
    // ========================================

    const handleTaskStatus =
      async (
        taskId,
        status
      ) => {

        try {

          await updateTaskStatus(

            taskId,

            status
          );

          // REFRESH TASKS

          fetchTasks();

        } catch (error) {

          console.log(error);
        }
      };



    const completedTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "Completed"
      ).length;

    // ========================================

    const pendingTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "Pending"
      ).length;

    // ========================================

    const progressTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "In Progress"
      ).length;

    // ========================================

   

if (loading) {

  return (

    <DashboardLoader

      title="Loading Employee Dashboard"

      subtitle="
        Preparing employee workspace,
        syncing tasks,
        and tracking productivity...
      "
    />
  );
}




    // ========================================

    const menuItems = [

      {
        id: "overview",
        title: "Overview",
        icon: <FaHome />,
      },

      {
        id: "tasks",
        title: "My Tasks",
        icon: <FaTasks />,
      },

      {
        id: "performance",
        title: "Track Performance",
        icon: <FaChartLine />,
      },

      {
        id: "profile",
        title: "Profile",
        icon: <FaUserCog />,
      },
    ];

    return (

      <div
        className="
          min-h-screen
          bg-gray-100
          flex
        "
      >

        {/* MOBILE OVERLAY */}

        {sidebarOpen && (

          <div
            onClick={() =>
              setSidebarOpen(
                false
              )
            }
            className="
              fixed
              inset-0
              bg-black/40
              z-40
              lg:hidden
            "
          />
        )}

        {/* ================================= */}
        {/* SIDEBAR */}
        {/* ================================= */}

        <aside
          className={`
            fixed
            lg:static
            top-0
            left-0
            h-screen
            w-[290px]
            bg-white
            shadow-2xl
            z-50
            transition-transform
            duration-300
            flex
            flex-col

            ${
              sidebarOpen

                ? "translate-x-0"

                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >

          {/* HEADER */}

          <div
            className="
              p-6
              border-b
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h1
                className="
                  text-2xl
                  font-bold
                  text-blue-600
                "
              >
                Employee Panel
              </h1>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                AI Workforce System
              </p>

            </div>

            <button
              onClick={() =>
                setSidebarOpen(
                  false
                )
              }
              className="
                lg:hidden
                text-2xl
              "
            >

              <FaTimes />

            </button>

          </div>

          {/* USER */}

          <div
            className="
              p-6
              border-b
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-700
                  text-white
                  flex
                  items-center
                  justify-center
                  text-2xl
                  font-bold
                "
              >

                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

              <div>

                <h3
                  className="
                    font-bold
                    text-lg
                  "
                >
                  {user?.name}
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Employee
                </p>

              </div>

            </div>

          </div>

          {/* MENU */}

          <div
            className="
              flex-1
              p-4
              space-y-3
              overflow-y-auto
            "
          >

            {menuItems.map(
              (item) => (

                <button
                  key={item.id}

                  onClick={() => {

                    setActiveSection(
                      item.id
                    );

                    setSidebarOpen(
                      false
                    );
                  }}

                  className={`
                    w-full
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-2xl
                    transition-all

                    ${
                      activeSection ===
                      item.id

                        ? `
                          bg-gradient-to-r
                          from-blue-600
                          to-indigo-700
                          text-white
                          shadow-lg
                        `

                        : `
                          hover:bg-gray-100
                          text-gray-700
                        `
                    }
                  `}
                >

                  <span className="text-xl">
                    {item.icon}
                  </span>

                  <span className="font-semibold">
                    {item.title}
                  </span>

                </button>
              )
            )}

          </div>

        </aside>

        {/* ================================= */}
        {/* MAIN */}
        {/* ================================= */}

        <main
          className="
            flex-1
            p-4
            md:p-8
            overflow-x-hidden
          "
        >

          {/* MOBILE HEADER */}

          <div
            className="
              lg:hidden
              flex
              items-center
              justify-between
              mb-6
            "
          >

            <button
              onClick={() =>
                setSidebarOpen(
                  true
                )
              }
              className="
                bg-white
                p-4
                rounded-2xl
                shadow-md
                text-xl
              "
            >

              <FaBars />

            </button>

            <h2
              className="
                text-xl
                font-bold
              "
            >
              Employee Dashboard
            </h2>

          </div>

        
          {/* OVERVIEW */}

          {activeSection ===
            "overview" && (

            <div className="space-y-8">

              {/* HERO */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[36px]
                  bg-gradient-to-br
                  from-blue-700
                  via-indigo-700
                  to-purple-800
                  p-8
                  md:p-10
                  shadow-2xl
                "
              >

                {/* BACKGROUND EFFECT */}

                <div
                  className="
                    absolute
                    top-0
                    right-0
                    w-72
                    h-72
                    bg-white/10
                    rounded-full
                    blur-3xl
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    w-64
                    h-64
                    bg-cyan-400/10
                    rounded-full
                    blur-3xl
                  "
                />

                {/* CONTENT */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    flex-col
                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                    gap-10
                  "
                >

                  {/* LEFT */}

                  <div className="max-w-3xl">

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        bg-white/10
                        backdrop-blur-md
                        border
                        border-white/20
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        text-blue-100
                        mb-6
                      "
                    >
                      AI Workforce Management
                    </div>

                    <h1
                      className="
                        text-4xl
                        md:text-6xl
                        font-black
                        text-white
                        leading-tight
                      "
                    >
                      Welcome Back,
                      <br />

                      <span className="text-blue-200">
                        {user?.name}
                      </span>

                    </h1>

                    <p
                      className="
                        mt-6
                        text-lg
                        md:text-xl
                        text-blue-100
                        leading-relaxed
                        max-w-2xl
                      "
                    >
                      Manage assigned tasks,
                      monitor productivity,
                      update work progress,
                      and track employee
                      performance efficiently.
                    </p>

                    {/* BUTTONS */}

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-4
                        mt-8
                      "
                    >

                      <button
                        onClick={() =>
                          setActiveSection(
                            "tasks"
                          )
                        }
                        className="
                          bg-white
                          text-blue-700
                          px-6
                          py-3
                          rounded-2xl
                          font-semibold
                          shadow-lg
                          hover:scale-105
                          transition
                        "
                      >
                        View Tasks
                      </button>

                      <button
                        onClick={() =>
                          setActiveSection(
                            "performance"
                          )
                        }
                        className="
                          bg-white/10
                          backdrop-blur-md
                          border
                          border-white/20
                          text-white
                          px-6
                          py-3
                          rounded-2xl
                          font-semibold
                          hover:bg-white/20
                          transition
                        "
                      >
                        Track Performance
                      </button>

                    </div>

                  </div>

                  {/* RIGHT CARD */}

                  <div
                    className="
                      bg-white/10
                      backdrop-blur-xl
                      border
                      border-white/20
                      rounded-[32px]
                      p-8
                      min-w-[320px]
                      shadow-2xl
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-5
                      "
                    >

                      {/* AVATAR */}

                      <div
                        className="
                          w-24
                          h-24
                          rounded-3xl
                          bg-white/20
                          border
                          border-white/30
                          flex
                          items-center
                          justify-center
                          text-4xl
                          font-black
                          text-white
                        "
                      >

                        {user?.name
                          ?.charAt(0)
                          ?.toUpperCase()}

                      </div>

                      {/* INFO */}

                      <div>

                        <h2
                          className="
                            text-2xl
                            font-bold
                            text-white
                          "
                        >
                          {user?.name}
                        </h2>

                        <p
                          className="
                            text-blue-100
                            mt-2
                          "
                        >
                          Employee
                        </p>

                        <div
                          className="
                            mt-4
                            inline-flex
                            items-center
                            gap-2
                            bg-emerald-500/20
                            border
                            border-emerald-300/20
                            text-emerald-100
                            px-4
                            py-2
                            rounded-full
                            text-sm
                          "
                        >
                          Active Employee
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* STATS */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  xl:grid-cols-4
                  gap-6
                "
              >

                {/* TOTAL TASKS */}

                <div
                  className="
                    relative
                    overflow-hidden
                    bg-gradient-to-br
                    from-blue-600
                    to-indigo-700
                    rounded-[32px]
                    p-7
                    text-white
                    shadow-xl
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      w-32
                      h-32
                      bg-white/10
                      rounded-full
                      blur-2xl
                    "
                  />

                  <p className="text-blue-100">
                    Total Tasks
                  </p>

                  <h2
                    className="
                      text-6xl
                      font-black
                      mt-5
                    "
                  >
                    {tasks.length}
                  </h2>

                </div>

                {/* COMPLETED */}

                <div
                  className="
                    relative
                    overflow-hidden
                    bg-gradient-to-br
                    from-emerald-500
                    to-green-700
                    rounded-[32px]
                    p-7
                    text-white
                    shadow-xl
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      w-32
                      h-32
                      bg-white/10
                      rounded-full
                      blur-2xl
                    "
                  />

                  <p className="text-green-100">
                    Completed
                  </p>

                  <h2
                    className="
                      text-6xl
                      font-black
                      mt-5
                    "
                  >
                    {completedTasks}
                  </h2>

                </div>

                {/* IN PROGRESS */}

                <div
                  className="
                    relative
                    overflow-hidden
                    bg-gradient-to-br
                    from-yellow-500
                    to-orange-600
                    rounded-[32px]
                    p-7
                    text-white
                    shadow-xl
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      w-32
                      h-32
                      bg-white/10
                      rounded-full
                      blur-2xl
                    "
                  />

                  <p className="text-yellow-100">
                    In Progress
                  </p>

                  <h2
                    className="
                      text-6xl
                      font-black
                      mt-5
                    "
                  >
                    {progressTasks}
                  </h2>

                </div>

                {/* PENDING */}

                <div
                  className="
                    relative
                    overflow-hidden
                    bg-gradient-to-br
                    from-red-500
                    to-pink-700
                    rounded-[32px]
                    p-7
                    text-white
                    shadow-xl
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      w-32
                      h-32
                      bg-white/10
                      rounded-full
                      blur-2xl
                    "
                  />

                  <p className="text-red-100">
                    Pending
                  </p>

                  <h2
                    className="
                      text-6xl
                      font-black
                      mt-5
                    "
                  >
                    {pendingTasks}
                  </h2>

                </div>

              </div>

            </div>
          )}



          {/* MY TASKS */}

          {activeSection ===
            "tasks" && (

            <TaskList
              tasks={tasks}
            />
          )}

          {/* PERFORMANCE */}

          {activeSection ===
            "performance" && (        
          <PerformanceTracker
            tasks={tasks}
            updateTaskStatus={
              handleTaskStatus
            }
          />


          )}

          {/* PROFILE */}

          {activeSection ===
            "profile" && (

            <EmployeeProfile />
          )}

        </main>

      </div>
    );
};

export default EmployeeDashboard;

