import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_Api_BASE_URL,
  timeout: Number(import.meta.env.VITE_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
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

Api.interceptors.response.use(
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

      try {
        const oldToken = localStorage.getItem("token");

        const res = await Api.post("/auth/refresh-token", {
          token: oldToken,
        });
        const newToken = res.data.token;

        localStorage.setItem("token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return Api(originalRequest);
      } catch (refreshError) {
        console.error("Session habis, silakan login kembali.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
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

export default Api;
