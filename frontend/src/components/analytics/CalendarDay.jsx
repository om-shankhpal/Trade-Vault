function CalendarDay({ day, trade }) {
  if (!day) {
    return <div className="aspect-square opacity-0" />;
  }

  let classes =
    "aspect-square rounded-lg border flex flex-col items-center justify-center transition";

  if (!trade) {
    classes += " border-slate-200 bg-white";
  } else if (trade.netPnL > 0) {
    classes += " border-green-300 bg-green-100";
  } else if (trade.netPnL < 0) {
    classes += " border-red-300 bg-red-100";
  } else {
    classes += " border-yellow-300 bg-yellow-100";
  }

  return (
    <div className={classes}>
      <span className="text-sm font-semibold">
        {day}
      </span>

      {trade && (
        <div
          className={`mt-1 h-2 w-2 rounded-full ${
            trade.netPnL >= 0
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        />
      )}
    </div>
  );
}

export default CalendarDay;