"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function BlogEditorForm() {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [data, setData] = useState()

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


  const handleChange = (index, field, value) => {
    const updated = [...blocks];
    updated[index][field] = value;
    setBlocks(updated);
  };
  // ✅ Fetch blog data when editing
  useEffect(() => {
    // only fetch if editing

    const fetchBlog = async () => {
      try {
        // setLoading(true);
        // setError("");

        const res = await axios.get(`http://localhost:5000/api/test-blog`);
        const blog = res.data.data;
        setData(blog)

        // ✅ Fill data in form
        setTitle(blog.title || "");
        setBlocks(blog.content || []);
      } catch (err) {
        console.error("❌ Error fetching blog:", err);
        // setError("Failed to fetch blog data");
      } finally {
        // setLoading(false);
      }
    };

    fetchBlog();
  }, []);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);

    // Prepare blocks (JSON content)
    const cleanedBlocks = blocks.map((b, i) => {
      if (b.type === "image" && b.file) {
        return { type: "image", imageField: `image_${i}` };
      }
      return b;
    });

    formData.append("content", JSON.stringify(cleanedBlocks));

    // ✅ Append all block images
    blocks.forEach((b, i) => {
      if (b.type === "image" && b.file) {
        formData.append("images", b.file); // keep key "images" for all
      }
    });

    try {
      const res = await axios.post("http://localhost:5000/api/test-blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Blog uploaded successfully!");
      console.log(res.data.data)
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog Title */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Render Dynamic Blocks */}
        {blocks.map((block, i) => (
          <div key={i} className="border p-3 rounded bg-gray-50">
            {block.type === "heading" && (
              <input
                type="text"
                placeholder="Heading..."
                value={block.text}
                onChange={(e) => handleChange(i, "text", e.target.value)}
                className="w-full border p-2 rounded"
              />
            )}

            {block.type === "paragraph" && (
              <textarea
                placeholder="Write paragraph..."
                value={block.text}
                onChange={(e) => handleChange(i, "text", e.target.value)}
                className="w-full border p-2 rounded"
                rows="4"
              />
            )}

            {block.type === "image" && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(i, e.target.files[0])
                  }
                />
                {block.preview && (
                  <img
                    src={block.preview}
                    alt="preview"
                    className="w-48 mt-2 rounded"
                  />
                )}
              </div>
            )}

            {block.type === "table" && (
              <div>
                <table className="border w-full text-left">
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex} className="border p-2">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) =>
                                handleTableChange(i, rowIndex, colIndex, e.target.value)
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

            {block.type === "proscons" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Pros</h4>
                  {block.pros.map((pro, idx) => (
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
                  {block.cons.map((con, idx) => (
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
          <button
            type="button"
            onClick={() => addBlock("heading")}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            + Heading
          </button>
          <button
            type="button"
            onClick={() => addBlock("paragraph")}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            + Paragraph
          </button>
          <button
            type="button"
            onClick={() => addBlock("image")}
            className="px-3 py-1 bg-purple-600 text-white rounded"
          >
            + Image
          </button>
          <button
            type="button"
            onClick={() => addBlock("table")}
            className="px-3 py-1 bg-orange-600 text-white rounded"
          >
            + Table
          </button>
          <button
            type="button"
            onClick={() => addBlock("proscons")}
            className="px-3 py-1 bg-pink-600 text-white rounded"
          >
            + Pros & Cons
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded font-semibold"
        >
          Submit Blog
        </button>
      </form>

{data?.map((item) => (
  <div key={item._id} className="p-2">
    <Link to={`/test/${item._id}`} className="text-blue-600 hover:underline">
      {item.title}
    </Link>
  </div>
))}
    </div>
  );
}
