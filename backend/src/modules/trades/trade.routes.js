import { Router } from "express";
import { create, getAll, getById } from "./trade.controller.js";
import { createTradeValidator } from "./trade.validation.js";
import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, createTradeValidator, validate, create);

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getById);

export default router;
