import { useMemo, useState } from "react";
import AnalyticsCard from "./AnalyticsCard";
import useHeatmap from "../../hooks/useHeatmap";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function TradingCalendar() {
  const { heatmap, loading } = useHeatmap();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const tradeMap = useMemo(() => {
    const map = {};

    heatmap.forEach((trade) => {
      map[trade.date] = trade;
    });

    return map;
  }, [heatmap]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  if (loading) {
    return (
      <AnalyticsCard title="Trading Calendar">
        <div className="flex h-72 items-center justify-center text-slate-500">
          Loading...
        </div>
      </AnalyticsCard>
    );
  }

  return (
    <AnalyticsCard title="Trading Calendar">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={previousMonth}
          className="rounded-lg border border-slate-300 px-3 py-1 transition hover:bg-slate-100"
        >
          ←
        </button>

        <h3 className="text-lg font-semibold">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={nextMonth}
          className="rounded-lg border border-slate-300 px-3 py-1 transition hover:bg-slate-100"
        >
          →
        </button>
      </div>

      <div className="mb-3 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
        {weekDays.map((weekday) => (
          <div key={weekday}>{weekday}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={index}
                className="aspect-square"
              />
            );
          }

          const date = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;

          const trade = tradeMap[date];

          let bg = "bg-white border border-slate-200";

          if (trade) {
            if (trade.netPnL > 0) {
              bg = "bg-green-200 border-green-300";
            } else if (trade.netPnL < 0) {
              bg = "bg-red-200 border-red-300";
            } else {
              bg = "bg-yellow-200 border-yellow-300";
            }
          }

          return (
            <div
              key={index}
              title={
                trade
                  ? `${trade.date}

Trades: ${trade.trades}

Net P&L: ₹${trade.netPnL.toFixed(2)}`
                  : "No Trades"
              }
              className={`${bg} aspect-square cursor-pointer rounded-md border transition-all duration-200 hover:scale-110 hover:shadow-md`}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="text-sm font-semibold">{day}</span>

                {trade && (
                  <span className="mt-0.5 text-[10px] font-bold">
                    {trade.netPnL > 0 ? "+" : ""}
                    ₹{Math.round(trade.netPnL)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
        <span>Less</span>

        <div className="flex gap-1">
          <div className="h-3 w-3 rounded bg-slate-100"></div>
          <div className="h-3 w-3 rounded bg-green-100"></div>
          <div className="h-3 w-3 rounded bg-green-300"></div>
          <div className="h-3 w-3 rounded bg-green-500"></div>
        </div>

        <span>More</span>
      </div>
    </AnalyticsCard>
  );
}

export default TradingCalendar;