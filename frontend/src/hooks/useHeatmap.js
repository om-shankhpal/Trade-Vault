import { useEffect, useState } from "react";
import { getHeatmap } from "../services/heatmap.service";

export default function useHeatmap() {
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeatmap() {
      try {
        const data = await getHeatmap();
        setHeatmap(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchHeatmap();
  }, []);

  return {
    heatmap,
    loading,
  };
}