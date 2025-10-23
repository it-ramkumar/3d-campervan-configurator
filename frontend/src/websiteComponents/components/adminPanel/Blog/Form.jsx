import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateBlog,createBlog } from "../../../../api/blog/createBlogs";

const BlogForm = () => {
  const editData = useSelector((state) => state.editData.editData);

  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [gallery, setGallery] = useState([]); // new or existing gallery
  const [blocks, setBlocks] = useState([{ heading: "", paragraph: "", image: null }]);
  const [loader,setLoader]=useState(false)

  // ✅ Prefill form when editing
  useEffect(() => {
    if (editData && editData._id) {
      setTitle(editData.title || "");
      setDes(editData.des || "");
      setGallery(editData.gallery || []);
      setBlocks(
        editData.blocks && editData.blocks.length > 0
          ? editData.blocks.map((b) => ({
              heading: b.heading || "",
              paragraph: b.paragraph || "",
              image: null, // re-upload or keep null
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

  // ✅ remove block
  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  // ✅ remove block image
  const removeBlockImage = (index) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].image = null;
    setBlocks(updatedBlocks);
  };

  // ✅ handle gallery change (add new)
  const handleGalleryChange = (e) => {
    setGallery([...gallery, ...Array.from(e.target.files)]);
  };

  // ✅ remove gallery image
  const removeGalleryImage = (index) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("des", des);

    // gallery images
    gallery.forEach((img) => {
      if (img instanceof File) formData.append("gallery", img);
    });

    // blocks (without images)
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
  setLoader(true)
    if (editData && editData._id) {
      await updateBlog(editData._id, formData);
    } else {
      await createBlog(formData);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally{
    setLoader(false)
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

      {/* ✅ Gallery with preview + delete */}
      <div>
        <label className="block font-semibold">Gallery Images</label>
        <input type="file" multiple onChange={handleGalleryChange} />

        {gallery.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {gallery.map((img, i) => (
              <div key={i} className="relative w-24 h-24">
                <img
                  src={img instanceof File ? URL.createObjectURL(img) : img}
                  alt="gallery"
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Blocks */}
      <div>
        <h3 className="font-bold mb-2">Blocks</h3>
        {blocks.map((block, index) => (
          <div key={index} className="border p-3 mt-3 rounded bg-white relative">
            <button
              type="button"
              onClick={() => removeBlock(index)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
            >
              ✕
            </button>

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

            {/* Image upload + preview + delete */}
            <div className="flex items-center gap-3">
              <input
                type="file"
                onChange={(e) => handleBlockChange(index, "image", e.target.files[0])}
              />
              {block.image && (
                <div className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(block.image)}
                    alt="block"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeBlockImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
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
<button
  type="submit"
  className={`px-4 py-2 rounded text-white ${
    loader ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
  }`}
  disabled={loader} // ✅ disable while loading
>
  {loader
    ? "Loading..." // ✅ you can replace this with a spinner
    : editData && editData._id
    ? "Update Blog"
    : "Create Blog"}
</button>

    </form>
  );
};

export default BlogForm;
