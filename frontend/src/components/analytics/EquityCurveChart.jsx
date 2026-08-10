import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useEquityCurve from "../../hooks/useEquityCurve";
import AnalyticsCard from "./AnalyticsCard";

function EquityCurveChart() {
  const { equityCurve, loading } = useEquityCurve();

  if (loading) {
    return (
      <AnalyticsCard title="Cumulative Equity Curve">
        <div className="flex h-80 items-center justify-center text-xs text-slate-400 animate-pulse">
          Loading equity curve data...
        </div>
      </AnalyticsCard>
    );
  }

  return (
    <AnalyticsCard title="Cumulative Equity Curve">
      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={equityCurve}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis
              dataKey="tradeDate"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "12px",
              }}
              formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Equity"]}
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }
            />

            <Line
              dataKey="equity"
              type="monotone"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 3, fill: "#059669" }}
              activeDot={{ r: 6, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}

export default EquityCurveChart;