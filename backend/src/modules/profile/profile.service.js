import User from "../auth/user.model.js";
import ApiError from "../../utils/ApiError.js";

export const updateProfile = async (userId, fullName) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      fullName,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return updatedUser;
};