
import DashboardLoader from "../../components/common/DashboardLoader";


import {
  useEffect,
  useState,
} from "react";

// ========================================
// API
// ========================================

import {
  getJobs,
  getApplications,
} from "../../api/candidateApi";

// ========================================
// COMPONENTS
// ========================================

import JobCard from "../../components/candidate/JobCard";

import ApplicationStatus from "../../components/candidate/ApplicationStatus";

// ========================================
// PROFILE PAGE
// ========================================

import ProfileSettings from "./ProfileSettings";

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
  FaBriefcase,
  FaClipboardList,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";

// ========================================
// CANDIDATE DASHBOARD
// ========================================

const CandidateDashboard =
  () => {

    // ========================================
    // STATES
    // ========================================

    const [jobs, setJobs] =
      useState([]);

    const [
      applications,
      setApplications,
    ] = useState([]);

    const [loading, setLoading] =
      useState(true);

    const [activeSection,
      setActiveSection] =
      useState("overview");

    const [sidebarOpen,
      setSidebarOpen] =
      useState(false);

    // ========================================
    // LIVE USER STATE
    // ========================================

    const [user, setUser] =
      useState(getUser());

    // ========================================
    // FETCH DATA
    // ========================================

    const fetchData =
      async () => {

        try {

          setLoading(true);

          const jobsData =
            await getJobs();

          const applicationsData =
            await getApplications();

          setJobs(jobsData);

          setApplications(
            applicationsData
          );

          // GET UPDATED USER

          const updatedUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          setUser(updatedUser);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    // ========================================

    useEffect(() => {

      fetchData();

      // ========================================
      // LIVE USER UPDATE
      // ========================================

      const handleStorageChange =
        () => {

          const updatedUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          setUser(updatedUser);
        };

      window.addEventListener(
        "storage",
        handleStorageChange
      );

      // CUSTOM EVENT

      window.addEventListener(
        "userUpdated",
        handleStorageChange
      );

      return () => {

        window.removeEventListener(
          "storage",
          handleStorageChange
        );

        window.removeEventListener(
          "userUpdated",
          handleStorageChange
        );
      };

    }, []);



    // ========================================

    if (loading) {

  return (

    <DashboardLoader

      title="Loading Candidate Dashboard"

      subtitle="
        Preparing applications,
        fetching jobs,
        and syncing interview updates...
      "
    />
  );
}

    // ========================================
    // MENU
    // ========================================

    const menuItems = [

      {
        id: "overview",
        title: "Overview",
        icon: <FaChartLine />,
      },

      {
        id: "jobs",
        title: "Available Jobs",
        icon: <FaBriefcase />,
      },

      {
        id: "applications",
        title: "Application Status",
        icon: <FaClipboardList />,
      },

      {
        id: "profile",
        title: "Profile",
        icon: <FaUser />,
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

        {/* MOBILE OVERLAY */}

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

        {/* SIDEBAR */}

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
                px-6
                py-5
                border-b
                bg-white
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
                    text-gray-800
                  "
                >
                  Candidate Panel
                </h1>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  AI Recruitment Portal
                </p>

              </div>

              <button
                onClick={() =>
                  setSidebarOpen(false)
                }
                className="
                  lg:hidden
                  w-10
                  h-10
                  rounded-xl
                  hover:bg-gray-100
                  flex
                  items-center
                  justify-center
                  transition
                "
              >
                <FaTimes className="text-lg" />
              </button>

            </div>


            {/* USER PROFILE */}

            <div
              className="
                relative
                px-6
                py-7
                border-b
                bg-white
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
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-indigo-700
                    text-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                    shadow-lg
                  "
                >
                  {user?.name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                {/* INFO */}

                <div className="flex-1">

                  <h3
                    className="
                      font-bold
                      text-lg
                      text-gray-800
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
                    {user?.designation ||
                      "Candidate"}
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
                      Active Profile
                    </span>

                  </div>

                </div>

              </div>

             

            </div>



          {/* MENU */}

          <div className="p-4 space-y-3">

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

        {/* MAIN CONTENT */}

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
              {
                menuItems.find(
                  (item) =>
                    item.id ===
                    activeSection
                )?.title
              }
            </h2>

          </div>

          {/* CONTENT */}

          <div className="p-6">

           
          {/* OVERVIEW */}

          {activeSection ===
            "overview" && (

            <div
              className="
                space-y-6
                md:space-y-8
              "
            >

              {/* HERO */}

              <div
                className="
                  bg-gradient-to-br
                  from-blue-700
                  via-indigo-700
                  to-purple-800
                  rounded-[28px]
                  md:rounded-[36px]
                  p-5
                  sm:p-7
                  md:p-10
                  text-white
                  shadow-2xl
                  overflow-hidden
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    xl:flex-row
                    xl:justify-between
                    gap-8
                  "
                >

                  {/* LEFT */}

                  <div className="flex-1">

                    <p
                      className="
                        uppercase
                        tracking-[3px]
                        md:tracking-[5px]
                        text-blue-200
                        text-[10px]
                        sm:text-xs
                      "
                    >
                      AI Recruitment Platform
                    </p>

                    <h1
                      className="
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        font-extrabold
                        mt-4
                        md:mt-6
                        leading-tight
                        break-words
                      "
                    >
                      Welcome Back,

                      <br />

                      <span
                        className="
                          text-yellow-300
                          break-words
                        "
                      >
                        {user?.name}
                      </span>

                    </h1>

                    <p
                      className="
                        mt-4
                        md:mt-6
                        text-sm
                        sm:text-base
                        md:text-lg
                        text-blue-100
                        leading-relaxed
                        max-w-2xl
                      "
                    >
                      Explore opportunities,
                      manage applications,
                      and build your AI-powered
                      career profile.
                    </p>

                    {/* BUTTONS */}

                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-4
                        mt-6
                      "
                    >

                      <button
                        onClick={() =>
                          setActiveSection(
                            "jobs"
                          )
                        }
                        className="
                          w-full
                          sm:w-auto
                          bg-white
                          text-blue-700
                          px-6
                          py-3
                          rounded-2xl
                          font-semibold
                          hover:scale-[1.02]
                          transition
                        "
                      >
                        Explore Jobs
                      </button>

                      <button
                        onClick={() =>
                          setActiveSection(
                            "applications"
                          )
                        }
                        className="
                          w-full
                          sm:w-auto
                          bg-white/10
                          border
                          border-white/20
                          px-6
                          py-3
                          rounded-2xl
                          font-semibold
                          backdrop-blur-md
                          hover:bg-white/20
                          transition
                        "
                      >
                        View Applications
                      </button>

                    </div>

                  </div>

                  {/* RIGHT PROFILE */}

                  <div
                    className="
                      w-full
                      xl:w-[360px]
                      bg-white/10
                      backdrop-blur-xl
                      rounded-[24px]
                      md:rounded-[30px]
                      p-5
                      md:p-7
                      border
                      border-white/20
                    "
                  >

                    {/* TOP */}

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                        mb-6
                      "
                    >

                      {/* AVATAR */}

                      <div
                        className="
                          w-16
                          h-16
                          sm:w-20
                          sm:h-20
                          rounded-full
                          bg-white/20
                          flex
                          items-center
                          justify-center
                          text-2xl
                          sm:text-3xl
                          font-bold
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
                            text-xl
                            sm:text-2xl
                            font-bold
                            truncate
                          "
                        >
                          {user?.name}
                        </h3>

                        <p
                          className="
                            text-blue-100
                            text-sm
                            sm:text-base
                          "
                        >
                          {user?.designation ||
                            "Candidate"}
                        </p>

                        <p
                          className="
                            text-blue-200
                            text-xs
                            sm:text-sm
                            mt-1
                            break-all
                          "
                        >
                          {user?.email}
                        </p>

                      </div>

                    </div>

                    {/* DETAILS */}

                    <div className="space-y-4">

                      <div
                        className="
                          flex
                          justify-between
                          items-start
                          gap-4
                          text-sm
                          sm:text-base
                        "
                      >

                        <span className="text-blue-100">
                          Phone
                        </span>

                        <span
                          className="
                            font-semibold
                            text-right
                            break-all
                          "
                        >
                          {user?.phone ||
                            "Not Added"}
                        </span>

                      </div>

                      <div
                        className="
                          flex
                          justify-between
                          items-start
                          gap-4
                          text-sm
                          sm:text-base
                        "
                      >

                        <span className="text-blue-100">
                          Experience
                        </span>

                        <span
                          className="
                            font-semibold
                            text-right
                          "
                        >
                          {user?.experience ||
                            "Not Added"}
                        </span>

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
                  gap-5
                "
              >

                {[
                  {
                    title:
                      "Available Jobs",

                    value:
                      jobs.length,

                    color:
                      "text-blue-600",
                  },

                  {
                    title:
                      "Applications",

                    value:
                      applications.length,

                    color:
                      "text-purple-600",
                  },

                  {
                    title:
                      "Shortlisted",

                    value:
                      applications.filter(
                        (
                          item
                        ) =>
                          item.status ===
                          "shortlisted"
                      ).length,

                    color:
                      "text-green-600",
                  },

                  {
                    title:
                      "Rejected",

                    value:
                      applications.filter(
                        (
                          item
                        ) =>
                          item.status ===
                          "rejected"
                      ).length,

                    color:
                      "text-red-500",
                  },
                ].map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        bg-white
                        rounded-[24px]
                        p-5
                        md:p-7
                        shadow-md
                      "
                    >

                      <p
                        className="
                          text-gray-500
                          text-sm
                        "
                      >
                        {item.title}
                      </p>

                      <h2
                        className={`
                          text-4xl
                          md:text-5xl
                          font-bold
                          mt-4
                          ${item.color}
                        `}
                      >
                        {item.value}
                      </h2>

                    </div>
                  )
                )}

              </div>

              {/* PROFILE DETAILS */}

              <div
                className="
                  grid
                  lg:grid-cols-2
                  gap-6
                "
              >

                {/* BIO */}

                <div
                  className="
                    bg-white
                    rounded-[24px]
                    md:rounded-[30px]
                    p-6
                    md:p-8
                    shadow-md
                  "
                >

                  <h3
                    className="
                      text-xl
                      md:text-2xl
                      font-bold
                      mb-4
                    "
                  >
                    Professional Bio
                  </h3>

                  <p
                    className="
                      text-gray-600
                      text-sm
                      md:text-base
                      leading-relaxed
                    "
                  >
                    {user?.bio ||
                      "No bio added yet."}
                  </p>

                </div>

                {/* SKILLS */}

                <div
                  className="
                    bg-white
                    rounded-[24px]
                    md:rounded-[30px]
                    p-6
                    md:p-8
                    shadow-md
                  "
                >

                  <h3
                    className="
                      text-xl
                      md:text-2xl
                      font-bold
                      mb-5
                    "
                  >
                    Skills
                  </h3>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-3
                    "
                  >

                    {user?.skills
                      ?.length > 0 ? (

                      user.skills.map(
                        (
                          skill,
                          index
                        ) => (

                          <span
                            key={index}
                            className="
                              bg-gradient-to-r
                              from-blue-500
                              to-indigo-600
                              text-white
                              px-4
                              py-2
                              rounded-full
                              text-sm
                              break-words
                            "
                          >
                            {skill}
                          </span>
                        )
                      )

                    ) : (

                      <p className="text-gray-500">
                        No skills added.
                      </p>
                    )}

                  </div>

                </div>

              </div>

            </div>
          )}



          
          {/* JOBS */}

          {activeSection ===
            "jobs" && (

            <div className="space-y-6">

              {/* HEADER */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      md:text-3xl
                      font-bold
                      text-gray-800
                    "
                  >
                    Available Jobs
                  </h2>

                  <p
                    className="
                      text-gray-500
                      mt-1
                      text-sm
                      md:text-base
                    "
                  >
                    Explore and apply for
                    new career opportunities
                  </p>

                </div>

                {/* JOB COUNT */}

                <div
                  className="
                    bg-white
                    shadow-sm
                    border
                    px-5
                    py-3
                    rounded-2xl
                    w-fit
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Total Jobs
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-blue-600
                    "
                  >
                    {jobs.length}
                  </h3>

                </div>

              </div>

              {/* EMPTY */}

              {jobs.length ===
                0 && (

                <div
                  className="
                    bg-white
                    rounded-[28px]
                    shadow-md
                    p-10
                    text-center
                  "
                >

                  <div
                    className="
                      text-6xl
                      mb-5
                    "
                  >
                    💼
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-gray-800
                    "
                  >
                    No Jobs Available
                  </h3>

                  <p
                    className="
                      text-gray-500
                      mt-3
                      max-w-md
                      mx-auto
                    "
                  >
                    There are currently no
                    active job openings.
                    Please check again later.
                  </p>

                </div>
              )}

              {/* JOB LIST */}

              {jobs.length > 0 && (

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    2xl:grid-cols-3
                    gap-5
                    md:gap-6
                  "
                >

                  {jobs.map(
                    (job) => (

                      <div
                        key={job._id}
                        className="
                          h-full
                        "
                      >

                        <JobCard
                          job={job}
                        />

                      </div>
                    )
                  )}

                </div>
              )}

            </div>
          )}



            {/* APPLICATION STATUS */}

            {activeSection ===
              "applications" && (

              <ApplicationStatus
                applications={
                  applications
                }
              />

            )}

            {/* PROFILE */}

            {activeSection ===
              "profile" && (

              <ProfileSettings />

            )}

          </div>

        </div>

      </div>
    );
  };

export default CandidateDashboard;

