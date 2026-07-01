"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ImageWithSkeleton from "../ImageWithSkeleton/ImageWithSkeleton";
import { handleGalleryChange } from "../../../CustomHooks/handleGalleryChange";
import { removeNewGalleryImage } from "../../../CustomHooks/removeNewGallery";

/*
  existingGallery  — string[]  (array of image URLs from DB)
*/
const GalleryUploader = ({
  id = "gallery",
  title = "Gallery Images",
  galleryFiles,
  setGalleryFiles,
  galleryPreviews,
  setGalleryPreviews,
  existingGallery,
  setExistingGallery,
  // legacy props — ignored but kept so callers don't break
  newGalleryCaptions,
  setNewGalleryCaptions,
  removedExistingGallery,
  setRemovedExistingGallery,
}) => {

  /* ── Drag-and-drop reorder ────────────────────────────────────────────── */
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(existingGallery);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setExistingGallery(items);
  };

  /* ── Existing image actions ───────────────────────────────────────────── */
  const removeExisting = (index) => {
    setExistingGallery((prev) => prev.filter((_, i) => i !== index));
  };

  /* ── New file actions ─────────────────────────────────────────────────── */
  const handleNewFiles = (e) => {
    handleGalleryChange(e, setGalleryFiles, setGalleryPreviews);
  };

  const removeNew = (index) => {
    removeNewGalleryImage(index, setGalleryFiles, setGalleryPreviews, galleryPreviews);
  };

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <section className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">Drag saved images to reorder.</p>
      </div>

      {/* File picker */}
      <div className="mb-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleNewFiles}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
      </div>

      {/* Saved gallery — draggable */}
      {existingGallery.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-700 mb-4">Saved Photos (Draggable)</h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`${id}-grid`} direction="horizontal">
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
                          <div className={`aspect-[4/4] overflow-hidden rounded-lg border-2 ${snapshot.isDragging ? "border-blue-500" : "border-transparent"}`}>
                            <ImageWithSkeleton
                              src={url}
                              alt={`${id}-existing-${index}`}
                              className="w-full h-32 object-cover transform transition-transform group-hover:scale-105"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeExisting(index)}
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

      {/* New upload previews */}
      {galleryPreviews.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-4">New Uploads (Preview)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {galleryPreviews.map((previewUrl, index) => (
              <div key={index} className="relative">
                <div className="overflow-hidden rounded-lg border-2 border-dashed border-gray-300 aspect-[4/4]">
                  <ImageWithSkeleton
                    src={previewUrl}
                    alt={`${id}-preview-${index}`}
                    className="w-full h-32 object-cover opacity-80"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeNew(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryUploader;
