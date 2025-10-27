"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "../../../../redux/slices/editData";
import { getAllPortfolio } from "../../../../api/portfolio/getAllPortfolio";
import { deletePortfolio } from "../../../../api/portfolio/deletePortfolio";
import Detail from "./Detail";
import Swal from "sweetalert2";

export default function PortfolioListing({ setSelected }) {
  const dispatch = useDispatch();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllPortfolio();
      if (res.success && Array.isArray(res.data?.data)) {
        setPortfolios(res.data.data);
      } else {
        setPortfolios([]); // fallback if no data
      }
    } catch (err) {
      console.error("Error fetching portfolios:", err);
      setPortfolios([]); // fallback
    } finally {
      setLoading(false);
    }
  };

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
          await deletePortfolio(slug);
          Swal.fire("Deleted!", "The portfolio has been deleted.", "success");
          fetchData(); // refresh list
        } catch (err) {
          console.error("Error deleting portfolio:", err);
          Swal.fire("Error!", err.response?.data?.message || err.message, "error");
        }
      }
    });
  };

  const handleEdit = (portfolio) => {
    Swal.fire({
      title: "Preparing Editor...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    dispatch(setEditData(portfolio));
    setSelected("portfolio-form");

    setTimeout(() => Swal.close(), 500);
  };

  const handleView = (portfolio) => {
    setDetail(portfolio);
    setIsopen(true);
  };

  if (loading) return <p className="p-6 text-gray-600">Loading portfolios...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      {/* Add Button */}
      <button
        onClick={() => {
          setSelected("portfolio-form");
          dispatch(clearEditData());
        }}
        className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        + Add Portfolio
      </button>

      <h1 className="text-3xl font-bold mb-6">Portfolio Vans</h1>

      {portfolios.length === 0 ? (
        <p className="text-gray-500">No portfolios found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio._id}
              className="border rounded-xl shadow-md p-4 bg-white"
            >
              {/* Gallery */}
              {portfolio.gallery?.[0] ? (
                <img
                  src={typeof portfolio.gallery[0] === "string" ? portfolio.gallery[0] : portfolio.gallery[0]?.url}
                  alt={portfolio.van_listing?.title || "Portfolio Image"}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-3">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              {/* Title & Subtitle */}
              <h2 className="text-xl font-semibold mb-1">
                {portfolio.van_listing?.title || "Untitled"}
              </h2>
              <p className="text-gray-600 mb-2">
                {portfolio.van_listing?.subtitle || "-"}
              </p>

              {/* Price */}
              {portfolio.formatted_price && (
                <p className="font-bold text-green-600 mb-3">
                  {portfolio.formatted_price}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleView(portfolio)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(portfolio)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Edit
                </button>
                {portfolio.slug && (
                  <button
                    onClick={() => handleDelete(portfolio.slug)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}
