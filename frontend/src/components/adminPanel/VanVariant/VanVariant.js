"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { Plus, Pencil } from "lucide-react";
import AdminDataTable from "../shared/AdminDataTable";

const VARIANT_CSV_COLUMNS = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "parts", label: "Parts Count", accessor: (v) => v.parts?.length || 0 },
];

export default function VariantList({ setSelected }) {
    const dispatch = useDispatch();

    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);

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
    // EDIT CLICK - hand the variant off to the builder,
    // which is the only place van + parts can be set.
    // -----------------------------
    const handleEditClick = (variant) => {
        dispatch(setEditData(variant));
        setSelected("VariantBuilder");
    };

    // -----------------------------
    // ADD CLICK
    // -----------------------------
    const handleAddClick = () => {
        dispatch(clearEditData());
        setSelected("VariantBuilder");
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
        <div className="p-4 space-y-4 animate-in fade-in duration-500">

            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                        Variants List
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">Manage van variants and their parts</p>
                </div>
                <button
                    onClick={handleAddClick}
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
    );
}
