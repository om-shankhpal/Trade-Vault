import { useParams } from "react-router-dom";
import useTrade from "../../hooks/useTrade";
import { useState } from "react";

function TradeDetails() {
  const { id } = useParams();

  const { trade, loading } = useTrade(id);

  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return <p>Loading trade...</p>;
  }

  if (!trade) {
    return <p>Trade not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trade Details</h1>

        <p className="text-slate-500">Review your completed trade.</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <Info label="Symbol" value={trade.symbol} />
          <Info label="Strategy" value={trade.strategy} />
          <Info label="Direction" value={trade.direction} />
          <Info label="Segment" value={trade.segment} />
          <Info label="Status" value={trade.status} />
          <Info label="Net P&L" value={`₹${trade.netPnL.toLocaleString()}`} />
          <Info label="R Multiple" value={trade.rMultiple} />
          <Info label="Entry Price" value={trade.entryPrice} />
          <Info label="Exit Price" value={trade.exitPrice} />
          <Info label="Quantity" value={trade.quantity} />
          <Info label="Market Condition" value={trade.marketCondition} />
          <Info
            label="Rules Followed"
            value={trade.rulesFollowed ? "Yes" : "No"}
          />
        </div>
      </div>

      {trade.screenshots?.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Screenshots</h2>

          <div className="grid grid-cols-3 gap-4">
            {trade.screenshots.map((image) => (
              <img
                key={image.publicId}
                src={image.url}
                alt="Trade Screenshot"
                onClick={() => setSelectedImage(image.url)}
                className="cursor-pointer rounded-lg border transition hover:scale-105"
              />
            ))}
          </div>
        </div>
      )}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Trade Screenshot"
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>

      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}

export default TradeDetails;
