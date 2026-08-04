import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import AnalyticsCard from "./AnalyticsCard";
import useMonthlyPnL from "../../hooks/useMonthlyPnL";

function MonthlyPnLChart() {
  const { monthlyPnL, loading } = useMonthlyPnL();

  if (loading) {
    return (
      <AnalyticsCard title="Monthly P&L">
        Loading...
      </AnalyticsCard>
    );
  }

  return (
    <AnalyticsCard title="Monthly P&L">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyPnL}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Net P&L"]}
            />

            <Bar
              dataKey="netPnL"
              fill="#22c55e"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}

export default MonthlyPnLChart;