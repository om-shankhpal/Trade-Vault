import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import AnalyticsCard from "./AnalyticsCard";
import useMonthlyPnL from "../../hooks/useMonthlyPnL";

function MonthlyPnLChart() {
  const { monthlyPnL, loading } = useMonthlyPnL();

  if (loading) {
    return (
      <AnalyticsCard title="Monthly P&L Distribution">
        <div className="flex h-80 items-center justify-center text-xs text-slate-400 animate-pulse">
          Loading monthly P&L data...
        </div>
      </AnalyticsCard>
    );
  }

  return (
    <AnalyticsCard title="Monthly P&L Distribution">
      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyPnL}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />

            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "12px",
              }}
              formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Net P&L"]}
            />

            <Bar dataKey="netPnL" radius={[6, 6, 0, 0]}>
              {monthlyPnL.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.netPnL >= 0 ? "#10b981" : "#f43f5e"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}

export default MonthlyPnLChart;