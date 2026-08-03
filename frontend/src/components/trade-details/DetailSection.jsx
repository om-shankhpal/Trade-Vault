function DetailSection({ title, children }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

export default DetailSection;