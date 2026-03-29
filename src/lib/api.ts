import axios from "axios";

// Client-side uses relative path for proxy, Server uses absolute path
const isServer = typeof window === "undefined";
const baseURL = isServer 
  ? (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://eco-spark-server.vercel.app/api") + "/v1"
  : "/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(message);
  }
);

export default api;
