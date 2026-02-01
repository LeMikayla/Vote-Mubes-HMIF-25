import Api from "../../../lib/api";

export const userServices = {
  getAllUsers: async () => {
    const response = await Api.get("/users");
    return response.data;
  },

  getUserById: async (id) => {
    const response = await Api.get(`/users/${id}`);
    return response.data;
  },
};
