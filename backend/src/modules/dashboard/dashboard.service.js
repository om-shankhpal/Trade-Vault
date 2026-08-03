import mongoose from "mongoose";
import Trade from "../trades/trade.model.js";

export const getDashboard = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const [
    totalTrades,
    summary,
    monthlyPnL,
    strategyPerformance,
    recentTrades,
  ] = await Promise.all([
    Trade.countDocuments({
      user: userObjectId,
    }),

    Trade.aggregate([
      {
        $match: {
          user: userObjectId,
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

          breakevens: {
            $sum: {
              $cond: [{ $eq: ["$status", "BREAKEVEN"] }, 1, 0],
            },
          },

          grossProfit: {
            $sum: {
              $cond: [
                { $gt: ["$netPnL", 0] },
                "$netPnL",
                0,
              ],
            },
          },

          grossLoss: {
            $sum: {
              $cond: [
                { $lt: ["$netPnL", 0] },
                { $abs: "$netPnL" },
                0,
              ],
            },
          },

          totalWinningPnL: {
            $sum: {
              $cond: [
                { $gt: ["$netPnL", 0] },
                "$netPnL",
                0,
              ],
            },
          },

          totalLosingPnL: {
            $sum: {
              $cond: [
                { $lt: ["$netPnL", 0] },
                "$netPnL",
                0,
              ],
            },
          },

          largestWin: {
            $max: "$netPnL",
          },

          largestLoss: {
            $min: "$netPnL",
          },
        },
      },
    ]),

    Trade.aggregate([
      {
        $match: {
          user: userObjectId,
        },
      },

      {
        $group: {
          _id: {
            year: {
              $year: "$tradeDate",
            },

            month: {
              $month: "$tradeDate",
            },
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

    Trade.aggregate([
      {
        $match: {
          user: userObjectId,
          strategy: {
            $exists: true,
            $ne: "",
          },
        },
      },

      {
        $group: {
          _id: "$strategy",

          trades: {
            $sum: 1,
          },

          wins: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "WIN"],
                },
                1,
                0,
              ],
            },
          },

          losses: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "LOSS"],
                },
                1,
                0,
              ],
            },
          },

          netPnL: {
            $sum: "$netPnL",
          },

          totalR: {
            $sum: "$rMultiple",
          },
        },
      },

      {
        $sort: {
          netPnL: -1,
        },
      },
    ]),

    Trade.find({
      user: userObjectId,
    })
      .sort({
        tradeDate: -1,
        createdAt: -1,
      })
      .limit(5)
      .select(
        "symbol tradeDate status netPnL strategy direction segment"
      )
      .lean(),
  ]);

   const stats = summary[0] || {
    netPnL: 0,
    totalR: 0,
    wins: 0,
    losses: 0,
    breakevens: 0,
    grossProfit: 0,
    grossLoss: 0,
    totalWinningPnL: 0,
    totalLosingPnL: 0,
    largestWin: 0,
    largestLoss: 0,
  };

  const winRate =
    totalTrades === 0
      ? 0
      : Number(((stats.wins / totalTrades) * 100).toFixed(2));

  const averageR =
    totalTrades === 0
      ? 0
      : Number((stats.totalR / totalTrades).toFixed(2));

  const profitFactor =
    stats.grossLoss === 0
      ? stats.grossProfit
      : Number((stats.grossProfit / stats.grossLoss).toFixed(2));

  const averageWinningTrade =
    stats.wins === 0
      ? 0
      : Number((stats.totalWinningPnL / stats.wins).toFixed(2));

  const averageLosingTrade =
    stats.losses === 0
      ? 0
      : Number((stats.totalLosingPnL / stats.losses).toFixed(2));

  const expectancy =
    totalTrades === 0
      ? 0
      : Number((stats.netPnL / totalTrades).toFixed(2));

  const monthlyPerformance = monthlyPnL.map((item) => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
    netPnL: item.netPnL,
    trades: item.trades,
  }));

  const strategyStats = strategyPerformance.map((item) => ({
    strategy: item._id,
    trades: item.trades,
    wins: item.wins,
    losses: item.losses,
    winRate: Number(((item.wins / item.trades) * 100).toFixed(2)),
    netPnL: item.netPnL,
    averageR: Number((item.totalR / item.trades).toFixed(2)),
  }));

  return {
    summary: {
      totalTrades,

      wins: stats.wins,

      losses: stats.losses,

      breakevens: stats.breakevens,

      winRate,

      netPnL: Number(stats.netPnL.toFixed(2)),

      averageR,

      profitFactor,

      expectancy,

      averageWinningTrade,

      averageLosingTrade,

      largestWin: Number(stats.largestWin.toFixed(2)),

      largestLoss: Number(stats.largestLoss.toFixed(2)),
    },

    monthlyPnL: monthlyPerformance,

    strategyPerformance: strategyStats,

    recentTrades,
  };
};

export const getEquityCurve = async (userId) => {
  const trades = await Trade.find({
    user: new mongoose.Types.ObjectId(userId),
  })
    .sort({
      tradeDate: 1,
      createdAt: 1,
    })
    .select("tradeDate symbol netPnL")
    .lean();

  let runningEquity = 0;

  return trades.map((trade) => {
    runningEquity += trade.netPnL;

    return {
      tradeDate: trade.tradeDate,
      symbol: trade.symbol,
      netPnL: trade.netPnL,
      equity: Number(runningEquity.toFixed(2)),
    };
  });
};

export const getTradingHeatmap = async (userId) => {
  const heatmap = await Trade.aggregate([
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
          day: { $dayOfMonth: "$tradeDate" },
        },

        trades: {
          $sum: 1,
        },

        netPnL: {
          $sum: "$netPnL",
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      },
    },
  ]);

  return heatmap.map((item) => ({
    date: `${item._id.year}-${String(item._id.month).padStart(2, "0")}-${String(item._id.day).padStart(2, "0")}`,
    trades: item.trades,
    netPnL: item.netPnL,
  }));
};