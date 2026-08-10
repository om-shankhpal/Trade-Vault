function DetailSection({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">{children}</div>
    </div>
  );
}

export default DetailSection;