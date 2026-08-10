import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  User,
  Settings,
  PlusCircle,
} from "lucide-react";

function Sidebar() {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/trades", label: "Trades Journal", icon: BookOpen },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const getNavClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white text-slate-700">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
          TV
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">
          TradeVault
        </span>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <nav className="space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={getNavClass}>
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Add Trade Widget in Sidebar */}
        <div className="space-y-4 pt-4">
          <NavLink
            to="/trades/new"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 px-4 text-xs font-semibold text-white transition hover:bg-slate-800 shadow-md shadow-slate-900/10"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Record New Trade</span>
          </NavLink>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
            <p className="text-[11px] font-medium text-slate-500">
              Journal Mode Active
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Data synchronized locally
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;