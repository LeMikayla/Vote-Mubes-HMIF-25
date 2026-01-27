import api from "../../../lib/api";

export const voteService = {
  castVote: async (candidateId) => {
    const response = await api.post("/vote/submit", { candidateId });
    return response.data;
  },

  checkVoteStatus: async () => {
    const response = await api.get("/vote/check");
    return response.data;
  },
};
