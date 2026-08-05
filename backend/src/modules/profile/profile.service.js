import User from "../auth/user.model.js";
import ApiError from "../../utils/ApiError.js";

import {
  uploadImage,
  deleteImage,
} from "../../utils/cloudinary.helper.js";

export const updateProfile = async (userId, fullName) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { fullName },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return updatedUser;
};

export const updateProfilePicture = async (userId, file) => {
  if (!file) {
    throw new ApiError(400, "Profile picture is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.profilePicture?.publicId) {
    await deleteImage(user.profilePicture.publicId);
  }

  const uploadedImage = await uploadImage(
    file.buffer,
    "tradevault/profile-pictures",
  );

  user.profilePicture = {
    url: uploadedImage.secure_url,
    publicId: uploadedImage.public_id,
  };

  await user.save();

  return await User.findById(userId).select("-password");
};