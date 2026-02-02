import Api from "../../../lib/api";

export const voteService = {
  castVote: async (candidateId) => {
    const response = await Api.post("/votes/submit", { candidateId });
    return response.data;
  },

  checkVoteStatus: async () => {
    const response = await Api.get("/votes/check");
    return response.data;
  },
};
