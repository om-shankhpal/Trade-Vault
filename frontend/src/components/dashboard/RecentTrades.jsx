function RecentTrades({ trades }) {
  return (
    <div className="mt-8 rounded-xl border bg-white shadow-sm">

      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">
          Recent Trades
        </h2>
      </div>

      {trades.length === 0 ? (
        <div className="p-5 text-slate-500">
          No trades found.
        </div>
      ) : (
        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="p-4">Symbol</th>

              <th className="p-4">Direction</th>

              <th className="p-4">Strategy</th>

              <th className="p-4">Status</th>

              <th className="p-4">P&L</th>

            </tr>

          </thead>

          <tbody>

            {trades.map((trade) => (
              <tr
                key={trade._id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4">
                  {trade.symbol}
                </td>

                <td className="p-4">
                  {trade.direction}
                </td>

                <td className="p-4">
                  {trade.strategy}
                </td>

                <td className="p-4">
                  {trade.status}
                </td>

                <td
                  className={`p-4 font-semibold ${
                    trade.netPnL >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹{trade.netPnL.toLocaleString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default RecentTrades;