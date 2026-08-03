import { useNavigate, useParams } from "react-router-dom";

import TradeForm from "../../components/trades/TradeForm";
import useTrade from "../../hooks/useTrade";
import { updateTrade } from "../../services/trade.service";

function EditTrade() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { trade, loading } = useTrade(id);

  if (loading) {
    return <p>Loading trade...</p>;
  }

  if (!trade) {
    return <p>Trade not found.</p>;
  }

  const initialValues = {
    ...trade,

    tradeDate: trade.tradeDate.split("T")[0],

    entryTime: new Date(trade.entryTime)
      .toISOString()
      .slice(11, 16),

    exitTime: new Date(trade.exitTime)
      .toISOString()
      .slice(11, 16),
  };

  async function handleUpdate(payload) {
    await updateTrade(id, payload);

    alert("Trade updated successfully!");

    navigate("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Trade
        </h1>

        <p className="text-slate-500">
          Update your completed trade.
        </p>
      </div>

      <TradeForm
        mode="edit"
        initialValues={initialValues}
        onSubmit={handleUpdate}
      />
    </div>
  );
}

export default EditTrade;