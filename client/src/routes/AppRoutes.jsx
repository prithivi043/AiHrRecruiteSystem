
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ========================================
// AUTH PAGES
// ========================================

import Login from "../pages/auth/Login";

import Register from "../pages/auth/Register";

// ========================================
// DASHBOARDS
// ========================================

import HRDashboard from "../pages/hr/HRDashboard";

import CandidateDashboard from "../pages/candidate/CandidateDashboard";

import EmployeeDashboard from "../pages/employee/EmployeeDashboard";

import ProfileSettings from "../pages/candidate/ProfileSettings";

// ========================================
// SERVICES
// ========================================

import {
  isAuthenticated,
  getUserRole,
} from "../services/authService";

// ========================================
// PROTECTED ROUTE
// ========================================

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}) => {

  // ====================================
  // CHECK LOGIN
  // ====================================

  if (!isAuthenticated()) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ====================================
  // CHECK ROLE
  // ====================================

  const role =
    getUserRole();

  if (

    allowedRoles.length > 0 &&

    !allowedRoles.includes(
      role
    )
  ) {

    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
};

// ========================================
// ROLE REDIRECT
// ========================================

const RoleRedirect =
  () => {

    if (
      !isAuthenticated()
    ) {

      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }

    const role =
      getUserRole();

    // ====================================
    // HR
    // ====================================

    if (role === "hr") {

      return (
        <Navigate
          to="/hr"
          replace
        />
      );
    }

    // ====================================
    // EMPLOYEE
    // ====================================

    if (
      role === "employee"
    ) {

      return (
        <Navigate
          to="/employee"
          replace
        />
      );
    }

    // ====================================
    // CANDIDATE
    // ====================================

    if (
      role === "candidate"
    ) {

      return (
        <Navigate
          to="/candidate"
          replace
        />
      );
    }

    // ====================================
    // DEFAULT
    // ====================================

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  };

// ========================================
// UNAUTHORIZED
// ========================================

const Unauthorized =
  () => (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >

      <div
        className="
          bg-white
          p-10
          rounded-3xl
          shadow-xl
          text-center
        "
      >

        <h1
          className="
            text-6xl
            font-extrabold
            text-red-500
          "
        >
          403
        </h1>

        <p
          className="
            mt-4
            text-gray-600
            text-lg
          "
        >
          Unauthorized Access
        </p>

      </div>

    </div>
  );

// ========================================
// NOT FOUND
// ========================================

const NotFound =
  () => (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >

      <div
        className="
          text-center
        "
      >

        <h1
          className="
            text-6xl
            font-extrabold
            text-gray-800
          "
        >
          404
        </h1>

        <p
          className="
            mt-4
            text-gray-500
            text-lg
          "
        >
          Page Not Found
        </p>

      </div>

    </div>
  );

// ========================================
// APP ROUTES
// ========================================

const AppRoutes =
  () => {

    return (

      <Routes>

        {/* ================================= */}
        {/* DEFAULT */}
        {/* ================================= */}

        <Route
          path="/"
          element={
            <RoleRedirect />
          }
        />

        {/* ================================= */}
        {/* AUTH */}
        {/* ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================================= */}
        {/* HR */}
        {/* ================================= */}

        <Route
          path="/hr"
          element={
            <ProtectedRoute
              allowedRoles={[
                "hr",
              ]}
            >
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* EMPLOYEE */}
        {/* ================================= */}

        <Route
          path="/employee"
          element={
            <ProtectedRoute
              allowedRoles={[
                "employee",
              ]}
            >
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* CANDIDATE */}
        {/* ================================= */}

        <Route
          path="/candidate"
          element={
            <ProtectedRoute
              allowedRoles={[
                "candidate",
              ]}
            >
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* PROFILE */}
        {/* ================================= */}

        <Route
          path="/candidate/profile"
          element={
            <ProtectedRoute
              allowedRoles={[
                "candidate",
              ]}
            >
              <ProfileSettings />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* UNAUTHORIZED */}
        {/* ================================= */}

        <Route
          path="/unauthorized"
          element={
            <Unauthorized />
          }
        />

        {/* ================================= */}
        {/* 404 */}
        {/* ================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    );
};

export default AppRoutes;

