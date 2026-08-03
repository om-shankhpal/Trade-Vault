import TradeForm from "../../components/trades/TradeForm";

function CreateTrade() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Create Trade
        </h1>

        <p className="text-slate-500">
          Record a completed trade.
        </p>
      </div>

      <TradeForm mode="create" />

    </div>
  );
}

export default CreateTrade;