import api from "../../../lib/api";

export const resultService = {
  getVoteResults: async () => {
    const response = await api.get("/vote/results");
    return response.data;
  },
};
