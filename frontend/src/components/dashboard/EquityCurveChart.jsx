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

function EquityCurveChart() {
  const { equityCurve, loading } = useEquityCurve();

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        Loading equity curve...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Equity Curve
      </h2>

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
              type="monotone"
              dataKey="equity"
              stroke="#2563eb"
              strokeWidth={3}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EquityCurveChart;