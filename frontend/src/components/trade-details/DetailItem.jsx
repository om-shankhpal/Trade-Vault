function DetailItem({ label, value }) {
  const displayValue = value === null || value === undefined || value === "" ? "—" : value;

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">
        {displayValue}
      </p>
    </div>
  );
}

export default DetailItem;