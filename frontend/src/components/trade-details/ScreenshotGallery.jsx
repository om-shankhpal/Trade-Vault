import { useState } from "react";

function ScreenshotGallery({ screenshots }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!screenshots?.length) {
    return null;
  }

  return (
    <>
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Screenshots
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {screenshots.map((image) => (
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
    </>
  );
}

export default ScreenshotGallery;