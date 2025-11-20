"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ExteriorList({ setSelected }) {
  const [interiors, setInteriors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
console.log(interiors,"data")
  const fetchInteriors = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/exterior`,
        { params: { search: query } }
      );
      setInteriors(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch interiors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInteriors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setDeleteLoading(id);
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/exterior/${id}`
      );
      setInteriors(interiors.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleView = (item) => {
    alert(`
Title: ${item.title}
Category: ${item.subCategoryId?.categoryId?.title || "N/A"}
SubCategory: ${item.subCategoryId?.title || "N/A"}
Description: ${item.description?.join(", ") || "N/A"}
Images: ${item.images?.length}
    `);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Interior Items</h2>

        <button
          onClick={() => setSelected("exterior-form")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg"
        >
          Add New Item
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Items Grid */}
      {!loading && interiors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {interiors.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow border overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Delete */}
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deleteLoading === item._id}
                  className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-lg shadow"
                >
                  {deleteLoading === item._id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "X"
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>

                {/* Category + SubCategory */}
                <p className="text-sm text-gray-600 mt-1">
                  Category:{" "}
                  <span className="font-medium">
                    {item.subCategoryId?.categoryId?.title}
                  </span>
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  SubCategory:{" "}
                  <span className="font-medium">
                    {item.subCategoryId?.title}
                  </span>
                </p>

                {/* Description */}
                {item.description?.length > 0 && (
                  <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                    {item.description.join(", ")}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleView(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSelected("interior-form");
                      console.log("edit ->", item);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && interiors.length === 0 && (
        <div className="text-center py-20 text-gray-600">
          No items found. Add your first item!
        </div>
      )}
    </div>
  );
}
