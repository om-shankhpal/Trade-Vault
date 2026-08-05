import { Router } from "express";

import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";

import { register, login, updatePassword } from "./auth.controller.js";

import {
  registerValidator,
  loginValidator,
  changePasswordValidator,
} from "./auth.validation.js";

const router = Router();

router.post("/register", registerValidator, validate, register);

router.post("/login", loginValidator, validate, login);

router.patch(
  "/change-password",
  authenticate,
  changePasswordValidator,
  validate,
  updatePassword,
);

export default router;
