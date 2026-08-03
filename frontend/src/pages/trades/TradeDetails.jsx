import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

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

      await deleteTrade(trade.id);

      alert("Trade deleted successfully.");

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
    return <p>Loading trade...</p>;
  }

  if (!trade) {
    return <p>Trade not found.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trade Details</h1>

          <p className="text-slate-500">
            Review your completed trade.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/trades"
            className="rounded-lg border px-4 py-2 hover:bg-slate-100"
          >
            Back
          </Link>

          <Link
            to={`/trades/${trade.id}/edit`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit
          </Link>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Performance */}
      <PerformanceCards trade={trade} />

      {/* Basic Information */}
      <DetailSection title="Basic Information">
        <DetailItem
          label="Trade Date"
          value={trade.tradeDate.split("T")[0]}
        />

        <DetailItem label="Symbol" value={trade.symbol} />

        <DetailItem label="Segment" value={trade.segment} />

        <DetailItem label="Direction" value={trade.direction} />

        <DetailItem label="Status" value={trade.status} />
      </DetailSection>

      {/* Execution */}
      <DetailSection title="Execution">
        <DetailItem
          label="Entry Time"
          value={new Date(trade.entryTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />

        <DetailItem
          label="Exit Time"
          value={new Date(trade.exitTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />

        <DetailItem label="Entry Price" value={trade.entryPrice} />

        <DetailItem label="Exit Price" value={trade.exitPrice} />

        <DetailItem label="Quantity" value={trade.quantity} />

        <DetailItem
          label="Planned Stop Loss"
          value={trade.plannedStopLoss}
        />

        <DetailItem
          label="Planned Target"
          value={trade.plannedTarget}
        />

        <DetailItem
          label="Charges"
          value={`₹${trade.charges}`}
        />
      </DetailSection>

      {/* Strategy */}
      <DetailSection title="Strategy">
        <DetailItem
          label="Strategy"
          value={trade.strategy}
        />

        <DetailItem
          label="Market Condition"
          value={trade.marketCondition}
        />
      </DetailSection>

      {/* Psychology */}
      <DetailSection title="Psychology">
        <DetailItem
          label="Emotion Before Entry"
          value={trade.emotionEntry}
        />

        <DetailItem
          label="Emotion During Trade"
          value={trade.emotionDuring}
        />

        <DetailItem
          label="Emotion After Exit"
          value={trade.emotionExit}
        />

        <DetailItem
          label="Rules Followed"
          value={trade.rulesFollowed ? "Yes" : "No"}
        />
      </DetailSection>

      {/* Notes */}
      <DetailSection title="Notes">
        <div className="col-span-2">
          <DetailItem
            label="Mistakes"
            value={trade.mistakes}
          />
        </div>

        <div className="col-span-2">
          <DetailItem
            label="Notes"
            value={trade.notes}
          />
        </div>
      </DetailSection>

      {/* Screenshots */}
      <ScreenshotGallery screenshots={trade.screenshots} />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          title="Delete Trade"
          message="Are you sure you want to delete this trade? This action cannot be undone."
          loading={deleting}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default TradeDetails;