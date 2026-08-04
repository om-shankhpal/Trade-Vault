import useDashboard from "./useDashboard";

export default function useMonthlyPnL() {
  const { dashboard, loading } = useDashboard();

  return {
    monthlyPnL: dashboard?.monthlyPnL ?? [],
    loading,
  };
}