import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const res = await api.post("/refresh");
      const newToken = res.data.token;

      localStorage.setItem("token", newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    }

    if (error.response && error.response.status === 403) {
      console.error(
        "Akses ditolak: Anda tidak memiliki izin untuk mengakses fitur ini.",
      );
      // tambahin toast
    }

    if (error.response && error.response.status === 500) {
      console.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
    }

    return Promise.reject(error);
  },
);

export default api;
