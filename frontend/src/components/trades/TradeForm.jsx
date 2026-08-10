import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Camera, AlertCircle, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react";

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

    if (!formData.symbol || !formData.symbol.trim()) {
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

    const totalScreenshots = screenshots.length + selectedFiles.length;

    if (totalScreenshots > 3) {
      alert("You can upload a maximum of 3 screenshots.");
      event.target.value = "";
      return;
    }

    const validFiles = selectedFiles.filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    );

    if (validFiles.length !== selectedFiles.length) {
      alert("Only JPEG, PNG and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    const oversizedFile = validFiles.find((file) => file.size > 5 * 1024 * 1024);

    if (oversizedFile) {
      alert("Each screenshot must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setScreenshots((prev) => [...prev, ...validFiles]);
    event.target.value = "";
  };

  const removeScreenshot = (index) => {
    setScreenshots((prev) => prev.filter((_, fileIndex) => fileIndex !== index));
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

      tradeDate: new Date(formData.tradeDate).toISOString().split("T")[0],

      entryTime: new Date(
        `${formData.tradeDate}T${formData.entryTime}:00`
      ).toISOString(),

      exitTime: new Date(
        `${formData.tradeDate}T${formData.exitTime}:00`
      ).toISOString(),
  };

    try {
      setSubmitting(true);

      if (mode === "create") {
        const createdTrade = await createTrade(payload);

        if (screenshots.length > 0) {
          await uploadTradeScreenshots(createdTrade.id, screenshots);
        }

        navigate("/dashboard");
        return;
      }

      const updatedTrade = await onSubmit(payload);

      if (screenshots.length > 0) {
        await uploadTradeScreenshots(
          updatedTrade?.id || initialValues.id,
          screenshots
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <div>
            <p className="font-semibold">Please fix the validation errors below</p>
            <p className="mt-0.5 text-rose-600">
              Required fields are marked with red asterisks.
            </p>
          </div>
        </div>
      )}

      {/* 1. Basic Information */}
      <BasicTradeFields
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      {/* 2. Trade Plan */}
      <TradePlanFields formData={formData} handleChange={handleChange} />

      {/* 3. Psychology */}
      <TradePsychologyFields
        formData={formData}
        handleChange={handleChange}
      />

      {/* 4. Notes */}
      <TradeNotesFields formData={formData} handleChange={handleChange} />

      {/* 5. Screenshots */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Camera className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Trade Screenshots
            </h2>
            <p className="text-xs text-slate-500">
              Attach up to 3 chart screenshots to document technical setups
            </p>
          </div>
        </div>

        <label
          htmlFor="tradeScreenshots"
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-8 transition hover:border-slate-400 hover:bg-slate-50/50"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Camera className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold text-slate-700">
            Click to upload screenshots
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            JPEG, PNG or WebP · Max 5 MB each (up to 3 files)
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
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Trade screenshot ${index + 1}`}
                  className="h-36 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeScreenshot(index)}
                  className="absolute right-2 top-2 rounded-lg bg-rose-600 p-1.5 text-white shadow transition hover:bg-rose-700"
                  title="Remove screenshot"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>

                <div className="truncate p-2.5 text-[11px] font-medium text-slate-600">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 text-right text-[11px] text-slate-400">
          {screenshots.length}/3 screenshots uploaded
        </div>
      </div>

      {/* Form Controls / Submit */}
      <div className="flex items-center justify-between pt-2">
        <Link
          to="/trades"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Cancel</span>
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
        >
          {submitting ? (
            <span>Saving Trade...</span>
          ) : (
            <>
              <span>{mode === "create" ? "Create Trade Log" : "Update Trade Log"}</span>
              <CheckCircle2 className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default TradeForm;