import { useEffect, useState } from "react";
import { getTradeById } from "../services/trade.service";

export default function useTrade(id) {
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrade = async () => {
      try {
        const data = await getTradeById(id);
        setTrade(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrade();
  }, [id]);

  return {
    trade,
    loading,
  };
}