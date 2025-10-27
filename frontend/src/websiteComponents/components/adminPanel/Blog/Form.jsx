"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateBlog, createBlog } from "../../../../api/blog/createBlogs";

export default function BlogForm() {
  const editData = useSelector((state) => state.editData.editData);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Detect edit mode and prefill data
  useEffect(() => {
    if (editData && editData._id) {
      setIsEditMode(true);
      setTitle(editData.title || "");
      setDescription(editData.description || "");
      setGallery(editData.gallery || []);
      try {
        const parsed =
          typeof editData.content === "string"
            ? JSON.parse(editData.content)
            : editData.content;
        setBlocks(parsed || []);
      } catch (err) {
        console.error("Error parsing editData.content:", err);
      }
    }
  }, [editData]);

  // 🔹 Add new block
  const addBlock = (type) => {
    const newBlock =
      type === "paragraph"
        ? { type, text: "" }
        : type === "heading"
        ? { type, text: "" }
        : type === "image"
        ? { type, file: null, preview: "" }
        : type === "table"
        ? { type, rows: [["", ""], ["", ""]] }
        : type === "proscons"
        ? { type, pros: [""], cons: [""] }
        : null;
    setBlocks([...blocks, newBlock]);
  };

  // 🔹 Remove block
  const removeBlock = (index) => {
    const updated = [...blocks];
    updated.splice(index, 1);
    setBlocks(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...blocks];
    updated[index][field] = value;
    setBlocks(updated);
  };

  const handleImageChange = (index, file) => {
    const updated = [...blocks];
    updated[index].file = file;
    updated[index].preview = URL.createObjectURL(file);
    setBlocks(updated);
  };

  const handleTableChange = (blockIndex, rowIndex, colIndex, value) => {
    const updated = [...blocks];
    updated[blockIndex].rows[rowIndex][colIndex] = value;
    setBlocks(updated);
  };

  const addTableRow = (blockIndex) => {
    const updated = [...blocks];
    updated[blockIndex].rows.push(["", ""]);
    setBlocks(updated);
  };

  // 🔹 Handle gallery upload
  const handleGalleryChange = (files) => {
    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setGallery(previews);
  };

  // 🔹 Submit (Create or Update)
// 🔹 Submit (Create or Update)
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);

  // 🔹 FIX: Track image index separately
  let imageIndex = 0;
  const cleanedBlocks = blocks.map((block) => {
    if (block.type === "image" && block.file) {
      const newBlock = {
        type: "image",
        imageField: `image_${imageIndex}`,
        ...(block.url && { url: block.url })
      };
      imageIndex++; // Only increment for actual images
      return newBlock;
    }
    return block;
  });

  formData.append("content", JSON.stringify(cleanedBlocks));

  // 🔹 FIX: Attach images in correct order
  blocks.forEach((block) => {
    if (block.type === "image" && block.file) {
      formData.append("images", block.file);
    }
  });

  // Attach gallery images
  gallery.forEach((imgObj) => {
    if (imgObj.file) formData.append("gallery", imgObj.file);
  });

  console.log("Sending blocks:", cleanedBlocks); // Debug log

  setLoading(true);
  try {
    let res;
    if (isEditMode) {
      res = await updateBlog(editData._id, formData);
      alert("✅ Blog updated successfully!");
    } else {
      res = await createBlog(formData);
      alert("✅ Blog uploaded successfully!");
    }

    // Reset form
    setBlocks([]);
    setTitle("");
    setDescription("");
    setGallery([]);
    setIsEditMode(false);
  } catch (err) {
    console.error("Upload error:", err);
    alert("❌ Upload failed: " + (err.response?.data?.message || err.message));
  } finally {
    setLoading(false);
  }
};

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

        {/* Gallery Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload Gallery</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleGalleryChange(e.target.files)}
          />
          <div className="flex flex-wrap gap-3 mt-3">
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img.preview || img}
                alt={`gallery-${i}`}
                className="w-24 h-24 rounded shadow object-cover"
              />
            ))}
          </div>
        </div>

        {/* Blocks */}
        {blocks.map((block, i) => (
          <div key={i} className="relative border p-3 rounded bg-gray-50">
            {/* ❌ Remove Button */}
            <button
              type="button"
              onClick={() => removeBlock(i)}
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
                onChange={(e) => handleChange(i, "text", e.target.value)}
                className="w-full border p-2 rounded"
              />
            )}

            {/* Paragraph */}
            {block.type === "paragraph" && (
              <textarea
                placeholder="Write paragraph..."
                value={block.text || ""}
                onChange={(e) => handleChange(i, "text", e.target.value)}
                className="w-full border p-2 rounded"
                rows="4"
              />
            )}

            {/* Image */}
            {block.type === "image" && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(i, e.target.files[0])}
                />
                {(block.preview || block.url) && (
                  <img
                    src={block.preview || block.url}
                    alt="preview"
                    className="w-48 mt-2 rounded shadow"
                  />
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
                                handleTableChange(
                                  i,
                                  rowIndex,
                                  colIndex,
                                  e.target.value
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
                  onClick={() => addTableRow(i)}
                  className="mt-2 text-sm text-blue-500"
                >
                  + Add Row
                </button>
              </div>
            )}

            {/* Pros & Cons */}
            {block.type === "proscons" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Pros</h4>
                  {block.pros?.map((pro, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder="Add a pro"
                      value={pro}
                      onChange={(e) => {
                        const updated = [...blocks];
                        updated[i].pros[idx] = e.target.value;
                        setBlocks(updated);
                      }}
                      className="w-full border p-2 rounded mt-2"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...blocks];
                      updated[i].pros.push("");
                      setBlocks(updated);
                    }}
                    className="text-sm text-blue-500 mt-2"
                  >
                    + Add Pro
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold">Cons</h4>
                  {block.cons?.map((con, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder="Add a con"
                      value={con}
                      onChange={(e) => {
                        const updated = [...blocks];
                        updated[i].cons[idx] = e.target.value;
                        setBlocks(updated);
                      }}
                      className="w-full border p-2 rounded mt-2"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...blocks];
                      updated[i].cons.push("");
                      setBlocks(updated);
                    }}
                    className="text-sm text-blue-500 mt-2"
                  >
                    + Add Con
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Block Buttons */}
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => addBlock("heading")} className="px-3 py-1 bg-blue-600 text-white rounded">
            + Heading
          </button>
          <button type="button" onClick={() => addBlock("paragraph")} className="px-3 py-1 bg-green-600 text-white rounded">
            + Paragraph
          </button>
          <button type="button" onClick={() => addBlock("image")} className="px-3 py-1 bg-purple-600 text-white rounded">
            + Image
          </button>
          <button type="button" onClick={() => addBlock("table")} className="px-3 py-1 bg-orange-600 text-white rounded">
            + Table
          </button>
          <button type="button" onClick={() => addBlock("proscons")} className="px-3 py-1 bg-pink-600 text-white rounded">
            + Pros & Cons
          </button>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-black text-white py-2 rounded font-semibold"
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
