import TradeActions from "./TradeActions";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function TradeRow({ trade, onDelete }) {
  const netPnL = trade.netPnL ?? 0;
  const isPositive = netPnL >= 0;

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
    <tr className="transition hover:bg-slate-50/80">
      <td className="px-5 py-4 text-slate-600 font-mono text-[11px]">
        {trade.tradeDate
          ? new Date(trade.tradeDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "—"}
      </td>

      <td className="px-5 py-4 font-bold text-slate-900">
        {trade.symbol}
      </td>

      <td className="px-5 py-4">
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

      <td className="px-5 py-4 text-slate-600">
        {trade.strategy || "—"}
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadge(
            trade.status
          )}`}
        >
          {trade.status}
        </span>
      </td>

      <td
        className={`px-5 py-4 text-right font-bold ${
          isPositive ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {isPositive ? "+" : ""}₹{netPnL.toLocaleString()}
      </td>

      <td className="px-5 py-4 text-center">
        <TradeActions
          tradeId={trade.id || trade._id}
          onDelete={() => onDelete(trade)}
        />
      </td>
    </tr>
  );
}

export default TradeRow;