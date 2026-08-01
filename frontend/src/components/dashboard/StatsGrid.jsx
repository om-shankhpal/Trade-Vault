import StatsCard from "./StatsCard";

function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Total Trades"
        value="126"
      />

      <StatsCard
        title="Win Rate"
        value="62%"
      />

      <StatsCard
        title="Net P&L"
        value="₹28,540"
      />

      <StatsCard
        title="Average R"
        value="1.84R"
      />

    </div>
  );
}

export default StatsGrid;