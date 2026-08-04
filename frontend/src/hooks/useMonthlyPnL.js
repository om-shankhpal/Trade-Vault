import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard.service";

export default function useMonthlyPnL() {
  const [monthlyPnL, setMonthlyPnL] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboard = await getDashboard();
        setMonthlyPnL(dashboard.monthlyPnL);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    monthlyPnL,
    loading,
  };
}