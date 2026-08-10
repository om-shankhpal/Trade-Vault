import { Link } from "react-router-dom";
import { PlusCircle, BookOpen, BarChart3, ArrowRight } from "lucide-react";

function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">
        Quick Actions
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Log new trade executions or jump directly to your journal and analytics
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/trades/new"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 shadow-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Record New Trade</span>
        </Link>

        <Link
          to="/trades"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <BookOpen className="h-4 w-4" />
          <span>View All Trades</span>
        </Link>

        <Link
          to="/analytics"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <BarChart3 className="h-4 w-4" />
          <span>Analytics Overview</span>
        </Link>
      </div>
    </div>
  );
}

export default QuickActions;