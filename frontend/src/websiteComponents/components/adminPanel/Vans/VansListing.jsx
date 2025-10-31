"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "../../../../redux/slices/editData";
import { getAllVans } from "../../../../api/van/getAllVans";
import { deleteVan } from "../../../../api/van/deleteVan";
import Detail from "./Detail";
import Swal from "sweetalert2";

export default function VanListing({ setSelected }) {
  const dispatch = useDispatch();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    fetchVans();
  }, []);

  const fetchVans = async () => {
    setLoading(true);
    try {
      const result = await getAllVans();
      if (result.success && Array.isArray(result.data)) {
        setVans(result.data);
      } else {
        setVans([]); // fallback to empty array if no data
      }
    } catch (err) {
      console.error("Error fetching vans:", err);
      setVans([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  // Delete van
  const handleDelete = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteVan(slug);
          Swal.fire("Deleted!", "The van has been deleted.", "success");
          fetchVans();
        } catch (err) {
          console.error("Error deleting van:", err);
          Swal.fire("Error!", err.response?.data?.message || err.message, "error");
        }
      }
    });
  };

  // Edit van
  const handleEdit = (van) => {
    Swal.fire({
      title: "Preparing Editor...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    dispatch(setEditData(van));
    setSelected("vans-form");

    setTimeout(() => Swal.close(), 500);
  };

  // View van
  const handleView = (van) => {
    setDetail(van);
    setIsopen(true);
  };

  if (loading) return <p className="text-gray-500 p-4">Loading vans...</p>;

  return (
    <div className="p-4 relative">
      {/* Add Button */}
      <button
        onClick={() => {
          setSelected("vans-form");
          dispatch(clearEditData());
        }}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        + Add Van
      </button>

      <h2 className="text-2xl font-bold mb-4">All Vans</h2>

      {vans.length === 0 ? (
        <p className="text-gray-500">No vans available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vans.map((van) => (
            <div key={van._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              {/* Thumbnail */}
              {van.gallery?.length > 0 ? (
                <img  loading="lazy"
                  src={van.gallery[0]?.url || van.gallery[0]} // fallback to string if no url
                  alt={van.van_listing?.title || "Van Image"}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-3">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              <h3 className="font-semibold text-lg">{van.van_listing?.title || "Untitled Van"}</h3>
              <p className="text-gray-600">{van.van_listing?.description || "-"}</p>
              <p className="mt-1 font-medium">
                Price: ${van.van_listing?.price || "N/A"}
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleView(van)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(van)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                {van.slug && (
                  <button
                    onClick={() => handleDelete(van.slug)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}
