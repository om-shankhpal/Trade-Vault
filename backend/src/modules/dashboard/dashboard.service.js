import mongoose from "mongoose";
import Trade from "../trades/trade.model.js";

export const getDashboard = async (userId) => {
  const [totalTrades, summary] = await Promise.all([
    Trade.countDocuments({ user: userId }),

    Trade.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          netPnL: {
            $sum: "$netPnL",
          },
        },
      },
    ]),
  ]);

  return {
    summary: {
      totalTrades,
      netPnL: summary[0]?.netPnL ?? 0,
    },
  };
};
