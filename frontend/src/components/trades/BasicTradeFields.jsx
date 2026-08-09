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
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Basic Trade Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the essential information about the completed trade.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Trade Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Trade Date{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            value={formData.tradeDate}
            onChange={(e) =>
              handleChange("tradeDate", e.target.value)
            }
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.tradeDate
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-slate-500"
            }`}
          />

          {errors.tradeDate && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.tradeDate}
            </p>
          )}
        </div>

        {/* Symbol */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Symbol{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.symbol}
            onChange={(e) =>
              handleChange("symbol", e.target.value)
            }
            placeholder="NIFTY"
            className={`w-full rounded-lg border px-3 py-2.5 uppercase outline-none transition ${
              errors.symbol
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-slate-500"
            }`}
          />

          {errors.symbol && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.symbol}
            </p>
          )}
        </div>

        {/* Segment */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Segment{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            value={formData.segment}
            onChange={(e) =>
              handleChange("segment", e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500"
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
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Direction{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            value={formData.direction}
            onChange={(e) =>
              handleChange("direction", e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500"
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
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Entry Time{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="time"
            value={formData.entryTime}
            onChange={(e) =>
              handleChange("entryTime", e.target.value)
            }
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.entryTime
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-slate-500"
            }`}
          />

          {errors.entryTime && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.entryTime}
            </p>
          )}
        </div>

        {/* Exit Time */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Exit Time{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="time"
            value={formData.exitTime}
            onChange={(e) =>
              handleChange("exitTime", e.target.value)
            }
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.exitTime
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-slate-500"
            }`}
          />

          {errors.exitTime && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.exitTime}
            </p>
          )}
        </div>

        {/* Entry Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Entry Price{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            step="0.01"
            value={formData.entryPrice}
            onChange={(e) =>
              handleChange("entryPrice", e.target.value)
            }
            placeholder="25000"
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.entryPrice
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-slate-500"
            }`}
          />

          {errors.entryPrice && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.entryPrice}
            </p>
          )}
        </div>

        {/* Exit Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Exit Price{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            step="0.01"
            value={formData.exitPrice}
            onChange={(e) =>
              handleChange("exitPrice", e.target.value)
            }
            placeholder="25100"
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.exitPrice
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-slate-500"
            }`}
          />

          {errors.exitPrice && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.exitPrice}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Quantity{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            min="1"
            step="1"
            value={formData.quantity}
            onChange={(e) =>
              handleChange("quantity", e.target.value)
            }
            placeholder="50"
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.quantity
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-slate-500"
            }`}
          />

          {errors.quantity && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.quantity}
            </p>
          )}
        </div>

        {/* Charges */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Charges / Taxes{" "}
            <span className="ml-1 text-xs font-normal text-slate-400">
              Optional
            </span>
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.charges}
            onChange={(e) =>
              handleChange("charges", e.target.value)
            }
            placeholder="120"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500"
          />
        </div>
      </div>
    </div>
  );
}

export default BasicTradeFields;