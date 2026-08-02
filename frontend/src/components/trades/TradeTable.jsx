import TradeRow from "./TradeRow";

function TradeTable({ trades }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Date</th>

            <th className="p-4 text-left">Symbol</th>

            <th className="p-4 text-left">Direction</th>

            <th className="p-4 text-left">Strategy</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Net P&L</th>

            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((trade) => (
            <TradeRow key={trade.id} trade={trade} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeTable;
