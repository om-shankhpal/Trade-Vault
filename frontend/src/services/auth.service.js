import api from "../api/axios";
import { removeToken } from "../utils/token";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data.data;
};

export const logout = () => {
  removeToken();
};