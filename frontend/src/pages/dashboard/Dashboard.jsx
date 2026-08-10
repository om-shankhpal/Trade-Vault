import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTrades from "../../components/dashboard/RecentTrades";
import useDashboard from "../../hooks/useDashboard";
import { useAuth } from "../../context/AuthContext";
import { Activity } from "lucide-react";

function Dashboard() {
  const { dashboard, loading } = useDashboard();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-64 rounded-xl bg-slate-200" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-200" />
        </div>
        <div className="h-28 rounded-2xl bg-slate-200" />
        <div className="h-64 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {user?.fullName?.split(" ")[0] || "Trader"} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here is your trading journal performance summary.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500 sm:mt-0">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span>System Active</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <StatsGrid dashboard={dashboard} />

      {/* Quick Actions Widget */}
      <QuickActions />

      {/* Recent Trades Table */}
      <RecentTrades trades={dashboard?.recentTrades || []} />
    </div>
  );
}

export default Dashboard;
