"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ImageWithSkeleton from "../ImageWithSkeleton/ImageWithSkeleton";
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

  // Drag end hone par order update karne ka function
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(existingGallery);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setExistingGallery(items);
  };

  return (
    <section className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gallery Images</h2>
        <p className="text-sm text-gray-500">Drag images to change their display order.</p>
      </div>

      {/* File Input */}
      <div className="mb-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleGalleryChange(e, setGalleryFiles, setGalleryPreviews)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
      </div>

      {/* Existing Images with Drag and Drop */}
      {existingGallery.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-700 mb-4">Saved Photos (Draggable)</h3>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="gallery-grid" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                >
                  {existingGallery.map((url, index) => (
                    <Draggable key={url} draggableId={url} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`relative group ${snapshot.isDragging ? "z-50 shadow-2xl" : ""}`}
                        >
                          <div className={`overflow-hidden rounded-lg border-2 ${snapshot.isDragging ? "border-blue-500" : "border-transparent"}`}>
                            <ImageWithSkeleton
                              src={url}
                              alt={`existing-${index}`}
                              className="w-full h-32 object-cover transform transition-transform group-hover:scale-105"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => removeExistingGalleryImage(index, existingGallery, setRemovedExistingGallery, setExistingGallery)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-800 shadow-sm z-10"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}

      {/* New Previews (New uploads are usually added to the end) */}
      {galleryPreviews.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-4">New Uploads (Preview)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {galleryPreviews.map((previewUrl, index) => (
              <div key={index} className="relative">
                <div className="overflow-hidden rounded-lg border-2 border-dashed border-gray-300">
                  <ImageWithSkeleton
                    src={previewUrl}
                    alt={`preview-${index}`}
                    className="w-full h-32 object-cover opacity-80"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeNewGalleryImage(index, setGalleryFiles, setGalleryPreviews, galleryPreviews)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {existingGallery.length === 0 && galleryPreviews.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-400">No images yet. Select files to upload.</p>
        </div>
      )}
    </section>
  );
};

export default GalleryUploader;