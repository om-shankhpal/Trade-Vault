function TradePlanFields({ formData, handleChange }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Trade Plan
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Planned Stop Loss
          </label>

          <input
            type="number"
            value={formData.plannedStopLoss}
            onChange={(e) =>
              handleChange("plannedStopLoss", e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Planned Target
          </label>

          <input
            type="number"
            value={formData.plannedTarget}
            onChange={(e) =>
              handleChange("plannedTarget", e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Strategy
          </label>

          <input
            type="text"
            placeholder="ORB"
            value={formData.strategy}
            onChange={(e) =>
              handleChange("strategy", e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Market Condition
          </label>

          <input
            type="text"
            placeholder="Trending"
            value={formData.marketCondition}
            onChange={(e) =>
              handleChange("marketCondition", e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

      </div>

    </div>
  );
}

export default TradePlanFields;