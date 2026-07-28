import { Router } from "express";

import validate from "../../middleware/validate.middleware.js";
import { registerValidator, loginValidator } from "./auth.validation.js";
import { register, login } from "./auth.controller.js";

const router = Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

export default router;
