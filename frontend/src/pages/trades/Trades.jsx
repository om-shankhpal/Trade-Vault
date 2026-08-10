import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import useTrades from "../../hooks/useTrades";

import { deleteTrade } from "../../services/trade.service";

import TradeTable from "../../components/trades/TradeTable";
import TradesToolbar from "../../components/trades/TradesToolbar";
import Pagination from "../../components/trades/Pagination";
import DeleteModal from "../../components/common/DeleteModal";

function Trades() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    strategy: "",
    direction: "",
    segment: "",
    sortBy: "tradeDate",
    order: "desc",
    page: 1,
  });

  const [selectedTrade, setSelectedTrade] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const debouncedSearch = useDebounce(filters.search);

  const { trades, pagination, loading, refetch } = useTrades({
    ...filters,
    search: debouncedSearch,
  });

  function openDeleteModal(trade) {
    setSelectedTrade(trade);
    setShowDeleteModal(true);
  }

  async function handleDelete() {
    try {
      setDeleting(true);

      await deleteTrade(selectedTrade.id || selectedTrade._id);

      await refetch();

      setShowDeleteModal(false);
      setSelectedTrade(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete trade.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <TradesToolbar filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-12 rounded-2xl bg-slate-200" />
          <div className="h-16 rounded-xl bg-slate-100" />
          <div className="h-16 rounded-xl bg-slate-100" />
          <div className="h-16 rounded-xl bg-slate-100" />
        </div>
      ) : (
        <>
          <TradeTable trades={trades} onDelete={openDeleteModal} />

          <Pagination pagination={pagination} />
        </>
      )}

      {showDeleteModal && (
        <DeleteModal
          title="Delete Trade"
          message={`Are you sure you want to delete the ${selectedTrade?.symbol || "selected"} trade? This action cannot be undone.`}
          loading={deleting}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedTrade(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default Trades;
