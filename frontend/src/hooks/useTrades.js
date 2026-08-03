import { useEffect, useState } from "react";
import { getTrades } from "../services/trade.service";

export default function useTrades(params = {}) {
  const [trades, setTrades] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchTrades() {
    try {
      setLoading(true);

      const data = await getTrades(params);

      setTrades(data.trades);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTrades();
  }, [
    params.search,
    params.status,
    params.strategy,
    params.direction,
    params.segment,
    params.page,
  ]);

  return {
    trades,
    pagination,
    loading,
    refetch: fetchTrades,
  };
}