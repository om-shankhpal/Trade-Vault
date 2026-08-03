function Card({ title, value, color }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className={`mt-2 text-2xl font-bold ${color}`}>
        {value}
      </h3>
    </div>
  );
}

function PerformanceCards({ trade }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      <Card
        title="Gross P&L"
        value={`₹${trade.grossPnL.toLocaleString()}`}
        color={trade.grossPnL >= 0 ? "text-green-600" : "text-red-600"}
      />

      <Card
        title="Charges"
        value={`₹${trade.charges}`}
      />

      <Card
        title="Net P&L"
        value={`₹${trade.netPnL.toLocaleString()}`}
        color={trade.netPnL >= 0 ? "text-green-600" : "text-red-600"}
      />

      <Card
        title="R Multiple"
        value={trade.rMultiple}
      />
    </div>
  );
}

export default PerformanceCards;