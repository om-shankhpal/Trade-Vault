import { useLocation, Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.startsWith("/dashboard")) return "Dashboard Overview";
    if (pathname.startsWith("/trades/new")) return "Record New Trade";
    if (pathname.includes("/edit")) return "Edit Trade";
    if (pathname.startsWith("/trades/")) return "Trade Review";
    if (pathname.startsWith("/trades")) return "Trades Journal";
    if (pathname.startsWith("/analytics")) return "Performance Analytics";
    if (pathname.startsWith("/profile")) return "Account Profile";
    if (pathname.startsWith("/settings")) return "Account Settings";
    return "TradeVault";
  };

  const displayName =
    user?.fullName || user?.name || user?.username || user?.email?.split("@")[0] || "Trader";

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 shadow-sm px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-base font-semibold text-slate-800">
          {getPageTitle(location.pathname)}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* User Badge / Profile */}
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 p-1.5 pr-3.5 transition hover:bg-slate-100"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            {getInitials(displayName)}
          </div>
          <span className="text-xs font-medium text-slate-700">
            {displayName}
          </span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50"
          title="Sign out of TradeVault"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;