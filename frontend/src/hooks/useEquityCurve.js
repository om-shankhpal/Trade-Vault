import { useEffect, useState } from "react";
import { getEquityCurve } from "../services/equityCurve.service";

export default function useEquityCurve() {
  const [equityCurve, setEquityCurve] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEquityCurve() {
      try {
        const data = await getEquityCurve();
        setEquityCurve(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEquityCurve();
  }, []);

  return {
    equityCurve,
    loading,
  };
}