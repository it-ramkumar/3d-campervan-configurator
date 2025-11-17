"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateInteriorItem() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState([""]); // array of description lines
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/category`)
      .then((res) => {
        setCategories(res.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Add new empty description
  const addDescription = () => setDescriptions([...descriptions, ""]);

  // Update specific description line
  const updateDescription = (index, value) => {
    const newDesc = [...descriptions];
    newDesc[index] = value;
    setDescriptions(newDesc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("data", JSON.stringify({ title, categoryId }));
    formData.append("description", JSON.stringify(descriptions));
    if (image) formData.append("images", image);

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/item`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Item created successfully!");
      setTitle("");
      setCategoryId("");
      setDescriptions([""]);
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to create item");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-2xl space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Create Interior Item</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Item Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter item title"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-black/40 outline-none"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Category</label>
          <select
            className="border rounded-xl p-3 bg-white focus:ring-2 focus:ring-black/40 outline-none"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Description</label>
          {descriptions.map((desc, i) => (
            <textarea
              key={i}
              value={desc}
              onChange={(e) => updateDescription(i, e.target.value)}
              placeholder={`Description line ${i + 1}`}
              className="border rounded-xl p-3 h-24 focus:ring-2 focus:ring-black/40 outline-none"
            />
          ))}

          <button
            type="button"
            onClick={addDescription}
            className="mt-2 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded w-max"
          >
            Add More
          </button>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border rounded-xl p-3 cursor-pointer bg-gray-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl text-lg hover:bg-black/80 transition disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Create Item"}
        </button>
      </form>
    </div>
  );
}
