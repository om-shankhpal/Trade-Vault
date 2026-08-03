import {
  TRADE_SEGMENTS,
  TRADE_DIRECTIONS,
} from "../../constants/trade.constants";

function BasicTradeFields({ formData, handleChange }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Basic Trade Information</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Trade Date</label>

          <input
            type="date"
            value={formData.tradeDate}
            onChange={(e) => handleChange("tradeDate", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Symbol</label>

          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => handleChange("symbol", e.target.value)}
            placeholder="NIFTY"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Segment</label>
          <select
            value={formData.segment}
            onChange={(e) => handleChange("segment", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            {TRADE_SEGMENTS.map((segment) => (
              <option key={segment} value={segment}>
                {segment}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Direction</label>

          <select
            value={formData.direction}
            onChange={(e) => handleChange("direction", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            {TRADE_DIRECTIONS.map((direction) => (
              <option key={direction} value={direction}>
                {direction}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Entry Time</label>

          <input
            type="time"
            value={formData.entryTime}
            onChange={(e) => handleChange("entryTime", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Exit Time</label>

          <input
            type="time"
            value={formData.exitTime}
            onChange={(e) => handleChange("exitTime", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Entry Price</label>

          <input
            type="number"
            value={formData.entryPrice}
            onChange={(e) => handleChange("entryPrice", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Exit Price</label>

          <input
            type="number"
            value={formData.exitPrice}
            onChange={(e) => handleChange("exitPrice", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Quantity</label>

          <input
            type="number"
            min="1"
            value={formData.quantity}
            placeholder="100"
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Charges/Taxes
            </label>

            <input
              type="number"
              step="0.01"
              value={formData.charges}
              placeholder="120"
              onChange={(e) => handleChange("charges", e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicTradeFields;
