import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <div className="mt-8 rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="mt-4 flex gap-4">

        <Link
          to="/trades/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Add Trade
        </Link>

        <Link
          to="/trades"
          className="rounded-lg border px-4 py-2"
        >
          View Trades
        </Link>

      </div>

    </div>
  );
}

export default QuickActions;