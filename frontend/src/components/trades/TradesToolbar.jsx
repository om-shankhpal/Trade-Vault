import { Link } from "react-router-dom";

function TradesToolbar({ filters, setFilters }) {
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

      <div className="flex items-center gap-3">

        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
              page: 1,
            }))
          }
          className="w-64 rounded-lg border px-4 py-2"
        />

        <Link
          to="/trades/new"
          className="rounded-lg bg-slate-900 px-5 py-2 text-white"
        >
          + New Trade
        </Link>

      </div>

    </div>
  );
}

export default TradesToolbar;