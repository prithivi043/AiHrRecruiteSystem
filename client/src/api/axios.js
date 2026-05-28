
import axios from "axios";

// ========================================
// BASE URL
// ========================================

const BASE_URL =

  import.meta.env.MODE ===
  "development"

    ? "http://localhost:5000/api"

    : "https://ai-hr-recruite-system.vercel.app/api";

// ========================================
// AXIOS INSTANCE
// ========================================

const API = axios.create({

  baseURL: BASE_URL,

  headers: {

    "Content-Type":
      "application/json",
  },

  timeout: 15000,
});

// ========================================
// REQUEST INTERCEPTOR
// ========================================

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(
      error
    );
  }
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

API.interceptors.response.use(

  (response) => {

    return response;
  },

  (error) => {

    console.log(
      "API ERROR:",
      error
    );

    return Promise.reject(
      error
    );
  }
);

export default API;

