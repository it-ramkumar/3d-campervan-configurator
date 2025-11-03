"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateBlog, createBlog } from "../../../../api/blog/createBlogs";
import axios from "axios";

// Custom hook functions integrated into the same file

// Add new block
const addBlock = (type, setBlocks, insertIndex = null) => {
  const newBlock = { type };

  switch (type) {
    case "heading":
    case "subheading":
    case "paragraph":
      newBlock.text = "";
      break;
    case "image":
      newBlock.file = null;
      newBlock.preview = "";
      newBlock.url = "";
      break;
    case "table":
      newBlock.rows = [["", ""]];
      break;
    case "proscons":
      newBlock.pros = [""];
      newBlock.cons = [""];
      break;
    default:
      break;
  }

  setBlocks(prev => {
    if (insertIndex !== null) {
      const newBlocks = [...prev];
      newBlocks.splice(insertIndex + 1, 0, newBlock);
      return newBlocks;
    }
    return [...prev, newBlock];
  });
};

// Remove block
const removeBlock = (index, setBlocks) => {
  setBlocks(prev => prev.filter((_, i) => i !== index));
};

// Remove existing gallery image
const removeExistingGalleryImage = (index, setGallery, setRemovedGallery, gallery) => {
  const imageToRemove = gallery[index];
  if (imageToRemove.url) {
    setRemovedGallery(prev => [...prev, imageToRemove.url]);
  }
  setGallery(prev => prev.filter((_, i) => i !== index));
};

// Remove new gallery image
const removeNewGalleryImage = (index, setGalleryFiles, galleryFiles) => {
  const imageToRemove = galleryFiles[index];
  if (imageToRemove.preview) {
    URL.revokeObjectURL(imageToRemove.preview);
  }
  setGalleryFiles(prev => prev.filter((_, i) => i !== index));
};

// Handle block changes
const handleBlockChange = (blockIndex, field, value, rowIndex, colIndex, setBlocks) => {
  setBlocks(prev => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };

    if (field === "table" && rowIndex !== null && colIndex !== null) {
      // Handle table cell changes
      const updatedRows = block.rows.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
          : row
      );
      block.rows = updatedRows;
    } else if (field === "pros" || field === "cons") {
      // Handle pros/cons changes
      const updatedArray = [...(block[field] || [])];
      updatedArray[rowIndex] = value;
      block[field] = updatedArray;
    } else {
      // Handle other field changes
      block[field] = value;
    }

    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};

// ✅ FIXED: Handle image change for blocks - Preserve existing URL
const handleImageChange = (blockIndex, file, setBlocks) => {
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);

  setBlocks(prev => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };

    // Clean up previous preview if it was a blob URL
    if (block.preview && block.preview.startsWith('blob:')) {
      URL.revokeObjectURL(block.preview);
    }

    block.file = file;
    block.preview = previewUrl;
    // ✅ FIX: Don't clear existing URL, keep it for reference
    // block.url remains unchanged so backend knows which image to replace

    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};

// Add table row
const addTableRow = (blockIndex, setBlocks) => {
  setBlocks(prev => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };
    const columns = block.rows[0]?.length || 2;
    const newRow = Array(columns).fill("");
    block.rows = [...block.rows, newRow];
    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};

// Add pros or cons
const addProsOrCons = (blockIndex, type, setBlocks) => {
  setBlocks(prev => {
    const updatedBlocks = [...prev];
    const block = { ...updatedBlocks[blockIndex] };
    block[type] = [...(block[type] || []), ""];
    updatedBlocks[blockIndex] = block;
    return updatedBlocks;
  });
};

// Handle gallery change
const handleGalleryChange = (event, setGalleryFiles) => {
  const files = Array.from(event.target.files);

  const newGalleryFiles = files.map(file => ({
    file,
    preview: URL.createObjectURL(file),
    url: ""
  }));

  setGalleryFiles(prev => [...prev, ...newGalleryFiles]);
  event.target.value = ""; // Reset input
};

export default function BlogForm() {
  const editData = useSelector((state) => state.editData.editData);
  console.log(editData,"data")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState([]); // {file: File, preview: string, url: string}[]
  const [galleryFiles, setGalleryFiles] = useState([]); // New files only
  const [blocks, setBlocks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [removedGallery, setRemovedGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ IMPROVED: Prefill edit data
  useEffect(() => {
    if (editData && editData._id) {
      setIsEditMode(true);
      setTitle(editData.title || "");
      setDescription(editData.description || "");

      // ✅ FIXED: Gallery handling
      const existingGallery = (editData.gallery || []).map((url) => ({
        url,
        preview: url,
        file: null
      }));
      setGallery(existingGallery);
      setGalleryFiles([]); // Reset new files

      try {
        const parsed = typeof editData.content === "string"
          ? JSON.parse(editData.content)
          : editData.content;

        const processedBlocks = (parsed || []).map(block => {
          if (block.type === "image") {
            const imageUrl = block.url || block.preview || block.image; // handle all
            return {
              ...block,
              url: imageUrl,
              preview: imageUrl,
              file: null
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
      setIsEditMode(false);
      setTitle("");
      setDescription("");
      setGallery([]);
      setGalleryFiles([]);
      setBlocks([]);
      setRemovedGallery([]);
    }
  }, [editData]);


// ✅ FIXED: Submit form - Better image handling
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim()) {
    alert("Title is required!");
    return;
  }

  setLoading(true);
  try {
    // ✅ 1. Delete removed gallery images from backend/S3
    if (removedGallery.length > 0) {
      await Promise.all(
        removedGallery.map((url) =>
          axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/delete-image`, { imageUrl: url })
        )
      );
    }

    // 2. Prepare FormData
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("description", description);

    // ✅ FIXED: Proper blocks handling for images
    let imageIndex = 0;
    const cleanedBlocks = blocks.map((block) => {
      if (block.type === "image") {
        if (block.file) {
          // New image uploaded
          const newBlock = {
            type: "image",
            imageField: `image_${imageIndex}`,
            // ✅ IMPORTANT: Send existing image URL if available for reference
            existingImage: block.url || null
          };
          imageIndex++;
          return newBlock;
        } else if (block.url) {
          // Existing image - no changes
          return {
            type: "image",
            image: block.url  // ✅ Backend expects 'image' field for existing images
          };
        } else {
          // Image removed
          return { type: "image", image: null };
        }
      }
      return block;
    });

    formDataToSend.append("content", JSON.stringify(cleanedBlocks));

    // ✅ FIXED: Attach block images with proper mapping
    blocks.forEach((block) => {
      if (block.type === "image" && block.file) {
        formDataToSend.append("images", block.file);
      }
    });

    // Attach new gallery files
    galleryFiles.forEach((imgObj) => {
      if (imgObj.file) formDataToSend.append("gallery", imgObj.file);
    });

    // ✅ FIXED: Send removed gallery URLs to backend
    formDataToSend.append("deleteGallery", JSON.stringify(removedGallery));

    // Attach remaining existing gallery URLs
    const remainingGalleryUrls = gallery
      .filter(img => img.url && !removedGallery.includes(img.url))
      .map(img => img.url);
    formDataToSend.append("existingGallery", JSON.stringify(remainingGalleryUrls));

    console.log("Sending blocks:", cleanedBlocks); // Debug log

    // 3. Create/update blog
    if (isEditMode) {
      await updateBlog(editData._id, formDataToSend);
      alert("✅ Blog updated successfully!");
    } else {
      await createBlog(formDataToSend);
      alert("✅ Blog created successfully!");
    }

    // Reset form
    setTitle("");
    setDescription("");
    setGallery([]);
    setGalleryFiles([]);
    setBlocks([]);
    setRemovedGallery([]);
    setIsEditMode(false);

  } catch (err) {
    console.error("Upload error:", err);
    alert("❌ Upload failed: " + (err.response?.data?.message || err.message));
  } finally {
    setLoading(false);
  }
};

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      // Cleanup block image previews
      blocks.forEach(block => {
        if (block.type === "image" && block.preview && block.file) {
          URL.revokeObjectURL(block.preview);
        }
      });

      // Cleanup gallery file previews
      galleryFiles.forEach(img => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [blocks, galleryFiles]);

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

        {/* ✅ Gallery Section */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-3">Gallery Images</h3>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(event) => handleGalleryChange(event, setGalleryFiles)}
            className="w-full border p-2 rounded mb-3"
          />

          {/* Existing Gallery Images */}
          {gallery.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Existing Images:</h4>
              <div className="flex flex-wrap gap-3">
                {gallery.map((img, i) => (
                  <div key={`existing-${i}`} className="relative">
                    <img
                      loading="lazy"
                      src={img.preview || img.url}
                      alt={`gallery-${i}`}
                      className="w-24 h-24 rounded shadow object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeExistingGalleryImage(i, setGallery, setRemovedGallery, gallery)
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

          {/* New Gallery Images */}
          {galleryFiles.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">New Images:</h4>
              <div className="flex flex-wrap gap-3">
                {galleryFiles.map((img, i) => (
                  <div key={`new-${i}`} className="relative">
                    <img
                      loading="lazy"
                      src={img.preview}
                      alt={`new-gallery-${i}`}
                      className="w-24 h-24 rounded shadow object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewGalleryImage(i, setGalleryFiles, galleryFiles)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {gallery.length === 0 && galleryFiles.length === 0 && (
            <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
          )}
        </div>

        {/* Blocks */}
        {blocks.map((block, i) => (
          <div key={i} className="relative border p-4 rounded bg-gray-50 mb-6">
            <button
              type="button"
              onClick={() => removeBlock(i, setBlocks)}
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
                    <img
                      loading="lazy"
                      src={block.preview || block.url}
                      alt="preview"
                      className="w-48 rounded shadow"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {block.file ? "New image selected" : "Existing image"}
                      {block.url && !block.file && (
                        <span className="block">URL: {block.url.substring(0, 50)}...</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Table */}
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
                <button
                  type="button"
                  onClick={() => addTableRow(i, setBlocks)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  + Add Row
                </button>
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
              <button onClick={() => addBlock("heading", setBlocks, i)} type="button" className="text-xs bg-blue-600 text-white px-2 py-1 rounded">+ Heading</button>
              <button onClick={() => addBlock("subheading", setBlocks, i)} type="button" className="text-xs bg-sky-600 text-white px-2 py-1 rounded">+ Subheading</button>
              <button onClick={() => addBlock("paragraph", setBlocks, i)} type="button" className="text-xs bg-green-600 text-white px-2 py-1 rounded">+ Paragraph</button>
              <button onClick={() => addBlock("image", setBlocks, i)} type="button" className="text-xs bg-purple-600 text-white px-2 py-1 rounded">+ Image</button>
              <button onClick={() => addBlock("table", setBlocks, i)} type="button" className="text-xs bg-orange-600 text-white px-2 py-1 rounded">+ Table</button>
              <button onClick={() => addBlock("proscons", setBlocks, i)} type="button" className="text-xs bg-pink-600 text-white px-2 py-1 rounded">+ Pros & Cons</button>
            </div>
          </div>
        ))}

        {/* Add Blocks at End */}
        <div className="flex flex-wrap gap-3">
          <button onClick={() => addBlock("heading", setBlocks)} type="button" className="px-3 py-2 bg-blue-600 text-white rounded">+ Heading</button>
          <button onClick={() => addBlock("subheading", setBlocks)} type="button" className="px-3 py-2 bg-sky-600 text-white rounded">+ Sub Heading</button>
          <button onClick={() => addBlock("paragraph", setBlocks)} type="button" className="px-3 py-2 bg-green-600 text-white rounded">+ Paragraph</button>
          <button onClick={() => addBlock("image", setBlocks)} type="button" className="px-3 py-2 bg-purple-600 text-white rounded">+ Image</button>
          <button onClick={() => addBlock("table", setBlocks)} type="button" className="px-3 py-2 bg-orange-600 text-white rounded">+ Table</button>
          <button onClick={() => addBlock("proscons", setBlocks)} type="button" className="px-3 py-2 bg-pink-600 text-white rounded">+ Pros & Cons</button>
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