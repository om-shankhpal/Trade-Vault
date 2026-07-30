import { Router } from "express";
import { create, getAll, getById, update, remove } from "./trade.controller.js";
import {
  createTradeValidator,
  updateTradeValidator,
} from "./trade.validation.js";
import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, createTradeValidator, validate, create);

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getById);

router.patch("/:id", authenticate, updateTradeValidator, validate, update);

router.delete("/:id", authenticate, remove);

export default router;
