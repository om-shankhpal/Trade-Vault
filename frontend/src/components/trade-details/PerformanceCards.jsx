function Card({ title, value, color = "text-slate-900", badge }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        {badge && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            {badge}
          </span>
        )}
      </div>

      <h3 className={`mt-3 text-2xl font-bold tracking-tight ${color}`}>
        {value}
      </h3>
    </div>
  );
}

function PerformanceCards({ trade }) {
  const grossPnL = trade.grossPnL ?? 0;
  const netPnL = trade.netPnL ?? 0;
  const isNetPositive = netPnL >= 0;
  const isGrossPositive = grossPnL >= 0;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card
        title="Gross P&L"
        value={`₹${grossPnL.toLocaleString()}`}
        color={isGrossPositive ? "text-emerald-600" : "text-rose-600"}
      />

      <Card
        title="Total Charges"
        value={`₹${trade.charges ?? 0}`}
        color="text-slate-700"
      />

      <Card
        title="Net P&L"
        value={`₹${netPnL.toLocaleString()}`}
        color={isNetPositive ? "text-emerald-600" : "text-rose-600"}
        badge={isNetPositive ? "PROFIT" : "LOSS"}
      />

      <Card
        title="R Multiple"
        value={`${trade.rMultiple ?? 0}R`}
        color="text-slate-900"
        badge="Risk"
      />
    </div>
  );
}

export default PerformanceCards;