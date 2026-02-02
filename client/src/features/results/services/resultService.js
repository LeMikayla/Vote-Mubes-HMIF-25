import Api from "../../../lib/api";

export const resultService = {
  getVoteResults: async () => {
    const response = await Api.get("/votes/results");
    return response.data;
  },

  getStatistics: async () => {
    const response = await Api.get("/votes/statistics");
    return response.data;
  },
};