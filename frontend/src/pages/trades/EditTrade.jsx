import { useParams } from "react-router-dom";

import TradeForm from "../../components/trades/TradeForm";
import useTrade from "../../hooks/useTrade";
import { updateTrade } from "../../services/trade.service";

function EditTrade() {
  const { id } = useParams();

  const { trade, loading } = useTrade(id);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading trade details...
        </p>
      </div>
    );
  }

  if (!trade) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Trade not found
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            The trade you are trying to edit does not exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  const initialValues = {
    tradeDate: trade.tradeDate
      ? trade.tradeDate.split("T")[0]
      : "",

    symbol: trade.symbol || "",

    segment: trade.segment || "FUTURES",

    direction: trade.direction || "LONG",

    entryTime: trade.entryTime
      ? new Date(trade.entryTime)
          .toISOString()
          .slice(11, 16)
      : "",

    exitTime: trade.exitTime
      ? new Date(trade.exitTime)
          .toISOString()
          .slice(11, 16)
      : "",

    entryPrice: trade.entryPrice ?? "",

    exitPrice: trade.exitPrice ?? "",

    quantity: trade.quantity ?? "",

    charges: trade.charges ?? "",

    plannedStopLoss: trade.plannedStopLoss ?? "",

    plannedTarget: trade.plannedTarget ?? "",

    strategy: trade.strategy || "",

    marketCondition: trade.marketCondition || "",

    emotionEntry: trade.emotionEntry || "",

    emotionDuring: trade.emotionDuring || "",

    emotionExit: trade.emotionExit || "",

    rulesFollowed: trade.rulesFollowed ?? false,

    mistakes: trade.mistakes || "",

    notes: trade.notes || "",
  };

  const handleUpdate = async (payload) => {
    return await updateTrade(id, payload);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Edit Trade #{trade.symbol}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update your journal parameters for this completed execution.
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Fields marked with <span className="font-semibold text-rose-500">*</span> are required.
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