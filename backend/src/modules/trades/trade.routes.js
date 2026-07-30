import { Router } from "express";
import { create, getAll, getById, update, remove } from "./trade.controller.js";
import {
  createTradeValidator,
  updateTradeValidator,
} from "./trade.validation.js";
import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";
import validateObjectId from "../../middleware/validateObjectId.middleware.js";

const router = Router();

router.post("/", authenticate, createTradeValidator, validate, create);

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, validateObjectId("id", "Trade"), getById);

router.patch("/:id", authenticate, validateObjectId("id", "Trade"), updateTradeValidator, validate, update);

router.delete("/:id", authenticate, validateObjectId("id", "Trade"), remove);

export default router;
