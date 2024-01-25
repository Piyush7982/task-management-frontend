import axios from "axios";

const BACKEND_URL = "http://localhost:4000";
const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
