import { Link } from "react-router-dom";

function TradesToolbar() {
  return (
    <div className="mb-6 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold">
          Trades
        </h1>

        <p className="text-slate-500">
          Manage your trading journal.
        </p>

      </div>

      <Link
        to="/trades/new"
        className="rounded-lg bg-slate-900 px-5 py-2 text-white hover:bg-slate-800"
      >
        + New Trade
      </Link>

    </div>
  );
}

export default TradesToolbar;