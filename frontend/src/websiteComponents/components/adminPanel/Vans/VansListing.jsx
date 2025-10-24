"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData } from "../../../../redux/slices/editData";
import { getAllVans } from "../../../../api/van/getAllVans";
import { deleteVan } from "../../../../api/van/deleteVan";
import Detail from "./Detail";
import Swal from "sweetalert2";

export default function VanListing({ setSelected }) {
  const dispatch = useDispatch();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState();
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    fetchVans();
  }, []);

  const fetchVans = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getAllVans();
      if (result.success) {
        setVans(result.data);
      } else {
        setError(result.error || "Failed to fetch vans");
      }
    } catch (err) {
      console.error("Error fetching vans:", err);
      Swal.fire("Error!", err.response?.data?.message || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete van with SweetAlert
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
          fetchVans(); // refresh list
        } catch (err) {
          console.error("Error deleting van:", err);
          Swal.fire("Error!", err.response?.data?.message || err.message, "error");
        }
      }
    });
  };

  // Edit van with loader SweetAlert
  const handleEdit = (van) => {
    Swal.fire({
      title: "Preparing Editor...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    dispatch(setEditData(van));
    setSelected("vans-form");

    setTimeout(() => {
      Swal.close();
    }, 500);
  };

  // View van in modal
  const handleView = (van) => {
    setDetail(van);
    setIsopen(true);
  };

  if (loading) return <p className="text-gray-500 p-4">Loading vans...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (vans.length === 0) return <p className="text-gray-500 p-4">No vans available</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Vans</h2>
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
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}
