"use client";
import React from "react";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";

export default function Detail({ setIsopen, detail }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) setIsopen(false);
  };

  const renderContent = (item) => {
    switch (item.type) {
      case "paragraph":
        return (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {item.text}
            </p>
          </div>
        );

      case "heading":
        return (
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8 border-l-4 border-blue-600 pl-4">
            {item.text}
          </h2>
        );

      case "image":
        if (!item.image) return null;
        return (
          <div className="my-8 bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <ImageWithSkeleton
              src={item.image}
              alt="Content image"
              className="w-full h-auto max-h-[500px] object-contain mx-auto"
            />
          </div>
        );

      case "proscons":
        return (
          <div className="my-10 grid md:grid-cols-2 gap-6">
            {item.pros?.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-green-800 mb-5 flex items-center">
                  <span className="text-2xl mr-3">✅</span> Pros
                </h3>
                <ul className="space-y-3">
                  {item.pros.map(
                    (pro, idx) =>
                      pro?.trim() && (
                        <li key={idx} className="text-green-900 flex items-start text-sm md:text-base">
                          <span className="text-green-600 font-bold mr-3 mt-1">•</span>
                          <span className="flex-1">{pro}</span>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
            {item.cons?.length > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border-2 border-red-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-red-800 mb-5 flex items-center">
                  <span className="text-2xl mr-3">❌</span> Cons
                </h3>
                <ul className="space-y-3">
                  {item.cons.map(
                    (con, idx) =>
                      con?.trim() && (
                        <li key={idx} className="text-red-900 flex items-start text-sm md:text-base">
                          <span className="text-red-600 font-bold mr-3 mt-1">•</span>
                          <span className="flex-1">{con}</span>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
          </div>
        );

      case "table":
        if (!item.rows || item.rows.length === 0) return null;
        return (
          <div className="my-8 overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <tbody>
                {item.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      rowIndex === 0
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                        : rowIndex % 2 === 0
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-50 hover:bg-gray-100"
                    }
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-6 py-4 text-sm border-b border-gray-200 ${
                          rowIndex === 0
                            ? "font-bold text-base"
                            : "text-gray-700"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-0 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white w-full h-full overflow-hidden">
        {/* Close Button */}
        <button
          className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-white hover:bg-red-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-2xl transition-all duration-300 hover:scale-110 hover:text-white group"
          onClick={() => setIsopen(false)}
          aria-label="Close"
        >
          <span className="group-hover:rotate-90 transition-transform duration-300">
            &times;
          </span>
        </button>

        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto pb-20">
            {/* Hero Section */}
            <div className="mb-10 md:mb-12">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                {detail.title}
              </h1>

              {detail.description && (
                <p className="text-lg md:text-xl text-gray-600 mb-6 italic border-l-4 border-blue-500 pl-4">
                  {detail.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-sm">
                  📅 {formatDate(detail.createdAt)}
                </span>
                {detail.updatedAt && detail.updatedAt !== detail.createdAt && (
                  <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-sm">
                    ✏️ Updated {formatDate(detail.updatedAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Featured Gallery Image */}
            {detail.gallery && detail.gallery.length > 0 && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithSkeleton
                  src={detail.gallery[0]}
                  alt={detail.title}
                  className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                />
              </div>
            )}

            {/* Main Content */}
            {detail.content && detail.content.length > 0 && (
              <div className="prose prose-lg max-w-none">
                {detail.content.map((item, index) => (
                  <div key={item._id || index} className="animate-slideUp">
                    {renderContent(item)}
                  </div>
                ))}
              </div>
            )}

            {/* Additional Gallery */}
            {detail.gallery && detail.gallery.length > 1 && (
              <div className="my-16">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">
                  🖼️ Image Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {detail.gallery.slice(1).map((imgUrl, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-2xl shadow-lg bg-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                    >
                      <ImageWithSkeleton
                        src={imgUrl}
                        alt={`Gallery image ${i + 2}`}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}