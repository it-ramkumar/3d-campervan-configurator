import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createModel, updateModel } from "@/api/configurator/create";
import Swal from "sweetalert2";

export default function ConfiguratorForm({setSelected}) {
  const editData = useSelector((state) => state.editData.editData);
  const [form, setForm] = useState({
    category: "",
    label: "",
    price: "",
    description: "",
    type: "",
    group: "",
    hasSink: false,
    extensionKey: [],
  });
  const [image, setImage] = useState(null);
  const [glbFile, setGlbFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newExtension, setNewExtension] = useState("");


  useEffect(() => {
    if (editData) {
      setForm({
        category: editData.category || "",
        label: editData.label || "",
        price: editData.price || "",
        description: editData.description || "",
        type: editData.type || "",
        group: editData.group || "",
        hasSink: editData.hasSink || false,
        extensionKey: editData.extensionKey || [],
      });
      setImage(null); // Existing image will be kept if not changed
      setGlbFile(null); // Existing glb will be kept if not changed
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addExtension = () => {
    if (newExtension.trim() !== "") {
      setForm((prev) => ({
        ...prev,
        extensionKey: [...prev.extensionKey, newExtension.trim()],
      }));
      setNewExtension("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData && (!image || !glbFile)) {
      setMessage("Please upload both image and GLB file.");
      return;
    }

    setLoading(true);
    setMessage("");
    const formDataToSend = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "extensionKey") {
        form[key].forEach((ext) => formDataToSend.append("extensionKey[]", ext));
      } else {
        formDataToSend.append(key, form[key]);
      }
    });

    if (image) formDataToSend.append("image", image);
    if (glbFile) formDataToSend.append("glbFile", glbFile);
    try {
      // const formDataToSend = buildModelFormData(form, image, glbFile);

      let data;
      if (editData) {
        data = await updateModel(editData, formDataToSend);
              setSelected("Contact-data")

      } else {
        data = await createModel(formDataToSend);
              setSelected("Contact-data")

      }

      if (data.success) {
         Swal.fire({
              icon: "success",
              title: (editData ? "✅ Model updated successfully!" : "✅ Model uploaded successfully!"),
              text: "Your data has been submit successfully.",
            })
        setForm({
          category: "",
          label: "",
          price: "",
          description: "",
          type: "",
          group: "",
          hasSink: false,
          extensionKey: [],
        });
        setImage(null);
        setGlbFile(null);
        setNewExtension("");
      } else {
        setMessage("❌ Error: " + data.message);
      }
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
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {editData ? "Edit Model" : "Add New Model"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select Category</option>
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
            <option value="system">System</option>
          </select>
        </div>

        {/* Label */}
        <div>
          <label className="block mb-1 font-medium">Label</label>
          <input
            type="text"
            name="label"
            value={form.label}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          ></textarea>
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Group */}
        <div>
          <label className="block mb-1 font-medium">Group</label>
          <input
            type="text"
            name="group"
            value={form.group}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Has Sink */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasSink"
            checked={form.hasSink}
            onChange={handleChange}
          />
          <label>Has Sink</label>
        </div>

        {/* Extensions Section */}
        {(form.type.toLowerCase() === "counter-top" || form.type.toLowerCase() === "countertop") && (
          <div className="space-y-2 p-2 bg-gray-50 border border-gray-200 rounded-md">
            <label className="block font-medium mb-1">Extension Keys</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newExtension}
                onChange={(e) => setNewExtension(e.target.value)}
                placeholder="Enter extension key"
                className="flex-1 border rounded p-2"
              />
              <button
                type="button"
                onClick={addExtension}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            {form.extensionKey.length > 0 && (
              <p className="text-sm text-gray-700">
                <span className="font-medium">Current Extensions:</span> {form.extensionKey.join(", ")}
              </p>
            )}
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* GLB Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload GLB File</label>
          <input
            type="file"
            accept=".glb"
            onChange={(e) => setGlbFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : editData ? "Update Model" : "Add Model"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
