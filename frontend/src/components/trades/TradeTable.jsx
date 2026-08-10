import TradeRow from "./TradeRow";
import { BookOpen } from "lucide-react";

function TradeTable({ trades = [], onDelete }) {
  if (trades.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <BookOpen className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-slate-900">
          No trades match your criteria
        </h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          Try adjusting your search terms or filters to find specific trades.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/80 uppercase tracking-wider text-slate-500 font-semibold">
            <tr>
              <th className="px-5 py-3.5">Date</th>
              <th className="px-5 py-3.5">Symbol</th>
              <th className="px-5 py-3.5">Direction</th>
              <th className="px-5 py-3.5">Strategy</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Net P&L</th>
              <th className="px-5 py-3.5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium">
            {trades.map((trade) => (
              <TradeRow
                key={trade.id || trade._id}
                trade={trade}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradeTable;