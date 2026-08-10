import { Link } from "react-router-dom";
import { Search, RotateCcw, Plus, Filter } from "lucide-react";
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

  const handleReset = () => {
    setFilters({
      search: "",
      status: "",
      strategy: "",
      direction: "",
      segment: "",
      sortBy: "tradeDate",
      order: "desc",
      page: 1,
    });
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Trades Journal
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Search, filter, and inspect your complete trading history
          </p>
        </div>

        <Link
          to="/trades/new"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>New Trade</span>
        </Link>
      </div>

      {/* Filter & Control Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search symbol, notes..."
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 transition focus:border-slate-400 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700 transition focus:border-slate-400 focus:bg-white focus:outline-none"
          >
            <option value="">All Statuses</option>
            {TRADE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Direction Filter */}
          <select
            value={filters.direction}
            onChange={(e) => handleChange("direction", e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700 transition focus:border-slate-400 focus:bg-white focus:outline-none"
          >
            <option value="">All Directions</option>
            {TRADE_DIRECTIONS.map((direction) => (
              <option key={direction} value={direction}>
                {direction}
              </option>
            ))}
          </select>

          {/* Segment Filter */}
          <select
            value={filters.segment}
            onChange={(e) => handleChange("segment", e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700 transition focus:border-slate-400 focus:bg-white focus:outline-none"
          >
            <option value="">All Segments</option>
            {TRADE_SEGMENTS.map((segment) => (
              <option key={segment} value={segment}>
                {segment}
              </option>
            ))}
          </select>

          {/* Strategy Filter */}
          <select
            value={filters.strategy}
            onChange={(e) => handleChange("strategy", e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700 transition focus:border-slate-400 focus:bg-white focus:outline-none"
          >
            <option value="">All Strategies</option>
            <option value="ORB">ORB</option>
            <option value="Breakout">Breakout</option>
            <option value="Pullback">Pullback</option>
            <option value="Reversal">Reversal</option>
          </select>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange("sortBy", e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700 transition focus:border-slate-400 focus:bg-white focus:outline-none"
          >
            <option value="tradeDate">Trade Date</option>
            <option value="netPnL">Net P&L</option>
            <option value="rMultiple">R Multiple</option>
            <option value="createdAt">Created At</option>
          </select>

          {/* Order */}
          <select
            value={filters.order}
            onChange={(e) => handleChange("order", e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700 transition focus:border-slate-400 focus:bg-white focus:outline-none"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            title="Reset Filters"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TradesToolbar;
