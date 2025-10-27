import React, { useState } from 'react';

export default function Detail({ setIsopen, detail }) {
  // Format date for better display
  // console.log(detail)
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

  // Render content based on type
  const renderContent = (item) => {
    switch (item.type) {
      case 'paragraph':
        return (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {item.text}
            </p>
          </div>
        );

      case 'heading':
        return (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 mt-8 border-b pb-2">
            {item.text}
          </h2>
        );

      case 'image':
        if (!item.image) return null;
        return (
          <div className="my-6 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <img
              src={item.image}
              alt="Content image"
              className="w-full h-auto max-h-96 object-contain mx-auto"
            />
          </div>
        );

      case 'proscons':
        return (
          <div className="my-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pros Section */}
              {item.pros && item.pros.length > 0 && (
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                    <span className="mr-2">✅</span> Advantages
                  </h3>
                  <ul className="space-y-3">
                    {item.pros.map((pro, index) =>
                      pro && pro.trim() && (
                        <li key={index} className="text-green-700 flex items-start">
                          <span className="mr-3 mt-1">•</span>
                          <span className="flex-1">{pro}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Cons Section */}
              {item.cons && item.cons.length > 0 && (
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                    <span className="mr-2">❌</span> Considerations
                  </h3>
                  <ul className="space-y-3">
                    {item.cons.map((con, index) =>
                      con && con.trim() && (
                        <li key={index} className="text-red-700 flex items-start">
                          <span className="mr-3 mt-1">•</span>
                          <span className="flex-1">{con}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      case 'table':
        if (!item.rows || item.rows.length === 0) return null;

        return (
          <div className="my-8 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <tbody>
                {item.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex === 0 ? 'bg-gray-100' : rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-6 py-4 text-sm border-b border-gray-200 ${
                          rowIndex === 0
                            ? 'font-semibold text-gray-800 text-base'
                            : 'text-gray-600'
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
                {detail.updatedAt && detail.updatedAt !== detail.createdAt && (
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✏️ Updated on {formatDate(detail.updatedAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Main content - render in exact sequence */}
            {detail.content && detail.content.length > 0 && (
              <div className="space-y-8">
                {detail.content.map((item, index) => (
                  <div key={item._id || index}>
                    {renderContent(item)}
                  </div>
                ))}
              </div>
            )}

            {/* Empty state if no content */}
            {(!detail.content || detail.content.length === 0) && (
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