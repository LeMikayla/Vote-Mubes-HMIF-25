import Api from "../../../lib/api";

export const candidateService = {
  getAllCandidates: async () => {
    const response = await Api.get("/candidates");
    return response.data.data || [];
  },

  getCandidateById: async (id) => {
    const response = await Api.get(`/candidates/${id}`);
    return response.data.data;
  },
};
