function TradePsychologyFields({ formData, handleChange }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Trade Psychology
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Emotion at Entry
          </label>

          <input
            type="text"
            placeholder="Confident"
            value={formData.emotionEntry}
            onChange={(e) =>
              handleChange("emotionEntry", e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Emotion During Trade
          </label>

          <input
            type="text"
            placeholder="Calm"
            value={formData.emotionDuring}
            onChange={(e) =>
              handleChange("emotionDuring", e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Emotion at Exit
          </label>

          <input
            type="text"
            placeholder="Satisfied"
            value={formData.emotionExit}
            onChange={(e) =>
              handleChange("emotionExit", e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-3 pt-8">

          <input
            id="rulesFollowed"
            type="checkbox"
            checked={formData.rulesFollowed}
            onChange={(e) =>
              handleChange("rulesFollowed", e.target.checked)
            }
          />

          <label htmlFor="rulesFollowed">
            Rules Followed
          </label>

        </div>

      </div>

    </div>
  );
}

export default TradePsychologyFields;