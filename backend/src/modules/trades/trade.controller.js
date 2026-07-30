import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
  createTrade,
  getTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
  uploadTradeScreenshots,
} from "./trade.service.js";

// Create a new trade
export const create = asyncHandler(async (req, res) => {
  const trade = await createTrade(req.body, req.user.id);

  res
    .status(201)
    .json(new ApiResponse(201, "Trade created successfully", trade));
});

// Get Trades with pagination
export const getAll = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const data = await getTrades(req.user.id, page, limit);

  res
    .status(200)
    .json(new ApiResponse(200, "Trades fetched successfully", data));
});

// Get a single trade by ID
export const getById = asyncHandler(async (req, res) => {
  const trade = await getTradeById(req.params.id, req.user.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Trade fetched successfully", trade));
});

// Update an existing trade
export const update = asyncHandler(async (req, res) => {
  const trade = await updateTrade(req.params.id, req.user.id, req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "Trade updated successfully", trade));
});

// Delete a trade by ID
export const remove = asyncHandler(async (req, res) => {
  await deleteTrade(req.params.id, req.user.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Trade deleted successfully", null));
});

// Upload screenshots for a trade
export const uploadScreenshots = asyncHandler(async (req, res) => {
  const trade = await uploadTradeScreenshots(
    req.params.id,
    req.user.id,
    req.files,
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, "Trade screenshots uploaded successfully", trade),
    );
});
