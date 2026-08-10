function StatsCard({
  title,
  value,
  icon: Icon,
  badgeText,
  badgeColor = "neutral",
}) {
  const getBadgeStyle = () => {
    if (badgeColor === "success") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (badgeColor === "danger") {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }

    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    <div className="flex min-h-[210px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">
          {title}
        </p>

        {Icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
            <Icon size={22} strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mt-auto">
        <h3 className="truncate text-4xl font-bold tracking-tight text-slate-950">
          {value}
        </h3>

        {/* Badge */}
        {badgeText && (
          <div className="mt-4">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getBadgeStyle()}`}
            >
              {badgeText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCard;