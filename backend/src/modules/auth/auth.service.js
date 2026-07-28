import bcrypt from "bcrypt";
import User from "./user.model.js";
import ApiError from "../../utils/ApiError.js";

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

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    profilePicture: user.profilePicture,
  };
};
