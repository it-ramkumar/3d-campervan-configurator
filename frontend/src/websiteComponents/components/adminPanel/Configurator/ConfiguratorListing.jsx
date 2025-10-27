"use client";

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchModelAll } from '../../../../api/model/modelAll'
import { setEditData, clearEditData } from '../../../../redux/slices/editData'

export default function ConfiguratorListing({ setSelected }) {
    const dispatch = useDispatch()
    const modelAll = useSelector((state) => state.models.modelAll || {})
    const models = modelAll?.data?.data || []

    useEffect(() => {
        dispatch(fetchModelAll())
    }, [dispatch])

    const deletePro = async (id, label, category) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${label}"?`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/models/delete/${id}?category=${category}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const result = await res.json();

            if (result.success) {
                dispatch(fetchModelAll());
                alert(result.message || "Deleted successfully");
            } else {
                alert(result.message || "Delete failed");
            }
        } catch (err) {
            console.error("Delete failed:", err);
            alert(err.message || "Failed to delete");
        }
    };

    return (
        <div className="p-6 relative">
            <h2 className="text-xl font-bold mb-4">All Models</h2>

            {/* Add Model Button */}
            <button
                onClick={() => {
                    setSelected("Configurator-form")
                    dispatch(clearEditData())
                }}
                className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
                + Add Model
            </button>

            {models.length === 0 ? (
                <p className="text-gray-500 mt-10">No data found.</p>
            ) : (
                <div className="space-y-3 mt-2">
                    {models.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
                        >
                            <div>
                                <p className="font-medium">{item.label || "Untitled"}</p>
                                <p className="text-sm text-gray-500">{item.description || "-"}</p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        dispatch(setEditData(item))
                                        setSelected("Configurator-form")
                                    }}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deletePro(item._id, item.label, item.category)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
