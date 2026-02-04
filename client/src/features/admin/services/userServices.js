import Api from "../../../lib/api";

export const userServices = {
  getAllUsers: async () => {
    const response = await Api.get("/users");
    return response.data.data || [];
  },

  getUserById: async (id) => {
    const response = await Api.get(`/users/${id}`);
    return response.data.data;
  },

  getUserByUsername: async (username) => {
    const response = await Api.get(`/users/search/${username}`);
    return response.data;
  },

  deleteAllUsers: async () => {
    const response = await Api.delete("/users/all");
    return response.data;
  },

  importUsers: async (users) => {
    const response = await Api.post("/users/import", { users });
    return response.data;
  },
};
