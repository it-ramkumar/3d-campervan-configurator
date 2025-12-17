"use client";
import React from "react";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import { removeNewGalleryImage } from "../../../CustomHooks/removeNewGallery";
import { removeExistingGalleryImage } from "../../../CustomHooks/removeExistingGallery";
import { handleGalleryChange } from "../../../CustomHooks/handleGalleryChange";

const GalleryUploader = ({
  galleryFiles,
  setGalleryFiles,
  galleryPreviews,
  setGalleryPreviews,
  existingGallery,
  setExistingGallery,
  removedExistingGallery,
  setRemovedExistingGallery,
}) => {
  return (
    <section className="border border-gray-300 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Gallery Images</h2>

      {/* File Input */}
      <div className="mb-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleGalleryChange(e, setGalleryFiles, setGalleryPreviews)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>

      {/* Existing Images */}
      {existingGallery.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Existing Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {existingGallery.map((url, index) => (
              <div key={index} className="relative group">
                <ImageWithSkeleton
                  src={url}
                  alt={`existing-${index}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    removeExistingGalleryImage(
                      index,
                      existingGallery,
                      setRemovedExistingGallery,
                      setExistingGallery
                    )
                  }
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Selected Images */}
      {galleryPreviews.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">New Selected Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {galleryPreviews.map((previewUrl, index) => (
              <div key={index} className="relative group">
                <ImageWithSkeleton
                  src={previewUrl}
                  alt={`preview-${index}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeNewGalleryImage(index, setGalleryFiles, setGalleryPreviews, galleryPreviews)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Images */}
      {existingGallery.length === 0 && galleryPreviews.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No images added yet</p>
        </div>
      )}
    </section>
  );
};

export default GalleryUploader;
