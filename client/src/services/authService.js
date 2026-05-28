// ========================================
// AUTH SERVICE
// AI HR PLATFORM
// ========================================

// ========================================
// TOKEN MANAGEMENT
// ========================================

export const setToken = (
  token
) => {
  localStorage.setItem(
    "token",
    token
  );
};

export const getToken = () => {
  return localStorage.getItem(
    "token"
  );
};

export const removeToken =
  () => {
    localStorage.removeItem(
      "token"
    );
  };

// ========================================
// USER MANAGEMENT
// ========================================

export const setUser = (
  user
) => {
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

export const getUser = () => {
  try {
    const user =
      localStorage.getItem(
        "user"
      );

    return user
      ? JSON.parse(user)
      : null;

  } catch (error) {
    console.log(
      "User Parse Error:",
      error
    );

    return null;
  }
};

export const removeUser =
  () => {
    localStorage.removeItem(
      "user"
    );
  };

// ========================================
// AUTHENTICATION HELPERS
// ========================================

export const isAuthenticated =
  () => {
    const token =
      getToken();

    return !!token;
  };

// ========================================
// LOGIN USER
// ========================================

export const login = ({
  token,
  user,
}) => {
  setToken(token);

  setUser(user);
};

// ========================================
// LOGOUT USER
// ========================================

export const logout = () => {
  removeToken();

  removeUser();

  window.location.href =
    "/login";
};

// ========================================
// ROLE HELPERS
// ========================================

export const getUserRole =
  () => {
    const user =
      getUser();

    return user?.role || null;
  };

export const hasRole = (
  allowedRoles = []
) => {
  const role =
    getUserRole();

  return allowedRoles.includes(
    role
  );
};

// ========================================
// DASHBOARD ROUTE
// ========================================

export const getDashboardRoute =
  () => {
    const role =
      getUserRole();

    switch (role) {
      case "HR":
        return "/HR";

      case "employee":
        return "/employee";

      case "candidate":
        return "/candidate";

      default:
        return "/login";
    }
  };

// ========================================
// JWT TOKEN EXPIRY CHECK
// ========================================

export const isTokenExpired =
  () => {
    const token =
      getToken();

    if (!token) {
      return true;
    }

    try {
      const payload =
        JSON.parse(
          atob(
            token.split(".")[1]
          )
        );

      const currentTime =
        Date.now() / 1000;

      return (
        payload.exp <
        currentTime
      );

    } catch (error) {
      console.log(
        "JWT Error:",
        error
      );

      return true;
    }
  };

// ========================================
// SESSION VALIDATION
// ========================================

export const validateSession =
  () => {
    if (
      isTokenExpired()
    ) {
      logout();

      return false;
    }

    return true;
  };

// ========================================
// INITIALIZE AUTH
// ========================================

export const initializeAuth =
  () => {
    const token =
      getToken();

    const user =
      getUser();

    // No Auth Data

    if (
      !token ||
      !user
    ) {
      return false;
    }

    // Invalid Session

    if (
      isTokenExpired()
    ) {
      logout();

      return false;
    }

    return true;
  };

// ========================================
// GET AUTH HEADERS
// ========================================

export const getAuthHeaders =
  () => {
    const token =
      getToken();

    return {
      Authorization:
        `Bearer ${token}`,
    };
  };

// ========================================
// CLEAR STORAGE
// ========================================

export const clearAuthStorage =
  () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );
  };

// ========================================
// CHECK ADMIN
// ========================================

export const isAdmin =
  () => {
    return (
      getUserRole() ===
      "HR"
    );
  };

// ========================================
// CHECK EMPLOYEE
// ========================================

export const isEmployee =
  () => {
    return (
      getUserRole() ===
      "employee"
    );
  };

// ========================================
// CHECK CANDIDATE
// ========================================

export const isCandidate =
  () => {
    return (
      getUserRole() ===
      "candidate"
    );
  };