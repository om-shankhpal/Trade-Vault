import { Link } from "react-router-dom";

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
        <h1 className="text-3xl font-bold">
          Trades
        </h1>

        <p className="text-slate-500">
          Manage your trading journal
        </p>
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
          <option value="WIN">WIN</option>
          <option value="LOSS">LOSS</option>
          <option value="BREAKEVEN">BREAKEVEN</option>
        </select>

        <select
          value={filters.direction}
          onChange={(e) => handleChange("direction", e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">Direction</option>
          <option value="LONG">LONG</option>
          <option value="SHORT">SHORT</option>
        </select>

        <select
          value={filters.segment}
          onChange={(e) => handleChange("segment", e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">Segment</option>
          <option value="FUTURES">FUTURES</option>
          <option value="OPTIONS">OPTIONS</option>
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