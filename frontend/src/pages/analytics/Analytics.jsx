import EquityCurveChart from "../../components/analytics/EquityCurveChart";
import MonthlyPnLChart from "../../components/analytics/MonthlyPnLChart";
import TradingCalendar from "../../components/analytics/TradingCalendar";
import StrategyPerformance from "../../components/analytics/StrategyPerformance";

function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Analyze your trading performance.
        </p>
      </div>

      <EquityCurveChart />

      <MonthlyPnLChart />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <TradingCalendar />

        <StrategyPerformance />
      </div>
    </div>
  );
}

export default Analytics;