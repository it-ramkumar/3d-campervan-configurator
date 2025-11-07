"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "../../../../redux/slices/editData";
import { getAllVans } from "../../../../api/van/getAllVans";
import { deleteVan } from "../../../../api/van/deleteVan";
import Detail from "./Detail";
import Swal from "sweetalert2";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";

export default function VanListing({ setSelected }) {
  const dispatch = useDispatch();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 8; // per-page items

  useEffect(() => {
    fetchVans(page, search);
  }, [page]);

  // ✅ Fetch vans with pagination + search
  const fetchVans = async (currentPage = 1, query = "") => {
    setLoading(true);
    try {
      const result = await getAllVans(currentPage, limit, query);
      if (result.success && Array.isArray(result.data)) {
        setVans(result.data);
        setPages(result.pages || 1);
      } else {
        setVans([]);
        setPages(1);
      }
    } catch (err) {
      console.error("Error fetching vans:", err);
      setVans([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search function
  const handleSearch = () => {
    setPage(1); // reset to first page on new search
    fetchVans(1, search);
  };

  // ✅ Delete van
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
          fetchVans(page, search);
        } catch (err) {
          console.error("Error deleting van:", err);
          Swal.fire("Error!", err.response?.data?.message || err.message, "error");
        }
      }
    });
  };

  // ✅ Edit van
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

  // ✅ View van
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

      {/* ✅ Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
        {search && (
          <button
            onClick={() => {
              setSearch("");
              fetchVans(1, "");
            }}
            className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition"
          >
            Clear
          </button>
        )}
      </div>

      {vans.length === 0 ? (
        <p className="text-gray-500">No vans available</p>
      ) : (
        <>
          {/* ✅ Vans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vans.map((van) => (
              <div key={van._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                {/* Thumbnail */}
                {van.gallery?.length > 0 ? (
                  <ImageWithSkeleton
                    src={van.gallery[0]?.url || van.gallery[0]}
                    alt={van.van_listing?.title || "Van Image"}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-3">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                <h3 className="font-semibold text-lg">
                  {van.van_listing?.title || "Untitled Van"}
                </h3>
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

          {/* ✅ Pagination Controls */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page <strong>{page}</strong> of <strong>{pages}</strong>
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
              disabled={page === pages}
              className={`px-4 py-2 rounded ${
                page === pages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}
