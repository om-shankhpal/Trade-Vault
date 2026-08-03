import { useState } from "react";

import BasicTradeFields from "./BasicTradeFields";
import TradePlanFields from "./TradePlanFields";
import TradePsychologyFields from "./TradePsychologyFields";
import TradeNotesFields from "./TradeNotesFields";

function TradeForm({
  mode = "create",
  initialValues = {},
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    tradeDate: "",
    symbol: "",
    segment: "FUTURES",
    direction: "LONG",

    entryTime: "",
    exitTime: "",

    entryPrice: "",
    exitPrice: "",

    quantity: "",

    plannedStopLoss: "",
    plannedTarget: "",

    strategy: "",
    marketCondition: "",

    emotionEntry: "",
    emotionDuring: "",
    emotionExit: "",

    rulesFollowed: false,

    mistakes: "",
    notes: "",

    ...initialValues,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <BasicTradeFields
        formData={formData}
        handleChange={handleChange}
      />

      <TradePlanFields
        formData={formData}
        handleChange={handleChange}
      />

      <TradePsychologyFields
        formData={formData}
        handleChange={handleChange}
      />

      <TradeNotesFields
        formData={formData}
        handleChange={handleChange}
      />

      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-6 py-3 text-white"
      >
        {mode === "create"
          ? "Create Trade"
          : "Update Trade"}
      </button>
    </form>
  );
}

export default TradeForm;