"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateBlog, createBlog } from "@/api/blog/createBlogs";
import axios from "axios";
import { addBlock } from "@/CustomHooks/addBlock";
import { removeBlock } from "@/CustomHooks/removeBlock";
import { handleBlockChange } from "@/CustomHooks/handleBlockChanges";
import { handleImageChange } from "@/CustomHooks/handleImageChange";
import { addTableRow, addTableColumn } from "@/CustomHooks/addTableRow";
import { addProsOrCons } from "@/CustomHooks/addProsOrCons";
import { ImageWithSkeleton } from "@/components/Common/Common";
import { addMediaLinkBlock } from "@/CustomHooks/mediaLinkInblock";
import GalleryUploader from "@/components/Common/GalleryUploader/GalleryUploader";

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
      clearForm();
    }
  }, [editData]);
  const handleRemoveBlock = async (index) => {
    const block = blocks[index];
    if (block.type === "image" && block.url) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_URL}/delete-image`, { imageUrl: block.url });
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
      // 1. Delete removed gallery images
      if (removedExistingGallery.length > 0) {
        await Promise.all(
          removedExistingGallery.map((url) =>
            axios.post(
              `${process.env.NEXT_PUBLIC_URL}/delete-image`,
              { imageUrl: url }
            )
          )
        );
      }

      // 2. Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("description", description);
      let imageIndex = 0;
      const cleanedBlocks = blocks
        .map((block) => {
          let b = { ...block };
          delete b._id;

          if (b.type === "image") {
            const imgBlock = { type: "image" };
            if (b.file) {
              imgBlock.imageField = `image_${imageIndex}`;
              imgBlock.existingImage = b.url || null;
              imageIndex++;
              return imgBlock;
            } else if (b.url) {
              imgBlock.image = b.url;
              return imgBlock;
            }
            return null;
          }

          if (b.type === "heading" || b.type === "subheading" || b.type === "paragraph") {
            delete b.image;
            delete b.url;
            delete b.rows;
            delete b.pros;
            delete b.cons;
            delete b.file;
            return b.text?.trim() ? b : null;
          }
          // ... existing code in handleSubmit ...
          if (b.type === "list") {
            delete b.text;
            delete b.image;
            delete b.rows;
            delete b.pros;
            delete b.cons;
            delete b.url;
            // Khali items nikaal dein
            b.items = b.items?.filter(item => item.trim() !== "");
            return b.items?.length > 0 ? b : null;
          }
          // ... rest of the blocks ...
          if (b.type === "table") {
            delete b.text;
            delete b.image;
            delete b.pros;
            delete b.cons;
            // Empty rows filter karein
            if (b.rows) {
              b.rows = b.rows.filter(row => row.some(cell => cell && cell.trim() !== ""));
            }
            return b.rows?.length > 0 ? b : null;
          }

          if (b.type === "proscons") {
            delete b.text;
            delete b.image;
            delete b.rows;
            // Khali pros/cons nikaal dein
            b.pros = b.pros?.filter(p => p.trim() !== "");
            b.cons = b.cons?.filter(c => c.trim() !== "");
            return (b.pros?.length > 0 || b.cons?.length > 0) ? b : null;
          }

          if (b.type === "mediaLink") {
            return b.url?.trim() ? b : null;
          }

          return b;
        })
        .filter((block) => block !== null); // Sirf valid blocks rakhein

      formDataToSend.append("content", JSON.stringify(cleanedBlocks));

      // Attach block files (Original block array se file uthayein)
      blocks.forEach((block) => {
        if (block.type === "image" && block.file) {
          formDataToSend.append("images", block.file);
        }
      });

      // 🖼️ Gallery Files
      galleryFiles.forEach((file) => formDataToSend.append("gallery", file));

      // 🖼️ Existing Gallery URLs
      const remainingGalleryUrls = existingGallery.filter(
        (url) => !removedExistingGallery.includes(url)
      );
        // // 3. Create/update blog
      if (isEditMode) {
        await updateBlog(editData._id, formDataToSend);
        setSelected("Blogs-listing");
      } else {
        await createBlog(formDataToSend);
        setSelected("Blogs-listing");
      }

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
            {/* List Block */}
            {/* Form.jsx mein list rendering part */}
            {/* List Block */}
            {block.type === "list" && (
              <div className="space-y-3 w-full"> {/* space-y-3 vertical spacing ke liye */}
                <h4 className="font-semibold text-gray-700">List Items</h4>

                {(Array.isArray(block.items) ? block.items : []).map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center w-full group">
                    {/* Numbering: whitespace-nowrap zaroori hai taaki number apni jagah na chhode */}
                    <span className="text-gray-400 font-medium min-w-[25px] whitespace-nowrap">
                      {idx + 1}.
                    </span>

                    {/* Input: flex-1 aur w-full isse poori line lene par majboor karenge */}
                    <input
                      type="text"
                      placeholder="Enter list item..."
                      value={item || ""}
                      onChange={(e) =>
                        handleBlockChange(i, "items", e.target.value, idx, null, setBlocks)
                      }
                      className="flex-1 w-full border border-gray-300 p-2 rounded-md outline-none focus:border-blue-500 transition-all"
                    />

                    {/* Remove Button: Sirf tab dikhe jab 1 se zyada item hon */}
                    {block.items.length > 1 && (
                      <button
                        type="button"
                       onClick={() => {
  setBlocks((prevBlocks) => {
    // 1. Poore array ki copy
    const newBlocks = [...prevBlocks];

    // 2. Us specific block ki bhi copy banayein jise edit kar rahe hain (Reference break karne ke liye)
    const targetBlock = { ...newBlocks[i] };

    // 3. Items ko filter karke naya array banayein
    targetBlock.items = targetBlock.items.filter((_, itemIdx) => itemIdx !== idx);

    // 4. Naya block wapis array mein daalein
    newBlocks[i] = targetBlock;

    return newBlocks; // Ab React ko naya reference milega aur wo foran remove kar dega
  });
}}
                        className="text-red-400 hover:text-red-600 px-2 transition-colors"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const updated = [...blocks];
                    updated[i].items = [...(updated[i].items || []), ""];
                    setBlocks(updated);
                  }}
                  className="mt-2 px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow-sm text-sm font-medium transition-colors"
                >
                  + Add New Item
                </button>
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
              {/* End of blocks aur block ke darmiyan dono jagah ye button add karein */}
              <button
                onClick={() => addBlock("list", setBlocks, i)}
                type="button"
                className="text-xs bg-yellow-600 text-white px-2 py-1 rounded"
              >
                + List
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
          {/* End of blocks aur block ke darmiyan dono jagah ye button add karein */}
          <button
            onClick={() => addBlock("list", setBlocks)}
            type="button"
            className="text-xs bg-yellow-600 text-white px-2 py-1 rounded"
          >
            + List
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