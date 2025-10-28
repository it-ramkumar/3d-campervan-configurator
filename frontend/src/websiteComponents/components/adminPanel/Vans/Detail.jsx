import React, { useState } from 'react';

export default function Detail({ setIsopen, detail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gallery, setGallery] = useState(detail.gallery || []);
  console.log(detail,"vans")

  // 🧩 Safe YouTube ID extractor
  function getYouTubeVideoId(url) {
    try {
      if (!url || typeof url !== "string") return null;
      if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
      if (!url.startsWith("http")) return null;

      const urlObj = new URL(url);
      return (
        urlObj.searchParams.get("v") ||
        urlObj.pathname.split("/").pop()
      );
    } catch {
      return null;
    }
  }

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

  // Next image in gallery
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  // Previous image in gallery
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-0"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white w-full h-full overflow-hidden">
        {/* Close button */}
        <button
          className="absolute top-6 right-6 z-20 bg-white hover:bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold border border-gray-300 transition-all duration-200 hover:scale-110"
          onClick={() => setIsopen(false)}
        >
          &times;
        </button>

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto">
          {/* Sold Badge */}
          {detail.sold && (
            <div className="absolute top-6 left-6 z-20 bg-black text-white px-4 py-2 rounded-full font-bold border border-white">
              SOLD
            </div>
          )}

          {/* Gallery Section - Updated for simple string array */}
          {gallery.length > 0 && (
            <div className="relative w-full h-80 sm:h-96 md:h-[500px] bg-black overflow-hidden">
              {/* Main Image */}
              <img
                src={gallery[currentImageIndex]}
                alt={detail.van_listing?.title || 'Van Image'}
                className="w-full h-full object-contain"
              />

              {/* Gallery Navigation */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center border border-white transition-all duration-200"
                  >
                    ‹
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center border border-white transition-all duration-200"
                  >
                    ›
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm border border-white">
                    {currentImageIndex + 1} / {gallery.length}
                  </div>
                </>
              )}

              {/* Thumbnail gallery */}
              <div className="absolute bottom-4 left-4 flex space-x-2 flex-wrap">
                {gallery.map((image, index) => (
                  <div key={index} className="relative group">
                    <div
                      className={`w-12 h-12 rounded border-2 overflow-hidden cursor-pointer ${
                        index === currentImageIndex
                          ? 'border-white border-2'
                          : 'border-gray-400 opacity-70 hover:opacity-100'
                      } transition-all duration-200`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="p-6 md:p-8 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    {detail.van_listing?.title}
                  </h1>

                  {/* Model Name */}
                  {detail.van_listing?.model_name && (
                    <h2 className="text-xl md:text-2xl text-gray-700 mb-2 font-semibold">
                      {detail.van_listing.model_name}
                    </h2>
                  )}

                  {/* Subtitle */}
                  {detail.van_listing?.subtitle && (
                    <h3 className="text-lg text-gray-600 mb-4">
                      {detail.van_listing.subtitle}
                    </h3>
                  )}

                  {/* Tagline */}
                  {detail.van_listing?.tagline && (
                    <p className="text-gray-500 italic mb-4">
                      {detail.van_listing.tagline}
                    </p>
                  )}

                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-3xl font-bold text-gray-900">
                      {detail.formatted_price || `$${detail.van_listing?.price?.toLocaleString()}`}
                    </span>
                    {detail.sold && (
                      <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-bold border border-gray-300">
                        SOLD OUT
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Published: {formatDate(detail.createdAt)}</div>
                    {detail.updatedAt !== detail.createdAt && (
                      <div>Updated: {formatDate(detail.updatedAt)}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {detail.van_listing?.description && (
              <div className="mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {detail.van_listing.description}
                  </p>
                </div>
              </div>
            )}

            {/* Specifications Grid */}
            {detail.van_listing?.specifications && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {detail.van_listing.specifications.make_model && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Make & Model</h4>
                      <p className="text-gray-900">{detail.van_listing.specifications.make_model}</p>
                    </div>
                  )}

                  {detail.van_listing.specifications.wheelbase && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Wheelbase</h4>
                      <p className="text-gray-900">{detail.van_listing.specifications.wheelbase}</p>
                    </div>
                  )}

                  {detail.van_listing.specifications.drivetrain && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Drivetrain</h4>
                      <p className="text-gray-900">{detail.van_listing.specifications.drivetrain}</p>
                    </div>
                  )}

                  {detail.van_listing.specifications.engine && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Engine</h4>
                      <p className="text-gray-900">{detail.van_listing.specifications.engine}</p>
                    </div>
                  )}

                  {/* Capacity */}
                  {detail.van_listing.specifications.capacity && (
                    <>
                      {detail.van_listing.specifications.capacity.sits && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Seating Capacity</h4>
                          <p className="text-gray-900">{detail.van_listing.specifications.capacity.sits}</p>
                        </div>
                      )}

                      {detail.van_listing.specifications.capacity.sleeps && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Sleeping Capacity</h4>
                          <p className="text-gray-900">{detail.van_listing.specifications.capacity.sleeps}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Detailed Features */}
            {detail.detailed_features && detail.detailed_features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Features</h3>
                <div className="space-y-6">
                  {detail.detailed_features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      {feature.category && (
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                          {feature.category}
                        </h4>
                      )}
                      {feature.items && feature.items.length > 0 && (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {feature.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media Section */}
            {detail.media && detail.media.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Media</h3>
                <div className="space-y-6">
                  {detail.media.map((mediaItem, index) => {
                    const youtubeId = getYouTubeVideoId(mediaItem);

                    return youtubeId ? (
                      // YouTube Video
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={`YouTube Video ${index + 1}`}
                          ></iframe>
                        </div>
                      </div>
                    ) : (
                      // Image or other media
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        {mediaItem.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                          <img
                            src={mediaItem}
                            alt={`Media ${index + 1}`}
                            className="rounded-lg w-full max-w-2xl mx-auto"
                          />
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-700 break-words">{mediaItem}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty State Messages */}
            {(!gallery || gallery.length === 0) && (
              <div className="mb-8 text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">No gallery images available</p>
              </div>
            )}

            {(!detail.detailed_features || detail.detailed_features.length === 0) &&
             (!detail.van_listing?.specifications) &&
             (!detail.media || detail.media.length === 0) && (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">No additional details available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}