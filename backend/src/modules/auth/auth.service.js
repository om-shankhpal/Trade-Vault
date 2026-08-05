import bcrypt from "bcrypt";
import User from "./user.model.js";
import ApiError from "../../utils/ApiError.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async ({ fullName, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS),
  );

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  };
};

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Current password is incorrect");
  }

  const isSamePassword = await bcrypt.compare(
    newPassword,
    user.password,
  );

  if (isSamePassword) {
    throw new ApiError(
      400,
      "New password must be different from current password",
    );
  }

  user.password = await bcrypt.hash(
    newPassword,
    Number(process.env.BCRYPT_SALT_ROUNDS),
  );

  await user.save();
};