import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import upload from "../../middleware/upload.middleware.js";

import {
  getProfile,
  updateProfile,
  updateProfilePicture,
} from "./profile.controller.js";

import { updateProfileValidator } from "./profile.validator.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getProfile,
);

router.patch(
  "/",
  authenticate,
  updateProfileValidator,
  validate,
  updateProfile,
);

router.patch(
  "/picture",
  authenticate,
  upload.single("profilePicture"),
  updateProfilePicture,
);

export default router;