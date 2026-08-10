import {
  BookOpen,
  Percent,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import StatsCard from "./StatsCard";

function StatsGrid({ dashboard }) {
  const summary = dashboard?.summary || {};

  const totalTrades = summary.totalTrades ?? 0;
  const winRate = summary.winRate ?? 0;
  const netPnL = summary.netPnL ?? 0;
  const averageR = summary.averageR ?? 0;

  const isPnLPositive = netPnL >= 0;
  const isWinRateHealthy = winRate >= 50;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Trades"
        value={totalTrades}
        icon={BookOpen}
        badgeText="Lifetime"
      />

      <StatsCard
        title="Win Rate"
        value={`${winRate}%`}
        icon={Percent}
        badgeText={isWinRateHealthy ? "Profitable" : "Needs Review"}
        badgeColor={isWinRateHealthy ? "success" : "danger"}
      />

      <StatsCard
        title="Net P&L"
        value={`₹${Number(netPnL).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        icon={isPnLPositive ? TrendingUp : TrendingDown}
        badgeText={isPnLPositive ? "Profit" : "Loss"}
        badgeColor={isPnLPositive ? "success" : "danger"}
      />

      <StatsCard
        title="Average R"
        value={`${averageR}R`}
        icon={Target}
        badgeText="Risk Expectancy"
      />
    </div>
  );
}

export default StatsGrid;