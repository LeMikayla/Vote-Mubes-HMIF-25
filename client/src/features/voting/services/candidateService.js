import api from "../../../lib/api";

export const candidateService = {
  getAllCandidates: async () => {
    const response = await api.get("/candidates");
    return response.data;
  },

  getCandidateById: async (id) => {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  },
};
