import Trade from "./trade.model.js";
import { validateTradeBusinessRules } from "./trade-business-rules.js";
import { calculateTradeMetrics } from "./trade-calculator.js";
import ApiError from "../../utils/ApiError.js";
import { toTradeResponse } from "./trade.mapper.js";
import { uploadImage } from "../../services/cloudinary.service.js";

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
export const getTrades = async (userId, page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;

  const query = {
    user: userId,
  };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.strategy) {
    query.strategy = filters.strategy;
  }

  if (filters.segment) {
    query.segment = filters.segment;
  }

  if (filters.direction) {
    query.direction = filters.direction;
  }

  if (filters.from || filters.to) {
    query.tradeDate = {};

    if (filters.from) {
      query.tradeDate.$gte = new Date(filters.from);
    }

    if (filters.to) {
      query.tradeDate.$lte = new Date(filters.to);
    }
  }

  if (filters.search) {
    query.$or = [
      {
        symbol: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        strategy: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        marketCondition: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        status: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        direction: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        segment: {
          $regex: filters.search,
          $options: "i",
        },
      },
    ];
  }

  const [trades, totalTrades] = await Promise.all([
    Trade.find(query)
      .sort({ tradeDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Trade.countDocuments(query),
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

// Update an existing trade
export const updateTrade = async (tradeId, userId, tradeData) => {
  const trade = await Trade.findOne({
    _id: tradeId,
    user: userId,
  });

  if (!trade) {
    throw new ApiError(404, "Trade not found");
  }

  const updatedTradeData = {
    ...trade.toObject(),
    ...tradeData,
  };

  validateTradeBusinessRules(updatedTradeData);

  const metrics = calculateTradeMetrics(updatedTradeData);

  trade.set({
    ...tradeData,
    ...metrics,
  });

  await trade.save();

  return toTradeResponse(trade);
};

// Delete a trade
export const deleteTrade = async (tradeId, userId) => {
  const trade = await Trade.findOne({
    _id: tradeId,
    user: userId,
  });

  if (!trade) {
    throw new ApiError(404, "Trade not found");
  }

  await trade.deleteOne();
};

// Upload trade screenshots
export const uploadTradeScreenshots = async (tradeId, userId, files) => {
  if (!files || files.length === 0) {
    throw new ApiError(400, "No screenshots uploaded");
  }

  const trade = await Trade.findOne({
    _id: tradeId,
    user: userId,
  });

  if (!trade) {
    throw new ApiError(404, "Trade not found");
  }

  if (trade.screenshots.length + files.length > 3) {
    throw new ApiError(400, "A trade can have a maximum of 3 screenshots");
  }

  const uploadedImages = await Promise.all(
    files.map((file) => uploadImage(file.buffer)),
  );

  trade.screenshots.push(...uploadedImages);

  await trade.save();

  return toTradeResponse(trade);
};
