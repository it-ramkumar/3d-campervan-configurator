import React, { useState, useEffect } from "react";
import AddData from "./AddData";
import AllData from "./AllData";
import UsersData from "./UserData";
import Analytics from "./Analytic";
import { getUser } from "../../api/user/getUser";

export default function AdminUse() {
  const [activeComponent, setActiveComponent] = useState("analytics");
  const [editItem, setEditItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Fetch users
  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await getUser();
        setUsers(data.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetching();
  }, []);

  // ✅ Status counts
  const contacted = users.filter((u) => u.status === "Contacted").length;
  const inProgress = users.filter((u) => u.status === "In Progress").length;
  const closedWon = users.filter((u) => u.status === "Closed Won").length;

  // ✅ Conversion rate (Closed Won / Contacted * 100)
  const conversionRate =
    contacted > 0 ? ((closedWon / contacted) * 100).toFixed(1) : 0;

  // Navigation items
  const navigationItems = [
    { key: "analytics", label: "Analytics", icon: "📊" },
    { key: "all", label: "Products", icon: "📦" },
    { key: "add", label: "Add Product", icon: "➕" },
    { key: "users", label: "Users", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center md:hidden">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 hover:text-gray-700 mr-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">CRM Dashboard</h1>
        </div>

        <div className="relative w-40">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-gray-900 text-white flex-shrink-0 md:min-h-screen z-10`}>
        <div className="p-5 border-b border-gray-800">
          <h1 className="text-xl font-bold">CRM Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Customer Relationship Management
          </p>
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <h3 className="text-xs uppercase text-gray-500 tracking-wider mb-3">
              Main Navigation
            </h3>
            <ul className="space-y-2">
              {navigationItems.map((tab) => (
                <li key={tab.key}>
                  <button
                    className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                      activeComponent === tab.key
                        ? "bg-indigo-700 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveComponent(tab.key);
                      setEditItem(null);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className="text-lg mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800 mt-auto ">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
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
      <div className="flex-1 h-screen overflow-y-scroll color-scroll">
        {/* Top Bar for Desktop */}
        <div className="bg-white border-b border-gray-200 p-4 hidden md:flex justify-between items-center">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search users, products..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          {/* <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              <span className="text-xl">🔔</span>
            </button>
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
              <span className="text-xl">⚙️</span>
            </button>
          </div> */}
        </div>

        {/* Quick Analytics (Only when not on Analytics tab) */}
        {activeComponent !== "analytics" && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contacted</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{contacted}</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <span className="text-blue-600 text-xl">💬</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">In Progress</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{inProgress}</p>
                  </div>
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <span className="text-amber-600 text-xl">🔄</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Closed Won</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{closedWon}</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <span className="text-green-600 text-xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">{conversionRate}%</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <span className="text-indigo-600 text-xl">📈</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-4 md:p-6">
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
                setEditItem(item);
                setActiveComponent("add");
              }}
            />
          )}
          {activeComponent === "users" && (
            <UsersData
              searchQuery={searchQuery}
              users={users}
              setUsers={setUsers}
            />
          )}
          {activeComponent === "analytics" && <Analytics users={users} />}
        </div>
      </div>
    </div>
  );
}