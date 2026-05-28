import API from "./axios";

// ========================================
// Register User
// ========================================

export const registerUser =
  async (userData) => {
    try {
      const response =
        await API.post(
          "/auth/register",
          userData
        );

      return response.data;

    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Registration Failed",
        }
      );
    }
  };

// ========================================
// Login User
// ========================================

export const loginUser =
  async (userData) => {
    try {
      const response =
        await API.post(
          "/auth/login",
          userData
        );

      // Save Token

      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save User

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      return response.data;

    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Login Failed",
        }
      );
    }
  };
  
// ========================================
// Logout User
// ========================================

export const logoutUser = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  window.location.href = "/login";
};

// ========================================
// Get Current User
// ========================================

export const getCurrentUser = () => {
  const user =
    localStorage.getItem("user");

  return user
    ? JSON.parse(user)
    : null;
};

// ========================================
// Get Token
// ========================================

export const getToken = () => {
  return localStorage.getItem(
    "token"
  );
};

// ========================================
// Check Authentication
// ========================================

export const isAuthenticated =
  () => {
    return !!localStorage.getItem(
      "token"
    );
  };

// ========================================
// Role Checker
// ========================================

export const hasRole = (
  roles = []
) => {
  const user = getCurrentUser();

  if (!user) return false;

  return roles.includes(user.role);
};

// ========================================
// Verify Token API
// ========================================

export const verifyToken =
  async () => {
    try {
      const response =
        await API.get(
          "/auth/verify-token"
        );

      return response.data;
    } catch (error) {
      logoutUser();

      throw (
        error.response?.data || {
          message:
            "Token Verification Failed",
        }
      );
    }
  };