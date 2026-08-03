import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrade } from "../../services/trade.service";

import BasicTradeFields from "./BasicTradeFields";
import TradePlanFields from "./TradePlanFields";
import TradePsychologyFields from "./TradePsychologyFields";
import TradeNotesFields from "./TradeNotesFields";

function TradeForm({ mode = "create", initialValues = {}, onSubmit }) {
  const navigate = useNavigate("/dashboard");
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

    charges: "",

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,

      entryPrice: Number(formData.entryPrice),
      exitPrice: Number(formData.exitPrice),
      quantity: Number(formData.quantity),

      plannedStopLoss: Number(formData.plannedStopLoss),
      plannedTarget: Number(formData.plannedTarget),

      charges: Number(formData.charges || 120),

      tradeDate: new Date(formData.tradeDate).toISOString().split("T")[0],

      entryTime: new Date(
        `${formData.tradeDate}T${formData.entryTime}:00`,
      ).toISOString(),

      exitTime: new Date(
        `${formData.tradeDate}T${formData.exitTime}:00`,
      ).toISOString(),
    };

    try {
      if (mode === "create") {
        await createTrade(payload);

        alert("Trade created successfully!");

        navigate("/dashboard");

        return;
      }

      await onSubmit(payload);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicTradeFields formData={formData} handleChange={handleChange} />

      <TradePlanFields formData={formData} handleChange={handleChange} />

      <TradePsychologyFields formData={formData} handleChange={handleChange} />

      <TradeNotesFields formData={formData} handleChange={handleChange} />

      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-6 py-3 text-white"
      >
        {mode === "create" ? "Create Trade" : "Update Trade"}
      </button>
    </form>
  );
}

export default TradeForm;
