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
