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
      <AnalyticsCard title="Equity Curve">
        Loading...
      </AnalyticsCard>
    );
  }

  return (
    <AnalyticsCard title="Equity Curve">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={equityCurve}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="tradeDate"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString()
              }
            />

            <YAxis />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Equity"]}
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString()
              }
            />

            <Line
              dataKey="equity"
              type="monotone"
              stroke="#2563eb"
              strokeWidth={3}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}

export default EquityCurveChart;