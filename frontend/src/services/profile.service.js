import api from "../api/axios";

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch("/profile", data);
  return response.data.data;
};

export const updateProfilePicture = async (file) => {
  const formData = new FormData();

  formData.append("profilePicture", file);

  const response = await api.patch(
    "/profile/picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.data;
};