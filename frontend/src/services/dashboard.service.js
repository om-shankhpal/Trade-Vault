import api from "../api/axios";

export const getDashboard = async () => {
  const response = await api.get("/dashboard");

  return response.data.data;
};

export const getEquityCurve = async () => {
  const response = await api.get("/dashboard/equity-curve");

  return response.data.data;
};