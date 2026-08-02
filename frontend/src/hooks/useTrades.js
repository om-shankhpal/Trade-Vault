import { useEffect, useState } from "react";
import { getTrades } from "../services/trade.service";

export default function useTrades(params = {}) {
  const [trades, setTrades] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const data = await getTrades(params);

        setTrades(data.trades);
        setPagination(data.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, [params.search]);

  return {
    trades,
    pagination,
    loading,
  };
}