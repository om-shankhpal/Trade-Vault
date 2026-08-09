import api from "../api/axios";

export const getTrades = async (params = {}) => {
  const response = await api.get("/trades", {
    params,
  });

  return response.data.data;
};

export const getTradeById = async (id) => {
  const response = await api.get(`/trades/${id}`);

  return response.data.data;
};

export const createTrade = async (trade) => {
  const response = await api.post("/trades", trade);

  return response.data.data;
};

export const updateTrade = async (id, trade) => {
  const response = await api.patch(`/trades/${id}`, trade);

  return response.data.data;
};

export const deleteTrade = async (id) => {
  await api.delete(`/trades/${id}`);
};

export const uploadTradeScreenshots = async (id, files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("screenshots", file);
  });

  const response = await api.post(
    `/trades/${id}/screenshots`,
    formData,
  );

  return response.data.data;
};