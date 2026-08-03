function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 font-medium break-words">
        {value || "-"}
      </p>
    </div>
  );
}

export default DetailItem;