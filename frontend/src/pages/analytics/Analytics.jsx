import EquityCurveChart from "../../components/analytics/EquityCurveChart";

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
    </div>
  );
}

export default Analytics;