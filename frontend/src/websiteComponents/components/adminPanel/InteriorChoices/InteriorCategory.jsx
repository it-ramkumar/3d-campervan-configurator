import { useState } from "react";
import axios from "axios";

export default function CategoryForm({ setSelected }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Category title is required");

    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/category`, {
        title,
        description,
      });

      alert("Category created successfully!");
      setTitle("");
      setDescription("");

      // Optionally pass the new category to parent
      if (setSelected) setSelected(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Create Category</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter category title"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description"
            className="w-full border p-2 rounded h-24"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
