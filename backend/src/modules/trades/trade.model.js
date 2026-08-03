import mongoose from "mongoose";
import {
  TRADE_SEGMENTS,
  TRADE_DIRECTIONS,
  TRADE_STATUSES,
} from "./trade.constants.js";

const screenshotSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const tradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    tradeDate: {
      type: Date,
      required: true,
    },

    symbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    segment: {
      type: String,
      enum: TRADE_SEGMENTS,
      required: true,
    },

    direction: {
      type: String,
      enum: TRADE_DIRECTIONS,
      required: true,
    },

    entryTime: {
      type: Date,
      required: true,
    },

    entryPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    exitTime: {
      type: Date,
      required: true,
    },

    exitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    plannedStopLoss: {
      type: Number,
      required: true,
      min: 0,
    },

    plannedTarget: {
      type: Number,
      required: true,
      min: 0,
    },

    strategy: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    marketCondition: {
      type: String,
      trim: true,
    },

    emotionEntry: {
      type: String,
      trim: true,
    },

    emotionDuring: {
      type: String,
      trim: true,
    },

    emotionExit: {
      type: String,
      trim: true,
    },

    rulesFollowed: {
      type: Boolean,
      default: true,
    },

    mistakes: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    screenshots: [screenshotSchema],

    grossPnL: {
      type: Number,
      required: true,
    },

    charges: {
      type: Number,
      required: true,
      default: 0,
    },

    netPnL: {
      type: Number,
      required: true,
    },

    rMultiple: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: TRADE_STATUSES,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

tradeSchema.index({
  user: 1,
  tradeDate: -1,
});

tradeSchema.index({
  user: 1,
  symbol: 1,
});

export default mongoose.model("Trade", tradeSchema);
