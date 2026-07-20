"use client";

import React, { useEffect, useState, useMemo } from 'react'
import { Plus, Pencil, Box, Layers, Search, Filter } from 'lucide-react'
import toast from "react-hot-toast";
import AdminDataTable from "../shared/AdminDataTable";
import DetailModal from './Detail'

const CSV_COLUMNS = [
    { key: "label", label: "Label" },
    { key: "category", label: "Category" },
    { key: "description", label: "Description" },
    { key: "_id", label: "ID" },
];

// 1. Yahan props me 'setEditData' ko receive kiya hai
export default function ConfiguratorListing({ setSelected, setEditData }) {
    // Local State for data management
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search aur Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // Simple Data Fetch Function
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/models/all`, {
                method: "GET",
                credentials: "include"
            });
            const result = await res.json();

            const fetchedModels = result?.data?.data || result?.data || [];
            setModels(fetchedModels);
        } catch (err) {
            console.error("Data fetching failed:", err);
            toast.error("Failed to load models.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter Logic
    const filteredModels = useMemo(() => {
        return models.filter((item) => {
            const matchesSearch = item.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 item.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [models, searchQuery, activeCategory]);

    // Unique categories nikalne ke liye
    const categories = ["All", ...new Set(models.map(m => m.category).filter(Boolean))];

    const handleDelete = async (item) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/models/delete/${item._id}?category=${item.category}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }
        );
        const result = await res.json();
        if (!result.success) throw new Error(result.message || "Delete failed.");
        setModels((prev) => prev.filter((m) => m._id !== item._id));
    };

    const columns = [
        {
            key: "label",
            label: "Model",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                        <Box size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                        {item.label || "Untitled"}
                    </span>
                </div>
            ),
        },
        {
            key: "category",
            label: "Category",
            render: (item) => (
                <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black uppercase rounded tracking-widest">
                    {item.category || "N/A"}
                </span>
            ),
        },
        {
            key: "description",
            label: "Description",
            hideOnMobile: true,
            render: (item) => (
                <p className="text-sm text-slate-500 line-clamp-1 max-w-sm">
                    {item.description || "System database record."}
                </p>
            ),
        },
    ];

    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic flex items-center gap-2">
                        <Layers size={24} className="text-blue-600" /> Vault
                    </h2>
                    <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mt-1">
                         {filteredModels.length} Assets filtered
                    </p>
                </div>

                <button
                    onClick={() => {
                        setSelected("Configurator-form")
                        // 2. New model banate waqt agar setEditData prop pass hua hai to use clear (null) kar do
                        if (setEditData) setEditData(null);
                    }}
                    className="self-start lg:self-auto bg-slate-900 text-white px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
                >
                    <Plus size={16} /> New Model
                </button>
            </div>

            {/* Filters Area */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    <Filter size={14} className="text-slate-400 shrink-0" />
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
            </div>

            <AdminDataTable
                columns={columns}
                rows={filteredModels}
                rowKey={(item) => item._id}
                loading={loading}
                emptyMessage="No matching results."
                renderActions={(item) => (
                    <button
                        onClick={() => {
                            // 3. Redux dispatcher ki jagah prop function me pure item ka data bhej diya
                            if (setEditData) setEditData(item);
                            setSelected("Configurator-form");
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                        title="Edit"
                    >
                        <Pencil size={16} />
                    </button>
                )}
                onDelete={handleDelete}
                deleteMessage={(item) => `Delete "${item.label}"? This cannot be undone.`}
                exportColumns={CSV_COLUMNS}
                exportFilename="configurator-models"
            />

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
