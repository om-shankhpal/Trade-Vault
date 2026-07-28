import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { registerUser, loginUser } from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = await registerUser({
    fullName,
    email,
    password,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const data = await loginUser({
    email,
    password,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      "Login successful",
      data
    )
  );
});