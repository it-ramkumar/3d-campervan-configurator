import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchModelAll } from '../../../../api/model/modelAll'
import { setEditData } from '../../../../redux/slices/editData'

export default function ConfiguratorListing({ setSelected }) {
    const dispatch = useDispatch()
    const modelAll = useSelector((state) => state.models.modelAll || {})

    useEffect(() => {
        dispatch(fetchModelAll())
    }, [dispatch])

    const models = modelAll?.data?.data || []

    const deletePro = async (id, label, category) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${label}"?`);
        if (!confirmDelete) return;
try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/models/delete/${id}?category=${category}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // ✅ send cookies (JWT)
    });

    const result = await res.json();

    if (result.success) {
        dispatch(fetchModelAll()); // refresh list
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
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">All Models</h2>

            {models.length === 0 ? (
                <p className="text-gray-500">No data found.</p>
            ) : (
                <div className="space-y-3">
                    {models.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
                        >
                            <div>
                                <p className="font-medium">{item.label}</p>
                                <p className="text-sm text-gray-500">{item.description}</p>
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
