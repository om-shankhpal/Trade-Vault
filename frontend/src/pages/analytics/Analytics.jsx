import EquityCurveChart from "../../components/analytics/EquityCurveChart";
import MonthlyPnLChart from "../../components/analytics/MonthlyPnLChart";
import TradingCalendar from "../../components/analytics/TradingCalendar";
import StrategyPerformance from "../../components/analytics/StrategyPerformance";

import useDashboard from "../../hooks/useDashboard";

function Analytics() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 rounded-xl bg-slate-200" />
        <div className="h-80 rounded-2xl bg-slate-200" />
        <div className="h-80 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Performance Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          In-depth analysis of cumulative growth, monthly returns, and strategy breakdown.
        </p>
      </div>

      <EquityCurveChart />

      <MonthlyPnLChart />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <TradingCalendar />

        <StrategyPerformance
          strategies={dashboard?.strategyPerformance || []}
        />
      </div>
    </div>
  );
}

export default Analytics;