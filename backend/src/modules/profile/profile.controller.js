import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import {
  updateProfile as updateProfileService,
  updateProfilePicture as updateProfilePictureService,
} from "./profile.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, "Profile fetched successfully", {
      id: req.user.id,
      fullName: req.user.fullName,
      email: req.user.email,
      profilePicture: req.user.profilePicture,
    }),
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName } = req.body;

  const updatedProfile = await updateProfileService(
    req.user.id,
    fullName,
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Profile updated successfully",
      updatedProfile,
    ),
  );
});

export const updateProfilePicture = asyncHandler(async (req, res) => {
  const updatedProfile = await updateProfilePictureService(
    req.user.id,
    req.file,
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Profile picture updated successfully",
      updatedProfile,
    ),
  );
});