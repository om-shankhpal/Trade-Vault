import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { registerUser } from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      "User registered successfully",
      user
    )
  );
});