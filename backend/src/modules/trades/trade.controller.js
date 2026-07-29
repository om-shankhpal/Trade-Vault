import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { createTrade } from "./trade.service.js";

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