"use client";

import React, { useState } from "react";
import VansForm from "../adminPanel/Vans/VansForm";
import VanListing from "../adminPanel/Vans/VansListing";
import PortfolioForm from "../adminPanel/Portfolio/PortfolioForm";
import PortfolioListing from "../adminPanel/Portfolio/PortfolioLIsting";
import BlogForm from "../adminPanel/Blog/Form";
import BlogsListing from "../adminPanel/Blog/BlogsListing";
import ConfiguratorListing from "../adminPanel/Configurator/ConfiguratorListing";
import ConfiguratorForm from "../adminPanel/Configurator/ConfiguratorForm"
import UsersData from "../adminPanel/Users/User";
import InqueryListing from "../adminPanel/Inquery/InqueryListing";

export default function Dashboard() {
  const [selected, setSelected] = useState("portfolio-listing");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "Users",
      label: "Users",
      icon: "🚐",
      description: "Listing Users"
    },
    // {
    //   id: "vans-form",
    //   label: "Van Form",
    //   icon: "🚐",
    //   description: "Create new van listings"
    // },
    {
      id: "Vans-listing",
      label: "Van Data",
      icon: "📊",
      description: "Manage existing vans"
    },
    // {
    //   id: "portfolio-form",
    //   label: "Portfolio Form",
    //   icon: "⭐",
    //   description: "Create portfolio items"
    // },
    {
      id: "portfolio-listing",
      label: "Portfolio Data",
      icon: "📋",
      description: "Manage portfolio items"
    },
    {
      id: "Blogs-listing",
      label: "Blogs Data",
      icon: "📝",
      description: "Manage blog items"
    },
    // {
    //   id: "Blog-form",
    //   label: "Blogs Form",
    //   icon: "✏️",
    //   description: "Create blog items"
    // },
    {
      id: "Configurator-data",
      label: "Configurator Data",
      icon: "✏️",
      description: "Configurator Data"
    },
    {
      id: "Inquiry-data",
      label: "Inquiry Data",
      icon: "✏️",
      description: "Inquiry Data"
    },
    //   {
    //   id: "Configurator-form",
    //   label: "Configurator Form",
    //   icon: "✏️",
    //   description: "Configurator Form"
    // }
  ];

  const currentItem = menuItems.find(item => item.id === selected);
const renderContent = () => {
  switch (selected) {
    case "vans-form":
      return <VansForm />;
    case "Vans-listing":
      return <VanListing setSelected={setSelected} />;
    case "portfolio-form":
      return <PortfolioForm />;
    case "portfolio-listing":
      return <PortfolioListing setSelected={setSelected} />;
    case "Blog-form":
      return <BlogForm />;
    case "Blogs-listing":
      return <BlogsListing setSelected={setSelected} />;
    case "Configurator-form":
      return <ConfiguratorForm />;
    case "Configurator-data":
      return <ConfiguratorListing setSelected={setSelected} />;
    case "Inquiry-data":
      return <InqueryListing setSelected={setSelected} />;
    case "Users":
      return <UsersData />;
    default:
      return <PortfolioListing />;
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
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
            <h1 className="text-xl font-bold text-gray-900">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-600">{currentItem?.label}</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-sm border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelected(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-lg
                  transition-all duration-200
                  ${selected === item.id
                    ? 'bg-gray-100 text-gray-900 border-l-4 border-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-xl">
                  {item.icon}
                </span>
                <div className="text-left flex-1">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-gray-500">
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
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
          <div className="hidden lg:block bg-white border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{currentItem?.label}</h1>
                  <p className="text-gray-600 text-sm mt-1">{currentItem?.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">Admin User</div>
                    <div className="text-sm text-gray-500">Administrator</div>
                  </div>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 lg:p-6">
            {/* Quick Stats Bar - Simplified */}
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-semibold text-gray-900">24</div>
                <div className="text-sm text-gray-600">Total Vans</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-semibold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Portfolio Items</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-semibold text-gray-900">8</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-semibold text-gray-900">4</div>
                <div className="text-sm text-gray-600">Sold</div>
              </div>
            </div> */}

            {/* Main Content */}
            <div className="bg-white rounded-lg border border-gray-200">
              {renderContent()}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-gray-500 text-sm">
              <p>Admin Panel • {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}