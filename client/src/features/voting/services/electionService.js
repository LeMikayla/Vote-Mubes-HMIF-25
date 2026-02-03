import Api from "../../../lib/api";

export const electionService = {
  getConfig: async () => {
    const response = await Api.get("/election/config");
    return response.data.data || response.data;
  },

  updateConfig: async (configData) => {
    const response = await Api.put("/election/config", configData);
    return response.data.data || response.data;
  },
};
