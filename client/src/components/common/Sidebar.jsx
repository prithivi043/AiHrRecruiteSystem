import {
  FaHome,
  FaUsers,
  FaBriefcase,
  FaChartBar,
  FaTasks,
  FaUserTie,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Sidebar = ({
  isOpen,
  setIsOpen,
}) => {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path;

  return (
    <>
      {/* Overlay */}

      {isOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-40
            lg:hidden
          "
          onClick={() =>
            setIsOpen(false)
          }
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50
          h-screen
          w-[260px]
          bg-gray-900
          text-white
          p-5
          transform
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}

        <div className="mb-10">
          <h1
            className="
              text-3xl
              font-bold
              text-blue-400
            "
          >
            AI HR
          </h1>

          <p className="text-gray-400 text-sm">
            Management Platform
          </p>
        </div>

        {/* Navigation */}

        <nav className="flex flex-col gap-3">
          
          {/* Admin */}

          {user?.role === "admin" && (
            <>
              <Link
                to="/admin"
                className={`
                  flex items-center gap-3
                  p-3 rounded-xl
                  transition
                  ${
                    isActive("/admin")
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <FaHome />
                Dashboard
              </Link>

              <Link
                to="/employees"
                className={`
                  flex items-center gap-3
                  p-3 rounded-xl
                  transition
                  ${
                    isActive("/employees")
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <FaUsers />
                Employees
              </Link>

              <Link
                to="/jobs"
                className={`
                  flex items-center gap-3
                  p-3 rounded-xl
                  transition
                  ${
                    isActive("/jobs")
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <FaBriefcase />
                Jobs
              </Link>

              <Link
                to="/analytics"
                className={`
                  flex items-center gap-3
                  p-3 rounded-xl
                  transition
                  ${
                    isActive("/analytics")
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <FaChartBar />
                Analytics
              </Link>
            </>
          )}

          {/* Employee */}

          {user?.role ===
            "employee" && (
            <>
              <Link
                to="/employee"
                className={`
                  flex items-center gap-3
                  p-3 rounded-xl
                  transition
                  ${
                    isActive(
                      "/employee"
                    )
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <FaHome />
                Dashboard
              </Link>

              <Link
                to="/tasks"
                className={`
                  flex items-center gap-3
                  p-3 rounded-xl
                  transition
                  ${
                    isActive("/tasks")
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <FaTasks />
                Tasks
              </Link>
            </>
          )}

          {/* Candidate */}

          {user?.role ===
            "candidate" && (
            <>
              <Link
                to="/candidate"
                className={`
                  flex items-center gap-3
                  p-3 rounded-xl
                  transition
                  ${
                    isActive(
                      "/candidate"
                    )
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <FaHome />
                Dashboard
              </Link>

              <Link
                to="/apply-job"
                className={`
                  flex items-center gap-3
                  p-3 rounded-xl
                  transition
                  ${
                    isActive(
                      "/apply-job"
                    )
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <FaUserTie />
                Apply Jobs
              </Link>
            </>
          )}
        </nav>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="
            absolute
            bottom-5
            left-5
            right-5
            flex
            items-center
            justify-center
            gap-3
            bg-red-500
            hover:bg-red-600
            py-3
            rounded-xl
            transition
          "
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;