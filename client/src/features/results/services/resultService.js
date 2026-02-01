import Api from "../../../lib/api";

export const resultService = {
  getVoteResults: async () => {
    const response = await Api.get("/vote/results");
    return response.data;
  },
};
