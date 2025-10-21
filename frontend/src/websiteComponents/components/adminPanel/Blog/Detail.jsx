import React, { useState } from 'react';

export default function Detail({ setIsopen, detail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Format date for better display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsopen(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === detail.gallery.length - 1 ? 0 : prev + 1
    );
  };

  // Previous image in gallery
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? detail.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-0"
      onClick={handleBackdropClick}
    >
      {/* Full screen modal */}
      <div className="relative bg-white w-full h-full overflow-hidden">
        {/* Close button */}
        <button
          className="absolute top-6 right-6 z-20 bg-white bg-opacity-90 hover:bg-opacity-100 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl transition-all duration-200 hover:scale-110 hover:bg-red-500 hover:text-white"
          onClick={() => setIsopen(false)}
        >
          &times;
        </button>

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto">
          {/* Gallery Section with multiple images */}
          {detail.gallery && detail.gallery.length > 0 && (
            <div className="relative w-full h-80 sm:h-96 md:h-[500px] bg-gray-900 overflow-hidden">
              {/* Main Image */}
              <img
                src={detail.gallery[currentImageIndex]}
                alt={`${detail.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Gallery Navigation - only show if multiple images */}
              {detail.gallery.length > 1 && (
                <>
                  {/* Previous button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    ‹
                  </button>

                  {/* Next button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    ›
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {detail.gallery.length}
                  </div>

                  {/* Thumbnail gallery */}
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    {detail.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-12 h-12 rounded border-2 ${
                          index === currentImageIndex
                            ? 'border-white border-2'
                            : 'border-gray-400 opacity-70 hover:opacity-100'
                        } overflow-hidden transition-all duration-200`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Content container */}
          <div className="p-6 md:p-8 max-w-4xl mx-auto">
            {/* Title and metadata */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {detail.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  📅 Published on {formatDate(detail.createdAt)}
                </span>
                {detail.updatedAt !== detail.createdAt && (
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✏️ Updated on {formatDate(detail.updatedAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {detail.des && (
              <div className="mb-10">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
                  <p className="text-xl text-gray-700 leading-relaxed">{detail.des}</p>
                </div>
              </div>
            )}

            {/* Content blocks */}
            {detail.blocks && detail.blocks.length > 0 && (
              <div className="space-y-10">
                {detail.blocks.map((block, index) => (
                  <div
                    key={block._id || index}
                    className="group hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300"
                  >
                    {block.heading && (
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {block.heading}
                      </h2>
                    )}
                    {block.paragraph && (
                      <p className="text-gray-600 leading-relaxed text-lg mb-6">
                        {block.paragraph}
                      </p>
                    )}
                    {block.image && (
                      <div className="mt-6 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={block.image}
                          alt={block.heading || 'Content image'}
                          className="w-full h-auto max-h-96 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Empty state if no content */}
            {(!detail.blocks || detail.blocks.length === 0) && !detail.des && (
              <div className="text-center py-20">
                <div className="text-gray-300 text-8xl mb-6">📄</div>
                <h3 className="text-2xl font-bold text-gray-400 mb-4">No Content Available</h3>
                <p className="text-gray-500 text-lg">This blog post doesn't have any content yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}