import {
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ====================================
  // Logout Handler
  // ====================================

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        bg-white
        shadow-sm
        border-b
        px-4
        md:px-6
        py-4
      "
    >
      <div className="flex items-center justify-between">
        
        {/* Left Side */}

        <div>
          <h1
            className="
              text-xl
              md:text-2xl
              font-bold
              text-blue-600
            "
          >
            AI HR Platform
          </h1>

          <p
            className="
              text-xs
              md:text-sm
              text-gray-500
            "
          >
            Recruitment & Employee Management
          </p>
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Notification */}

          <button
            className="
              relative
              text-gray-600
              hover:text-blue-600
              transition
            "
          >
            <FaBell size={20} />

            <span
              className="
                absolute
                -top-1
                -right-1
                bg-red-500
                text-white
                text-[10px]
                w-4
                h-4
                rounded-full
                flex
                items-center
                justify-center
              "
            >
              3
            </span>
          </button>

          {/* User Info */}

          <div className="hidden sm:flex items-center gap-3">
            <FaUserCircle
              size={35}
              className="text-blue-600"
            />

            <div>
              <h2
                className="
                  text-sm
                  md:text-base
                  font-semibold
                  text-gray-700
                "
              >
                {user?.name || "User"}
              </h2>

              <p
                className="
                  text-xs
                  text-gray-500
                  capitalize
                "
              >
                {user?.role || "Employee"}
              </p>
            </div>
          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              bg-red-500
              hover:bg-red-600
              text-white
              px-3
              md:px-4
              py-2
              rounded-lg
              transition
            "
          >
            <FaSignOutAlt />

            <span className="hidden md:block">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;