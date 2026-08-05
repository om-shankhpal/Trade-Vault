import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  getProfile,
  updateProfile,
} from "./profile.controller.js";

import { updateProfileValidator } from "./profile.validator.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getProfile
);

router.patch(
  "/",
  authenticate,
  updateProfileValidator,
  validate,
  updateProfile
);

export default router;