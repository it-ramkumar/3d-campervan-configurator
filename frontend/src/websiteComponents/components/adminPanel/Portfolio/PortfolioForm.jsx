"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  createPortfolio,
  updatePortfolio,
} from "../../../../api/portfolio/createPortfolio";

export default function PortfolioForm() {
  const editData = useSelector((state) => state.editData.editData);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [blocks, setBlocks] = useState([{ image: null, caption: "" }]);

  // Basic Info
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const [sold, setSold] = useState(false);

  // Specifications
  const [makeModel, setMakeModel] = useState("");
  const [wheelbase, setWheelbase] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [capacity, setCapacity] = useState({ sits: "", sleeps: "" });

  // Features
  const [features, setFeatures] = useState([{ category: "", items: [""] }]);

  // Media (video)
  const [video, setVideo] = useState({ title: "" });
  // ✅ CATEGORY
  const [category, setCategory] = useState("");
  const [loading,setLoading]=useState(false)



  // Function to clear/reset all fields
const clearForm = () => {
  // Media
  setGalleryFiles([]);
  setBlocks([{ image: null, caption: "" }]);

  // Basic Info
  setTitle("");
  setSubtitle("");
  setDescription("");
  setPrice("");
  // setSold(false);

  // Specifications
  setMakeModel("");
  setWheelbase("");
  setDrivetrain("");
  setCapacity({ sits: "", sleeps: "" });

  // Features
  setFeatures([{ category: "", items: [""] }]);

  // Video
  setVideo({ title: "" });

  // Category
  setCategory("");

  // Loading state (optional reset)
  // setLoading(false);
};

  // ✅ Auto-fill if editData is available
  useEffect(() => {
    if (editData?._id) {
      setTitle(editData.van_listing?.title || "");
      setSubtitle(editData.van_listing?.subtitle || "");
      setDescription(editData.van_listing?.description || "");
      setPrice(editData.van_listing?.price || "");
      // setSold(editData.sold || false);

      setMakeModel(editData.van_listing?.specifications?.make_model || "");
      setWheelbase(editData.van_listing?.specifications?.wheelbase || "");
      setDrivetrain(editData.van_listing?.specifications?.drivetrain || "");
      setCapacity(
        editData.van_listing?.specifications?.capacity || {
          sits: "",
          sleeps: "",
        }
      );

      // ✅ Category load
      setCategory(editData.category || "");
      setFeatures(editData.detailed_features || [{ category: "", items: [""] }]);
      setVideo(editData.media?.video || { title: "" });

      if (editData.blocks?.length) {
        setBlocks(
          editData.blocks.map((b) => ({ caption: b.caption, image: null }))
        );
      }
    }
  }, [editData]);

  // ✅ Handlers
  const handleGalleryChange = (e) => {
    setGalleryFiles([...galleryFiles, ...e.target.files]);
  };

  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[index][field] = value;
    setBlocks(newBlocks);
  };

  const addBlock = () => setBlocks([...blocks, { image: null, caption: "" }]);

  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const addFeatureCategory = () =>
    setFeatures([...features, { category: "", items: [""] }]);

  const handleFeatureChange = (fIndex, field, value, itemIndex = null) => {
    setFeatures((prev) =>
      prev.map((feature, i) => {
        if (i !== fIndex) return feature;
        if (field === "category") {
          return { ...feature, category: value };
        }
        if (field === "item") {
          const newItems = [...feature.items];
          newItems[itemIndex] = value;
          return { ...feature, items: newItems };
        }
        return feature;
      })
    );
  };

  const addFeatureItem = (fIndex) => {
    const updated = [...features];
    updated[fIndex].items.push("");
    setFeatures(updated);
  };

  const removeFeatureCategory = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const removeFeatureItem = (fIndex, iIndex) => {
    const updated = [...features];
    updated[fIndex].items.splice(iIndex, 1);
    setFeatures(updated);
  };

  const removeGalleryImage = (index) => {
    setGalleryFiles(galleryFiles.filter((_, i) => i !== index));
  };

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Gallery
    galleryFiles.forEach((file) => formDataToSend.append("gallery", file));

    // Blocks (captions)
    const blockData = blocks.map((block, i) => ({
      index: i,
      caption: block.caption,
    }));
    formDataToSend.append("blocksData", JSON.stringify(blockData));

    // Block Images
    blocks.forEach((block) => {
      if (block.image) {
        formDataToSend.append("blockImages", block.image);
      }
    });

    // Basic Info
    formDataToSend.append("title", title);
    formDataToSend.append("subtitle", subtitle);
    formDataToSend.append("description", description);
    formDataToSend.append("price", price);
    // formDataToSend.append("sold", sold);

    // ✅ Category add
    formDataToSend.append("category", category);
    // Specifications
    const specifications = { make_model: makeModel, wheelbase, drivetrain, capacity };
    formDataToSend.append("specifications", JSON.stringify(specifications));

    // Features
    formDataToSend.append("detailed_features", JSON.stringify(features));

    // Media
    formDataToSend.append("media", JSON.stringify({ video }));

    try {
      setLoading(true)
      if (editData?._id) {
        await updatePortfolio(editData, formDataToSend);
        clearForm()
      } else {
        await createPortfolio(formDataToSend);
        clearForm()
      }
    } catch (error) {
      console.error("❌ Error uploading:", error);
      // alert("Something went wrong!");
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Portfolio Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC INFO */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded w-full"
          />
          {/* <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sold}
              onChange={(e) => setSold(e.target.checked)}
            />
            Sold
          </label> */}
        </div>

        {/* SPECIFICATIONS */}
        <h3 className="text-lg font-semibold">Specifications</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Make/Model"
            value={makeModel}
            onChange={(e) => setMakeModel(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Wheelbase"
            value={wheelbase}
            onChange={(e) => setWheelbase(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Drivetrain"
            value={drivetrain}
            onChange={(e) => setDrivetrain(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Capacity (sits)"
            value={capacity.sits}
            onChange={(e) => setCapacity({ ...capacity, sits: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Capacity (sleeps)"
            value={capacity.sleeps}
            onChange={(e) =>
              setCapacity({ ...capacity, sleeps: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>

        {/* FEATURES */}
        <h3 className="text-lg font-semibold">Detailed Features</h3>
        {features.map((feature, fIndex) => (
          <div key={fIndex} className="border p-4 rounded mb-4">
            <input
              type="text"
              placeholder="Category"
              value={feature.category}
              onChange={(e) =>
                handleFeatureChange(fIndex, "category", e.target.value)
              }
              className="border p-2 rounded w-full mb-2"
            />
            {feature.items.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Feature item"
                  value={item}
                  onChange={(e) =>
                    handleFeatureChange(fIndex, "item", e.target.value, i)
                  }
                  className="border p-2 rounded w-full"
                />
                <button
                  type="button"
                  onClick={() => removeFeatureItem(fIndex, i)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addFeatureItem(fIndex)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                + Add Item
              </button>
              <button
                type="button"
                onClick={() => removeFeatureCategory(fIndex)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                🗑️ Remove Category
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addFeatureCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>

        {/* MEDIA */}
        <h3 className="text-lg font-semibold">Media (Video)</h3>
        <input
          type="text"
          placeholder="Video Title"
          value={video.title}
          onChange={(e) => setVideo({ ...video, title: e.target.value })}
          className="border p-2 rounded w-full"
        />
  <div>
          <label className="block font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="" disabled>-- Select Category --</option>
            <option value="Flagship Short Van — Santa Monica">
              Flagship Short Van — Santa Monica
            </option>
            <option value="Flagship Long Van — Montreal">
              Flagship Long Van — Montreal
            </option>
            <option value="Layouts for Solo & Couple Travelers">
              Layouts for Solo & Couple Travelers
            </option>
            <option value="Layouts for Families (3–9 People)">
              Layouts for Families (3–9 People)
            </option>
            <option value="Portfolio of Custom Builds">
              Portfolio of Custom Builds
            </option>
          </select>
        </div>

        {/* GALLERY UPLOAD */}
        <div>
          <label className="block font-medium mb-2">Gallery Images</label>
          <input
            type="file"
            multiple
            onChange={handleGalleryChange}
            className="border p-2 rounded w-full mb-4"
          />

          {/* Preview Gallery */}
          <div className="flex flex-wrap gap-4">
            {galleryFiles.map((file, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BLOCKS */}
        <div>
          <label className="block font-medium mb-2">Blocks</label>
          {blocks.map((block, index) => (
            <div
              key={index}
              className="border p-4 rounded mb-4 bg-gray-50 shadow-sm"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleBlockChange(index, "image", e.target.files[0])
                }
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Enter caption"
                value={block.caption}
                onChange={(e) =>
                  handleBlockChange(index, "caption", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
              <button
                type="button"
                onClick={() => removeBlock(index)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                🗑️ Remove Block
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addBlock}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Block
          </button>
        </div>

        {/* SUBMIT */}
       <button
  type="submit"
  disabled={loading} // ✅ disable while loading
  className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
    loading ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400" : ""
  }`}
>
  {loading ? "Submitting..." : "Submit"}
</button>

      </form>
    </div>
  );
}
