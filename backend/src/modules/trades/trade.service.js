import Trade from "./trade.model.js";
import { validateTradeBusinessRules } from "./trade-business-rules.js";
import { calculateTradeMetrics } from "./trade-calculator.js";

export const createTrade = async (tradeData, userId) => {
  validateTradeBusinessRules(tradeData);

  const metrics = calculateTradeMetrics(tradeData);

  const trade = await Trade.create({
    ...tradeData,
    ...metrics,
    user: userId,
  });

  return {
    id: trade.id,
    tradeDate: trade.tradeDate,
    symbol: trade.symbol,
    segment: trade.segment,
    direction: trade.direction,
    entryTime: trade.entryTime,
    exitTime: trade.exitTime,
    entryPrice: trade.entryPrice,
    exitPrice: trade.exitPrice,
    quantity: trade.quantity,
    plannedStopLoss: trade.plannedStopLoss,
    plannedTarget: trade.plannedTarget,
    strategy: trade.strategy,
    marketCondition: trade.marketCondition,
    emotionEntry: trade.emotionEntry,
    emotionDuring: trade.emotionDuring,
    emotionExit: trade.emotionExit,
    rulesFollowed: trade.rulesFollowed,
    mistakes: trade.mistakes,
    notes: trade.notes,
    screenshots: trade.screenshots,
    grossPnL: trade.grossPnL,
    charges: trade.charges,
    netPnL: trade.netPnL,
    rMultiple: trade.rMultiple,
    status: trade.status,
    createdAt: trade.createdAt,
    updatedAt: trade.updatedAt,
  };
};