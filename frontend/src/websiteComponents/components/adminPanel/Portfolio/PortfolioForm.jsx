"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  createPortfolio,
  updatePortfolio,
} from "../../../../api/portfolio/createPortfolio";
import axios from "axios";

export default function PortfolioForm() {
  const editData = useSelector((state) => state.editData.editData);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);

  // Basic Info
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState(false);

  // Specifications
  const [makeModel, setMakeModel] = useState("");
  const [wheelbase, setWheelbase] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [capacity, setCapacity] = useState({ sits: "", sleeps: "" });

  // Features
  const [features, setFeatures] = useState([{ category: "", items: [""] }]);

  // Media URLs (simple string array)
  const [mediaUrls, setMediaUrls] = useState([""]);

  // Category
  const [category, setCategory] = useState("");
  const [removedExistingGallery, setRemovedExistingGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to clear/reset all fields
  const clearForm = () => {
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery([]);
    setTitle("");
    setSubtitle("");
    setDescription("");
    setPrice("");
    setSold(false);
    setMakeModel("");
    setWheelbase("");
    setDrivetrain("");
    setCapacity({ sits: "", sleeps: "" });
    setFeatures([{ category: "", items: [""] }]);
    setMediaUrls([""]);
    setCategory("");
  };

  // ✅ IMPROVED: Auto-fill if editData is available
  useEffect(() => {
    if (editData?._id) {
      console.log("Editing data:", editData);

      setTitle(editData.van_listing?.title || "");
      setSubtitle(editData.van_listing?.subtitle || "");
      setDescription(editData.van_listing?.description || "");
      setPrice(editData.van_listing?.price || "");
      setSold(editData.sold || false);

      setMakeModel(editData.van_listing?.specifications?.make_model || "");
      setWheelbase(editData.van_listing?.specifications?.wheelbase || "");
      setDrivetrain(editData.van_listing?.specifications?.drivetrain || "");
      setCapacity(
        editData.van_listing?.specifications?.capacity || {
          sits: "",
          sleeps: "",
        }
      );

      setCategory(editData.category || "");

      // ✅ FIXED: Features properly set
      setFeatures(editData.detailed_features?.length > 0
        ? editData.detailed_features
        : [{ category: "", items: [""] }]
      );

      // ✅ FIXED: Media URLs properly set
      setMediaUrls(editData.media?.length > 0
        ? [...editData.media]
        : [""]
      );

      // ✅ FIXED: Existing gallery
      setExistingGallery(editData.gallery || []);

    } else {
      // Reset form when not editing
      clearForm();
    }
  }, [editData]);

  // Gallery Handlers
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeGalleryImage = (index) => {
    try {
      URL.revokeObjectURL(galleryPreviews[index]);
    } catch (e) {}

    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

 const removeExistingGalleryImage = (index) => {
  const urlToRemove = existingGallery[index];

  // Track images to delete from S3
  setRemovedExistingGallery(prev => [...prev, urlToRemove]);

  // Remove from UI immediately
  setExistingGallery(prev => prev.filter((_, i) => i !== index));
};

  // ✅ IMPROVED: Feature Handlers - Proper state updates
  const addFeatureCategory = () => {
    setFeatures(prev => [...prev, { category: "", items: [""] }]);
  };

  const handleFeatureChange = (fIndex, field, value, itemIndex = null) => {
    setFeatures((prev) =>
      prev.map((feature, i) => {
        if (i !== fIndex) return feature;

        if (field === "category") {
          return { ...feature, category: value };
        }

        if (field === "item" && itemIndex !== null) {
          const newItems = [...feature.items];
          newItems[itemIndex] = value;
          return { ...feature, items: newItems };
        }

        return feature;
      })
    );
  };

  const addFeatureItem = (fIndex) => {
    setFeatures(prev =>
      prev.map((feature, i) =>
        i === fIndex
          ? { ...feature, items: [...feature.items, ""] }
          : feature
      )
    );
  };

  const removeFeatureCategory = (index) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const removeFeatureItem = (fIndex, iIndex) => {
    setFeatures(prev =>
      prev.map((feature, i) =>
        i === fIndex
          ? {
              ...feature,
              items: feature.items.filter((_, itemIdx) => itemIdx !== iIndex)
            }
          : feature
      )
    );
  };

  // ✅ IMPROVED: Media URL Handlers - Proper state updates
  const addMediaUrl = () => {
    setMediaUrls(prev => [...prev, ""]);
  };

  const handleMediaUrlChange = (index, value) => {
    setMediaUrls(prev =>
      prev.map((url, i) => (i === index ? value : url))
    );
  };

  const removeMediaUrl = (index) => {
    if (mediaUrls.length > 1) {
      setMediaUrls(prev => prev.filter((_, i) => i !== index));
    } else {
      // If only one URL left, clear it instead of removing
      setMediaUrls([""]);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!title || !category) {
    alert("Title and Category are required");
    return;
  }

  try {
    setLoading(true);

    // 1️⃣ Delete removed existing images from S3
    if (removedExistingGallery.length > 0) {
      await Promise.all(
        removedExistingGallery.map(url =>
          axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/delete-imag`, { imageUrl: url })
        )
      );
    }

    // 2️⃣ Prepare FormData
    const formDataToSend = new FormData();

    // Gallery files (new uploads)
    galleryFiles.forEach(file => formDataToSend.append("gallery", file));

    // Remaining existing gallery URLs
    const updatedExistingGallery = existingGallery.filter(
      url => !removedExistingGallery.includes(url)
    );
    formDataToSend.append("existingGallery", JSON.stringify(updatedExistingGallery));

    // Portfolio / Van listing data
    const van_listing = {
      title,
      subtitle,
      description,
      price,
      specifications: {
        make_model: makeModel,
        wheelbase,
        drivetrain,
        capacity
      }
    };
    formDataToSend.append("van_listing", JSON.stringify(van_listing));

    // Other fields
    formDataToSend.append("sold", sold.toString());
    formDataToSend.append("category", category);

    // Detailed features
    const cleanedFeatures = features
      .map(feature => ({ ...feature, items: feature.items.filter(item => item.trim() !== "") }))
      .filter(feature => feature.category.trim() !== "" || feature.items.length > 0);
    formDataToSend.append("detailed_features", JSON.stringify(cleanedFeatures));

    // Media URLs
    const cleanedMediaUrls = mediaUrls.filter(url => url.trim() !== "");
    formDataToSend.append("media", JSON.stringify(cleanedMediaUrls));

    // 3️⃣ Submit form
    if (editData?._id) {
      await updatePortfolio(editData, formDataToSend);
      clearForm();
    } else {
      await createPortfolio(formDataToSend);
      clearForm();
    }

    // 4️⃣ Clear removed images state
    setRemovedExistingGallery([]);
  } catch (error) {
    console.error("Error uploading:", error);
    alert("Error submitting form. Check console for details.");
  } finally {
    setLoading(false);
  }
};

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      galleryPreviews.forEach((url) => {
        try { URL.revokeObjectURL(url); } catch (e) {}
      });
    };
  }, [galleryPreviews]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {editData ? "Edit Portfolio Van" : "Create Portfolio Van"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BASIC INFO */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                placeholder="Enter subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="sold"
                checked={sold}
                onChange={(e) => setSold(e.target.checked)}
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label htmlFor="sold" className="ml-2 block text-sm text-gray-700">
                Mark as sold
              </label>
            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category *</h3>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
            required
          >
            <option value="" disabled>Select Category</option>
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

        {/* SPECIFICATIONS */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Make/Model</label>
              <input
                type="text"
                placeholder="Enter make/model"
                value={makeModel}
                onChange={(e) => setMakeModel(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wheelbase</label>
              <input
                type="text"
                placeholder="Enter wheelbase"
                value={wheelbase}
                onChange={(e) => setWheelbase(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Drivetrain</label>
              <input
                type="text"
                placeholder="Enter drivetrain"
                value={drivetrain}
                onChange={(e) => setDrivetrain(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sits Capacity</label>
              <input
                type="text"
                placeholder="Enter sits capacity"
                value={capacity.sits}
                onChange={(e) => setCapacity({ ...capacity, sits: e.target.value })}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sleeps Capacity</label>
              <input
                type="text"
                placeholder="Enter sleeps capacity"
                value={capacity.sleeps}
                onChange={(e) => setCapacity({ ...capacity, sleeps: e.target.value })}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-gray-500"
              />
            </div>
          </div>
        </div>

        {/* DETAILED FEATURES */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Features</h3>
          {features.map((feature, fIndex) => (
            <div key={fIndex} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  placeholder="Enter category"
                  value={feature.category}
                  onChange={(e) => handleFeatureChange(fIndex, "category", e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="space-y-2 mb-3">
                <label className="block text-sm font-medium text-gray-700">Items</label>
                {feature.items.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter feature item"
                      value={item}
                      onChange={(e) => handleFeatureChange(fIndex, "item", e.target.value, i)}
                      className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeatureItem(fIndex, i)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addFeatureItem(fIndex)}
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  + Add Item
                </button>
                <button
                  type="button"
                  onClick={() => removeFeatureCategory(fIndex)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove Category
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeatureCategory}
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400"
          >
            + Add Feature Category
          </button>
        </div>

        {/* MEDIA URLs */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Media URLs</h3>
          <div className="space-y-3">
            {mediaUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter media URL (YouTube, Vimeo, etc.)"
                  value={url}
                  onChange={(e) => handleMediaUrlChange(index, e.target.value)}
                  className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
                />
                <button
                  type="button"
                  onClick={() => removeMediaUrl(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMediaUrl}
            className="mt-3 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            + Add Media URL
          </button>
        </div>

        {/* GALLERY UPLOAD */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Gallery Images</h3>

          {/* Existing Gallery Images */}
          {existingGallery.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Images:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingGallery.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Existing ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingGalleryImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleGalleryChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />

          {/* New Gallery Previews */}
          {galleryPreviews.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">New Selected Images:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-lg font-medium ${
              loading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            {loading ? "Submitting..." : editData ? "Update Portfolio" : "Create Portfolio"}
          </button>
        </div>
      </form>
    </div>
  );
}