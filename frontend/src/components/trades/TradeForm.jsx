import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createTrade,
  uploadTradeScreenshots,
} from "../../services/trade.service";

import BasicTradeFields from "./BasicTradeFields";
import TradePlanFields from "./TradePlanFields";
import TradePsychologyFields from "./TradePsychologyFields";
import TradeNotesFields from "./TradeNotesFields";

function TradeForm({
  mode = "create",
  initialValues = {},
  onSubmit,
}) {
  const navigate = useNavigate();

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

  const [screenshots, setScreenshots] = useState([]);

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tradeDate) {
      newErrors.tradeDate = "Trade date is required";
    }

    if (!formData.symbol.trim()) {
      newErrors.symbol = "Symbol is required";
    }

    if (!formData.entryTime) {
      newErrors.entryTime = "Entry time is required";
    }

    if (!formData.exitTime) {
      newErrors.exitTime = "Exit time is required";
    }

    if (!formData.entryPrice) {
      newErrors.entryPrice = "Entry price is required";
    }

    if (!formData.exitPrice) {
      newErrors.exitPrice = "Exit price is required";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleScreenshotChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) {
      return;
    }

    const totalScreenshots =
      screenshots.length + selectedFiles.length;

    if (totalScreenshots > 3) {
      alert("You can upload a maximum of 3 screenshots.");

      event.target.value = "";

      return;
    }

    const validFiles = selectedFiles.filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(
        file.type,
      ),
    );

    if (validFiles.length !== selectedFiles.length) {
      alert("Only JPEG, PNG and WebP images are allowed.");

      event.target.value = "";

      return;
    }

    const oversizedFile = validFiles.find(
      (file) => file.size > 5 * 1024 * 1024,
    );

    if (oversizedFile) {
      alert("Each screenshot must be smaller than 5 MB.");

      event.target.value = "";

      return;
    }

    setScreenshots((prev) => [
      ...prev,
      ...validFiles,
    ]);

    event.target.value = "";
  };

  const removeScreenshot = (index) => {
    setScreenshots((prev) =>
      prev.filter((_, fileIndex) => fileIndex !== index),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const payload = {
      ...formData,

      entryPrice: Number(formData.entryPrice),
      exitPrice: Number(formData.exitPrice),
      quantity: Number(formData.quantity),

      plannedStopLoss: formData.plannedStopLoss
        ? Number(formData.plannedStopLoss)
        : undefined,

      plannedTarget: formData.plannedTarget
        ? Number(formData.plannedTarget)
        : undefined,

      charges: Number(formData.charges || 120),

      tradeDate: new Date(
        formData.tradeDate,
      )
        .toISOString()
        .split("T")[0],

      entryTime: new Date(
        `${formData.tradeDate}T${formData.entryTime}:00`,
      ).toISOString(),

      exitTime: new Date(
        `${formData.tradeDate}T${formData.exitTime}:00`,
      ).toISOString(),
    };

    try {
      setSubmitting(true);

      if (mode === "create") {
        const createdTrade = await createTrade(payload);

        if (screenshots.length > 0) {
          await uploadTradeScreenshots(
            createdTrade.id,
            screenshots,
          );
        }

        alert("Trade created successfully!");

        navigate("/dashboard");

        return;
      }

      const updatedTrade = await onSubmit(payload);

      if (screenshots.length > 0) {
        await uploadTradeScreenshots(
          updatedTrade?.id || initialValues.id,
          screenshots,
        );
      }

      alert("Trade updated successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Basic Information */}
      <BasicTradeFields
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      {/* Trade Plan */}
      <TradePlanFields
        formData={formData}
        handleChange={handleChange}
      />

      {/* Psychology */}
      <TradePsychologyFields
        formData={formData}
        handleChange={handleChange}
      />

      {/* Notes */}
      <TradeNotesFields
        formData={formData}
        handleChange={handleChange}
      />

      {/* Screenshots */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Trade Screenshots
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload up to 3 screenshots of your trade.
          </p>
        </div>

        <label
          htmlFor="tradeScreenshots"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-8 transition hover:border-slate-400 hover:bg-slate-50"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
            📷
          </div>

          <p className="font-medium text-slate-700">
            Click to upload screenshots
          </p>

          <p className="mt-1 text-xs text-slate-500">
            JPEG, PNG or WebP · Maximum 5 MB each
          </p>

          <input
            id="tradeScreenshots"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleScreenshotChange}
            className="hidden"
          />
        </label>

        {screenshots.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {screenshots.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="group relative overflow-hidden rounded-xl border border-slate-200"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Trade screenshot ${index + 1}`}
                  className="h-40 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeScreenshot(index)
                  }
                  className="absolute right-2 top-2 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white shadow hover:bg-red-600"
                >
                  Remove
                </button>

                <div className="truncate bg-white px-3 py-2 text-xs text-slate-500">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 text-right text-xs text-slate-500">
          {screenshots.length}/3 screenshots
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : mode === "create"
              ? "Create Trade"
              : "Update Trade"}
        </button>
      </div>
    </form>
  );
}

export default TradeForm;