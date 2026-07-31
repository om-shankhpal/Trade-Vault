import mongoose from "mongoose";
import Trade from "../trades/trade.model.js";

export const getDashboard = async (userId) => {
  const [totalTrades, summary, monthlyPnL] = await Promise.all([
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

          totalR: {
            $sum: "$rMultiple",
          },

          wins: {
            $sum: {
              $cond: [{ $eq: ["$status", "WIN"] }, 1, 0],
            },
          },

          losses: {
            $sum: {
              $cond: [{ $eq: ["$status", "LOSS"] }, 1, 0],
            },
          },

          grossProfit: {
            $sum: {
              $cond: [{ $gt: ["$netPnL", 0] }, "$netPnL", 0],
            },
          },

          grossLoss: {
            $sum: {
              $cond: [{ $lt: ["$netPnL", 0] }, { $abs: "$netPnL" }, 0],
            },
          },
        },
      },
    ]),
    Trade.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$tradeDate" },
            month: { $month: "$tradeDate" },
          },

          netPnL: {
            $sum: "$netPnL",
          },

          trades: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),
  ]);

  const stats = summary[0] || {
    netPnL: 0,
    totalR: 0,
    wins: 0,
    losses: 0,
    grossProfit: 0,
    grossLoss: 0,
  };

  const winRate =
    totalTrades === 0
      ? 0
      : Number(((stats.wins / totalTrades) * 100).toFixed(2));

  const averageR =
    totalTrades === 0 ? 0 : Number((stats.totalR / totalTrades).toFixed(2));

  const profitFactor =
    stats.grossLoss === 0
      ? stats.grossProfit
      : Number((stats.grossProfit / stats.grossLoss).toFixed(2));

  const monthlyPerformance = monthlyPnL.map((item) => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
    netPnL: item.netPnL,
    trades: item.trades,
  }));

  return {
    summary: {
      totalTrades,
      netPnL: stats.netPnL,
      winRate,
      averageR,
      profitFactor,
    },

    monthlyPnL: monthlyPerformance,
  };
};
