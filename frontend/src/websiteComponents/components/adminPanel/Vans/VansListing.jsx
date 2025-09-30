"use client";
import React, { useEffect, useState } from "react";
import { getAllVans } from "../../../../api/van/getAllVans";
import axios from "axios";
import { setEditData } from "../../../../redux/slices/editData"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteVan } from "../../../../api/van/deleteVan";

export default function VanListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVan, setSelectedVan] = useState(null);
  useEffect(() => {
    fetchVans();
  }, []);

  const fetchVans = async () => {
    setLoading(true);
    setError("");
    const result = await getAllVans();

    if (result.success) {
      setVans(result.data);
    } else {
      setError(result.error || "Failed to fetch vans");
    }
    setLoading(false);
  };

  const handleDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this van?")) return;

    try {
      await deleteVan(slug);
      fetchVans(); // refresh list
    } catch (err) {
      console.error("Error deleting van:", err);
      alert(err.response?.data?.message || "Failed to delete van");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Vans</h2>
      {loading ? (
        <p className="text-gray-500">Loading vans...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : vans.length === 0 ? (
        <p className="text-gray-500">No vans available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vans.map((van) => (
            <div
              key={van._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {/* Thumbnail */}
              {van.gallery?.length > 0 ? (
                <img
                  src={van.gallery[0].url}
                  alt={van.van_listing.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-3">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              <h3 className="font-semibold text-lg">{van.van_listing.title}</h3>
              <p className="text-gray-600">{van.van_listing.description}</p>
              <p className="mt-1 font-medium">Price: ${van.van_listing.price}</p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setSelectedVan(van)} // 🔹 Modal open
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    dispatch(setEditData(van));
                    navigate("/van-form");
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(van.slug)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
