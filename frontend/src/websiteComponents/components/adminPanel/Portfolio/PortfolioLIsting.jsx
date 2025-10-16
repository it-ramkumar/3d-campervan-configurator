"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEditData } from "../../../../redux/slices/editData"
import { useNavigate } from "react-router-dom";
import { getAllPortfolio } from "../../../../api/portfolio/getAllPortfolio";
import { deletePortfolio } from "../../../../api/portfolio/deletePortfolio";
import Detail from "./Detail";
export default function PortfolioListing({setSelected}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail,setDetail] =useState()
    const [isOpen,setIsopen] =useState(false)

  // Fetch all portfolios
  useEffect(() => {
    fetchData();
  }, []);
   const fetchData = async () => {
      try {
        const res = await getAllPortfolio();
        // console.log(res.data,"res")
        setPortfolios(res.data.data || []);
      } catch (err) {
        console.error("❌ Error fetching portfolios:", err);
      } finally {
        setLoading(false);
      }
    };
  // Delete portfolio
  const handleDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this portfolio?")) return;
    try {
      await deletePortfolio(slug);
      fetchData(); // Refresh the list after deletion
    } catch (err) {
      console.error("❌ Error deleting portfolio:", err);
      alert("Failed to delete portfolio ❌");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading portfolios...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio Vans</h1>

      {portfolios.length === 0 ? (
        <p>No portfolios found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolios?.map((portfolio) => (
            <div
              key={portfolio._id}
              className="border rounded-xl shadow-md p-4 bg-white"
            >
              {/* Gallery */}
              {portfolio.gallery?.[0] && (
                <img
                  src={portfolio.gallery[0]}
                  alt={portfolio.van_listing?.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}

              {/* Title */}
              <h2 className="text-xl font-semibold mb-1">
                {portfolio.van_listing?.title}
              </h2>
              <p className="text-gray-600 mb-2">
                {portfolio.van_listing?.subtitle}
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
                    onClick={()=>{setDetail(portfolio)
               setIsopen(true)}}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  View
                </button>
                <button
                  onClick={() => {dispatch(setEditData(portfolio))
                     setSelected("portfolio-form");
                  }}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Edit
                </button>
                <button
                  onClick={() =>{
                    handleDelete(portfolio.slug)

                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
            {isOpen && <Detail setIsopen={setIsopen} detail={detail}/>}

    </div>
  );
}
