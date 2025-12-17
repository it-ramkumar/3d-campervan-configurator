"use client";
import React, { useEffect, useState } from "react";
import { createVan, updateVan } from "../../../../api/van/createVan";
import { useSelector, useDispatch } from "react-redux";
import { clearEditData } from "../../../../redux/slices/editData";
import axios from "axios";
import { handleInputChange } from "../../../CustomHooks/handlnput";
import { addMediaUrl } from "../../../CustomHooks/addMediaUrl";
import { handleMediaUrlChange } from "../../../CustomHooks/handleMediaUrlChange";
import { removeMediaUrl } from "../../../CustomHooks/removeMediaUrl";
import DetailedFeatures from "../../Common/DetailFeature/DetailedFeatures";
import GalleryUploader from "../../Common/GalleryUploader/GalleryUploader";
import Swal from "sweetalert2";


const VansForm = ({setSelected}) => {
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
    media: [],
  });
  const [features, setFeatures] = useState([{ category: "", items: [""] }]);

  const [existingGallery, setExistingGallery] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [removedExistingGallery, setRemovedExistingGallery] = useState([]);
  const [mediaUrls, setMediaUrls] = useState([""]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
      media: editData.media || [],
      gallery: editData.gallery || [],
    }));

    setExistingGallery(editData.gallery ? [...editData.gallery] : []);
    setMediaUrls(editData.media?.length > 0 ? [...editData.media] : [""]);

    // ✅ Initialize features correctly
    setFeatures(editData.detailed_features?.length > 0
      ? editData.detailed_features
      : [{ category: "", items: [""] }]
    );
  }
}, [editData]);

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
      media: [],
    });

    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery([]);
    setRemovedExistingGallery([]);
    setMediaUrls([""]); // ✅ Reset media URLs

    dispatch(clearEditData());
  };

const validateForm = () => {
  const newErrors = {};

  if (!formData.van_listing.title?.trim()) newErrors.title = "Title is required";
  if (!formData.van_listing.description?.trim()) newErrors.description = "Description is required";
  if (!formData.van_listing.price || Number(formData.van_listing.price) < 0) newErrors.price = "Valid price is required";
  if (!formData.van_listing.specifications.make_model?.trim()) newErrors.make_model = "Make/Model is required";
  if (!formData.van_listing.specifications.wheelbase?.trim()) newErrors.wheelbase = "Wheelbase is required";
  if (!formData.van_listing.specifications.drivetrain?.trim()) newErrors.drivetrain = "Drivetrain is required";
  if (!formData.van_listing.specifications.capacity.sits?.trim()) newErrors.sits = "Sits capacity is required";
  if (!formData.van_listing.specifications.capacity.sleeps?.trim()) newErrors.sleeps = "Sleeps capacity is required";

  // ✅ Use features from state, not editData
  if (features.length === 0) {
    newErrors.features = "At least one feature category is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



  useEffect(() => {
    return () => {
      galleryPreviews.forEach((url) => {
        try { URL.revokeObjectURL(url); } catch (e) { }
      });
    };
  }, [galleryPreviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
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
      formToSend.append("detailed_features", JSON.stringify(features));

      // 3️⃣ Call backend to create or update van
      if (editData?._id) {
        await updateVan(editData, formToSend);
        resetForm();
        setSelected("Vans-listing")

      } else {
        await createVan(formToSend);
        resetForm();
        setSelected("Vans-listing")

      }

      // 4️⃣ Clear removed images state
      setRemovedExistingGallery([]);
    } catch (err) {
        Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.message,
    });
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
                  onChange={(e) => handleInputChange(e, "van_listing", setFormData)}
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
                  onChange={(e) => handleInputChange(e, "van_listing", setFormData)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter model name"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.van_listing.description}
                  onChange={(e) => handleInputChange(e, "van_listing", setFormData)}
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
                  onChange={(e) => handleInputChange(e, "van_listing", setFormData)}
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
                  onChange={(e) => handleInputChange(e, "van_listing", setFormData)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  name="tagline"
                  value={formData.van_listing.tagline}
                  onChange={(e) => handleInputChange(e, "van_listing", setFormData)}
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
                  onChange={(e) => handleInputChange(e, "van_listing.specifications", setFormData)}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.make_model ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.make_model && <p className="text-sm text-red-600 mt-1">{errors.make_model}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wheelbase *</label>
                <input
                  name="wheelbase"
                  value={formData.van_listing.specifications.wheelbase}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications", setFormData)}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.wheelbase ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.wheelbase && <p className="text-sm text-red-600 mt-1">{errors.wheelbase}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drivetrain *</label>
                <input
                  name="drivetrain"
                  value={formData.van_listing.specifications.drivetrain}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications", setFormData)}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.drivetrain ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.drivetrain && <p className="text-sm text-red-600 mt-1">{errors.drivetrain}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Engine</label>
                <input
                  name="engine"
                  value={formData.van_listing.specifications.engine}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications", setFormData)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sits *</label>
                <input
                  name="sits"
                  value={formData.van_listing.specifications.capacity.sits}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications.capacity", setFormData)}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sits ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.sits && <p className="text-sm text-red-600 mt-1">{errors.sits}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sleeps *</label>
                <input
                  name="sleeps"
                  value={formData.van_listing.specifications.capacity.sleeps}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications.capacity", setFormData)}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.sleeps ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.sleeps && <p className="text-sm text-red-600 mt-1">{errors.sleeps}</p>}
              </div>
            </div>
          </section>

          {/* Detailed Features */}
    {/* DETAILED FEATURES */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Detailed Features
          </h3>
          <DetailedFeatures
            features={features}
            setFeatures={setFeatures}
          />

        </div>




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
                    onChange={(e) => handleMediaUrlChange(index, e.target.value, setMediaUrls)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeMediaUrl(index, mediaUrls, setMediaUrls)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addMediaUrl(setMediaUrls)}
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
                  onChange={(e) => handleInputChange(e, "", setFormData)}
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