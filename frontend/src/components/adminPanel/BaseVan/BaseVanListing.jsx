import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Trash2, Box, Info, Loader2 } from "lucide-react";
import Detail from './Detail';
import Image from "next/image";


const BaseVanListing = ({setSelected}) => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [selectedVan, setSelectedVan] = useState(null); // Modal ke liye state// Delete loading state ke liye

  const API_URL = process.env.NEXT_PUBLIC_URL;

  // 1. Data Fetching
  const fetchVans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/add-base-van`);
      if (res.data.success) {
        setVans(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching vans:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will delete the 3D model and image from S3 permanently.")) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await axios.delete(`${API_URL}/add-base-van/${id}`);

      if (res.data.success) {
        // UI se remove karein
        setVans((prevVans) => prevVans.filter((van) => van._id !== id));
        alert("Van and associated files deleted successfully!");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete van. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchVans();
  }, []);

  const filteredVans = vans.filter((van) =>
    van.layout.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Base Vans Inventory</h1>
          <p className="text-gray-500 text-sm">Manage your 3D models and van specifications</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
          <input
            type="text"
            placeholder="Search layout..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
        onClick={()=>setSelected("BaseVan")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-100 font-medium whitespace-nowrap"
          >
            {/* <Plus size={18} /> */}
            Add More
          </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-gray-400">Loading inventory...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVans?.map((van) => (
            <div key={van._id}
            onClick={() => setSelectedVan(van)} // Pura card click-able ban gaya
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-100 relative group">
                <Image src={van?.imgUrl} alt={van?.layout} className="w-full h-full object-cover" width={400} height={300} />
                <div className="absolute top-2 right-2 flex gap-2">
                   <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md">
                      {van?.spec?.drivetrain}
                   </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 line-clamp-1">{van?.layout}</h3>
                  <span className="text-blue-600 font-semibold text-sm">${van?.price?.toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] text-gray-500 font-medium">
                  <div className="flex items-center gap-1"><Box size={14} /> {van?.spec?.wheelBase}" WB</div>
                  <div className="flex items-center gap-1"><Info size={14} /> {van?.spec?.sitSleep} Seats</div>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 mb-4 min-h-[32px]">{van?.shortDescription}</p>

                <div className="flex gap-2 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => window.open(van.glbFileUrl, '_blank')}
                    className="flex-1 bg-gray-900 text-white text-xs py-2 rounded-md hover:bg-black transition-colors font-medium"
                  >
                    View 3D Model
                  </button>

                  {/* Delete Button with Loading State */}
                  <button
                    onClick={() => handleDelete(van._id)}
                    disabled={deletingId === van._id}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-red-100 disabled:opacity-50"
                  >
                    {deletingId === van._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredVans?.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400">No vans found matching your search.</p>
            </div>
          )}
        </div>
      )}
      {/* 3. Modal ko end mein render karein */}
      {selectedVan && (
        <Detail
          van={selectedVan}
          onClose={() => setSelectedVan(null)}
        />
      )}
    </div>
  );
};

export default BaseVanListing;