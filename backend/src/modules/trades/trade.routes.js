import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
  uploadScreenshots,
} from "./trade.controller.js";
import {
  createTradeValidator,
  updateTradeValidator,
  getTradesValidator,
} from "./trade.validation.js";
import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";
import validateObjectId from "../../middleware/validateObjectId.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = Router();

router.post("/", authenticate, createTradeValidator, validate, create);

router.get("/", authenticate, getTradesValidator, validate, getAll);

router.get("/:id", authenticate, validateObjectId("id", "Trade"), getById);

router.patch(
  "/:id",
  authenticate,
  validateObjectId("id", "Trade"),
  updateTradeValidator,
  validate,
  update,
);

router.delete("/:id", authenticate, validateObjectId("id", "Trade"), remove);

router.post(
  "/:id/screenshots",
  authenticate,
  validateObjectId("id", "Trade"),
  upload.array("screenshots", 5),
  uploadScreenshots,
);

export default router;
