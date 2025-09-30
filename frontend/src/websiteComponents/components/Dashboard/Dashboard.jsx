"use client";

import React, { useState } from "react";
import VansForm from "../adminPanel/Vans/VansForm"
import VanListing from "../adminPanel/Vans/VansListing"
import PortfolioForm from "../adminPanel/Portfolio/PortfolioForm"
import PortfolioListing from "../adminPanel/Portfolio/PortfolioLIsting"

export default function Dashboard() {
  const [selected, setSelected] = useState("portfolio-listing");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "vans-form",
      label: "Van Form",
      icon: "🚐",
      description: "Create new van listings",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "Vans-listing",
      label: "Van Data",
      icon: "📊",
      description: "Manage existing vans",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "portfolio-form",
      label: "Portfolio Form",
      icon: "⭐",
      description: "Create portfolio items",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "portfolio-listing",
      label: "Portfolio Data",
      icon: "📋",
      description: "Manage portfolio items",
      color: "from-orange-500 to-red-500"
    }
  ];

  const currentItem = menuItems.find(item => item.id === selected);

  const renderContent = () => {
    switch (selected) {
      case "vans-form":
        return <VansForm />;
      case "Vans-listing":
        return <VanListing />;
      case "portfolio-form":
        return <PortfolioForm />;
      case "portfolio-listing":
        return <PortfolioListing />;
      default:
        return <PortfolioListing />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-600">{currentItem?.label}</p>
          </div>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-80 bg-white shadow-xl border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Management Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelected(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-4 p-4 rounded-2xl
                  transition-all duration-200 group
                  ${selected === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                    : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
                  }
                `}
              >
                <span className="text-2xl transition-transform group-hover:scale-110">
                  {item.icon}
                </span>
                <div className="text-left flex-1">
                  <div className="font-semibold">{item.label}</div>
                  <div className={`text-sm ${selected === item.id ? 'text-white/90' : 'text-gray-500'}`}>
                    {item.description}
                  </div>
                </div>
                {selected === item.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 text-center">
              <p className="text-sm font-medium text-gray-700">Admin Dashboard</p>
              <p className="text-xs text-gray-500 mt-1">v2.0.0</p>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 min-h-screen">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{currentItem?.label}</h1>
                  <p className="text-gray-600 mt-1">{currentItem?.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">Admin User</div>
                    <div className="text-sm text-gray-500">Administrator</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 lg:p-6">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 text-white">
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm opacity-90">Total Vans</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-90">Portfolio Items</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm opacity-90">Available</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm opacity-90">Sold</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-200/50">
              {renderContent()}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-gray-500 text-sm">
              <p>Admin Panel • {new Date().getFullYear()} • All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}