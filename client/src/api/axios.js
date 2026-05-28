import axios from "axios";

// ========================================
// Base URL
// ========================================

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

// ========================================
// Axios Instance
// ========================================

const API = axios.create({
  baseURL: BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});

// ========================================
// Request Interceptor
// ========================================

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// Response Interceptor
// ========================================

API.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    // Unauthorized Access
    if (
      error.response &&
      error.response.status === 401
    ) {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    // Server Error
    if (
      error.response &&
      error.response.status >= 500
    ) {
      console.error(
        "Server Error:",
        error.response.data.message
      );
    }

    // Network Error
    if (error.code === "ECONNABORTED") {
      console.error(
        "Request Timeout. Please try again."
      );
    }

    return Promise.reject(error);
  }
);

export default API;