import { body } from "express-validator";
import { query } from "express-validator";

export const createTradeValidator = [
  body("tradeDate").isISO8601().withMessage("Trade date must be a valid date"),

  body("symbol")
    .trim()
    .notEmpty()
    .withMessage("Symbol is required")
    .isLength({ max: 30 })
    .withMessage("Symbol cannot exceed 30 characters"),

  body("segment").isIn(["FUTURES", "OPTIONS"]).withMessage("Invalid segment"),

  body("direction").isIn(["LONG", "SHORT"]).withMessage("Invalid direction"),

  body("entryTime").isISO8601().withMessage("Entry time must be a valid date"),

  body("exitTime").isISO8601().withMessage("Exit time must be a valid date"),

  body("entryPrice")
    .isFloat({ gt: 0 })
    .withMessage("Entry price must be greater than 0"),

  body("exitPrice")
    .isFloat({ gt: 0 })
    .withMessage("Exit price must be greater than 0"),

  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be greater than 0"),

  body("plannedStopLoss")
    .isFloat({ gt: 0 })
    .withMessage("Planned stop loss must be greater than 0"),

  body("plannedTarget")
    .isFloat({ gt: 0 })
    .withMessage("Planned target must be greater than 0"),

  body("charges").isFloat({ min: 0 }).withMessage("Charges cannot be negative"),

  body("strategy")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Strategy cannot exceed 100 characters"),

  body("marketCondition")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Market condition cannot exceed 100 characters"),

  body("emotionEntry").optional().trim().isLength({ max: 100 }),

  body("emotionDuring").optional().trim().isLength({ max: 100 }),

  body("emotionExit").optional().trim().isLength({ max: 100 }),

  body("rulesFollowed")
    .optional()
    .isBoolean()
    .withMessage("Rules followed must be true or false"),

  body("mistakes")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Mistakes cannot exceed 1000 characters"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Notes cannot exceed 5000 characters"),
];

export const updateTradeValidator = [
  body("tradeDate")
    .optional()
    .isISO8601()
    .withMessage("Trade date must be a valid date"),

  body("symbol")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Symbol is required")
    .isLength({ max: 30 })
    .withMessage("Symbol cannot exceed 30 characters"),

  body("segment")
    .optional()
    .isIn(["FUTURES", "OPTIONS"])
    .withMessage("Invalid segment"),

  body("direction")
    .optional()
    .isIn(["LONG", "SHORT"])
    .withMessage("Invalid direction"),

  body("entryTime")
    .optional()
    .isISO8601()
    .withMessage("Entry time must be a valid date"),

  body("exitTime")
    .optional()
    .isISO8601()
    .withMessage("Exit time must be a valid date"),

  body("entryPrice")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Entry price must be greater than 0"),

  body("exitPrice")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Exit price must be greater than 0"),

  body("quantity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Quantity must be greater than 0"),

  body("plannedStopLoss")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Planned stop loss must be greater than 0"),

  body("plannedTarget")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Planned target must be greater than 0"),

  body("charges")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Charges cannot be negative"),

  body("strategy")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Strategy cannot exceed 100 characters"),

  body("marketCondition")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Market condition cannot exceed 100 characters"),

  body("emotionEntry").optional().trim().isLength({ max: 100 }),

  body("emotionDuring").optional().trim().isLength({ max: 100 }),

  body("emotionExit").optional().trim().isLength({ max: 100 }),

  body("rulesFollowed")
    .optional()
    .isBoolean()
    .withMessage("Rules followed must be true or false"),

  body("mistakes")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Mistakes cannot exceed 1000 characters"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Notes cannot exceed 5000 characters"),
];

export const getTradesValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be at least 1")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),
];