import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  withCredentials: true,
});

const getAccessToken = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;
};

const handleUnauthorized = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
