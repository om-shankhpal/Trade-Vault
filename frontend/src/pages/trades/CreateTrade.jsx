import TradeForm from "../../components/trades/TradeForm";

function CreateTrade() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Record New Trade
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Log a completed execution to maintain a disciplined trading journal.
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Fields marked with <span className="font-semibold text-rose-500">*</span> are required.
        </p>
      </div>

      <TradeForm mode="create" />
    </div>
  );
}

export default CreateTrade;