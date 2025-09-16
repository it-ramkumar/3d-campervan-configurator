import React, { useState,useEffect } from 'react'
import AddData from './AddData'
import AllData from './AllData'
import UsersData from "./UserData"
import Analytics from "./Analytic"
import { getUser } from '../../api/user/getUser'


export default function AdminUse() {
  const [activeComponent, setActiveComponent] = useState("analytics")
  const [editItem, setEditItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [Users, setUsers] = useState("")

useEffect(()=>{
const fetching =async ()=>{
const data =await getUser()
setUsers(data.data)
}
fetching()
},[])
console.log(Users,"users")
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-5 border-b border-gray-800">
          <h1 className="text-xl font-bold">CRM Dashboard</h1>
          <p className="text-gray-400 text-sm">Customer Relationship Management</p>
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <h3 className="text-xs uppercase text-gray-500 tracking-wider mb-3">Main</h3>
            <ul className="space-y-2">
              {[
                { key: "analytics", label: "Analytics", icon: "fas fa-chart-pie" },
                { key: "all", label: "Products", icon: "fas fa-box" },
                { key: "add", label: "Add Product", icon: "fas fa-plus-circle" },
                { key: "users", label: "Users", icon: "fas fa-users" },
              ].map((tab) => (
                <li key={tab.key}>
                  <button
                    className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                      activeComponent === tab.key
                        ? "bg-blue-700 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveComponent(tab.key)
                      setEditItem(null)
                    }}
                  >
                    <i className={`${tab.icon} mr-3 w-5 text-center`}></i>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase text-gray-500 tracking-wider mb-3">Reports</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:bg-gray-800 hover:text-white py-2 px-3 rounded-md block">
                  <i className="fas fa-file-export mr-3 w-5 text-center"></i>
                  Sales Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:bg-gray-800 hover:text-white py-2 px-3 rounded-md block">
                  <i className="fas fa-user-check mr-3 w-5 text-center"></i>
                  Customer Insights
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative text-gray-500 hover:text-gray-700">
              <i className="fas fa-bell"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>

        {/* Analytics Overview */}
        {activeComponent !== "analytics" && (
          <div className="p-6 bg-gray-100 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Quick Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold">$24,563</p>
                  </div>
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                </div>
                <p className="text-green-600 text-sm mt-2">
                  <i className="fas fa-arrow-up"></i> 12% from last month
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Customers</p>
                    <p className="text-2xl font-bold">1,284</p>
                  </div>
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
                <p className="text-green-600 text-sm mt-2">
                  <i className="fas fa-arrow-up"></i> 8% from last month
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Orders</p>
                    <p className="text-2xl font-bold">562</p>
                  </div>
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                </div>
                <p className="text-red-600 text-sm mt-2">
                  <i className="fas fa-arrow-down"></i> 3% from last month
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Conversion Rate</p>
                    <p className="text-2xl font-bold">24.8%</p>
                  </div>
                  <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
                <p className="text-green-600 text-sm mt-2">
                  <i className="fas fa-arrow-up"></i> 5% from last month
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6">
          {activeComponent === "add" && (
            <AddData
              editItem={editItem}
              setEditItem={setEditItem}
              setActiveComponent={setActiveComponent}
            />
          )}
          {activeComponent === "all" && (
            <AllData
              searchQuery={searchQuery}
              onEdit={(item) => {
                setEditItem(item)
                setActiveComponent("add")
              }}
            />
          )}
          {activeComponent === "users" && (
            <UsersData searchQuery={searchQuery} users={Users}/>
          )}
          {activeComponent === "analytics" && (
            <Analytics />
          )}
        </div>
      </div>
    </div>
  )
}