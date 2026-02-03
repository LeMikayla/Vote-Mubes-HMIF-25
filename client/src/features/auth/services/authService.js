import Api from "../../../lib/api";

export const authService = {
  login: async (username, password) => {
    const response = await Api.post("/auth/login", { username, password });
    return response.data;
  },

  getMe: async () => {
    const response = await Api.get("/auth/me");
    return response.data;
  },
};
