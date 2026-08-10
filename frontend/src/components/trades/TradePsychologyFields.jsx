import { Brain } from "lucide-react";

function TradePsychologyFields({ formData, handleChange }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Brain className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Trading Psychology & Discipline
          </h2>
          <p className="text-xs text-slate-500">
            Record emotional discipline and adherence to your trading rules
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Emotion at Entry
          </label>
          <input
            type="text"
            placeholder="e.g. Confident, Hesitant, FOMO"
            value={formData.emotionEntry}
            onChange={(e) => handleChange("emotionEntry", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Emotion During Trade
          </label>
          <input
            type="text"
            placeholder="e.g. Calm, Anxious, Greedy"
            value={formData.emotionDuring}
            onChange={(e) => handleChange("emotionDuring", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Emotion at Exit
          </label>
          <input
            type="text"
            placeholder="e.g. Relieved, Disappointed, Satisfied"
            value={formData.emotionExit}
            onChange={(e) => handleChange("emotionExit", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3 pt-4">
          <input
            id="rulesFollowed"
            type="checkbox"
            checked={formData.rulesFollowed}
            onChange={(e) => handleChange("rulesFollowed", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <label
            htmlFor="rulesFollowed"
            className="text-xs font-medium text-slate-800 cursor-pointer"
          >
            I strictly followed my trading plan rules
          </label>
        </div>
      </div>
    </div>
  );
}

export default TradePsychologyFields;