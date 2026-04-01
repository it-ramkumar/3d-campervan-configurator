"use client";

import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchModelAll } from '@/api/model/modelAll';
import { setEditData,clearEditData } from '@/redux/slices/editData';
import { Plus, Pencil, Trash2, Box, Layers, Search, Filter } from 'lucide-react'
import DetailModal from './Detail'

export default function ConfiguratorListing({ setSelected }) {
    const dispatch = useDispatch()
    const modelAll = useSelector((state) => state.models.modelAll || {})
    const models = modelAll?.data?.data || []

    // Search aur Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
      const [selectedItem, setSelectedItem] = useState(null); // Add this
  const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(fetchModelAll())
    }, [dispatch])

    // Filter Logic
    const filteredModels = useMemo(() => {
        return models.filter((item) => {
            const matchesSearch = item.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 item.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [models, searchQuery, activeCategory]);

    // Unique categories nikalne ke liye (for the filter tabs)
    const categories = ["All", ...new Set(models.map(m => m.category).filter(Boolean))];

    const deletePro = async (id, label, category) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${label}"?`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/models/delete/${id}?category=${category}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const result = await res.json();
            if (result.success) {
                dispatch(fetchModelAll());
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };


  const handleView = (item) => {
    setSelectedItem(item); // Store the clicked item
    setOpenModal(true);    // Open the modal
  };

    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic flex items-center gap-2">
                        <Layers size={24} className="text-blue-600" /> Vault
                    </h2>
                    <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mt-1">
                         {filteredModels.length} Assets filtered
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Compact Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="SEARCH ASSETS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all shadow-sm shadow-slate-100"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setSelected("Configurator-form")
                            dispatch(clearEditData())
                        }}
                        className="bg-slate-900 text-white px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
                    >
                        <Plus size={16} /> New Model
                    </button>
                </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                <Filter size={14} className="text-slate-400 mr-2" />
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap border ${
                            activeCategory === cat
                            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid Content */}
            {filteredModels.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-20 text-center">
                    <Box size={32} className="mx-auto text-slate-200 mb-3" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No matching results</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredModels.map((item) => (
                        <div
                            key={item._id}
                            // onClick={() => handleView(item)}
                            className="bg-white border border-slate-200 p-6 rounded-[2.5rem] hover:shadow-2xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    <Box size={20} />
                                </div>
                                <div className="text-right">
                                    <span className="block text-[8px] font-black text-slate-300 uppercase tracking-tighter mb-1">Category</span>
                                    <span className="px-2 py-0.5 bg-slate-900 text-white text-[8px] font-black uppercase rounded tracking-widest">
                                        {item.category || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-bold text-slate-800 text-sm truncate uppercase tracking-tight">
                                    {item.label || "Untitled"}
                                </h3>
                                <p className="text-[10px] text-slate-400 font-medium line-clamp-2 mt-2 leading-relaxed">
                                    {item.description || "System database record."}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        dispatch(setEditData(item))
                                        setSelected("Configurator-form")
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-2xl transition-all text-[9px] font-black uppercase tracking-widest border border-transparent hover:border-blue-100"
                                >
                                    <Pencil size={12} /> Edit
                                </button>
                                <button
                                    onClick={() => deletePro(item._id, item.label, item.category)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-2xl transition-all text-[9px] font-black uppercase tracking-widest border border-transparent hover:border-red-100"
                                >
                                    <Trash2 size={12} /> Delete
                                </button>
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
      )}
        </div>
    )
}