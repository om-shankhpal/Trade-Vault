import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { getDashboard } from "./dashboard.service.js";

export const getDashboardData = asyncHandler(async (req, res) => {
  const dashboard = await getDashboard(req.user.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Dashboard fetched successfully",
      dashboard
    )
  );
});