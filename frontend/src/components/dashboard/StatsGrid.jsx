import StatsCard from "./StatsCard";

function StatsGrid({ dashboard }) {
  const summary = dashboard.summary;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Total Trades"
        value={summary.totalTrades}
      />

      <StatsCard
        title="Win Rate"
        value={`${summary.winRate}%`}
      />

      <StatsCard
        title="Net P&L"
        value={`₹${summary.netPnL.toLocaleString()}`}
      />

      <StatsCard
        title="Average R"
        value={`${summary.averageR}R`}
      />

    </div>
  );
}

export default StatsGrid;