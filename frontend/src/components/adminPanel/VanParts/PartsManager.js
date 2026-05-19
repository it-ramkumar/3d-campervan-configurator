"use client";
import axios from "axios";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function PartsManager({ setSelected }) {
  const dispatch = useDispatch();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch parts
  const fetchParts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/van-parts`, {
        withCredentials: true,
      });
      const data = res.data;

      setParts(data.parts || []);
    } catch (err) {
      console.error("Failed to load parts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  // Delete part
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this part?");
    if (!confirm) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/van-parts/${id}`, {
        withCredentials: true,
      });

      setParts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Edit (placeholder)
  const handleEdit = (part) => {
    dispatch(setEditData(part));
    setSelected("VanParts");
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Parts Library</h2>

        <button
          onClick={() => {
            setSelected("VanParts");
            dispatch(clearEditData());
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Part
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading parts...</p>}

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">

        {parts.map((part) => (
          <div
            key={part._id}
            className="border rounded-lg p-3 relative bg-white shadow-sm"
          >

            {/* TOP RIGHT ACTION BUTTONS */}
            <div className="absolute top-2 right-2 flex gap-2">

              <button
                onClick={() => handleEdit(part)}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(part._id)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>

            </div>

            {/* Thumbnail */}
            <img
              src={part.thumbnail}
              alt={part.name}
              className="w-full h-28 object-cover rounded"
            />

            {/* Info */}
            <div className="mt-2">
              <h3 className="font-semibold">{part.name}</h3>
              <p className="text-sm text-gray-500">{part.category}</p>
            </div>

            {/* Model info */}
            <p className="text-xs text-gray-400 mt-1 truncate">
              {part.model}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}