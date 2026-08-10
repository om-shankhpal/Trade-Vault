function AnalyticsCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default AnalyticsCard;