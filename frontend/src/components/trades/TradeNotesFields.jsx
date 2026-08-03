function TradeNotesFields({ formData, handleChange }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Notes
      </h2>

      <div className="space-y-6">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Mistakes
          </label>

          <textarea
            rows={3}
            value={formData.mistakes}
            onChange={(e) =>
              handleChange("mistakes", e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Notes
          </label>

          <textarea
            rows={5}
            value={formData.notes}
            onChange={(e) =>
              handleChange("notes", e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />

        </div>

      </div>

    </div>
  );
}

export default TradeNotesFields;