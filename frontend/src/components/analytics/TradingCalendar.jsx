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
        Loading...
      </AnalyticsCard>
    );
  }

  return (
    <AnalyticsCard title="Trading Calendar">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={previousMonth}
          className="rounded-lg border px-3 py-1 hover:bg-slate-100"
        >
          ←
        </button>

        <h3 className="font-semibold">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={nextMonth}
          className="rounded-lg border px-3 py-1 hover:bg-slate-100"
        >
          →
        </button>
      </div>

      <div className="mb-3 grid grid-cols-7 text-center text-sm font-semibold text-slate-500">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
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
              bg = "bg-green-100 border-green-300";
            } else if (trade.netPnL < 0) {
              bg = "bg-red-100 border-red-300";
            } else {
              bg = "bg-yellow-100 border-yellow-300";
            }
          }

          return (
            <div
              key={day}
              title={
                trade
                  ? `${trade.date}

Trades: ${trade.trades}

Net P&L: ₹${trade.netPnL}`
                  : "No Trades"
              }
              className={`${bg} aspect-square rounded-lg border transition hover:scale-105`}
            >
              <div className="flex h-full flex-col items-center justify-center">
                <span className="font-medium">{day}</span>

                {trade && (
                  <span className="mt-1 text-xs font-semibold">
                    {trade.netPnL > 0 ? "+" : ""}
                    ₹{Math.round(trade.netPnL)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-5 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-green-300"></div>
          Profit
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-red-300"></div>
          Loss
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-yellow-300"></div>
          Breakeven
        </div>
      </div>
    </AnalyticsCard>
  );
}

export default TradingCalendar;