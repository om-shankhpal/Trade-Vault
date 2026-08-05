import AnalyticsCard from "./AnalyticsCard";

function StrategyPerformance({ strategies = [] }) {
  if (strategies.length === 0) {
    return (
      <AnalyticsCard title="Strategy Performance">
        <div className="flex h-64 items-center justify-center text-slate-500">
          No strategy data available.
        </div>
      </AnalyticsCard>
    );
  }

  const maxPnL = Math.max(
    ...strategies.map((strategy) => Math.abs(strategy.netPnL)),
    1
  );

  return (
    <AnalyticsCard title="Strategy Performance">
      <div className="space-y-6">
        {strategies.map((strategy) => {
          const percentage =
            (Math.abs(strategy.netPnL) / maxPnL) * 100;

          const positive = strategy.netPnL >= 0;

          return (
            <div key={strategy.strategy}>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    {strategy.strategy}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {strategy.trades} Trades • {strategy.winRate}% Win Rate
                  </p>
                </div>

                <span
                  className={`font-semibold ${
                    positive
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹{strategy.netPnL.toLocaleString()}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all ${
                    positive
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AnalyticsCard>
  );
}

export default StrategyPerformance;