import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";
import useHeatmap from "../../hooks/useHeatmap";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function TradingCalendar() {
  const { heatmap, loading } = useHeatmap();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const tradeMap = useMemo(() => {
    const map = {};
    (heatmap || []).forEach((trade) => {
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
      <AnalyticsCard title="Trading Heatmap Calendar">
        <div className="flex h-72 items-center justify-center text-xs text-slate-400 animate-pulse">
          Loading calendar heatmap...
        </div>
      </AnalyticsCard>
    );
  }

  return (
    <AnalyticsCard title="Trading Heatmap Calendar">
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={previousMonth}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <h3 className="text-sm font-bold text-slate-800">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {weekDays.map((weekday) => (
          <div key={weekday} className="py-1">{weekday}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, index) => {
          if (day === null) {
            return <div key={index} className="aspect-square" />;
          }

          const date = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;

          const trade = tradeMap[date];

          let bg = "bg-slate-50 border-slate-200 text-slate-700";

          if (trade) {
            if (trade.netPnL > 0) {
              bg = "bg-emerald-100/90 border-emerald-300 text-emerald-900";
            } else if (trade.netPnL < 0) {
              bg = "bg-rose-100/90 border-rose-300 text-rose-900";
            } else {
              bg = "bg-amber-100/90 border-amber-300 text-amber-900";
            }
          }

          return (
            <div
              key={index}
              title={
                trade
                  ? `${trade.date}\nTrades Logged: ${trade.trades}\nNet P&L: ₹${trade.netPnL.toFixed(2)}`
                  : `${date}: No trades`
              }
              className={`${bg} aspect-square cursor-pointer rounded-xl border p-1 transition-all duration-200 hover:scale-105 hover:shadow-sm`}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="text-xs font-bold">{day}</span>
                {trade && (
                  <span className="mt-0.5 text-[9px] font-extrabold tracking-tighter">
                    {trade.netPnL > 0 ? "+" : ""}
                    ₹{Math.round(trade.netPnL)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-[11px] font-medium text-slate-500 border-t border-slate-100 pt-3">
        <span>No Activity</span>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-md bg-slate-100 border border-slate-200" title="No trade" />
          <span className="h-3 w-3 rounded-md bg-emerald-100 border border-emerald-300" title="Profit" />
          <span className="h-3 w-3 rounded-md bg-rose-100 border border-rose-300" title="Loss" />
        </div>
        <span>High Activity</span>
      </div>
    </AnalyticsCard>
  );
}

export default TradingCalendar;