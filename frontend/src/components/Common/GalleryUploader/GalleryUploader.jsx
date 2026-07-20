"use client";
import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ImageWithSkeleton from "../ImageWithSkeleton/ImageWithSkeleton";
import { handleGalleryChange } from "../../../CustomHooks/handleGalleryChange";
import { removeNewGalleryImage } from "../../../CustomHooks/removeNewGallery";

/*
  existingGallery  — string[]  (array of image URLs from DB)
*/

const SortableImage = ({ url, index, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group ${isDragging ? "z-50 shadow-2xl" : ""}`}
    >
      <div
        className={`aspect-[4/4] overflow-hidden rounded-lg border-2 ${
          isDragging ? "border-blue-500" : "border-transparent"
        }`}
      >
        <ImageWithSkeleton
          src={url}
          alt={`gallery-existing-${index}`}
          className="w-full h-32 object-cover transform transition-transform group-hover:scale-105"
        />
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-800 shadow-sm z-10"
      >
        ×
      </button>
    </div>
  );
};

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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = existingGallery.indexOf(active.id);
    const newIndex = existingGallery.indexOf(over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    setExistingGallery(arrayMove(existingGallery, oldIndex, newIndex));
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
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={existingGallery} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {existingGallery.map((url, index) => (
                  <SortableImage key={url} url={url} index={index} onRemove={removeExisting} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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
