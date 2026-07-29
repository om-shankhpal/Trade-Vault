import { TRADE_DIRECTION, TRADE_STATUS } from "./trade.constants.js";

const round = (value) => Number(value.toFixed(2));

const calculateGrossPnL = ({
  direction,
  entryPrice,
  exitPrice,
  quantity,
}) => {
  const priceDifference =
    direction === TRADE_DIRECTION.LONG
      ? exitPrice - entryPrice
      : entryPrice - exitPrice;

  return round(priceDifference * quantity);
};

const calculateNetPnL = (grossPnL, charges) => {
  return round(grossPnL - charges);
};

const calculateStatus = (grossPnL) => {
  if (grossPnL > 0) {
    return TRADE_STATUS.WIN;
  }

  if (grossPnL < 0) {
    return TRADE_STATUS.LOSS;
  }

  return TRADE_STATUS.BREAKEVEN;
};

const calculateRMultiple = ({
  direction,
  entryPrice,
  exitPrice,
  plannedStopLoss,
}) => {
  const risk =
    direction === TRADE_DIRECTION.LONG
      ? entryPrice - plannedStopLoss
      : plannedStopLoss - entryPrice;

  const reward =
    direction === TRADE_DIRECTION.LONG
      ? exitPrice - entryPrice
      : entryPrice - exitPrice;

  return round(reward / risk);
};

export const calculateTradeMetrics = ({
  direction,
  entryPrice,
  exitPrice,
  quantity,
  plannedStopLoss,
  charges,
}) => {
  const grossPnL = calculateGrossPnL({
    direction,
    entryPrice,
    exitPrice,
    quantity,
  });

  const netPnL = calculateNetPnL(grossPnL, charges);

  const status = calculateStatus(grossPnL);

  const rMultiple = calculateRMultiple({
    direction,
    entryPrice,
    exitPrice,
    plannedStopLoss,
  });

  return {
    grossPnL,
    netPnL,
    status,
    rMultiple,
  };
};