import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import useTrades from "../../hooks/useTrades";

import TradeTable from "../../components/trades/TradeTable";
import TradesToolbar from "../../components/trades/TradesToolbar";
import Pagination from "../../components/trades/Pagination";

function Trades() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    strategy: "",
    direction: "",
    segment: "",
    page: 1,
  });

  const debouncedSearch = useDebounce(filters.search);

  const { trades, pagination, loading } = useTrades({
    ...filters,
    search: debouncedSearch,
  });

  return (
    <>
      <TradesToolbar
        filters={filters}
        setFilters={setFilters}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TradeTable trades={trades} />

          <Pagination pagination={pagination} />
        </>
      )}
    </>
  );
}

export default Trades;