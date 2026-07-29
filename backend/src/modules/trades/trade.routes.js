import { Router } from "express";
import { create } from "./trade.controller.js";
import { createTradeValidator } from "./trade.validation.js";
import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  createTradeValidator,
  validate,
  create
);

export default router;