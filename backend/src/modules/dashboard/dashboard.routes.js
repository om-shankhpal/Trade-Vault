import { Router } from "express";
import authenticate from "../../middleware/auth.middleware.js";
import { getDashboardData } from "./dashboard.controller.js";


const router = Router();

router.get("/", authenticate, getDashboardData);

export default router;