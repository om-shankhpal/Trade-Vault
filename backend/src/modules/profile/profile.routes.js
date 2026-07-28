import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import { getProfile } from "./profile.controller.js";

const router = Router();

router.get("/", authenticate, getProfile);

export default router;