import Api from "../../../lib/api";

export const voteService = {
  castVote: async (candidateId) => {
    const response = await Api.post("/vote/submit", { candidateId });
    return response.data;
  },

  checkVoteStatus: async () => {
    const response = await Api.get("/vote/check");
    return response.data;
  },
};
