import { Target } from "lucide-react";

function TradePlanFields({ formData, handleChange }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Target className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Trade Plan & Strategy
          </h2>
          <p className="text-xs text-slate-500">
            Pre-defined risk parameters, setup strategy, and market conditions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Planned Stop Loss
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.plannedStopLoss}
            onChange={(e) => handleChange("plannedStopLoss", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Planned Target
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.plannedTarget}
            onChange={(e) => handleChange("plannedTarget", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Strategy
          </label>
          <input
            type="text"
            placeholder="e.g. ORB, Breakout, Pullback"
            value={formData.strategy}
            onChange={(e) => handleChange("strategy", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Market Condition
          </label>
          <input
            type="text"
            placeholder="e.g. Trending, Ranging, Volatile"
            value={formData.marketCondition}
            onChange={(e) => handleChange("marketCondition", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
}

export default TradePlanFields;