import Trade from "./trade.model.js";
import { validateTradeBusinessRules } from "./trade-business-rules.js";
import { calculateTradeMetrics } from "./trade-calculator.js";
import ApiError from "../../utils/ApiError.js";
import { toTradeResponse } from "./trade.mapper.js";

// Create a new trade
export const createTrade = async (tradeData, userId) => {
  validateTradeBusinessRules(tradeData);

  const metrics = calculateTradeMetrics(tradeData);

  const trade = await Trade.create({
    ...tradeData,
    ...metrics,
    user: userId,
  });

  return toTradeResponse(trade);
};

// Get Trades with pagination
export const getTrades = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [trades, totalTrades] = await Promise.all([
    Trade.find({ user: userId })
      .sort({ tradeDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Trade.countDocuments({ user: userId }),
  ]);

  return {
    trades: trades.map(toTradeResponse),
    pagination: {
      page,
      limit,
      totalTrades,
      totalPages: Math.ceil(totalTrades / limit),
    },
  };
};

// Get a single trade by ID
export const getTradeById = async (tradeId, userId) => {
  const trade = await Trade.findOne({
    _id: tradeId,
    user: userId,
  });

  if (!trade) {
    throw new ApiError(404, "Trade not found");
  }

  return toTradeResponse(trade);
};