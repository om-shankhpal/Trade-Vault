import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, BookOpen, ChevronRight } from "lucide-react";

function RecentTrades({ trades = [] }) {
  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "WIN":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "LOSS":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getDirectionBadge = (direction) => {
    return direction?.toUpperCase() === "LONG"
      ? "bg-teal-50 text-teal-700 border-teal-200"
      : "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Recent Trades
          </h2>
          <p className="text-xs text-slate-500">
            Your latest recorded trade executions
          </p>
        </div>

        <Link
          to="/trades"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 transition"
        >
          <span>View all journal</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {trades.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">No trades recorded yet</p>
          <p className="mt-1 text-xs text-slate-500 max-w-xs">
            Start logging your completed trades to see performance metrics.
          </p>
          <Link
            to="/trades/new"
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
          >
            Record First Trade
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50/50 uppercase tracking-wider text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-3.5">Symbol</th>
                <th className="px-6 py-3.5">Direction</th>
                <th className="px-6 py-3.5">Strategy</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Net P&L</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              {trades.map((trade) => {
                const netPnL = trade.netPnL ?? 0;
                const isPositive = netPnL >= 0;

                return (
                  <tr
                    key={trade._id || trade.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {trade.symbol}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getDirectionBadge(
                          trade.direction
                        )}`}
                      >
                        {trade.direction === "LONG" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {trade.direction}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {trade.strategy || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadge(
                          trade.status
                        )}`}
                      >
                        {trade.status}
                      </span>
                    </td>

                    <td
                      className={`px-6 py-4 text-right font-bold ${
                        isPositive ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {isPositive ? "+" : ""}₹{netPnL.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentTrades;