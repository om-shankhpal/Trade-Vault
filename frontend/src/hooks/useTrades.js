import { useEffect, useState } from "react";
import { getTrades } from "../services/trade.service";

export default function useTrades(params = {}) {
  const [trades, setTrades] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrades() {
      try {
        const data = await getTrades(params);

        setTrades(data.trades);
        setPagination(data.pagination);
      } finally {
        setLoading(false);
      }
    }

    fetchTrades();
  }, []);

  return {
    trades,
    pagination,
    loading,
  };
}