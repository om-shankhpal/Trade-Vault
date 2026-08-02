import TradeActions from "./TradeActions";

function TradeRow({ trade }) {
  return (
    <tr className="border-b hover:bg-slate-50">
      <td className="p-4">{new Date(trade.tradeDate).toLocaleDateString()}</td>

      <td className="p-4 font-medium">{trade.symbol}</td>

      <td className="p-4">{trade.direction}</td>

      <td className="p-4">{trade.strategy}</td>

      <td className="p-4">{trade.status}</td>

      <td
        className={`p-4 font-semibold ${
          trade.netPnL >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        ₹{trade.netPnL.toLocaleString()}
      </td>

      <td className="p-4">
        <TradeActions tradeId={trade.id} />
      </td>
      
    </tr>
  );
}

export default TradeRow;
