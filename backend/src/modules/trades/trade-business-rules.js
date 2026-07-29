import ApiError from "../../utils/ApiError.js";
import { TRADE_DIRECTION } from "./trade.constants.js";

export const validateTradeBusinessRules = ({
  direction,
  entryTime,
  exitTime,
  entryPrice,
  plannedStopLoss,
}) => {
  if (new Date(exitTime) <= new Date(entryTime)) {
    throw new ApiError(
      400,
      "Exit time must be after entry time"
    );
  }

  if (
    direction === TRADE_DIRECTION.LONG &&
    plannedStopLoss >= entryPrice
  ) {
    throw new ApiError(
      400,
      "For a LONG trade, planned stop loss must be below the entry price"
    );
  }

  if (
    direction === TRADE_DIRECTION.SHORT &&
    plannedStopLoss <= entryPrice
  ) {
    throw new ApiError(
      400,
      "For a SHORT trade, planned stop loss must be above the entry price"
    );
  }
};