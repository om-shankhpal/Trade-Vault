import { useState } from "react";
import { Camera, X, ExternalLink } from "lucide-react";

function ScreenshotGallery({ screenshots = [] }) {
  const [activeImage, setActiveImage] = useState(null);

  if (screenshots.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
          Trade Screenshots
        </h2>
        <p className="text-xs text-slate-400 italic">No chart screenshots attached to this trade.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-slate-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Trade Screenshots ({screenshots.length})
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {screenshots.map((img, index) => {
          const imgUrl = typeof img === "string" ? img : img.url;
          return (
            <div
              key={index}
              onClick={() => setActiveImage(imgUrl)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            >
              <img
                src={imgUrl}
                alt={`Chart screenshot ${index + 1}`}
                className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 transition group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow">
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>View Full Image</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-slate-900 p-2 shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700 shadow"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={activeImage}
              alt="Expanded Trade Chart"
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ScreenshotGallery;