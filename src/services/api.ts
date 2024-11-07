import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Add interceptor to handle auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const configureInterceptor = (
  logout: (showToast: boolean) => void,
  setSessionExpired: (expired: boolean) => void,
  navigate: (path: string) => void
) => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response ? error.response.status : null;
      if (status === 500) {
        navigate("/500");
      }
      if (error.response && error.response.status === 401) {
        setSessionExpired(true);
        logout(false);
      }
      return Promise.reject(error);
    }
  );
};

export default api;
