import api from "../api/axios";

export const getEquityCurve = async () => {
  const response = await api.get("/dashboard/equity-curve");

  return response.data.data;
};