import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">

      <div className="border-b p-6">

        <h1 className="text-2xl font-bold">
          TradeVault
        </h1>

      </div>

      <nav className="flex flex-col p-4">

        <NavLink
          to="/dashboard"
          className="rounded p-3 hover:bg-slate-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/trades"
          className="rounded p-3 hover:bg-slate-100"
        >
          Trades
        </NavLink>

        <NavLink
          to="/profile"
          className="rounded p-3 hover:bg-slate-100"
        >
          Profile
        </NavLink>

        <NavLink
          to="/settings"
          className="rounded p-3 hover:bg-slate-100"
        >
          Settings
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;