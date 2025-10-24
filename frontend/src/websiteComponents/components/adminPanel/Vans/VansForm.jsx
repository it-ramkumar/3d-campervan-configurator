"use client";
import React, { useEffect, useState } from "react";
import { createVan, updateVan } from "../../../../api/van/createVan";
import { useSelector,useDispatch } from "react-redux";
import { clearEditData } from "../../../../redux/slices/editData";

const VansForm = () => {
  const editData = useSelector((state) => state.editData.editData);
const dispatch = useDispatch()
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
    feature_highlights: [{ title: "", description: "" }],
    detailed_features: [{ category: "", items: [""] }],
    media: [""],
  });

  // Content blocks state: each block { image: File|null, caption: string, preview: string|null }
  const [blocks, setBlocks] = useState([{ image: null, caption: "", preview: null }]);

  // Gallery handling: existingGallery (URLs from editData), galleryFiles (new File[]), galleryPreviews (object URLs)
  const [existingGallery, setExistingGallery] = useState([]); // URLs (strings)
  const [galleryFiles, setGalleryFiles] = useState([]); // File objects for new uploads
  const [galleryPreviews, setGalleryPreviews] = useState([]); // object URLs for new files

  // Track which existing images / blocks user removed (so backend can delete if needed)
  const [removedExistingGallery, setRemovedExistingGallery] = useState([]); // URLs
  const [removedExistingBlockPreviews, setRemovedExistingBlockPreviews] = useState([]); // URLs

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

 // Prefill when editData exists
useEffect(() => {
  if (editData) {
    // Use deep-ish copy to avoid mutations
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
      feature_highlights: editData.feature_highlights || [{ title: "", description: "" }],
      detailed_features: editData.detailed_features || [{ category: "", items: [""] }],
      media: editData.media || [""],
      gallery: editData.gallery || [], // keep original structure if needed
    }));

    // Existing gallery URLs - FIXED for new structure
    setExistingGallery(editData.gallery ? [...editData.gallery] : []);

    // Prefill blocks: keep preview URL if block has image URL on backend
    if (editData.blocks?.length) {
      setBlocks(
        editData.blocks.map((b) => ({
          caption: b.caption || "",
          image: null,
          preview: b.image || null, // assume b.image is a URL string
        }))
      );
    } else {
      setBlocks([{ image: null, caption: "", preview: null }]);
    }
  }
}, [editData]);

  // ----------- Validation (kept from your original) -----------
  const validateForm = () => {
    const newErrors = {};

    // Basic Information Validation
    if (!formData.van_listing.title?.trim()) newErrors.title = "Title is required";
    // if (!formData.van_listing.model_name?.trim()) newErrors.model_name = "Model name is required";
    if (!formData.van_listing.description?.trim()) newErrors.description = "Description is required";
    if (!formData.van_listing.price || Number(formData.van_listing.price) < 0) newErrors.price = "Valid price is required";

    // Specifications Validation
    if (!formData.van_listing.specifications.make_model?.trim()) newErrors.make_model = "Make/Model is required";
    if (!formData.van_listing.specifications.wheelbase?.trim()) newErrors.wheelbase = "Wheelbase is required";
    if (!formData.van_listing.specifications.drivetrain?.trim()) newErrors.drivetrain = "Drivetrain is required";
    // if (!formData.van_listing.specifications.engine?.trim()) newErrors.engine = "Engine is required";
    if (!formData.van_listing.specifications.capacity.sits?.trim()) newErrors.sits = "Sits capacity is required";
    if (!formData.van_listing.specifications.capacity.sleeps?.trim()) newErrors.sleeps = "Sleeps capacity is required";

    // Feature Highlights Validation
    // formData.feature_highlights.forEach((feature, index) => {
    //   if (!feature.title?.trim()) newErrors[`feature_title_${index}`] = "Feature title is required";
    //   if (!feature.description?.trim()) newErrors[`feature_desc_${index}`] = "Feature description is required";
    // });

    // Detailed Features Validation
    formData.detailed_features.forEach((feature, index) => {
      if (!feature.category?.trim()) newErrors[`detail_category_${index}`] = "Category is required";
      feature.items.forEach((item, itemIndex) => {
        if (!item?.trim()) newErrors[`detail_item_${index}_${itemIndex}`] = "Feature item is required";
      });
    });

    // Media Validation
    // formData.media.forEach((media, index) => {
    //   if (!media?.trim()) newErrors[`media_${index}`] = "Media URL is required";
    // });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // ------------------------------------------------------------

  // Generic input handler for nested paths (keeps your original behaviour)
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
        // current now points to container object
        const lastKey = pathParts[pathParts.length - 1];
        // if target is an object (like specifications), name is the child key
        if (typeof current[lastKey] === "object" && current[lastKey] !== null && name) {
          current[lastKey] = { ...(current[lastKey] || {}), [name]: fieldValue };
        } else {
          current[lastKey] = fieldValue;
        }
        return newData;
      });
    } else {
      // top-level field name must exist (e.g. 'sold')
      setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    }
  };

  // ----------- Blocks Handlers -----------
  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...blocks];

    if (field === "image" && value) {
      // user selected a file
      // if there was an earlier object URL preview for a new file, revoke it
      if (newBlocks[index]?.preview && newBlocks[index].image instanceof File) {
        try { URL.revokeObjectURL(newBlocks[index].preview); } catch (e) {}
      }
      const preview = URL.createObjectURL(value);
      newBlocks[index] = { ...newBlocks[index], image: value, preview };
    } else {
      newBlocks[index] = { ...newBlocks[index], [field]: value };
    }

    setBlocks(newBlocks);
  };

  const addBlock = () => {
    setBlocks((prev) => [...prev, { image: null, caption: "", preview: null }]);
  };

  const removeBlock = (index) => {
    const target = blocks[index];
    // If block had a preview that is an existing URL (string from backend), mark for removal
    if (target?.preview && typeof target.preview === "string" && (!target.image)) {
      setRemovedExistingBlockPreviews((prev) => [...prev, target.preview]);
    }
    // If preview is an object URL (created for a newly selected file), revoke it
    if (target?.preview && target.image instanceof File) {
      try { URL.revokeObjectURL(target.preview); } catch (e) {}
    }
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };
  // ---------------------------------------

  // ----------- Gallery Handlers -----------
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // create previews for new files
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove a *newly selected* gallery image (by its index in galleryFiles/galleryPreviews)
  const removeNewGalleryImage = (index) => {
    // revoke object URL
    try { URL.revokeObjectURL(galleryPreviews[index]); } catch (e) {}
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove an existing gallery image (from editData) by index in existingGallery
// Remove an existing gallery image (from editData) by index in existingGallery
const removeExistingGalleryImage = (index) => {
  const galleryItem = existingGallery[index];
  if (galleryItem?.url) setRemovedExistingGallery((prev) => [...prev, galleryItem.url]);
  setExistingGallery((prev) => prev.filter((_, i) => i !== index));
};  // ---------------------------------------

  // Array helpers for feature highlights / detailed features / media
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
      blocks.forEach((b) => {
        if (b.preview && b.image instanceof File) {
          try { URL.revokeObjectURL(b.preview); } catch (e) {}
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------- Submit -----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const formToSend = new FormData();

      // Blocks data (captions + order)
      const blockData = blocks.map((block, i) => ({ index: i, caption: block.caption }));
      formToSend.append("blocksData", JSON.stringify(blockData));

      // New block images
      blocks.forEach((b) => {
        if (b.image instanceof File) formToSend.append("blockImages", b.image);
      });

      // Include any removed existing block previews so backend can delete them
      if (removedExistingBlockPreviews.length) {
        formToSend.append("removedBlockPreviews", JSON.stringify(removedExistingBlockPreviews));
      }

      // Existing gallery remaining (send to backend so it knows which urls remain)
      if (existingGallery.length) {
        formToSend.append("existingGallery", JSON.stringify(existingGallery));
      }

      // Which existing gallery images were removed (so backend can delete from S3)
      if (removedExistingGallery.length) {
        formToSend.append("removedGallery", JSON.stringify(removedExistingGallery));
      }

      // New gallery files
      galleryFiles.forEach((file) => formToSend.append("gallery", file));

      // Form main data
      formToSend.append("van_listing", JSON.stringify(formData.van_listing));
      formToSend.append("sold", formData.sold);
      formToSend.append("feature_highlights", JSON.stringify(formData.feature_highlights));
      formToSend.append("detailed_features", JSON.stringify(formData.detailed_features));
      formToSend.append("media", JSON.stringify(formData.media));

      if (editData?._id) {
        await updateVan(editData, formToSend);
        dispatch(clearEditData())
        alert("Van updated successfully");

      } else {
        await createVan(formToSend);
        // alert("Van created successfully");
      }
    } catch (err) {
      console.warn(err);
      // alert("Error creating/updating van. Check console for details.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {editData ? "Edit Van Listing" : "Create Van Listing"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {editData ? "Update the van details below." : "Fill out the form to list your van."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Title *</label>
                <input
                  name="title"
                  value={formData.van_listing.title}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  className={`w-full px-3 py-2 border rounded ${errors.title ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Model Name *</label>
                <input
                  name="model_name"
                  value={formData.van_listing.model_name}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  className={`w-full px-3 py-2 border rounded ${errors.model_name ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.model_name && <p className="text-xs text-red-600 mt-1">{errors.model_name}</p>}
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.van_listing.description}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded ${errors.description ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Price *</label>
                <input
                  name="price"
                  type="number"
                  value={formData.van_listing.price}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  className={`w-full px-3 py-2 border rounded ${errors.price ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Subtitle</label>
                <input
                  name="subtitle"
                  value={formData.van_listing.subtitle}
                  onChange={(e) => handleInputChange(e, "van_listing")}
                  className="w-full px-3 py-2 border rounded border-gray-300"
                />
              </div>
            </div>
          </section>

          {/* Specifications Card */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Technical Specifications</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Make & Model *</label>
                <input
                  name="make_model"
                  value={formData.van_listing.specifications.make_model}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications")}
                  className={`w-full px-3 py-2 border rounded ${errors.make_model ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.make_model && <p className="text-xs text-red-600 mt-1">{errors.make_model}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Wheelbase *</label>
                <input
                  name="wheelbase"
                  value={formData.van_listing.specifications.wheelbase}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications")}
                  className={`w-full px-3 py-2 border rounded ${errors.wheelbase ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.wheelbase && <p className="text-xs text-red-600 mt-1">{errors.wheelbase}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Drivetrain *</label>
                <input
                  name="drivetrain"
                  value={formData.van_listing.specifications.drivetrain}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications")}
                  className={`w-full px-3 py-2 border rounded ${errors.drivetrain ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.drivetrain && <p className="text-xs text-red-600 mt-1">{errors.drivetrain}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Engine *</label>
                <input
                  name="engine"
                  value={formData.van_listing.specifications.engine}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications")}
                  className={`w-full px-3 py-2 border rounded ${errors.engine ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.engine && <p className="text-xs text-red-600 mt-1">{errors.engine}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Sits *</label>
                <input
                  name="sits"
                  value={formData.van_listing.specifications.capacity.sits}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications.capacity")}
                  className={`w-full px-3 py-2 border rounded ${errors.sits ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.sits && <p className="text-xs text-red-600 mt-1">{errors.sits}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Sleeps *</label>
                <input
                  name="sleeps"
                  value={formData.van_listing.specifications.capacity.sleeps}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications.capacity")}
                  className={`w-full px-3 py-2 border rounded ${errors.sleeps ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.sleeps && <p className="text-xs text-red-600 mt-1">{errors.sleeps}</p>}
              </div>
            </div>
          </section>

          {/* Feature Highlights */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Feature Highlights</h2>
            <div className="space-y-4">
              {formData.feature_highlights.map((feature, index) => (
                <div key={index} className="border rounded p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-700 mb-1">Title *</label>
                      <input
                        value={feature.title}
                        onChange={(e) => handleArrayItemChange("feature_highlights", index, "title", e.target.value)}
                        className={`w-full px-3 py-2 border rounded ${errors[`feature_title_${index}`] ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors[`feature_title_${index}`] && <p className="text-xs text-red-600 mt-1">{errors[`feature_title_${index}`]}</p>}
                    </div>

                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => removeArrayItem("feature_highlights", index)}
                        className="px-3 py-2 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm text-gray-700 mb-1">Description *</label>
                    <textarea
                      value={feature.description}
                      onChange={(e) => handleArrayItemChange("feature_highlights", index, "description", e.target.value)}
                      className={`w-full px-3 py-2 border rounded ${errors[`feature_desc_${index}`] ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors[`feature_desc_${index}`] && <p className="text-xs text-red-600 mt-1">{errors[`feature_desc_${index}`]}</p>}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayItem("feature_highlights", { title: "", description: "" })}
                className="w-full px-4 py-2 border rounded text-sm"
              >
                + Add Feature Highlight
              </button>
            </div>
          </section>

          {/* Detailed Features */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Detailed Features</h2>
            <div className="space-y-4">
              {formData.detailed_features.map((feature, index) => (
                <div key={index} className="border rounded p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-700 mb-1">Category *</label>
                      <input
                        value={feature.category}
                        onChange={(e) => handleArrayItemChange("detailed_features", index, "category", e.target.value)}
                        className={`w-full px-3 py-2 border rounded ${errors[`detail_category_${index}`] ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors[`detail_category_${index}`] && <p className="text-xs text-red-600 mt-1">{errors[`detail_category_${index}`]}</p>}
                    </div>

                    <div className="flex-shrink-0 ml-4">
                      <button type="button" onClick={() => removeArrayItem("detailed_features", index)} className="px-3 py-2 bg-red-500 text-white rounded">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2">
                        <input
                          value={item}
                          onChange={(e) => handleDetailedFeatureItemChange(index, itemIndex, e.target.value)}
                          className={`flex-1 px-3 py-2 border rounded ${errors[`detail_item_${index}_${itemIndex}`] ? "border-red-500" : "border-gray-300"}`}
                          placeholder={`Item ${itemIndex + 1}`}
                        />
                        <button type="button" onClick={() => removeDetailedFeatureItem(index, itemIndex)} className="px-3 py-2 bg-red-500 text-white rounded">
                          ×
                        </button>
                      </div>
                    ))}

                    <button type="button" onClick={() => addDetailedFeatureItem(index)} className="px-3 py-2 bg-green-500 text-white rounded">
                      + Add Item
                    </button>
                  </div>
                </div>
              ))}

              <button type="button" onClick={() => addArrayItem("detailed_features", { category: "", items: [""] })} className="w-full px-4 py-2 border rounded text-sm">
                + Add Feature Category
              </button>
            </div>
          </section>

          {/* Media */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Media Links</h2>
            <div className="space-y-3">
              {formData.media.map((link, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={link}
                    onChange={(e) => handleArrayItemChange("media", index, null, e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded ${errors[`media_${index}`] ? "border-red-500" : "border-gray-300"}`}
                    placeholder="https://..."
                  />
                  <button type="button" onClick={() => removeArrayItem("media", index)} className="px-3 py-2 bg-red-500 text-white rounded">
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("media", "")} className="w-full px-4 py-2 border rounded text-sm">
                + Add Media Link
              </button>
            </div>
          </section>

        {/* Gallery */}
<section className="bg-white rounded-lg border p-6">
  <h2 className="text-lg font-medium text-gray-800 mb-4">Gallery Images</h2>

  <div className="mb-4">
    <input
      id="gallery-upload"
      type="file"
      multiple
      accept="image/*"
      onChange={handleGalleryChange}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>

  {/* Existing gallery (from backend) - FIXED */}
  {existingGallery.length > 0 && (
    <div className="mb-6">
      <div className="text-sm font-medium text-gray-700 mb-3">Existing Images</div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {existingGallery.map((galleryItem, i) => (
          <div key={galleryItem._id || i} className="relative group">
            <img
              src={galleryItem.url}
              alt={`existing-${i}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-500 transition-colors duration-200"
            />
            {galleryItem.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                {galleryItem.caption}
              </div>
            )}
            <button
              type="button"
              onClick={() => removeExistingGalleryImage(i)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-700 transition-colors duration-200"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* New selected files previews */}
  {galleryPreviews.length > 0 && (
    <div>
      <div className="text-sm font-medium text-gray-700 mb-3">New Selected Images</div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {galleryPreviews.map((previewUrl, idx) => (
          <div key={idx} className="relative group">
            <img
              src={previewUrl}
              alt={`preview-${idx}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-green-200 group-hover:border-green-500 transition-colors duration-200"
            />
            <button
              type="button"
              onClick={() => removeNewGalleryImage(idx)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-700 transition-colors duration-200"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Empty state */}
  {existingGallery.length === 0 && galleryPreviews.length === 0 && (
    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="mt-2 text-sm text-gray-500">No images added yet</p>
    </div>
  )}
</section>

          {/* Content Blocks */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Content Blocks</h2>

            <div className="space-y-4">
              {blocks.map((block, index) => (
                <div key={index} className="border rounded p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-700 mb-1">Caption</label>
                      <input
                        value={block.caption}
                        onChange={(e) => handleBlockChange(index, "caption", e.target.value)}
                        className="w-full px-3 py-2 border rounded border-gray-300"
                        placeholder="Caption or short text"
                      />
                    </div>

                    <div className="flex-shrink-0">
                      <button type="button" onClick={() => removeBlock(index)} className="px-3 py-2 bg-red-500 text-white rounded">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm text-gray-700 mb-1">Image (optional)</label>
                    <input type="file" accept="image/*" onChange={(e) => handleBlockChange(index, "image", e.target.files[0])} />
                    {block.preview && (
                      <div className="mt-3 w-48 h-32">
                        <img src={block.preview} alt={`block-${index}`} className="w-full h-full object-cover rounded border" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button type="button" onClick={addBlock} className="w-full px-4 py-2 border rounded text-sm">
                + Add Content Block
              </button>
            </div>
          </section>

          {/* Submit */}
          <section className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <input
                  id="sold"
                  name="sold"
                  type="checkbox"
                  checked={formData.sold}
                  onChange={(e) => handleInputChange(e)}
                  className="h-4 w-4"
                />
                <label htmlFor="sold" className="text-sm text-gray-700">
                  Mark as sold
                </label>
              </div>

              <div>
                <button type="submit" disabled={loading} className="px-5 py-2 bg-green-600 text-white rounded">
                  {loading ? "Submitting..." : editData ? "Update Van Listing" : "Create Van Listing"}
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default VansForm;
