import React, { useState } from 'react'
import AddData from './AddData'
import AllData from './AllData'

export default function AdminUse() {
  const [activeComponent, setActiveComponent] = useState("all")
  const [editItem, setEditItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-blue-100">Manage your application data</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row border-b border-gray-200">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeComponent === "all"
              ? "bg-white text-blue-600 border-b-2 border-blue-600"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
            onClick={() => {
              setActiveComponent("all")
              setEditItem(null)
            }}
          >
            <i className="fas fa-list mr-2"></i>
            View All Data
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeComponent === "add"
              ? "bg-white text-blue-600 border-b-2 border-blue-600"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
            onClick={() => setActiveComponent("add")}
          >
            <i className="fas fa-plus-circle mr-2"></i>
            {editItem ? "Edit Item" : "Add New Item"}
          </button>
        </div>

        {/* Search Bar */}
        {activeComponent === "all" && (
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Content Area with scroll */}
        <div className="p-6 overflow-auto flex-1">
          {activeComponent === "add" && (
            <AddData
              editItem={editItem}
              setEditItem={setEditItem}
              setActiveComponent={setActiveComponent}
            />
          )}
          {activeComponent === "all" && (
            <AllData
              searchQuery={searchQuery} // pass search query to filter data
              onEdit={(item) => {
                setEditItem(item)
                setActiveComponent("add")
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
