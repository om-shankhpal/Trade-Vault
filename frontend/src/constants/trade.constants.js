export const TRADE_SEGMENT = {
  FUTURES: "FUTURES",
  OPTIONS: "OPTIONS",
  EQUITIES: "EQUITIES",
  CURRENCY: "CURRENCY",
  COMMODITY: "COMMODITY",
};

export const TRADE_DIRECTION = {
  LONG: "LONG",
  SHORT: "SHORT",
};

export const TRADE_STATUS = {
  WIN: "WIN",
  LOSS: "LOSS",
  BREAKEVEN: "BREAKEVEN",
};

export const TRADE_SEGMENTS = Object.values(TRADE_SEGMENT);

export const TRADE_DIRECTIONS = Object.values(TRADE_DIRECTION);

export const TRADE_STATUSES = Object.values(TRADE_STATUS);