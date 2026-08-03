import { Link } from "react-router-dom";
import {
  TRADE_SEGMENTS,
  TRADE_DIRECTIONS,
  TRADE_STATUSES,
} from "../../constants/trade.constants";

function TradesToolbar({ filters, setFilters }) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      page: 1,
    }));
  };

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Trades</h1>

        <p className="text-slate-500">Manage your trading journal</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-64 rounded-lg border px-4 py-2"
        />

        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">All Status</option>

          {TRADE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={filters.direction}
          onChange={(e) => handleChange("direction", e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">Direction</option>

          {TRADE_DIRECTIONS.map((direction) => (
            <option key={direction} value={direction}>
              {direction}
            </option>
          ))}
        </select>

        <select
          value={filters.segment}
          onChange={(e) => handleChange("segment", e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">All Segments</option>

          {TRADE_SEGMENTS.map((segment) => (
            <option key={segment} value={segment}>
              {segment}
            </option>
          ))}
        </select>

        <select
          value={filters.strategy}
          onChange={(e) => handleChange("strategy", e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">Strategy</option>
          <option value="ORB">ORB</option>
          <option value="Breakout">Breakout</option>
          <option value="Pullback">Pullback</option>
          <option value="Reversal">Reversal</option>
        </select>
        <select
          value={filters.sortBy}
          onChange={(e) => handleChange("sortBy", e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="tradeDate">Trade Date</option>
          <option value="netPnL">Net P&L</option>
          <option value="rMultiple">R Multiple</option>
          <option value="createdAt">Created At</option>
        </select>
        <select
          value={filters.order}
          onChange={(e) => handleChange("order", e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <button
          onClick={() =>
            setFilters({
              search: "",
              status: "",
              strategy: "",
              direction: "",
              segment: "",
              sortBy: "tradeDate",
              order: "desc",
              page: 1,
            })
          }
          className="rounded-lg border px-4 py-2 hover:bg-slate-100"
        >
          Reset
        </button>
        <Link
          to="/trades/new"
          className="rounded-lg bg-slate-900 px-5 py-2 text-white hover:bg-slate-800"
        >
          + New Trade
        </Link>
      </div>
    </div>
  );
}

export default TradesToolbar;
