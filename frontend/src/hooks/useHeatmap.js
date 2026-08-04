import { useEffect, useState } from "react";
import { getHeatmap } from "../services/heatmap.service";

function useHeatmap() {
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const data = await getHeatmap();
        setHeatmap(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmap();
  }, []);

  return {
    heatmap,
    loading,
  };
}

export default useHeatmap;