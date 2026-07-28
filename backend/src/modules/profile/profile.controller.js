import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, "Profile fetched successfully", {
      id: req.user.id,
      fullName: req.user.fullName,
      email: req.user.email,
      profilePicture: req.user.profilePicture,
    })
  );
});