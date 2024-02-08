import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      window.localStorage.clear();
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
