import useTrades from "../../hooks/useTrades";

import TradeTable from "../../components/trades/TradeTable";
import TradesToolbar from "../../components/trades/TradesToolbar";
import Pagination from "../../components/trades/Pagination";

function Trades() {
  const { trades, pagination, loading } = useTrades();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>

      <TradesToolbar />

      <TradeTable trades={trades} />

      <Pagination pagination={pagination} />

    </>
  );
}

export default Trades;