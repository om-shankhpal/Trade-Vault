import { Info } from "lucide-react";
import {
  TRADE_SEGMENTS,
  TRADE_DIRECTIONS,
} from "../../constants/trade.constants";

function BasicTradeFields({
  formData,
  handleChange,
  errors = {},
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Info className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Basic Trade Information & Execution
          </h2>
          <p className="text-xs text-slate-500">
            Key trade parameters, timestamps, prices, and lot sizing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Trade Date */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Trade Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            value={formData.tradeDate}
            onChange={(e) => handleChange("tradeDate", e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none transition ${
              errors.tradeDate
                ? "border-rose-500 bg-rose-50/30 focus:ring-1 focus:ring-rose-500"
                : "border-slate-200 bg-slate-50/50 focus:border-slate-400 focus:bg-white"
            }`}
          />
          {errors.tradeDate && (
            <p className="mt-1 text-[11px] font-medium text-rose-500">
              {errors.tradeDate}
            </p>
          )}
        </div>

        {/* Symbol */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Symbol <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => handleChange("symbol", e.target.value)}
            placeholder="e.g. NIFTY, AAPL"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs uppercase outline-none transition ${
              errors.symbol
                ? "border-rose-500 bg-rose-50/30 focus:ring-1 focus:ring-rose-500"
                : "border-slate-200 bg-slate-50/50 focus:border-slate-400 focus:bg-white"
            }`}
          />
          {errors.symbol && (
            <p className="mt-1 text-[11px] font-medium text-rose-500">
              {errors.symbol}
            </p>
          )}
        </div>

        {/* Segment */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Segment <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.segment}
            onChange={(e) => handleChange("segment", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          >
            {TRADE_SEGMENTS.map((segment) => (
              <option key={segment} value={segment}>
                {segment}
              </option>
            ))}
          </select>
        </div>

        {/* Direction */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Direction <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.direction}
            onChange={(e) => handleChange("direction", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          >
            {TRADE_DIRECTIONS.map((direction) => (
              <option key={direction} value={direction}>
                {direction}
              </option>
            ))}
          </select>
        </div>

        {/* Entry Time */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Entry Time <span className="text-rose-500">*</span>
          </label>
          <input
            type="time"
            value={formData.entryTime}
            onChange={(e) => handleChange("entryTime", e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none transition ${
              errors.entryTime
                ? "border-rose-500 bg-rose-50/30 focus:ring-1 focus:ring-rose-500"
                : "border-slate-200 bg-slate-50/50 focus:border-slate-400 focus:bg-white"
            }`}
          />
          {errors.entryTime && (
            <p className="mt-1 text-[11px] font-medium text-rose-500">
              {errors.entryTime}
            </p>
          )}
        </div>

        {/* Exit Time */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Exit Time <span className="text-rose-500">*</span>
          </label>
          <input
            type="time"
            value={formData.exitTime}
            onChange={(e) => handleChange("exitTime", e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none transition ${
              errors.exitTime
                ? "border-rose-500 bg-rose-50/30 focus:ring-1 focus:ring-rose-500"
                : "border-slate-200 bg-slate-50/50 focus:border-slate-400 focus:bg-white"
            }`}
          />
          {errors.exitTime && (
            <p className="mt-1 text-[11px] font-medium text-rose-500">
              {errors.exitTime}
            </p>
          )}
        </div>

        {/* Entry Price */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Entry Price <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.entryPrice}
            onChange={(e) => handleChange("entryPrice", e.target.value)}
            placeholder="0.00"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none transition ${
              errors.entryPrice
                ? "border-rose-500 bg-rose-50/30 focus:ring-1 focus:ring-rose-500"
                : "border-slate-200 bg-slate-50/50 focus:border-slate-400 focus:bg-white"
            }`}
          />
          {errors.entryPrice && (
            <p className="mt-1 text-[11px] font-medium text-rose-500">
              {errors.entryPrice}
            </p>
          )}
        </div>

        {/* Exit Price */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Exit Price <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.exitPrice}
            onChange={(e) => handleChange("exitPrice", e.target.value)}
            placeholder="0.00"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none transition ${
              errors.exitPrice
                ? "border-rose-500 bg-rose-50/30 focus:ring-1 focus:ring-rose-500"
                : "border-slate-200 bg-slate-50/50 focus:border-slate-400 focus:bg-white"
            }`}
          />
          {errors.exitPrice && (
            <p className="mt-1 text-[11px] font-medium text-rose-500">
              {errors.exitPrice}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Quantity / Shares <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            placeholder="1"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none transition ${
              errors.quantity
                ? "border-rose-500 bg-rose-50/30 focus:ring-1 focus:ring-rose-500"
                : "border-slate-200 bg-slate-50/50 focus:border-slate-400 focus:bg-white"
            }`}
          />
          {errors.quantity && (
            <p className="mt-1 text-[11px] font-medium text-rose-500">
              {errors.quantity}
            </p>
          )}
        </div>

        {/* Charges */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Charges / Fees{" "}
            <span className="text-[10px] font-normal text-slate-400 uppercase">
              (Optional)
            </span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.charges}
            onChange={(e) => handleChange("charges", e.target.value)}
            placeholder="120"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
}

export default BasicTradeFields;