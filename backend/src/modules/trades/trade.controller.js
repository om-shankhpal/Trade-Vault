import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { createTrade, getTrades } from "./trade.service.js";

export const create = asyncHandler(async (req, res) => {
  const trade = await createTrade(req.body, req.user.id);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Trade created successfully",
        trade
      )
    );
});

export const getAll = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const data = await getTrades(req.user.id, page, limit);

  res.status(200).json(
    new ApiResponse(
      200,
      "Trades fetched successfully",
      data
    )
  );
});