import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
  getDashboard,
  getEquityCurve,
  getTradingHeatmap,
} from "./dashboard.service.js";

export const getDashboardData = asyncHandler(async (req, res) => {
  const dashboard = await getDashboard(req.user.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Dashboard fetched successfully", dashboard));
});

export const getEquityCurveData = asyncHandler(async (req, res) => {
  const equityCurve = await getEquityCurve(req.user.id);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Equity curve fetched successfully", equityCurve),
    );
});

export const getTradingHeatmapData = asyncHandler(async (req, res) => {
  const heatmap = await getTradingHeatmap(req.user.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Trading heatmap fetched successfully",
      heatmap
    )
  );
});