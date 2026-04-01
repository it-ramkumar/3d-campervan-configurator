import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearEditData } from "@/redux/slices/editData";
import Image from "next/image";

const AddQuickLink = ({ onAdded, setSelected }) => {
  const dispatch = useDispatch();
  const editData = useSelector((state) => state.editData.editData);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [preview, setPreview] = useState(null); // Preview state
  const [loading, setLoading] = useState(false);

  // 1. Auto-fill logic aur purani image ka preview
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setUrl(editData.url || "");
      setPreview(editData.icon || null); // Agar backend se image URL aa raha hai
    } else {
      resetForm();
    }
  }, [editData]);

  // 2. Nayi image select hone par preview generate karna
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      setPreview(URL.createObjectURL(file)); // Temp URL for preview
    }
  };

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setIconFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !url) return alert("Title and URL required");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("link", JSON.stringify({ title, url }));
      if (iconFile) formData.append("icon", iconFile);

      const isEditing = !!editData;
      const urlEndpoint = isEditing
        ? `${process.env.NEXT_PUBLIC_URL}/quick-links/${editData._id}`
        : `${process.env.NEXT_PUBLIC_URL}/quick-links`;

      const res = await axios({
        method: isEditing ? "put" : "post",
        url: urlEndpoint,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(isEditing ? "Updated Successfully!" : "Added Successfully!");
      dispatch(clearEditData());
      if (onAdded) onAdded(res.data.link);
      setSelected("quickLink");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold border-b pb-2">
        {editData ? "Edit Link" : "Create New Link"}
      </h2>

      {/* Image Preview Section */}
      <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl bg-gray-50">
        {preview ? (
          <div className="relative">
            <Image
              src={preview}
              alt="Preview || Big bear vans"
              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
              width={96}
              height={96}
            />
            <button
              type="button"
              onClick={() => { setIconFile(null); setPreview(null); }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="text-gray-400 text-center">
            <p className="text-sm">No Icon Selected</p>
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <input
        type="text"
        placeholder="URL (e.g. https://...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full text-sm"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : editData ? "Update Link" : "Save Link"}
        </button>

        <button
          type="button"
          onClick={() => { dispatch(clearEditData()); setSelected("quickLinks"); }}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddQuickLink;