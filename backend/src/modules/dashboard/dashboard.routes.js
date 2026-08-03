import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";

import {
  getDashboardData,
  getEquityCurveData,
  getTradingHeatmapData,
} from "./dashboard.controller.js";

const router = Router();

router.get("/", authenticate, getDashboardData);

router.get("/equity-curve", authenticate, getEquityCurveData);

router.get("/heatmap", authenticate, getTradingHeatmapData);

export default router;
