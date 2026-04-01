import React, { useState } from "react";
import axios from "axios";

const AddBaseVanForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    layout: "",
    modelYear: "",
    price: "",
    shortDescription: "",
    wheelBase: "",
    drivetrain: "AWD",
    sitSleep: "",
    colors: "Standard",
  });

  const [files, setFiles] = useState({
    image: null,
    glbFile: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // Append Text Fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    // Append Files
    if (files.image) data.append("image", files.image);
    if (files.glbFile) data.append("glbFile", files.glbFile);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/add-base-van`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Base Van Added Successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding van: " + err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Base Van</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Layout Name */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Layout Name</label>
          <input
            name="layout"
            placeholder="e.g. Mercedes-Benz Sprinter"
            className="border p-2 rounded-md focus:outline-blue-500"
            onChange={handleChange}
            required
          />
        </div>

        {/* Model Year */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Model Year</label>
          <input
            name="modelYear"
            placeholder="2022"
            className="border p-2 rounded-md"
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Price ($)</label>
          <input
            name="price"
            type="number"
            placeholder="224543"
            className="border p-2 rounded-md"
            onChange={handleChange}
          />
        </div>

        {/* Wheelbase */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Wheelbase (e.g. 144)</label>
          <input
            name="wheelBase"
            type="number"
            className="border p-2 rounded-md"
            onChange={handleChange}
          />
        </div>

        {/* Drivetrain */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Drivetrain</label>
          <select name="drivetrain" className="border p-2 rounded-md" onChange={handleChange}>
            <option value="AWD">AWD</option>
            <option value="RWD">RWD</option>
            <option value="4WD">4WD</option>
          </select>
        </div>

        {/* Sit & Sleep */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Sit & Sleep (e.g. 2-5)</label>
          <input
            name="sitSleep"
            placeholder="2-5"
            className="border p-2 rounded-md"
            onChange={handleChange}
          />
        </div>

        {/* Description (Full Width) */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-2">Short Description</label>
          <textarea
            name="shortDescription"
            rows="3"
            className="border p-2 rounded-md"
            onChange={handleChange}
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2 text-blue-600">Preview Image (PNG/JPG)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border p-1"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* GLB Upload */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2 text-purple-600">3D Model (GLB File)</label>
          <input
            type="file"
            name="glbFile"
            accept=".glb"
            className="border p-1"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Uploading to S3 & Saving..." : "Save Base Van"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBaseVanForm;