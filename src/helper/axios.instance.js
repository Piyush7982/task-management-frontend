import axios from "axios";

// const BACKEND_URL = "http://localhost:4000";
// const BACKEND_URL = "https://www.task-manager-backend.line.pm";
const BACKEND_URL = "https://task-manager-49fq.onrender.com";
const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
