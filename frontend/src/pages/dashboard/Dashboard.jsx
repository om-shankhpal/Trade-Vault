import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTrades from "../../components/dashboard/RecentTrades";
import useDashboard from "../../hooks/useDashboard";

function Dashboard() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's your trading performance.
        </p>
      </div>

      <StatsGrid dashboard={dashboard} />

      <QuickActions />

      <RecentTrades trades={dashboard.recentTrades} />
    </div>
  );
}

export default Dashboard;
