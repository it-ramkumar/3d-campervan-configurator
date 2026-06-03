"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { removeMediaUrl } from "@/CustomHooks/removeMediaUrl";
import { addMediaUrl } from "@/CustomHooks/addMediaUrl";
import { handleMediaUrlChange } from "@/CustomHooks/handleMediaUrlChange";
import { handlePortfolioSubmit } from "@/CustomHooks/handlePortfolioSubmit"
import DetailedFeatures from "@/components/Common/DetailFeature/DetailedFeatures";
import GalleryUploader from "@/components/Common/GalleryUploader/GalleryUploader";

export default function PortfolioForm({ setSelected }) {
  const editData = useSelector((state) => state.editData.editData);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);
  const [size, setSize] = useState("");
  const [roof, setRoof] = useState("");
  const [bedType, setBedType] = useState("");
  const [bathroomType, setBathroomType] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState(false);
  const [makeModel, setMakeModel] = useState("");
  const [wheelbase, setWheelbase] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [capacity, setCapacity] = useState({ sits: "", sleeps: "" });
  const [features, setFeatures] = useState([{ category: "", items: [""] }]);
  const [mediaUrls, setMediaUrls] = useState([""]);
  const [category, setCategory] = useState([]);
  const [removedExistingGallery, setRemovedExistingGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  // Add these to your state declarations
  const [renderingFiles, setRenderingFiles] = useState([]);
  const [renderingPreviews, setRenderingPreviews] = useState([]);
  const [existingRendering, setExistingRendering] = useState([]);
  const [removedExistingRendering, setRemovedExistingRendering] = useState([]);


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
    setCategory([]);
    // ... your existing clear logic
    setRenderingFiles([]);
    setRenderingPreviews([]);
    setExistingRendering([]);
    setRemovedExistingRendering([]);
  };

  useEffect(() => {
    if (editData?._id) {
      setTitle(editData.van_listing?.title || "");
      setRoof(editData.van_listing?.roof || "");
      setBedType(editData.van_listing?.bedType || "");
      setBathroomType(editData.van_listing?.bathroomType || "");
      setSize(editData.van_listing?.size || "");
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
      setFeatures(editData.detailed_features?.length > 0
        ? editData.detailed_features
        : [{ category: "", items: [""] }]
      );
      setMediaUrls(editData.media?.length > 0
        ? [...editData.media]
        : [""]
      );
      setExistingGallery(editData.gallery || []);
      setExistingRendering(editData.rendering || []);
    } else {
      clearForm();
    }
  }, [editData]);
  useEffect(() => {
    return () => {
      galleryPreviews.forEach((url) => {
        try { URL.revokeObjectURL(url); } catch (e) { }
      });
    };
  }, [galleryPreviews]);
  // Form Submit Handler
  const onSubmit = (e) => {
    // Hum handlePortfolioSubmit ko call kar rahe hain aur galleryOrder pass kar rahe hain
    handlePortfolioSubmit({
      e,
      editData,
      title,
      category,
      galleryFiles,
      existingGallery, // Ye pass karna zaroori hai
      galleryOrder: existingGallery, // Backend ko ordered array bhej raha hai
      removedExistingGallery,
      renderingFiles,           // New
      existingRendering,         // New
      removedExistingRendering,  // New
      setRemovedExistingRendering,
      features,
      mediaUrls,
      sold,
      van_listing: {
        title,
        subtitle,
        description,
        price,
        size,
        roof,
        bedType,
        bathroomType,
        specifications: {
          make_model: makeModel,
          wheelbase,
          drivetrain,
          capacity,
        },
      },
      setLoading,
      setRemovedExistingGallery,
      clearForm,
      setSelected,
    });
  };
  const handleChange = (e) => {
    setBathroomType(e.target.value);
    console.log("Selected Value:", e.target.value); // Check karein console me value aa rahi hai ya nahi
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {editData ? "Edit Portfolio Van" : "Create Portfolio Van"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-8">

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Roof</label>
              <select
                value={roof}
                onChange={(e) => setRoof(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full bg-white focus:outline-none focus:border-gray-500"
              >
                <option value="">Select Roof Type</option>
                <option value="High-Roof">High Roof</option>
                <option value="Low-Roof">Low Roof</option>
                <option value="Pop-Top">Pop-Top Roof</option>
                <option value="Mid-Roof">Mid Roof</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bed Type</label>
              <select
                value={bedType}
                onChange={(e) => setBedType(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full bg-white focus:outline-none focus:border-gray-500"
              >
                <option value="">Select Bed Type</option>
                <option value="Elevator Bed E/W">Elevator Bed E/W</option>
                <option value="Stationary Bed S/N">Stationary Bed S/N</option>
                <option value="Stationary Bed E/W">Stationary Bed E/W</option>
                <option value="Loft Bed ">Loft Bed </option>
                <option value="Poptop Bed ">Poptop Bed</option>
                <option value="Dinette To Bed">Dinette To Bed</option>
                <option value="Bunk Kids Bed">Bunk Kids Bed</option>
                <option value="Elevator Bed S/N">Elevator Bed S/N</option>

              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathroom Type</label>
              <select
                value={bathroomType}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full bg-white focus:outline-none focus:border-gray-500"
              >
                <option value="">Select Bathroom Type</option> {/* disabled hata diya */}
                <option value="Full Aluminum">Full Aluminum</option>
                <option value="Full Acrilic">Full Acrilic</option>
                <option value="Full Real Tile">Full Real Tile</option>
                <option value="Rear Shower">Rear Shower</option>
                <option value="Shower in a Bench">Shower in a Bench</option>
                <option value="Folding Shower">Folding Shower</option>
                <option value="Rear Bathroom">Rear Bathroom</option>




              </select>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full bg-white focus:outline-none focus:border-gray-500"
              >
                <option value="">Select Size</option>
                <option value="Short">Short</option>
                <option value="Mid">Mid</option>
                <option value="Long">Long</option>
                <option value="Regular">Regular</option>
              </select>
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
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category *</h3>
          <div className="flex flex-col gap-2">
            {[
              "flagship-short-van-santa-monica",
              "flagship-long-van-montreal",
              "layouts-for-solo-and-couple-travelers",
              "layouts-for-families-3-9-people",
              "portfolio-of-custom-builds",
              "sugarloaf",
              "amsterdam",
              "poptop",
            ].map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategory([...category, cat]);
                    } else {
                      setCategory(category.filter((c) => c !== cat));
                    }
                  }}
                  className="h-4 w-4 text-gray-600 border-gray-300 rounded"
                />
                <span className="text-gray-700">{cat}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Select one or multiple categories.</p>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Detailed Features
          </h3>
          <DetailedFeatures
            features={features}
            setFeatures={setFeatures}
          />

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
                  onChange={(e) =>
                    handleMediaUrlChange(index, e.target.value, setMediaUrls)
                  }
                  className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
                />

                <button
                  type="button"
                  onClick={() => removeMediaUrl(index, mediaUrls, setMediaUrls)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addMediaUrl(setMediaUrls)}
            className="mt-3 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            + Add Media URL
          </button>
        </div>
        {/* RENDERINGS UPLOAD (Layout Images) */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Layout Renderings</h3>
          <GalleryUploader
            id="renderings"
            title="Layout Renderings"
            galleryFiles={renderingFiles}
            setGalleryFiles={setRenderingFiles}
            galleryPreviews={renderingPreviews}
            setGalleryPreviews={setRenderingPreviews}
            existingGallery={existingRendering}
            setExistingGallery={setExistingRendering}
            removedExistingGallery={removedExistingRendering}
            setRemovedExistingGallery={setRemovedExistingRendering}
          />
          <p className="text-sm text-gray-500 mt-2">Upload 3D renderings or layout floorplans here.</p>
        </div>
        {/* GALLERY UPLOAD */}
        <GalleryUploader
          id="main-gallery"
          title="Gallery Images"
          galleryFiles={galleryFiles}
          setGalleryFiles={setGalleryFiles}
          galleryPreviews={galleryPreviews}
          setGalleryPreviews={setGalleryPreviews}
          existingGallery={existingGallery}
          setExistingGallery={setExistingGallery}
          removedExistingGallery={removedExistingGallery}
          setRemovedExistingGallery={setRemovedExistingGallery}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-lg font-medium ${loading
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