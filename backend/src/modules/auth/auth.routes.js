import { Router } from "express";

import { register } from "./auth.controller.js";
import { registerValidator } from "./auth.validation.js";
import validate from "../../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

export default router;