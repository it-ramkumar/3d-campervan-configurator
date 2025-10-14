import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BlogForm = () => {
  const editData = useSelector((state) => state.editData.editData);

  const [title, setTitle] = useState("");
  const [des, setDes] = useState(""); // ✅ description added
  const [gallery, setGallery] = useState([]);
  const [blocks, setBlocks] = useState([{ heading: "", paragraph: "", image: null }]);

  // ✅ Prefill form when editData is available
  useEffect(() => {
    if (editData && editData._id) {
      setTitle(editData.title || "");
      setDes(editData.des || ""); // ✅ prefill description
      setGallery(editData.gallery || []);
      setBlocks(
        editData.blocks && editData.blocks.length > 0
          ? editData.blocks.map((b) => ({
              heading: b.heading || "",
              paragraph: b.paragraph || "",
              image: null, // user will re-upload image
            }))
          : [{ heading: "", paragraph: "", image: null }]
      );
    }
  }, [editData]);

  // ✅ handle block change
  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[index][field] = value;
    setBlocks(newBlocks);
  };

  // ✅ add new block
  const addBlock = () => {
    setBlocks([...blocks, { heading: "", paragraph: "", image: null }]);
  };

  // ✅ submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("des", des); // ✅ added description field

    // gallery
    for (let i = 0; i < gallery.length; i++) {
      if (gallery[i] instanceof File) {
        formData.append("gallery", gallery[i]); // only new files
      }
    }

    // blocksData JSON (without images)
    const blocksData = blocks.map((b) => ({
      heading: b.heading,
      paragraph: b.paragraph,
    }));
    formData.append("blocksData", JSON.stringify(blocksData));

    // block images
    blocks.forEach((b) => {
      if (b.image) formData.append("blockImages", b.image);
    });

    try {
      let res;
      if (editData && editData._id) {
        // ✅ UPDATE
        res = await axios.put(
          `http://localhost:5000/api/blog/with-blocks/${editData._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        alert("Blog updated!");
      } else {
        // ✅ CREATE
        res = await axios.post("http://localhost:5000/api/blog/with-blocks", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog created!");
      }
      console.log("Success:", res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-gray-100 rounded">
      {/* ✅ Title */}
      <div>
        <label className="block font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      {/* ✅ Description */}
      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          value={des}
          onChange={(e) => setDes(e.target.value)}
          className="border p-2 w-full"
          rows={3}
          placeholder="Write short description..."
          required
        ></textarea>
      </div>

      {/* ✅ Gallery */}
      <div>
        <label className="block font-semibold">Gallery Images</label>
        <input type="file" multiple onChange={(e) => setGallery([...e.target.files])} />
        {editData && editData.gallery && editData.gallery.length > 0 && (
          <div className="flex gap-2 mt-2">
            {editData.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="gallery"
                className="h-16 w-16 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ Blocks */}
      <div>
        <h3 className="font-bold">Blocks</h3>
        {blocks.map((block, index) => (
          <div key={index} className="border p-3 mt-3 rounded bg-white">
            <input
              type="text"
              placeholder="Heading"
              value={block.heading}
              onChange={(e) => handleBlockChange(index, "heading", e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Paragraph"
              value={block.paragraph}
              onChange={(e) => handleBlockChange(index, "paragraph", e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="file"
              onChange={(e) => handleBlockChange(index, "image", e.target.files[0])}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addBlock}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          + Add Block
        </button>
      </div>

      {/* ✅ Submit */}
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        {editData && editData._id ? "Update Blog" : "Create Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
