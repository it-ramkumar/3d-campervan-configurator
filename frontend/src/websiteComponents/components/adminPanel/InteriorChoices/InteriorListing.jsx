"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InteriorList({ setSelected }) {
  const [interiors, setInteriors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchInteriors = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/item`, {
        params: { search: query },
      });
      setInteriors(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch interiors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInteriors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setDeleteLoading(id);
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/item/${id}`);
      setInteriors(interiors.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInteriors(search);
  };

  const clearSearch = () => {
    setSearch("");
    fetchInteriors();
  };

  const handleView = (item) => {
    // You can implement a modal or detailed view here
    alert(`Viewing: ${item.title}\nDescription: ${item.description?.join(", ") || "No description"}\nCategory: ${item.categoryId}`);
  };

  const handleEdit = (item) => {
    // You can pass the item data to the form component
    // For now, just navigate to the form
    setSelected("interior-form");
    // You might want to pass the item data to the form for editing
    console.log("Editing item:", item);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Interior Items</h2>
          <p className="text-gray-600 mt-1">Manage your interior design collection</p>
        </div>
        <button
          onClick={() => setSelected("interior-form")}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Item
        </button>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items by title, description, or category..."
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center gap-2 min-w-[120px] justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && interiors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No items found</h3>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            {search ? "No items match your search criteria. Try adjusting your search terms." : "Get started by adding your first interior item to the collection."}
          </p>
          {!search && (
            <button
              onClick={() => setSelected("interior-form")}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
            >
              Add Your First Item
            </button>
          )}
        </div>
      )}

      {/* Items Grid */}
      {!loading && interiors.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{interiors.length}</span> item{interiors.length !== 1 ? 's' : ''}
              {search && (
                <span> for "<span className="font-semibold">{search}</span>"</span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {interiors.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group"
              >
                {/* Image */}
                {item.image && (
                  <div className="relative overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deleteLoading === item._id}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white p-2 rounded-lg shadow-md transition-colors"
                        title="Delete item"
                      >
                        {deleteLoading === item._id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  {item.description && item.description.length > 0 && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description.join(", ")}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Category: {item.categoryId}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleView(item)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}