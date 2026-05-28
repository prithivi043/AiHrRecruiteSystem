
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-hr-recruite-system.vercel.app/api";

const API = axios.create({

  baseURL: BASE_URL,

  headers: {

    "Content-Type":
      "application/json",
  },

  timeout: 15000,
});

export default API;

