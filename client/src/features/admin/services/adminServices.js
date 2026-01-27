import api from "../../../lib/api";

export const adminServices = {
  createCandidate: async (formData) => {
    const response = await api.post("candidates", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateCandidate: async (id, formData) => {
    const response = await api.put(`candidates/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteCandidate: async (id) => {
    const response = await api.delete(`candidates/${id}`);
    return response.data;
  },
};
