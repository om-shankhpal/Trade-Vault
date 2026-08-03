import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";

import {
  getDashboardData,
  getEquityCurveData,
} from "./dashboard.controller.js";

const router = Router();

router.get("/", authenticate, getDashboardData);

router.get("/equity-curve", authenticate, getEquityCurveData);

export default router;