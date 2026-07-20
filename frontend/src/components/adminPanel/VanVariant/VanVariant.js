"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Pencil } from "lucide-react";
import AdminDataTable from "../shared/AdminDataTable";

const VARIANT_CSV_COLUMNS = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "parts", label: "Parts Count", accessor: (v) => v.parts?.length || 0 },
];

export default function VariantList({ setSelected }) {

    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);

    const [editVariant, setEditVariant] = useState(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    // -----------------------------
    // FETCH VARIANTS
    // -----------------------------
    const fetchVariants = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_URL}/variants`,
                { withCredentials: true }
            );

            setVariants(res.data.variants || []);
        } catch (err) {
            console.error("Fetch error:", err);
            toast.error("Failed to load variants.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVariants();
    }, []);

    // -----------------------------
    // EDIT CLICK
    // -----------------------------
    const handleEditClick = (variant) => {
        setEditVariant(variant);

        setForm({
            name: variant.name,
            description: variant.description || "",
        });
    };

    // -----------------------------
    // UPDATE VARIANT
    // -----------------------------
    const handleUpdate = async () => {
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_URL}/variants/${editVariant._id}`,
                form,
                { withCredentials: true }
            );

            setEditVariant(null);
            setForm({ name: "", description: "" });

            toast.success("Variant updated.");
            fetchVariants();

        } catch (err) {
            console.error("Update error:", err);
            toast.error("Failed to update variant.");
        }
    };

    // -----------------------------
    // DELETE VARIANT
    // -----------------------------
    const handleDelete = async (variant) => {
        await axios.delete(
            `${process.env.NEXT_PUBLIC_URL}/variants/${variant._id}`,
            { withCredentials: true }
        );

        setVariants((prev) => prev.filter((v) => v._id !== variant._id));

        if (editVariant?._id === variant._id) {
            setEditVariant(null);
            setForm({ name: "", description: "" });
        }
    };

    const columns = [
        {
            key: "name",
            label: "Name",
            render: (v) => <span className="font-bold text-slate-800 text-sm">{v.name}</span>,
        },
        {
            key: "description",
            label: "Description",
            hideOnMobile: true,
            render: (v) => (
                <p className="text-sm text-slate-500 line-clamp-1 max-w-xs">
                    {v.description || "No description"}
                </p>
            ),
        },
        {
            key: "parts",
            label: "Parts",
            render: (v) => <span className="text-xs font-bold text-slate-500">{v.parts?.length || 0}</span>,
        },
    ];

    return (
        <div className="p-4 flex gap-6 relative animate-in fade-in duration-500">

            {/* LEFT - VARIANTS TABLE */}
            <div className="w-2/3 space-y-4">

                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                            Variants List
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">Manage van variants and their parts</p>
                    </div>
                    <button
                        onClick={() => setSelected("VariantBuilder")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 self-start"
                    >
                        <Plus size={18} /> Add Variant
                    </button>
                </div>

                <AdminDataTable
                    columns={columns}
                    rows={variants}
                    rowKey={(v) => v._id}
                    loading={loading}
                    emptyMessage="No variants found."
                    renderActions={(v) => (
                        <button
                            onClick={() => handleEditClick(v)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                            title="Edit"
                        >
                            <Pencil size={16} />
                        </button>
                    )}
                    onDelete={handleDelete}
                    deleteMessage={(v) => `Delete the variant "${v.name}"? This cannot be undone.`}
                    exportColumns={VARIANT_CSV_COLUMNS}
                    exportFilename="van-variants"
                />
            </div>

            {/* RIGHT - EDIT PANEL */}
            <div className="w-1/3 border-l border-slate-100 pl-6">

                <h2 className="text-lg font-black text-slate-800 tracking-tight mb-4">
                    {editVariant ? "Edit Variant" : "Select Variant"}
                </h2>

                {editVariant ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
                        <input
                            className="border border-slate-200 rounded-xl p-2.5 w-full text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            placeholder="Variant Name"
                        />

                        <textarea
                            className="border border-slate-200 rounded-xl p-2.5 w-full text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Description"
                        />

                        <button
                            onClick={handleUpdate}
                            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95"
                        >
                            Update Variant
                        </button>

                        <button
                            onClick={() => setEditVariant(null)}
                            className="w-full py-2.5 border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <p className="text-slate-400 text-sm font-medium">
                        Click edit to modify a variant
                    </p>
                )}

            </div>
        </div>
    );
}
