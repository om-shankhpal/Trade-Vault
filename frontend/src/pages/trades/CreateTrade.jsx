import TradeForm from "../../components/trades/TradeForm";

function CreateTrade() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Create Trade
        </h1>

        <p className="mt-1 text-slate-500">
          Record a completed trade and keep a detailed
          journal of your decision-making.
        </p>

        <p className="mt-3 text-sm text-slate-500">
          Fields marked with{" "}
          <span className="font-semibold text-red-500">
            *
          </span>{" "}
          are required.
        </p>
      </div>

      <TradeForm mode="create" />
    </div>
  );
}

export default CreateTrade;