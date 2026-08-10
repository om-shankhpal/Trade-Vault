import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Pencil, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";

import useTrade from "../../hooks/useTrade";
import { deleteTrade } from "../../services/trade.service";

import PerformanceCards from "../../components/trade-details/PerformanceCards";
import DetailItem from "../../components/trade-details/DetailItem";
import DetailSection from "../../components/trade-details/DetailSection";
import ScreenshotGallery from "../../components/trade-details/ScreenshotGallery";
import DeleteModal from "../../components/common/DeleteModal";

function TradeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { trade, loading } = useTrade(id);

  async function handleDelete() {
    try {
      setDeleting(true);
      await deleteTrade(trade.id || trade._id);
      navigate("/trades");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete trade.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 rounded-xl bg-slate-200" />
        <div className="grid grid-cols-4 gap-4">
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
        </div>
        <div className="h-48 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (!trade) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Trade details not found
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            The requested trade could not be retrieved.
          </p>
          <Link
            to="/trades"
            className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Return to Trades Journal
          </Link>
        </div>
      </div>
    );
  }

  const getDirectionBadge = (dir) => {
    return dir?.toUpperCase() === "LONG"
      ? "bg-teal-50 text-teal-700 border-teal-200"
      : "bg-amber-50 text-amber-700 border-amber-200";
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "WIN":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "LOSS":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-3">
          <Link
            to="/trades"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            title="Back to Trades"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {trade.symbol}
              </h1>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getDirectionBadge(
                  trade.direction
                )}`}
              >
                {trade.direction === "LONG" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {trade.direction}
              </span>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadge(
                  trade.status
                )}`}
              >
                {trade.status}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500 font-mono">
              Executed on{" "}
              {trade.tradeDate
                ? new Date(trade.tradeDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Link
            to={`/trades/${trade.id || trade._id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span>Edit</span>
          </Link>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Top Performance Metric Grid */}
      <PerformanceCards trade={trade} />

      {/* Basic Information */}
      <DetailSection title="Basic Information">
        <DetailItem
          label="Trade Date"
          value={
            trade.tradeDate
              ? new Date(trade.tradeDate).toISOString().split("T")[0]
              : "—"
          }
        />
        <DetailItem label="Symbol" value={trade.symbol} />
        <DetailItem label="Segment" value={trade.segment} />
        <DetailItem label="Direction" value={trade.direction} />
      </DetailSection>

      {/* Execution Details */}
      <DetailSection title="Execution & Pricing">
        <DetailItem
          label="Entry Time"
          value={
            trade.entryTime
              ? new Date(trade.entryTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"
          }
        />
        <DetailItem
          label="Exit Time"
          value={
            trade.exitTime
              ? new Date(trade.exitTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"
          }
        />
        <DetailItem label="Entry Price" value={trade.entryPrice ? `₹${trade.entryPrice}` : "—"} />
        <DetailItem label="Exit Price" value={trade.exitPrice ? `₹${trade.exitPrice}` : "—"} />
        <DetailItem label="Quantity" value={trade.quantity} />
        <DetailItem label="Planned Stop Loss" value={trade.plannedStopLoss ? `₹${trade.plannedStopLoss}` : "—"} />
        <DetailItem label="Planned Target" value={trade.plannedTarget ? `₹${trade.plannedTarget}` : "—"} />
        <DetailItem label="Charges / Taxes" value={trade.charges ? `₹${trade.charges}` : "—"} />
      </DetailSection>

      {/* Strategy & Market Condition */}
      <DetailSection title="Strategy Setup">
        <DetailItem label="Strategy" value={trade.strategy || "—"} />
        <DetailItem label="Market Condition" value={trade.marketCondition || "—"} />
      </DetailSection>

      {/* Psychology */}
      <DetailSection title="Psychology & Discipline">
        <DetailItem label="Emotion at Entry" value={trade.emotionEntry || "—"} />
        <DetailItem label="Emotion During" value={trade.emotionDuring || "—"} />
        <DetailItem label="Emotion at Exit" value={trade.emotionExit || "—"} />
        <DetailItem label="Rules Followed" value={trade.rulesFollowed ? "Yes (Disciplined)" : "No"} />
      </DetailSection>

      {/* Notes & Mistakes */}
      <DetailSection title="Notes & Mistakes">
        <div className="col-span-2">
          <DetailItem label="Execution Mistakes" value={trade.mistakes || "None recorded"} />
        </div>
        <div className="col-span-2">
          <DetailItem label="Journal Notes" value={trade.notes || "None recorded"} />
        </div>
      </DetailSection>

      {/* Screenshots */}
      <ScreenshotGallery screenshots={trade.screenshots || []} />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          title="Delete Trade Log"
          message={`Are you sure you want to delete the ${trade.symbol} trade record? This action cannot be undone.`}
          loading={deleting}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default TradeDetails;