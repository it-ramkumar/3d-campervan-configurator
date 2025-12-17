"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateBlog, createBlog } from "../../../../api/blog/createBlogs";
import axios from "axios";
import { addBlock } from "../../../CustomHooks/addBlock";
import { removeBlock } from "../../../CustomHooks/removeBlock";
import { handleBlockChange } from "../../../CustomHooks/handleBlockChanges";
import { handleImageChange } from "../../../CustomHooks/handleImageChange";
import { addTableRow, addTableColumn } from "../../../CustomHooks/addTableRow";
import { addProsOrCons } from "../../../CustomHooks/addProsOrCons";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import { addMediaLinkBlock } from "../../../CustomHooks/mediaLinkInblock";
import GalleryUploader from "../../Common/GalleryUploader/GalleryUploader"

export default function BlogForm({ setSelected }) {
  const editData = useSelector((state) => state.editData.editData);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState([]); // New file objects to upload
  const [galleryPreviews, setGalleryPreviews] = useState([]); // Preview URLs for new files
  const [existingGallery, setExistingGallery] = useState([]); // Existing URLs
  const [removedExistingGallery, setRemovedExistingGallery] = useState([]); // Removed existing URLs

  // Function to clear/reset all forms
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setBlocks([]);
    setIsEditMode(false);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery([]);
    setRemovedExistingGallery([]);
  };

  // ✅ IMPROVED: Prefill edit data
  useEffect(() => {
    if (editData && editData._id) {
      setIsEditMode(true);
      setTitle(editData.title || "");
      setDescription(editData.description || "");

      // 🖼️ GALLERY HANDLING: Existing URLs ko set karna
      setExistingGallery(editData.gallery || []); // Assuming `editData.gallery` is an array of URLs
      setGalleryFiles([]);
      setGalleryPreviews([]);
      setRemovedExistingGallery([]);

      try {
        const parsed =
          typeof editData.content === "string"
            ? JSON.parse(editData.content)
            : editData.content;

        const processedBlocks = (parsed || []).map((block) => {
          if (block.type === "image") {
            const imageUrl = block.url || block.preview || block.image; // handle all
            return {
              ...block,
              url: imageUrl,
              preview: imageUrl,
              file: null,
            };
          }
          return block;
        });

        setBlocks(processedBlocks);
      } catch (err) {
        console.error("Error parsing editData.content:", err);
        setBlocks([]);
      }
    } else {
      // Reset form when not editing
      clearForm();
    }
  }, [editData]);
  const handleRemoveBlock = async (index) => {
    const block = blocks[index];
    if (block.type === "image" && block.url) {
      try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/delete-image`, { imageUrl: block.url });
        console.log("✅ Block image deleted from S3");
      } catch (err) {
        console.error("❌ Failed to delete block image:", err);
      }
    }
    removeBlock(index, setBlocks);
  };

  // ✅ FIXED: Submit form - Proper image handling for blocks and new gallery
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    setLoading(true);
    try {
      // 1. Delete removed gallery images from backend/S3 (Portfolio style)
      if (removedExistingGallery.length > 0) {
        await Promise.all(
          removedExistingGallery.map((url) =>
            axios.post(
              `${import.meta.env.VITE_REACT_APP_API_URL}/delete-image`,
              { imageUrl: url }
            )
          )
        );
      }

      // 2. Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("description", description);

      // Block images handling (existing logic maintained)
      let imageIndex = 0;
      const cleanedBlocks = blocks.map((block) => {
        if (block.type === "image") {
          if (block.file) {
            // New image uploaded
            const newBlock = {
              type: "image",
              imageField: `image_${imageIndex}`,
              existingImage: block.url || null, // existing image to be deleted
            };
            imageIndex++;
            return newBlock;
          } else if (block.url) {
            // Existing image - no changes
            return {
              type: "image",
              image: block.url, // Backend expects 'image' field for existing images
            };
          } else {
            // Image removed
            return { type: "image", image: null };
          }
        }
        return block;
      });

      formDataToSend.append("content", JSON.stringify(cleanedBlocks));

      // Attach block images
      blocks.forEach((block) => {
        if (block.type === "image" && block.file) {
          formDataToSend.append("images", block.file);
        }
      });

      // 🖼️ ATTACH NEW GALLERY FILES (Portfolio style)
      galleryFiles.forEach((file) => formDataToSend.append("gallery", file));

      // 🖼️ ATTACH REMAINING EXISTING GALLERY URLS (Portfolio style)
      const remainingGalleryUrls = existingGallery.filter(
        (url) => !removedExistingGallery.includes(url)
      );
      formDataToSend.append(
        "existingGallery",
        JSON.stringify(remainingGalleryUrls)
      );

      // 3. Create/update blog
      if (isEditMode) {
        await updateBlog(editData._id, formDataToSend);
        setSelected("Blogs-listing")
      } else {
        await createBlog(formDataToSend);
        setSelected("Blogs-listing")

      }

      // Reset form
      clearForm();
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Cleanup object URLs (Updated to check galleryPreviews)
  useEffect(() => {
    return () => {
      // Cleanup block image previews
      blocks.forEach((block) => {
        if (block.type === "image" && block.preview && block.file) {
          try {
            URL.revokeObjectURL(block.preview);
          } catch (e) { }
        }
      });

      // Cleanup new gallery file previews
      galleryPreviews.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) { }
      });
    };
  }, [blocks, galleryPreviews]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "✏️ Edit Blog" : "📝 Create New Blog"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Short Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows="3"
        />
        {/* GALLERY UPLOAD */}
        <GalleryUploader
          galleryFiles={galleryFiles}
          setGalleryFiles={setGalleryFiles}
          galleryPreviews={galleryPreviews}
          setGalleryPreviews={setGalleryPreviews}
          existingGallery={existingGallery}
          setExistingGallery={setExistingGallery}
          removedExistingGallery={removedExistingGallery}
          setRemovedExistingGallery={setRemovedExistingGallery}
        />
        {/* Blocks */}
        {blocks.map((block, i) => (
          <div key={i} className="relative border p-4 rounded bg-gray-50 mb-6">
            <button
              type="button"
              onClick={() => handleRemoveBlock(i)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              ✕ Remove
            </button>

            {/* Heading */}
            {block.type === "heading" && (
              <input
                type="text"
                placeholder="Heading..."
                value={block.text || ""}
                onChange={(e) =>
                  handleBlockChange(i, "text", e.target.value, null, null, setBlocks)
                }
                className="w-full border p-2 rounded text-lg font-semibold"
              />
            )}

            {/* Subheading */}
            {block.type === "subheading" && (
              <input
                type="text"
                placeholder="Sub Heading..."
                value={block.text || ""}
                onChange={(e) =>
                  handleBlockChange(i, "text", e.target.value, null, null, setBlocks)
                }
                className="w-full border p-2 rounded text-md font-semibold text-gray-700"
              />
            )}

            {/* Paragraph */}
            {block.type === "paragraph" && (
              <textarea
                placeholder="Write paragraph..."
                value={block.text || ""}
                onChange={(e) =>
                  handleBlockChange(i, "text", e.target.value, null, null, setBlocks)
                }
                className="w-full border p-2 rounded"
                rows="4"
              />
            )}

            {/* Image */}
            {block.type === "image" && (
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(i, e.target.files[0], setBlocks)}
                  className="w-full border p-2 rounded"
                />
                {(block.preview || block.url) && (
                  <div className="mt-2">
                    <ImageWithSkeleton
                      src={block.preview || block.url}
                      alt="preview"
                      className="w-48 "
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {block.file ? "New image selected" : "Existing image"}
                      {block.url && !block.file && (
                        <span className="block">
                          URL: {block.url.substring(0, 50)}...
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
            {block.type === "table" && (
              <div>
                <table className="border w-full text-left">
                  <tbody>
                    {block.rows?.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex} className="border p-2">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) =>
                                handleBlockChange(
                                  i,
                                  "table",
                                  e.target.value,
                                  rowIndex,
                                  colIndex,
                                  setBlocks
                                )
                              }
                              className="w-full border-none outline-none"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => addTableRow(i, setBlocks)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    + Add Row
                  </button>
                  <button
                    type="button"
                    onClick={() => addTableColumn(i, setBlocks)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                  >
                    + Add Column
                  </button>
                </div>
              </div>
            )}

            {/* Media Link Block */}
            {block.type === "mediaLink" && (
              <div className="border p-2 rounded bg-gray-50 mb-4">
                <input
                  type="text"
                  placeholder="Enter media link"
                  value={block.url}
                  onChange={(e) =>
                    handleBlockChange(i, "url", e.target.value, null, null, setBlocks)
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            )}



            {/* Pros & Cons */}
            {block.type === "proscons" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600">Pros</h4>
                  {block.pros?.map((pro, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder="Add a pro"
                      value={pro}
                      onChange={(e) =>
                        handleBlockChange(i, "pros", e.target.value, idx, null, setBlocks)
                      }
                      className="w-full border p-2 rounded mt-2"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addProsOrCons(i, "pros", setBlocks)}
                    className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    + Add Pro
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold text-red-600">Cons</h4>
                  {block.cons?.map((con, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder="Add a con"
                      value={con}
                      onChange={(e) =>
                        handleBlockChange(i, "cons", e.target.value, idx, null, setBlocks)
                      }
                      className="w-full border p-2 rounded mt-2"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addProsOrCons(i, "cons", setBlocks)}
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    + Add Con
                  </button>
                </div>
              </div>
            )}

            {/* ✅ New Add Block Section (Between Blocks) */}
            <div className="mt-4 border-t pt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Add block below:</span>
              <button
                onClick={() => addBlock("heading", setBlocks, i)}
                type="button"
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
              >
                + Heading
              </button>
              <button
                onClick={() => addBlock("subheading", setBlocks, i)}
                type="button"
                className="text-xs bg-sky-600 text-white px-2 py-1 rounded"
              >
                + Subheading
              </button>
              <button
                onClick={() => addBlock("paragraph", setBlocks, i)}
                type="button"
                className="text-xs bg-green-600 text-white px-2 py-1 rounded"
              >
                + Paragraph
              </button>
              <button
                onClick={() => addBlock("image", setBlocks, i)}
                type="button"
                className="text-xs bg-purple-600 text-white px-2 py-1 rounded"
              >
                + Image
              </button>
              <button
                onClick={() => addBlock("table", setBlocks, i)}
                type="button"
                className="text-xs bg-orange-600 text-white px-2 py-1 rounded"
              >
                + Table
              </button>
              <button
                onClick={() => addBlock("proscons", setBlocks, i)}
                type="button"
                className="text-xs bg-pink-600 text-white px-2 py-1 rounded"
              >
                + Pros & Cons
              </button>
              <button
                onClick={() => addMediaLinkBlock(setBlocks, i)}
                type="button"
                className="text-xs bg-gray-600 text-white px-2 py-1 rounded"
              >
                + Media Link
              </button>
            </div>
          </div>
        ))}

        {/* Add Blocks at End */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addBlock("heading", setBlocks)}
            type="button"
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            + Heading
          </button>
          <button
            onClick={() => addBlock("subheading", setBlocks)}
            type="button"
            className="px-3 py-2 bg-sky-600 text-white rounded"
          >
            + Sub Heading
          </button>
          <button
            onClick={() => addBlock("paragraph", setBlocks)}
            type="button"
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            + Paragraph
          </button>
          <button
            onClick={() => addBlock("image", setBlocks)}
            type="button"
            className="px-3 py-2 bg-purple-600 text-white rounded"
          >
            + Image
          </button>
          <button
            onClick={() => addBlock("table", setBlocks)}
            type="button"
            className="px-3 py-2 bg-orange-600 text-white rounded"
          >
            + Table
          </button>
          <button
            onClick={() => addBlock("proscons", setBlocks)}
            type="button"
            className="px-3 py-2 bg-pink-600 text-white rounded"
          >
            + Pros & Cons
          </button>
          <button
            onClick={() => addMediaLinkBlock(setBlocks)}
            type="button"
            className="text-xs bg-gray-600 text-white px-2 py-1 rounded"
          >
            + Media Link
          </button>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-black text-white py-3 rounded font-semibold disabled:bg-gray-400"
        >
          {loading ? "Saving..." : isEditMode ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
}