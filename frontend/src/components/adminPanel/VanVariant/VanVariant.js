"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_URL}/variants/${editVariant._id}`,
                form,
                { withCredentials: true }
            );

            console.log("Updated:", res.data);

            setEditVariant(null);
            setForm({ name: "", description: "" });

            fetchVariants();

        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // -----------------------------
    // DELETE VARIANT
    // -----------------------------
    const handleDelete = async (id) => {
        const confirm = window.confirm("Delete this variant?");
        if (!confirm) return;

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_URL}/variants/${id}`,
                { withCredentials: true }
            );

            setVariants(prev => prev.filter(v => v._id !== id));

        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="p-4 flex gap-6 relative">

            {/* LEFT - VARIANTS LIST */}
            <div className="w-2/3">

                <h2 className="text-xl font-bold mb-4">
                    Variants List
                </h2>
                <button
                    onClick={() => setSelected("VariantBuilder")}
                    className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded"
                >
                    + Add Variant
                </button>
                {loading && <p>Loading...</p>}

                <div className="grid grid-cols-2 gap-3">

                    {variants.map((v) => (
                        <div
                            key={v._id}
                            className="border p-3 rounded relative"
                        >

                            <h3 className="font-bold">{v.name}</h3>

                            <p className="text-sm text-gray-500">
                                {v.description || "No description"}
                            </p>

                            <p className="text-xs mt-1">
                                Parts: {v.parts?.length || 0}
                            </p>

                            {/* ACTIONS */}
                            <div className="absolute top-2 right-2 flex gap-2">

                                <button
                                    onClick={() => handleEditClick(v)}
                                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(v._id)}
                                    className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            </div>

            {/* RIGHT - EDIT PANEL */}
            <div className="w-1/3 border-l pl-4">

                <h2 className="text-xl font-bold mb-4">
                    {editVariant ? "Edit Variant" : "Select Variant"}
                </h2>

                {editVariant ? (
                    <>
                        <input
                            className="border p-2 w-full mb-2"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            placeholder="Variant Name"
                        />

                        <textarea
                            className="border p-2 w-full mb-2"
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
                            className="bg-black text-white w-full py-2"
                        >
                            Update Variant
                        </button>

                        <button
                            onClick={() => setEditVariant(null)}
                            className="w-full mt-2 border py-2"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500">
                        Click edit to modify a variant
                    </p>
                )}

            </div>
        </div>
    );
}