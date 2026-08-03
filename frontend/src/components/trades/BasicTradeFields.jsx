function BasicTradeFields({ formData, handleChange }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Basic Trade Information
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Trade Date
          </label>

          <input
            type="date"
            value={formData.tradeDate}
            onChange={(e) => handleChange("tradeDate", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Symbol
          </label>

          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => handleChange("symbol", e.target.value)}
            placeholder="NIFTY"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Segment
          </label>

          <select
            value={formData.segment}
            onChange={(e) => handleChange("segment", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="FUTURES">FUTURES</option>
            <option value="OPTIONS">OPTIONS</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Direction
          </label>

          <select
            value={formData.direction}
            onChange={(e) => handleChange("direction", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Entry Time
          </label>

          <input
            type="datetime-local"
            value={formData.entryTime}
            onChange={(e) => handleChange("entryTime", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Exit Time
          </label>

          <input
            type="datetime-local"
            value={formData.exitTime}
            onChange={(e) => handleChange("exitTime", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Entry Price
          </label>

          <input
            type="number"
            value={formData.entryPrice}
            onChange={(e) => handleChange("entryPrice", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Exit Price
          </label>

          <input
            type="number"
            value={formData.exitPrice}
            onChange={(e) => handleChange("exitPrice", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Quantity
          </label>

          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

      </div>

    </div>
  );
}

export default BasicTradeFields;