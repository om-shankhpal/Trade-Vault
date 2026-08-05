import api from "../api/axios";

export const changePassword = async (passwords) => {
  const response = await api.patch(
    "/auth/change-password",
    passwords
  );

  return response.data;
};