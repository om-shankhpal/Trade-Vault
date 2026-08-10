import AnalyticsCard from "./AnalyticsCard";
import { Target } from "lucide-react";

function StrategyPerformance({ strategies = [] }) {
  if (strategies.length === 0) {
    return (
      <AnalyticsCard title="Strategy Performance">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <Target className="h-5 w-5" />
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-700">No strategy breakdown available</p>
          <p className="mt-1 text-[11px] text-slate-400 max-w-xs">
            Log trades with strategy tags to view performance stats per setup.
          </p>
        </div>
      </AnalyticsCard>
    );
  }

  const maxPnL = Math.max(
    ...strategies.map((strategy) => Math.abs(strategy.netPnL)),
    1
  );

  return (
    <AnalyticsCard title="Strategy Performance Breakdown">
      <div className="space-y-5">
        {strategies.map((strategy) => {
          const percentage = (Math.abs(strategy.netPnL) / maxPnL) * 100;
          const positive = strategy.netPnL >= 0;

          return (
            <div key={strategy.strategy} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    {strategy.strategy}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {strategy.trades} Trades · {strategy.winRate}% Win Rate
                  </p>
                </div>

                <span
                  className={`text-xs font-bold ${
                    positive ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {positive ? "+" : ""}₹{strategy.netPnL.toLocaleString()}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    positive ? "bg-emerald-500" : "bg-rose-500"
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