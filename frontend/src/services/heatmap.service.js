import api from "../api/axios";

export const getHeatmap = async () => {
  const response = await api.get("/dashboard/heatmap");

  return response.data.data;
};