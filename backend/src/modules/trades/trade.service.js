import Trade from "./trade.model.js";
import { validateTradeBusinessRules } from "./trade-business-rules.js";
import { calculateTradeMetrics } from "./trade-calculator.js";
import { toTradeResponse } from "./trade.mapper.js";

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