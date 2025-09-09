import { useState } from "react";
import PreviewModal from "./PreviewModal";
import PreviewCanvas from "./PreviewCanvas";
import { useSelector } from "react-redux";

const Preview = () => {
  const modelData = useSelector((state) => state.preview.preview);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="preview-container p-4 md:p-3 max-w-7xl mx-auto space-y-8">
        {/* Search Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search for Quote
            </button>
          </div>

      {/* Top Section - Left (User Info + Model Info) and Right (Canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className=" space-y-6 overflow-y-auto">
          {/* User Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 he">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-2">
              <div>
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-medium">{modelData?.name || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium">{modelData?.email || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="font-medium">{modelData?.phone || "-"}</p>
              </div>
            </div>
          </div>

          {/* Model Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Model Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
              <div>
                <p className="text-sm text-gray-500 mb-1">Model ID</p>
                <p className="font-medium">{modelData?.model?.id || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Model URL</p>
                {modelData?.model?.url ? (
                  <a
                    href={modelData.model.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 inline-flex items-center"
                  >
                    View Model
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>


        </div>

        {/* Right Side - Canvas */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full">
          <div className="flex items-center p-4 border-b">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">3D Preview</h2>
          </div>
          <div >
            {modelData ? (
              <PreviewCanvas modelUrl={modelData?.model?.url} />
            ) : (
              <div className="text-center p-8 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <p>No model selected</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Parts Info Card (Bottom Section) */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="bg-amber-100 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Selected Parts</h2>
        </div>

      {modelData?.parts?.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {modelData.parts.map((part) => (
      <div
        key={part._id}
        className="border border-gray-200 p-5 rounded-xl bg-white"
      >
        <div className="flex flex-col items-center">
          <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
            <img
              src={part.image}
              alt={part.label}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-lg mb-1 text-gray-800">
              {part.label}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {part.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <p className="font-medium">{part.category}</p>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <p className="font-medium text-green-600">${part.price}</p>
              </div>
              <div>
                <span className="text-gray-500">Group:</span>
                <p className="font-medium">{part.group}</p>
              </div>
              <div>
                <span className="text-gray-500">Type:</span>
                <p className="font-medium">{part.type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 mx-auto mb-3 opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16"
      />
    </svg>
    <p>No parts selected yet.</p>
  </div>
)}

      </div>

      {/* Preview Modal */}
      {isOpen && <PreviewModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Preview;
