import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchModelAll } from '../../api/model/modelAll'
import { deleteItem } from '../../api/admin/nserMany'

export default function AllData({ onEdit, searchQuery }) {
  const dispatch = useDispatch()
  const modelAll = useSelector((state) => state.models.modelAll || {})

  const filteredModels = modelAll?.data?.data?.filter(item => {
    if (!searchQuery) return true // no search, show all
    const query = searchQuery.toLowerCase()
    return (
      item.label.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  })
  useEffect(() => {
    dispatch(fetchModelAll())
  }, [dispatch])

  const models = modelAll?.data?.data || []
  const deletePro = async (id) => {
     console.log("Deleting item:",id);
    try {
      const result = await deleteItem(id); // result = res.data
      if (result.success) {
        dispatch(fetchModelAll()); // 🔄 refresh list
        return alert(result.message);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.message || "Failed to delete");
    }
  }; return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Models</h2>

      {models.length === 0 ? (
        <p className="text-gray-500">No data found.</p>
      ) : (
        <div className="space-y-3">
          {filteredModels.map((item) => (
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
                  onClick={() => onEdit(item)} // 👈 edit pe bhejo parent ko
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePro(item._id)}
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
