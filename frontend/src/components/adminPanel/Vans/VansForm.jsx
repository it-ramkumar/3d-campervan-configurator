"use client";
import React, { useEffect, useState } from "react";
import { createVan, updateVan } from "@/api/van/createVan";
import { useSelector, useDispatch } from "react-redux";
import { clearEditData } from "@/redux/slices/editData";
import { handleInputChange } from "@/CustomHooks/handlnput";
import { addMediaUrl } from "@/CustomHooks/addMediaUrl";
import { handleMediaUrlChange } from "@/CustomHooks/handleMediaUrlChange";
import { removeMediaUrl } from "@/CustomHooks/removeMediaUrl";
import DetailedFeatures from "@/components/Common/DetailFeature/DetailedFeatures";
import GalleryUploader from "@/components/Common/GalleryUploader/GalleryUploader";
import DynamicBlocks from "@/components/Common/DynamicBlock/DynamicBlock"; // Naya Component
import Swal from "sweetalert2";

const VansForm = ({ setSelected }) => {
  const editData = useSelector((state) => state.editData.editData);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    van_listing: {
      title: "",
      description: "",
      subtitle: "",
      roof: "",
      price: "",
      tagline: "",
      specifications: {
        make_model: "",
        wheelbase: "",
        drivetrain: "",
        engine: "",
        capacity: { sits: "", sleeps: "" },
        transmission: "",
        exterior_color: "",
        interior_color: ""
      },
    },
    delivery_date: "",
    status: "available",
    gallery: [],
    media: [],
  });

  const [features, setFeatures] = useState([{ category: "", items: [""] }]);
  // --- Naya: Blocks State ---
  const [blocks, setBlocks] = useState([]);

  const [existingGallery, setExistingGallery] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [removedExistingGallery, setRemovedExistingGallery] = useState([]);
  const [mediaUrls, setMediaUrls] = useState([""]);
  // Existing states ke saath ye add karein
  const [glbFile, setGlbFile] = useState(null);
  const [existingGlbFile, setExistingGlbFile] = useState(null); // ✅ Add this
  const [removeGlbFile, setRemoveGlbFile] = useState(false); // ✅ Add this
  // const [textureFiles, setTextureFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const statusOptions = [
    { value: "available", label: "Available" },
    { value: "sale_pending", label: "Sale Pending" },
    { value: "sold", label: "Sold" },
    { value: "coming_soon", label: "Coming Soon" },
  ];


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
        status: editData.status || "available",
        delivery_date: editData?.delivery_date,
      }));
      // ✅ Add GLB handling
      setExistingGlbFile(editData.glbFile || null);
      setRemoveGlbFile(false);
      setExistingGallery(editData.gallery ? [...editData.gallery] : []);
      setMediaUrls(editData.media?.length > 0 ? [...editData.media] : [""]);

      if (editData.blocks) {
        const transformedBlocks = editData.blocks.map((block) => {
          if (block.block_type === "list") {
            return {
              ...block,
              list_items: (block.list_items || []).map((item) => ({
                text: item?.text || "",
                sub_items: item?.sub_items || []
              }))
            };
          }

          return block;
        });

        setBlocks(transformedBlocks);
      }

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
        roof: "",
        price: "",
        tagline: "",
        specifications: {
          make_model: "",
          wheelbase: "",
          drivetrain: "",
          engine: "",
          capacity: { sits: "", sleeps: "" },
          transmission: "",
          exterior_color: "",
          interior_color: ""
        },
      },
      delivery_date: "",
      status: "available",
      gallery: [],
      detailed_features: [{ category: "", items: [""] }],
      media: [],
    });
    setGlbFile(null),
      setExistingGlbFile(null); // ✅ Add this
    setRemoveGlbFile(false); // ✅ Add this
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery([]);
    setRemovedExistingGallery([]);
    setMediaUrls([""]);
    setBlocks([]); // Blocks reset

    dispatch(clearEditData());
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
    setLoading(true);
    // console.log(formData);
    try {
      const formToSend = new FormData();

      const cleanedBlocks = (blocks || [])
        .map((block) => {
          const b = { ...block };

          // ✅ LIST BLOCK CLEANING
          if (b.block_type === "list") {
            b.list_items = (b.list_items || [])
              .map((item) => {
                if (!item || typeof item !== "object") return null;

                const cleanedSubItems = (item.sub_items || [])
                  .filter((sub) => sub && sub.trim() !== "");

                const mainText = item.text?.trim() || "";

                // Agar main text empty hai to pura item remove
                if (!mainText) return null;

                return {
                  text: mainText,
                  ...(cleanedSubItems.length > 0 && {
                    sub_items: cleanedSubItems,
                  }),
                };
              })
              .filter(Boolean);

            // Agar koi valid list item nahi bacha
            if (!b.list_items.length) {
              delete b.list_items;
            }
          }

          // ✅ REMOVE EMPTY FIELDS
          Object.keys(b).forEach((key) => {
            const value = b[key];

            if (
              value === null ||
              value === undefined ||
              value === "" ||
              (Array.isArray(value) && value.length === 0)
            ) {
              delete b[key];
            }
          });

          return b;
        })
        .filter((block) => Object.keys(block).length > 1);

      // 2. Append Data
      formToSend.append("van_listing", JSON.stringify(formData.van_listing));
      formToSend.append("delivery_date", formData.delivery_date);
      formToSend.append("status", formData.status);
      formToSend.append("detailed_features", JSON.stringify(features));
      formToSend.append("media", JSON.stringify(mediaUrls.filter(u => u && u.trim() !== "")));
      formToSend.append("blocks", JSON.stringify(cleanedBlocks));
      formToSend.append("galleryOrder", JSON.stringify(existingGallery));
      formToSend.append("insertAt", "0");
      galleryFiles.forEach((file) => formToSend.append("gallery", file));
      // ✅ Handle GLB file logic
      if (removeGlbFile) {
        formToSend.append("removeGlbFile", "true");
      }

      if (glbFile) {
        formToSend.append("glbFile", glbFile);
      }

      if (editData?._id) {
        console.log("Updating van via slug:", editData.slug);
        await updateVan(editData.slug, formToSend); // Parent ID ki jagah SLUG use karein
      } else {
        await createVan(formToSend);
      }

      Swal.fire("Success", "Van saved successfully", "success");
      setSelected("Vans-listing");
      resetForm();

    } catch (err) {
      console.error("Submission Error Details:", err.response?.data || err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Check console for details",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Roof *</label>
                <input
                  name="roof"
                  value={formData.van_listing.roof}
                  onChange={(e) => handleInputChange(e, "van_listing", setFormData)}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.roof ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter roof type"
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



              {/* Exterior Color Picker */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">Exterior Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="exterior_color"
                    value={formData.van_listing.specifications.exterior_color || "#ffffff"} // Default white
                    onChange={(e) => handleInputChange(e, "van_listing.specifications", setFormData)}
                    className="h-10 w-20 cursor-pointer rounded border border-gray-300"
                  />
                  <span className="text-xs font-mono text-gray-500 uppercase">
                    {formData.van_listing.specifications.exterior_color || "#ffffff"}
                  </span>
                </div>
              </div>

              {/* Interior Color Picker */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">Interior Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="interior_color"
                    value={formData.van_listing.specifications.interior_color || "#000000"} // Default black
                    onChange={(e) => handleInputChange(e, "van_listing.specifications", setFormData)}
                    className="h-10 w-20 cursor-pointer rounded border border-gray-300"
                  />
                  <span className="text-xs font-mono text-gray-500 uppercase">
                    {formData.van_listing.specifications.interior_color || "#000000"}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                <input
                  name="transmission"
                  value={formData.van_listing.specifications.transmission}
                  onChange={(e) => handleInputChange(e, "van_listing.specifications.transmission", setFormData)}
                  className={`w-full px-4 py-2 border rounded-lg `}
                />
              </div>
            </div>
          </section>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>

          <input
            name="delivery_date"
            value={formData.delivery_date}
            onChange={(e) => handleInputChange(e, "delivery_date", setFormData)}
            className={`w-full px-4 py-2 border rounded-lg `}
          />
          {/* Detailed Features */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Features</h3>
            <DetailedFeatures features={features} setFeatures={setFeatures} />
          </div>

          {/* --- Naya: Dynamic Content Blocks Section --- */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Blocks (Dynamic)</h2>
            <p className="text-sm text-gray-500 mb-6">Add dynamic sections like Headings, Tables, Paragraphs, or Lists.</p>
            <DynamicBlocks blocks={blocks} setBlocks={setBlocks} />
          </section>

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
          {/* --- 3D Model Section --- */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">3D Model (GLB)</h2>

            <div className="space-y-4">
              {/* Show existing GLB file */}
              {existingGlbFile && !removeGlbFile && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Current GLB File:</p>
                      <p className="text-xs text-gray-500 truncate max-w-md">
                        {existingGlbFile.split('/').pop()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRemoveGlbFile(true)}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {/* Show removal confirmation */}
              {removeGlbFile && existingGlbFile && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 mb-2">GLB file will be deleted on save.</p>
                  <button
                    type="button"
                    onClick={() => setRemoveGlbFile(false)}
                    className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                  >
                    Undo
                  </button>
                </div>
              )}

              {/* GLB File Input - show when no existing file or when removing */}
              {(!existingGlbFile || removeGlbFile) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {removeGlbFile ? "Upload New GLB File" : "GLB Model File"}
                  </label>
                  <input
                    type="file"
                    accept=".glb"
                    onChange={(e) => setGlbFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  {glbFile && <p className="text-xs text-green-600 mt-1">Selected: {glbFile.name}</p>}
                </div>
              )}
            </div>
          </section>
          {/* Media URLs Section */}
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
          </section>

          {/* Status & Submit Section */}
          <section className="border border-gray-300 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Listing Status *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.status === option.value
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 hover:border-gray-400"
                        }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
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