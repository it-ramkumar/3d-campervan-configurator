"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DetailModal from "./Detail";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setEditData,clearEditData } from "@/redux/slices/editData";
import Image from "next/image";

export default function ExteriorList({ setSelected }) {
  const [interiors, setInteriors] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Add this
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInteriors = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/exterior`,
        { params: { search: query } }
      );
      setInteriors(res.data.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch items", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInteriors();
  }, []);


  const handleSearch = () => {
    fetchInteriors(searchTerm);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Item?",
      text: "This will remove the item from your choices.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
      customClass: { popup: 'rounded-[2rem]' }
    });

    if (!result.isConfirmed) return;

    try {
      setDeleteLoading(id);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/exterior/${id}`
      );
      setInteriors(interiors.filter((item) => item._id !== id));
      Swal.fire("Deleted", "Item removed successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to delete item", "error");
    } finally {
      setDeleteLoading(null);
    }
  };
  const handleView = (item) => {
    setSelectedItem(item); // Store the clicked item
    setOpenModal(true);    // Open the modal
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-slate-400 font-medium italic">
      <div className="animate-pulse">Loading choices...</div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* --- Header Section (Matching BlogsListing) --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Exterior Choices</h2>
          <p className="text-sm text-slate-500">Manage customizable exterior components</p>
        </div>

        <button
          onClick={() => {
            setSelected("exterior-form")
            dispatch(clearEditData());
          }
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span> Add New Choice
        </button>
      </div>

      {/* --- Search Bar (Matching BlogsListing) --- */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search choices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          Search
        </button>
      </div>

      {/* --- Grid --- */}
      {interiors.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400 font-medium">
          No items found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {interiors.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-44 overflow-hidden bg-slate-50">
                <Image
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  width={400}
                  height={300}
                />

                {/* Quick Delete Overlay */}
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deleteLoading === item._id}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-md text-red-500 p-2.5 rounded-xl shadow-sm hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  {deleteLoading === item._id ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-md">
                      {item.subCategoryId?.categoryId?.title || "General"}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base line-clamp-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium italic">
                    {item.subCategoryId?.title || "No Subcategory"}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleView(item)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-[11px] hover:bg-slate-100 transition-all active:scale-95"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelected("exterior-form")
                      dispatch(setEditData(item))
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-[11px] hover:bg-blue-100 transition-all active:scale-95"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {openModal && (
        <DetailModal
          item={selectedItem}
          onClose={() => {
            setOpenModal(false);
            setSelectedItem(null);
          }}
        />
      )}    </div>
  );
}