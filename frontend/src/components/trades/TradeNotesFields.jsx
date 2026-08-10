import { FileText } from "lucide-react";

function TradeNotesFields({ formData, handleChange }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <FileText className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Mistakes & Trade Notes
          </h2>
          <p className="text-xs text-slate-500">
            Document execution errors, key lessons learned, and context
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Execution Mistakes
          </label>
          <textarea
            rows={3}
            value={formData.mistakes}
            onChange={(e) => handleChange("mistakes", e.target.value)}
            placeholder="e.g. Chased entry, moved stop loss prematurely..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Detailed Notes
          </label>
          <textarea
            rows={4}
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Add any additional technical or market observations..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
}

export default TradeNotesFields;