"use client";
import React, { useEffect, useState } from "react";
import { createVan, updateVan } from "../../../../api/van/createVan";
import { useSelector, useDispatch } from "react-redux";
import { clearEditData } from "../../../../redux/slices/editData";
import axios from "axios";

const VansForm = () => {
  const editData = useSelector((state) => state.editData.editData);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    van_listing: {
      title: "",
      description: "",
      subtitle: "",
      model_name: "",
      price: "",
      tagline: "",
      specifications: {
        make_model: "",
        wheelbase: "",
        drivetrain: "",
        engine: "",
        capacity: { sits: "", sleeps: "" },
      },
    },
    sold: false,
    gallery: [],
    detailed_features: [{ category: "", items: [""] }],
    media: [], // ✅ Simple string array for URLs only
  });

  // Gallery handling
  const [existingGallery, setExistingGallery] = useState([]); // URLs from editData
  const [galleryFiles, setGalleryFiles] = useState([]); // New File objects
  const [galleryPreviews, setGalleryPreviews] = useState([]); // Object URLs for new files
  const [removedExistingGallery, setRemovedExistingGallery] = useState([]); // URLs to remove

  // ✅ CORRECTED: Media handling - only URLs, no files
  const [mediaUrls, setMediaUrls] = useState([""]); // Simple URL strings

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Prefill when editData exists
  useEffect(() => {
    if (editData) {
      setFormData((prev) => ({
        ...prev,
        ...editData,
        van_listing: {
          ...prev.van_listing,
          ...(editData.van_listing || {}),
          specifications: {
            ...(editData.van_listing?.specifications || prev.van_listing.specifications),
            capacity: {
              ...(editData.van_listing?.specifications?.capacity || prev.van_listing.specifications.capacity),
            },
          },
        },
        detailed_features: editData.detailed_features || [{ category: "", items: [""] }],
        media: editData.media || [], // ✅ Simple URLs
        gallery: editData.gallery || [],
      }));

      // Set existing gallery and media
      setExistingGallery(editData.gallery ? [...editData.gallery] : []);
      setMediaUrls(editData.media?.length > 0 ? [...editData.media] : [""]); // ✅ Set media URLs
    }
  }, [editData]);

  // Form reset function
  const resetForm = () => {
    setFormData({
      van_listing: {
        title: "",
        description: "",
        subtitle: "",
        model_name: "",
        price: "",
        tagline: "",
        specifications: {
          make_model: "",
          wheelbase: "",
          drivetrain: "",
          engine: "",
          capacity: { sits: "", sleeps: "" },
        },
      },
      sold: false,
      gallery: [],
      detailed_features: [{ category: "", items: [""] }],
      media: [], // ✅ Reset to empty array
    });

    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery([]);
    setRemovedExistingGallery([]);
    setMediaUrls([""]); // ✅ Reset media URLs

    dispatch(clearEditData());
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    // Basic Information Validation
    if (!formData.van_listing.title?.trim()) newErrors.title = "Title is required";
    if (!formData.van_listing.description?.trim()) newErrors.description = "Description is required";
    if (!formData.van_listing.price || Number(formData.van_listing.price) < 0) newErrors.price = "Valid price is required";

    // Specifications Validation
    if (!formData.van_listing.specifications.make_model?.trim()) newErrors.make_model = "Make/Model is required";
    if (!formData.van_listing.specifications.wheelbase?.trim()) newErrors.wheelbase = "Wheelbase is required";
    if (!formData.van_listing.specifications.drivetrain?.trim()) newErrors.drivetrain = "Drivetrain is required";
    if (!formData.van_listing.specifications.capacity.sits?.trim()) newErrors.sits = "Sits capacity is required";
    if (!formData.van_listing.specifications.capacity.sleeps?.trim()) newErrors.sleeps = "Sleeps capacity is required";

    // Detailed Features Validation
    formData.detailed_features.forEach((feature, index) => {
      if (!feature.category?.trim()) newErrors[`detail_category_${index}`] = "Category is required";
      feature.items.forEach((item, itemIndex) => {
        if (!item?.trim()) newErrors[`detail_item_${index}_${itemIndex}`] = "Feature item is required";
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generic input handler for nested paths
  const handleInputChange = (e, path) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if (path) {
      const pathParts = path.split(".");
      setFormData((prev) => {
        const newData = JSON.parse(JSON.stringify(prev));
        let current = newData;
        for (let i = 0; i < pathParts.length - 1; i++) {
          current = current[pathParts[i]];
        }
        const lastKey = pathParts[pathParts.length - 1];
        if (typeof current[lastKey] === "object" && current[lastKey] !== null && name) {
          current[lastKey] = { ...(current[lastKey] || {}), [name]: fieldValue };
        } else {
          current[lastKey] = fieldValue;
        }
        return newData;
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    }
  };

  // Gallery Handlers
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeNewGalleryImage = (index) => {
    try { URL.revokeObjectURL(galleryPreviews[index]); } catch (e) {}
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (index) => {
    const urlToRemove = existingGallery[index];
    setRemovedExistingGallery((prev) => [...prev, urlToRemove]);
    setExistingGallery((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ CORRECTED: Media URL Handlers - No file upload
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

  // Array helpers for detailed features
  const addArrayItem = (field, newItem) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], newItem] }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const handleArrayItemChange = (field, index, key, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      if (key) {
        updatedArray[index] = { ...updatedArray[index], [key]: value };
      } else {
        updatedArray[index] = value;
      }
      return { ...prev, [field]: updatedArray };
    });
  };

  const addDetailedFeatureItem = (featureIndex) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.detailed_features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        items: [...updatedFeatures[featureIndex].items, ""],
      };
      return { ...prev, detailed_features: updatedFeatures };
    });
  };

  const removeDetailedFeatureItem = (featureIndex, itemIndex) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.detailed_features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        items: updatedFeatures[featureIndex].items.filter((_, i) => i !== itemIndex),
      };
      return { ...prev, detailed_features: updatedFeatures };
    });
  };

  const handleDetailedFeatureItemChange = (featureIndex, itemIndex, value) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.detailed_features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        items: updatedFeatures[featureIndex].items.map((item, i) => (i === itemIndex ? value : item)),
      };
      return { ...prev, detailed_features: updatedFeatures };
    });
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      galleryPreviews.forEach((url) => {
        try { URL.revokeObjectURL(url); } catch (e) {}
      });
    };
  }, [galleryPreviews]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  try {
    // 1️⃣ Delete removed existing gallery images from backend/S3
    if (removedExistingGallery.length > 0) {
      await Promise.all(
        removedExistingGallery.map(url =>
          axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/delete-image`, { imageUrl: url })
        )
      );
    }

    // 2️⃣ Prepare FormData for submission
    const formToSend = new FormData();

    // Gallery files (new uploads)
    galleryFiles.forEach((file) => formToSend.append("gallery", file));

    // Remaining existing gallery URLs (after deletion)
    const updatedExistingGallery = existingGallery.filter(url => !removedExistingGallery.includes(url));

    formToSend.append("existingGallery", JSON.stringify(updatedExistingGallery));

    // Media URLs
    const cleanedMediaUrls = mediaUrls.filter(url => url.trim() !== "");
    formToSend.append("media", JSON.stringify(cleanedMediaUrls));

    // Main van data
    formToSend.append("van_listing", JSON.stringify(formData.van_listing));
    formToSend.append("sold", formData.sold);
    formToSend.append("detailed_features", JSON.stringify(formData.detailed_features));

    // 3️⃣ Call backend to create or update van
    if (editData?._id) {
      await updateVan(editData, formToSend);
      resetForm();
    } else {
      await createVan(formToSend);
      resetForm();
    }

    // 4️⃣ Clear removed images state
    setRemovedExistingGallery([]);
  } catch (err) {
    console.warn("Error submitting van:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {editData ? "Edit Van Listing" : "Create Van Listing"}
          </h1>
          <p className="text-gray-600 mt-2">
            {editData ? "Update the van details below." : "Fill out the form to list your van."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info Card */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  name="title"
                  value={formData.van_listing.title}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.title ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter van title"
                />
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model Name</label>
                <input
                  name="model_name"
                  value={formData.van_listing.model_name}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter model name"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.van_listing.description}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.description ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter detailed description"
                />
                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  name="price"
                  type="number"
                  value={formData.van_listing.price}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.price ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter price"
                />
                {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  name="subtitle"
                  value={formData.van_listing.subtitle}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  name="tagline"
                  value={formData.van_listing.tagline}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter tagline"
                />
              </div>
            </div>
          </section>

          {/* Specifications Card */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Technical Specifications</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Make & Model *</label>
                <input
                  name="make_model"
                  value={formData.van_listing.specifications.make_model}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications")}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.make_model ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.make_model && <p className="text-sm text-red-600 mt-1">{errors.make_model}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wheelbase *</label>
                <input
                  name="wheelbase"
                  value={formData.van_listing.specifications.wheelbase}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications")}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.wheelbase ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.wheelbase && <p className="text-sm text-red-600 mt-1">{errors.wheelbase}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drivetrain *</label>
                <input
                  name="drivetrain"
                  value={formData.van_listing.specifications.drivetrain}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications")}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.drivetrain ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.drivetrain && <p className="text-sm text-red-600 mt-1">{errors.drivetrain}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Engine</label>
                <input
                  name="engine"
                  value={formData.van_listing.specifications.engine}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sits *</label>
                <input
                  name="sits"
                  value={formData.van_listing.specifications.capacity.sits}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications.capacity")}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sits ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.sits && <p className="text-sm text-red-600 mt-1">{errors.sits}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sleeps *</label>
                <input
                  name="sleeps"
                  value={formData.van_listing.specifications.capacity.sleeps}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications.capacity")}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sleeps ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.sleeps && <p className="text-sm text-red-600 mt-1">{errors.sleeps}</p>}
              </div>
            </div>
          </section>

          {/* Detailed Features */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Detailed Features</h2>
            <div className="space-y-6">
              {formData.detailed_features.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <input
                        value={feature.category}
                        onChange={(e) => handleArrayItemChange("detailed_features", index, "category", e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg ${errors[`detail_category_${index}`] ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Enter category name"
                      />
                      {errors[`detail_category_${index}`] && <p className="text-sm text-red-600 mt-1">{errors[`detail_category_${index}`]}</p>}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeArrayItem("detailed_features", index)}
                      className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Items *</label>
                    {feature.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-3">
                        <input
                          value={item}
                          onChange={(e) => handleDetailedFeatureItemChange(index, itemIndex, e.target.value)}
                          className={`flex-1 px-4 py-2 border rounded-lg ${errors[`detail_item_${index}_${itemIndex}`] ? "border-red-500" : "border-gray-300"}`}
                          placeholder={`Feature item ${itemIndex + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeDetailedFeatureItem(index, itemIndex)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addDetailedFeatureItem(index)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayItem("detailed_features", { category: "", items: [""] })}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400"
              >
                + Add Feature Category
              </button>
            </div>
          </section>

          {/* Gallery */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Gallery Images</h2>

            <div className="mb-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>

            {/* Existing gallery */}
            {existingGallery.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Existing Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {existingGallery.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`existing-${index}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
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

            {/* New gallery previews */}
            {galleryPreviews.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">New Selected Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {galleryPreviews.map((previewUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={previewUrl}
                        alt={`preview-${index}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewGalleryImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {existingGallery.length === 0 && galleryPreviews.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No images added yet</p>
              </div>
            )}
          </section>

          {/* ✅ CORRECTED: Media URLs Section */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Media URLs</h2>

            <div className="space-y-4">
              {mediaUrls.map((url, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter media URL (YouTube, Vimeo, etc.)"
                    value={url}
                    onChange={(e) => handleMediaUrlChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeMediaUrl(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addMediaUrl}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              + Add Media URL
            </button>

            <p className="mt-3 text-sm text-gray-500">
              Add YouTube, Vimeo, or other media URLs (e.g., https://youtube.com/watch?v=abc123)
            </p>
          </section>

          {/* Submit Section */}
          <section className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  id="sold"
                  name="sold"
                  type="checkbox"
                  checked={formData.sold}
                  onChange={(e) => handleInputChange(e)}
                  className="h-5 w-5"
                />
                <label htmlFor="sold" className="text-sm font-medium text-gray-700">
                  Mark as sold
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : editData ? "Update Van Listing" : "Create Van Listing"}
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default VansForm;