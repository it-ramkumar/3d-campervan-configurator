"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "../../../../redux/slices/editData";
import { getAllPortfolio } from "../../../../api/portfolio/getAllPortfolio";
import { deletePortfolio } from "../../../../api/portfolio/deletePortfolio";
import Detail from "./Detail";
import Swal from "sweetalert2";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";

export default function PortfolioListing({ setSelected }) {
  const dispatch = useDispatch();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData(page, search);
  }, [page]);

  const fetchData = async (pageNum = 1, searchQuery = "") => {
    setLoading(true);
    try {
      const res = await getAllPortfolio(pageNum, 9, searchQuery);
      if (res.success && Array.isArray(res.data?.data)) {
        setPortfolios(res.data.data);
        setPages(res.data.pages);
      } else {
        setPortfolios([]);
        setPages(1);
      }
    } catch (err) {
      console.error("Error fetching portfolios:", err);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchData(1, search);
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
          fetchData(page, search);
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

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {portfolios.length === 0 ? (
        <p className="text-gray-500">No portfolios found.</p>
      ) : (
        <>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {portfolios.map((portfolio) => (
    <div
      key={portfolio._id}
      className="border rounded-xl shadow-md p-5 bg-white flex flex-col h-full"
    >
      {/* Gallery */}
      {portfolio.gallery?.[0] ? (
        <ImageWithSkeleton
          src={
            typeof portfolio.gallery[0] === "string"
              ? portfolio.gallery[0]
              : portfolio.gallery[0]?.url
          }
          alt={portfolio.van_listing?.title || "Portfolio Image"}
          className="w-full h-48 object-cover rounded"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-3 rounded">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between mt-3">
        <div>
          <h2 className="text-xl font-semibold mb-1 line-clamp-2">
            {portfolio.van_listing?.title || "Untitled"}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3 mb-2">
            {portfolio.van_listing?.subtitle || "-"}
          </p>
          {portfolio.formatted_price && (
            <p className="font-bold text-green-600 mb-3">
              {portfolio.formatted_price}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => handleView(portfolio)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-1 text-center"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(portfolio)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex-1 text-center"
          >
            Edit
          </button>
          {portfolio.slug && (
            <button
              onClick={() => handleDelete(portfolio.slug)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex-1 text-center"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  ))}
</div>


          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded ${
                page <= 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Prev
            </button>
            <span className="font-medium text-gray-700">
              Page {page} of {pages}
            </span>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded ${
                page >= pages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}
