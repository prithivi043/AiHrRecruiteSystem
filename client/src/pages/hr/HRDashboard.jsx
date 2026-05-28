
import DashboardLoader from "../../components/common/DashboardLoader";



import {
  useEffect,
  useState,
} from "react";



// ========================================
// API
// ========================================


import {
  getCandidates,
  getSkillAnalysis,
  updateApplicationStatus,
  getInterviews,
  getEmployees,
} from "../../api/hrApi";



// ========================================
// COMPONENTS
// ========================================

import JobForm from "../../components/hr/JobForm";

import CandidateList from "../../components/hr/CandidateList";

import InterviewForm from "../../components/hr/InterviewForm";

import SkillAnalysisCard from "../../components/hr/SkillAnalysisCard";

import AssignTaskForm from "../../components/hr/AssignTaskForm";


import PerformanceTracker from "../../components/employee/PerformanceTracker";



// ========================================
// SERVICES
// ========================================

import {
  getUser,
  logout,
} from "../../services/authService";

// ========================================
// ICONS
// ========================================

import {
  FaUsers,
  FaChevronDown,
  FaBriefcase,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";

// ========================================
// HR DASHBOARD
// ========================================

const HRDashboard = () => {

  // ========================================
  // STATES
  // ========================================

  const [candidates, setCandidates] =
    useState([]);

  const [analysis, setAnalysis] =
    useState([]);

  const [interviews, setInterviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const [
    openDropdown,
    setOpenDropdown,
  ] = useState(null);



  const [activeSection,
    setActiveSection] =
    useState("overview");

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  const user = getUser();

  const [employees,
  setEmployees] =
  useState([]);

  



  // ========================================
  // UPDATE STATUS
  // ========================================

  const handleStatusUpdate =
    async (
      id,
      status
    ) => {

      try {

        await updateApplicationStatus(
          id,
          status
        );

        fetchData();

      } catch (error) {

        console.log(error);
      }
    };

  // ========================================
  // FETCH DATA
  // ========================================

  const fetchData =
    async () => {

      try {

        setLoading(true);

        const employeeResponse =
       await getEmployees();

        const candidateResponse =
          await getCandidates();

        const analysisResponse =
          await getSkillAnalysis();

        const interviewResponse =
          await getInterviews();

        setEmployees(
        employeeResponse
        );

        setCandidates(
          candidateResponse
        );

        setAnalysis(
          analysisResponse
        );

        setInterviews(
          interviewResponse
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // ========================================

  useEffect(() => {

    fetchData();

  }, []);

  // ========================================

  if (loading) {

  return (

    <DashboardLoader

      title="Loading HR Dashboard"

      subtitle="
        Fetching recruitment analytics,
        candidates,
        employee performance,
        and interview schedules...
      "
    />
  );
}

  // ========================================
  // SIDEBAR MENU
  // ========================================


    const menuItems = [

      {
        id: "overview",
        title: "Overview",
        icon: <FaChartLine />,
      },

      {
        id: "jobs",
        title: "Post Job",
        icon: <FaBriefcase />,
      },

      {
        id: "analysis",
        title: "AI Analysis",
        icon: <FaClipboardList />,
      },

      {
        id: "interviews",
        title: "Interviews",
        icon: <FaCalendarAlt />,
      },

      {
        id: "candidates",
        title: "Candidates",
        icon: <FaUsers />,
      },
      // ========================================
      // EMPLOYEE DROPDOWN
      // ========================================

      {
        id: "employee",
        title: "Employee",
        icon: <FaUsers />,

        subMenu: [

          {
            id: "tasks",
            title: "Assign Task",
          },
          { 
            id: "performance",
             title: "Track Performance",
          },
        ],
      },

    ];



  // ========================================

  return (

    <div
      className="
        min-h-screen
        flex
        bg-gray-100
      "
    >

      {/* ======================================== */}
      {/* MOBILE OVERLAY */}
      {/* ======================================== */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
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

      {/* ======================================== */}
      {/* SIDEBAR */}
      {/* ======================================== */}

      <div
        className={`
          fixed
          lg:static
          top-0
          left-0
          h-full
          w-72
          bg-white
          shadow-xl
          z-50
          transition-transform
          duration-300

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
              HR Dashboard
            </h1>

            <p className="text-gray-500 text-sm">
              Recruitment System
            </p>

          </div>

          {/* MOBILE CLOSE */}

          <button
            onClick={() =>
              setSidebarOpen(false)
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
            p-5
            border-b
            bg-gray-50
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* AVATAR */}

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-700
                text-white
                flex
                items-center
                justify-center
                text-xl
                font-bold
                shadow-md
                shrink-0
              "
            >
              {user?.name
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

            {/* INFO */}

            <div className="min-w-0">

              <h3
                className="
                  font-bold
                  text-gray-800
                  text-lg
                  truncate
                "
              >
                {user?.name}
              </h3>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                HR Manager
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-2
                "
              >

                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-green-500
                  "
                />

                <span
                  className="
                    text-xs
                    text-green-600
                    font-medium
                  "
                >
                  Active
                </span>

              </div>

            </div>

          </div>

        </div>



       
      {/* MENU */}

      <div className="p-4 space-y-3">

        {menuItems.map(
          (item) => (

            <div key={item.id}>

              {/* NORMAL MENU */}

              {!item.subMenu && (

                <button
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
                    transition

                    ${
                      activeSection ===
                      item.id

                        ? "bg-blue-600 text-white"

                        : "hover:bg-gray-100"
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
              )}

           
          {/* DROPDOWN */}

          {item.subMenu && (

            <div
              className="
                rounded-3xl
                overflow-hidden
                bg-white
                border
                border-gray-100
                shadow-sm
              "
            >

              {/* PARENT */}

              <button
                onClick={() =>
                  setOpenDropdown(

                    openDropdown ===
                    item.id

                      ? null

                      : item.id
                  )
                }
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  px-5
                  py-4
                  hover:bg-gray-50
                  transition
                "
              >

                {/* LEFT */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      w-11
                      h-11
                      rounded-2xl
                      bg-gradient-to-br
                      from-blue-500
                      to-indigo-600
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-md
                    "
                  >
                    {item.icon}
                  </div>

                  <div className="text-left">

                    <h3
                      className="
                        font-semibold
                        text-gray-800
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        mt-1
                      "
                    >
                      Employee management
                    </p>

                  </div>

                </div>

                {/* ARROW */}

                <div
                  className={`
                    transition-transform
                    duration-300

                    ${
                      openDropdown ===
                      item.id

                        ? "rotate-180"

                        : ""
                    }
                  `}
                >

                  <FaChevronDown
                    className="
                      text-gray-400
                    "
                  />

                </div>

              </button>

              {/* SUB MENU */}

              <div
                className={`
                  transition-all
                  duration-300
                  overflow-hidden

                  ${
                    openDropdown ===
                    item.id

                      ? "max-h-96 p-3 pt-0"

                      : "max-h-0"
                  }
                `}
              >

                <div
                  className="
                    space-y-2
                    border-t
                    pt-3
                  "
                >

                  {item.subMenu.map(
                    (sub) => (

                      <button
                        key={sub.id}

                        onClick={() => {

                          setActiveSection(
                            sub.id
                          );

                          setSidebarOpen(
                            false
                          );
                        }}

                        className={`
                          w-full
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          rounded-2xl
                          transition-all
                          duration-200

                          ${
                            activeSection ===
                            sub.id

                              ? `
                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-700
                                text-white
                                shadow-md
                              `

                              : `
                                hover:bg-gray-100
                                text-gray-700
                              `
                          }
                        `}
                      >

                        {/* DOT */}

                        <div
                          className={`
                            w-2
                            h-2
                            rounded-full

                            ${
                              activeSection ===
                              sub.id

                                ? "bg-white"

                                : "bg-blue-500"
                            }
                          `}
                        />

                        <span className="font-medium">
                          {sub.title}
                        </span>

                      </button>
                    )
                  )}

                </div>

              </div>

            </div>
          )}


            </div>
          )
        )}

      </div>



        {/* LOGOUT */}

        <div className="p-4 mt-auto">

          <button
            onClick={logout}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              text-white
              py-4
              rounded-2xl
              flex
              items-center
              justify-center
              gap-3
            "
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

      {/* ======================================== */}
      {/* MAIN CONTENT */}
      {/* ======================================== */}

      <div className="flex-1">

        {/* TOPBAR */}

        <div
          className="
            bg-white
            shadow-sm
            p-5
            flex
            items-center
            justify-between
          "
        >

          {/* MOBILE MENU */}

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              lg:hidden
              text-2xl
            "
          >
            <FaBars />
          </button>

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            {menuItems.find(
              (item) =>
                item.id ===
                activeSection
            )?.title}
          </h2>

        </div>

        {/* CONTENT */}

        <div className="p-6">

         {/* OVERVIEW */}

            {activeSection ===
            "overview" && (

            <div className="space-y-8">

                {/* TOP WELCOME */}

                <div
                className="
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-700
                    text-white
                    p-8
                    rounded-3xl
                    shadow-lg
                "
                >

                <h1
                    className="
                    text-4xl
                    font-bold
                    mb-3
                    "
                >
                    Welcome Back,
                    {user?.name}
                </h1>

                <p
                    className="
                    text-blue-100
                    text-lg
                    "
                >
                    AI Recruitment &
                    Employee Management Dashboard
                </p>

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

                {/* CANDIDATES */}

                <div
                    className="
                    bg-white
                    p-6
                    rounded-3xl
                    shadow-md
                    hover:shadow-xl
                    transition
                    border
                    border-gray-100
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

                        <p
                        className="
                            text-gray-500
                            font-medium
                        "
                        >
                        Total Candidates
                        </p>

                        <h2
                        className="
                            text-5xl
                            font-bold
                            mt-4
                            text-gray-800
                        "
                        >
                        {candidates.length}
                        </h2>

                    </div>

                    <div
                        className="
                        bg-blue-100
                        text-blue-600
                        p-5
                        rounded-2xl
                        text-3xl
                        "
                    >

                        <FaUsers />

                    </div>

                    </div>

                </div>

                {/* AI ANALYSIS */}

                <div
                    className="
                    bg-white
                    p-6
                    rounded-3xl
                    shadow-md
                    hover:shadow-xl
                    transition
                    border
                    border-gray-100
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

                        <p
                        className="
                            text-gray-500
                            font-medium
                        "
                        >
                        AI Analysis
                        </p>

                        <h2
                        className="
                            text-5xl
                            font-bold
                            mt-4
                            text-purple-600
                        "
                        >
                        {analysis.length}
                        </h2>

                    </div>

                    <div
                        className="
                        bg-purple-100
                        text-purple-600
                        p-5
                        rounded-2xl
                        text-3xl
                        "
                    >

                        <FaChartLine />

                    </div>

                    </div>

                </div>

                {/* INTERVIEWS */}

                <div
                    className="
                    bg-white
                    p-6
                    rounded-3xl
                    shadow-md
                    hover:shadow-xl
                    transition
                    border
                    border-gray-100
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

                        <p
                        className="
                            text-gray-500
                            font-medium
                        "
                        >
                        Interviews
                        </p>

                        <h2
                        className="
                            text-5xl
                            font-bold
                            mt-4
                            text-green-600
                        "
                        >
                        {interviews.length}
                        </h2>

                    </div>

                    <div
                        className="
                        bg-green-100
                        text-green-600
                        p-5
                        rounded-2xl
                        text-3xl
                        "
                    >

                        <FaCalendarAlt />

                    </div>

                    </div>

                </div>

                {/* SHORTLISTED */}

                <div
                    className="
                    bg-white
                    p-6
                    rounded-3xl
                    shadow-md
                    hover:shadow-xl
                    transition
                    border
                    border-gray-100
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

                        <p
                        className="
                            text-gray-500
                            font-medium
                        "
                        >
                        Shortlisted
                        </p>

                        <h2
                        className="
                            text-5xl
                            font-bold
                            mt-4
                            text-orange-500
                        "
                        >
                        {
                            analysis.filter(
                            (
                                item
                            ) =>
                                item.status ===
                                "shortlisted"
                            ).length
                        }
                        </h2>

                    </div>

                    <div
                        className="
                        bg-orange-100
                        text-orange-500
                        p-5
                        rounded-2xl
                        text-3xl
                        "
                    >

                        <FaBriefcase />

                    </div>

                    </div>

                </div>

                </div>

                {/* QUICK SUMMARY */}

                <div
                className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-6
                "
                >

                {/* RECENT ACTIVITY */}

                <div
                    className="
                    bg-white
                    rounded-3xl
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
                    Recent Activity
                    </h2>

                    <div className="space-y-4">

                    {analysis
                        .slice(0, 3)
                        .map(
                        (
                            item,
                            index
                        ) => (

                            <div
                            key={index}
                            className="
                                flex
                                items-center
                                justify-between
                                bg-gray-50
                                p-4
                                rounded-2xl
                            "
                            >

                            <div>

                                <h3 className="font-bold">
                                {
                                    item.candidate
                                }
                                </h3>

                                <p
                                className="
                                    text-sm
                                    text-gray-500
                                "
                                >
                                {
                                    item.jobTitle
                                }
                                </p>

                            </div>

                            <div
                                className="
                                text-green-600
                                font-bold
                                text-xl
                                "
                            >
                                {item.score}%
                            </div>

                            </div>
                        )
                        )}

                    </div>

                </div>

                {/* UPCOMING INTERVIEWS */}

                <div
                    className="
                    bg-white
                    rounded-3xl
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
                    Upcoming Interviews
                    </h2>

                    <div className="space-y-4">

                    {interviews.length ===
                    0 ? (

                        <p className="text-gray-500">
                        No interviews scheduled
                        </p>

                    ) : (

                        interviews
                        .slice(0, 3)
                        .map(
                            (
                            item,
                            index
                            ) => (

                            <div
                                key={index}
                                className="
                                bg-gray-50
                                p-4
                                rounded-2xl
                                "
                            >

                                <h3 className="font-bold">
                                {
                                    item.candidateName
                                }
                                </h3>

                                <p className="text-sm text-gray-500">
                                {
                                    item.jobTitle
                                }
                                </p>

                                <div
                                className="
                                    mt-2
                                    flex
                                    justify-between
                                    text-sm
                                "
                                >

                                <span>
                                    {item.date}
                                </span>

                                <span>
                                    {item.time}
                                </span>

                                </div>

                            </div>
                            )
                        )
                    )}

                    </div>

                </div>

                </div>

            </div>
            )}

          {/* JOBS */}

          {activeSection ===
            "jobs" && (

            <JobForm />

          )}

          {/* ANALYSIS */}

          {activeSection ===
            "analysis" && (

            <SkillAnalysisCard
              analysis={analysis}
            />

          )}

          {/* INTERVIEWS */}

            {activeSection ===
            "interviews" && (

            <div className="space-y-6">

                {/* FORM */}

                <InterviewForm
                analysis={analysis}
                />

                {/* INTERVIEW LIST */}

                <div
                className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-lg
                "
                >

                {/* HEADER */}

                <div
                    className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                    mb-8
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
                        Scheduled Interviews
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage upcoming candidate interviews
                    </p>

                    </div>

                    <div
                    className="
                        bg-blue-100
                        text-blue-700
                        px-5
                        py-3
                        rounded-2xl
                        font-semibold
                    "
                    >
                    Total:
                    {" "}
                    {interviews.length}
                    </div>

                </div>

                {/* EMPTY */}

                {interviews.length ===
                    0 && (

                    <div
                    className="
                        text-center
                        py-20
                    "
                    >

                    <div
                        className="
                        text-6xl
                        mb-5
                        "
                    >
                        📅
                    </div>

                    <h2
                        className="
                        text-2xl
                        font-bold
                        text-gray-700
                        "
                    >
                        No Interviews Scheduled
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Scheduled interviews will appear here
                    </p>

                    </div>
                )}

                {/* INTERVIEW CARDS */}

                <div className="space-y-6">

                    {interviews.map(
                    (item) => (

                        <div
                        key={item._id}
                        className="
                            bg-gradient-to-r
                            from-white
                            to-blue-50
                            border
                            border-gray-200
                            rounded-3xl
                            p-6
                            hover:shadow-xl
                            transition
                        "
                        >

                        {/* TOP */}

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

                            <div
                            className="
                                flex
                                items-start
                                gap-5
                            "
                            >

                            {/* AVATAR */}

                            <div
                                className="
                                w-16
                                h-16
                                rounded-2xl
                                bg-blue-600
                                text-white
                                flex
                                items-center
                                justify-center
                                text-2xl
                                font-bold
                                shadow-md
                                "
                            >

                                {
                                item.candidateName
                                    ?.charAt(0)
                                    ?.toUpperCase()
                                }

                            </div>

                            {/* INFO */}

                            <div>

                                <h2
                                className="
                                    text-2xl
                                    font-bold
                                    text-gray-800
                                "
                                >
                                {
                                    item.candidateName
                                }
                                </h2>

                                <p className="text-gray-500">
                                {item.email}
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
                                    bg-blue-100
                                    text-blue-700
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-sm
                                    font-semibold
                                    "
                                >
                                    {
                                    item.jobTitle
                                    }
                                </span>

                                <span
                                    className="
                                    bg-green-100
                                    text-green-700
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-sm
                                    font-semibold
                                    "
                                >
                                    {
                                    item.department
                                    }
                                </span>

                                </div>

                            </div>

                            </div>

                            {/* SCORE */}

                            <div
                            className="
                                text-center
                                bg-white
                                shadow-md
                                rounded-3xl
                                px-8
                                py-5
                                min-w-[180px]
                            "
                            >

                            <p className="text-gray-500">
                                Match Score
                            </p>

                            <h2
                                className="
                                text-5xl
                                font-bold
                                text-green-600
                                "
                            >
                                {item.score}%
                            </h2>

                            </div>

                        </div>

                        {/* DETAILS */}

                        <div
                            className="
                            grid
                            md:grid-cols-2
                            xl:grid-cols-4
                            gap-5
                            mt-8
                            "
                        >

                            {/* DATE */}

                            <div
                            className="
                                bg-white
                                rounded-2xl
                                p-5
                                shadow-sm
                            "
                            >

                            <p className="text-gray-500 text-sm">
                                Interview Date
                            </p>

                            <h3
                                className="
                                text-xl
                                font-bold
                                mt-2
                                "
                            >
                                {item.date}
                            </h3>

                            </div>

                            {/* TIME */}

                            <div
                            className="
                                bg-white
                                rounded-2xl
                                p-5
                                shadow-sm
                            "
                            >

                            <p className="text-gray-500 text-sm">
                                Interview Time
                            </p>

                            <h3
                                className="
                                text-xl
                                font-bold
                                mt-2
                                "
                            >
                                {item.time}
                            </h3>

                            </div>

                            {/* MODE */}

                            <div
                            className="
                                bg-white
                                rounded-2xl
                                p-5
                                shadow-sm
                            "
                            >

                            <p className="text-gray-500 text-sm">
                                Interview Mode
                            </p>

                            <h3
                                className="
                                text-xl
                                font-bold
                                mt-2
                                "
                            >
                                {item.mode}
                            </h3>

                            </div>

                            {/* STATUS */}

                            <div
                            className="
                                bg-white
                                rounded-2xl
                                p-5
                                shadow-sm
                            "
                            >

                            <p className="text-gray-500 text-sm">
                                Status
                            </p>

                            <div className="mt-3">

                                <span
                                className="
                                    bg-green-100
                                    text-green-700
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-sm
                                    font-semibold
                                "
                                >
                                Scheduled
                                </span>

                            </div>

                            </div>

                        </div>

                        {/* FOOTER */}

                        <div
                            className="
                            mt-8
                            bg-white
                            rounded-2xl
                            p-5
                            border
                            "
                        >

                            <div
                            className="
                                grid
                                md:grid-cols-2
                                gap-4
                                text-sm
                            "
                            >

                            <p>
                                <span className="font-bold">
                                Application ID:
                                </span>
                                {" "}
                                {
                                item.applicationId
                                }
                            </p>

                            <p>
                                <span className="font-bold">
                                Candidate ID:
                                </span>
                                {" "}
                                {
                                item.candidateId
                                }
                            </p>

                            <p>
                                <span className="font-bold">
                                Job ID:
                                </span>
                                {" "}
                                {
                                item.jobId
                                }
                            </p>

                            <p>
                                <span className="font-bold">
                                HR Recommendation:
                                </span>
                                {" "}
                                Strong Candidate
                            </p>

                            </div>

                        </div>

                        </div>
                    )
                    )}

                </div>

                </div>

            </div>
            )}

          {/* CANDIDATES */}

          {activeSection ===
            "candidates" && (

            <CandidateList
              candidates={candidates}
              updateStatus={
                handleStatusUpdate
              }
            />

          )}

          {/* ===================================== */}
          {/* Employee Work */}
          {/* ===================================== */}
        
          {/* ===================================== */}
          {/* ASSIGN TASK FORM */}
          {/* ===================================== */}

          {activeSection ===
            "tasks" && (

            <div className="space-y-6">

              {/* HERO */}

              <div
                className="
                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-700
                  to-purple-700
                  rounded-[32px]
                  p-8
                  text-white
                  shadow-xl
                "
              >

                <h1
                  className="
                    text-4xl
                    font-extrabold
                  "
                >
                  Employee Task Assignment
                </h1>

                <p
                  className="
                    mt-4
                    text-blue-100
                    text-lg
                    max-w-2xl
                  "
                >
                  Assign tasks to employees,
                  manage work distribution,
                  and monitor productivity
                  efficiently.
                </p>

              </div>

              {/* FORM */}

              <AssignTaskForm
                employees={employees}
              />

            </div>
          )}


          {/* ===================================== */}
          {/* PERFORMANCE TRACKING */}
          {/* ===================================== */}

          {activeSection ===
            "performance" && (

            <div className="space-y-6">

              {/* HERO */}

              <div
                className="
                  bg-gradient-to-r
                  from-emerald-600
                  via-green-600
                  to-teal-700
                  rounded-[32px]
                  p-8
                  text-white
                  shadow-xl
                "
              >

                <h1
                  className="
                    text-4xl
                    font-extrabold
                  "
                >
                  Employee Performance
                </h1>

                <p
                  className="
                    mt-4
                    text-green-100
                    text-lg
                    max-w-2xl
                  "
                >
                  Monitor employee
                  productivity, task
                  completion, and
                  work efficiency
                  in real-time.
                </p>

              </div>

              {/* TRACKER */}

              <PerformanceTracker
                tasks={[]}
              />

            </div>
          )}







        </div>

      </div>

    </div>
  );
};

export default HRDashboard;