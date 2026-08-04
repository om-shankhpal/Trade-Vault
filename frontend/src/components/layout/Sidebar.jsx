import { NavLink } from "react-router-dom";

function Sidebar() {
  const navClass = ({ isActive }) =>
    `rounded-lg p-3 transition-colors ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">TradeVault</h1>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <NavLink to="/dashboard" className={navClass}>
          Dashboard
        </NavLink>

        <NavLink to="/trades" className={navClass}>
          Trades
        </NavLink>

        <NavLink to="/analytics" className={navClass}>
          Analytics
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          Profile
        </NavLink>

        <NavLink to="/settings" className={navClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;