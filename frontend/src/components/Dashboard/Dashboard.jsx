"use client";
import React, { useCallback, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// Keep your imports here...
import VansForm from "../adminPanel/Vans/VansForm";
import VanListing from "../adminPanel/Vans/VansListing";
import PortfolioForm from "../adminPanel/Portfolio/PortfolioForm";
import PortfolioListing from "../adminPanel/Portfolio/PortfolioLIsting";
import BlogForm from "../adminPanel/Blog/Form";
import BlogsListing from "../adminPanel/Blog/BlogsListing";
import ConfiguratorListing from "../adminPanel/Configurator/ConfiguratorListing";
import ConfiguratorForm from "../adminPanel/Configurator/ConfiguratorForm";
import UsersData from "../adminPanel/Users/User";
import InqueryListing from "../adminPanel/Inquery/InqueryListing";
import ContactListing from "../adminPanel/Contact/ContactListing";
import MatchmakerListing from "../adminPanel/Matchmaker/MatchmakerListing";
import InteriorForm from "../adminPanel/InteriorChoices/InteriorForm";
import InteriorList from "../adminPanel/InteriorChoices/InteriorListing";
import ExteriorList from "../adminPanel/ExteriorChoice/ExteriorListing";
import ExteriorForm from "../adminPanel/ExteriorChoice/ExteriorForm";
import SystemForm from "../adminPanel/SystemChoice/SystemForm";
import SystemListt from "../adminPanel/SystemChoice/SystemListing";
import LeadEmail from "../adminPanel/LeadEmail/LeadEmail";
import JobForm from "../adminPanel/Job/Form";
import JobListing from "../adminPanel/Job/JobListing";
import Applications from "../adminPanel/Applications/Applications";
import QuickLinks from "../adminPanel/Linktree/QuickLinks";
import AddQuickLink from "../adminPanel/Linktree/AddQuickLink";
import BaseVanForm from "../adminPanel/BaseVan/BaseVanForm";
import BaseVanListing from "../adminPanel/BaseVan/BaseVanListing";
import VanPartsManager from "../adminPanel/VanParts/PartsManager";
import VanParts from "../adminPanel/VanParts/VanParts";
import VariantList from "../adminPanel/VanVariant/VanVariant";
import VariantBuilder from "../adminPanel/VanVariant/VanVariantForm";
const DEFAULT_SECTION = "portfolio-listing";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(true); // Control sidebar width (desktop hover rail)
  const [mobileOpen, setMobileOpen] = useState(false); // Off-canvas drawer (mobile)
  const navigate = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = searchParams.get("section") || DEFAULT_SECTION;

  const setSelected = useCallback(
    (id) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("section", id);
      params.delete("page"); // reset pagination whenever the section changes
      navigate.push(`${pathname}?${params.toString()}`, { scroll: false });
      setMobileOpen(false);
    },
    [navigate, pathname, searchParams]
  );

  const menuItems = [
    {
      id: "Vans-listing",
      label: "Vans Inventory",
      desc: "View and manage all vans and availability.",
      icon: "🚐"
    },
    {
      id: "portfolio-listing",
      label: "Portfolio Inventory",
      desc: "Manage completed and ongoing projects.",
      icon: "🖼️"
    },
    {
      id: "Blogs-listing",
      label: "Blogs",
      desc: "Create, edit, and manage blog posts.",
      icon: "✍️"
    },
    {
      id: "exterior-choices",
      label: "Exterior Options",
      desc: "Manage exterior materials and styles.",
      icon: "🎨"
    },
    {
      id: "interior-choices",
      label: "Interior Options",
      desc: "Manage interior designs and materials.",
      icon: "🛋️"
    },
    {
      id: "system-choices",
      label: "System Options",
      desc: "Manage system designs and materials.",
      icon: "⚙️"
    },
    {
      id: "Inquiry-data",
      label: "Client Inquiries",
      desc: "View messages and customer inquiries.",
      icon: "📬"
    },
    {
      id: "Contact-data",
      label: "Client Contact",
      desc: "Manage contact form submissions.",
      icon: "📞"
    },
    {
      id: "Matchmaker-data",
      label: "Matchmaker Leads",
      desc: "View quiz submissions and matched builds.",
      icon: "🧭"
    },
    {
      id: "career",
      label: "Jobs Post",
      desc: "Create and manage job listings.",
      icon: "💼"
    },
    {
      id: "applications",
      label: "Candidate Applications",
      desc: "Review job applications and resumes.",
      icon: "📄"
    },
    {
      id: "quickLink",
      label: "Quick Links",
      desc: "Manage quick access website links.",
      icon: "🔗"
    },
    {
      id: "lead-emails",
      label: "Receive Leads",
      desc: "Set up and manage admin emails to receive leads.",
      icon: "📧"
    },
    {
      id: "Configurator-data",
      label: "3D Config",
      desc: "Manage 3D configurator options.",
      icon: "⚙️"
    },
    {
      id: "BaseVanListing",
      label: "Base Vans",
      desc: "Manage base van configurations.",
      icon: "🚐"
    },
    {
      id: "Users",
      label: "Config Clients",
      desc: "Manage system users and access.",
      icon: "👥"
    },
    {
      id: "VanPartsManager",
      label: "Van Parts",
      desc: "Manage 3D models and images for van parts.",
      icon: "🔧"
    },
    {
      id: "VariantList",
      label: "Variants",
      desc: "Manage van variants.",
      icon: "🏷️"
    },


  ];

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/logout`, { method: "POST", credentials: "include" });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      navigate("/login")
      console.error("Error:", error);
    }

  };

  const renderContent = () => {
    switch (selected) {
      case "vans-form": return <VansForm setSelected={setSelected} />;
      case "Vans-listing": return <VanListing setSelected={setSelected} />;
      case "portfolio-form": return <PortfolioForm setSelected={setSelected} />;
      case "portfolio-listing": return <PortfolioListing setSelected={setSelected} />;
      case "Blog-form": return <BlogForm setSelected={setSelected} />;
      case "Blogs-listing": return <BlogsListing setSelected={setSelected} />;
      case "Configurator-form": return <ConfiguratorForm setSelected={setSelected} />;
      case "Configurator-data": return <ConfiguratorListing setSelected={setSelected} />;
      case "Inquiry-data": return <InqueryListing setSelected={setSelected} />;
      case "Contact-data": return <ContactListing setSelected={setSelected} />;
      case "Matchmaker-data": return <MatchmakerListing setSelected={setSelected} />;
      case "Users": return <UsersData setSelected={setSelected} />;
      case "interior-choices": return <InteriorList setSelected={setSelected} />;
      case "interior-form": return <InteriorForm setSelected={setSelected} />;
      case "exterior-choices": return <ExteriorList setSelected={setSelected} />;
      case "exterior-form": return <ExteriorForm setSelected={setSelected} />;
      case "system-choices": return <SystemListt setSelected={setSelected} />;
      case "system-form": return <SystemForm setSelected={setSelected} />;
      case "lead-emails": return <LeadEmail setSelected={setSelected} />;
      case "career": return <JobListing setSelected={setSelected} />;
      case "career-form": return <JobForm setSelected={setSelected} />;
      case "applications": return <Applications setSelected={setSelected} />;
      case "quickLink": return <QuickLinks setSelected={setSelected} />;
      case "addQuickLink": return <AddQuickLink setSelected={setSelected} />;
      case "BaseVan": return <BaseVanForm setSelected={setSelected} />;
      case "BaseVanListing": return <BaseVanListing setSelected={setSelected} />;
      case "VanPartsManager": return <VanPartsManager setSelected={setSelected} />;
      case "VanParts": return <VanParts setSelected={setSelected} />;
      case "VariantList": return <VariantList setSelected={setSelected} />;
      case "VariantBuilder": return <VariantBuilder setSelected={setSelected} />;

      default: return <PortfolioListing setSelected={setSelected} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* --- Sidebar: off-canvas drawer on mobile, hover rail on desktop --- */}
      <aside
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        className={`fixed md:static inset-y-0 left-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-40 shadow-xl
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          ${isCollapsed ? "w-64 md:w-20" : "w-64"}
        `}
      >
        <div className="h-20 flex items-center justify-between md:justify-center border-b border-slate-100 shrink-0 px-6 md:px-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">V</div>
          <button onClick={() => setMobileOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-slate-600">
            <X size={22} />
          </button>
        </div>

        {/* Menu Items (Scrollbar hidden but functional if needed) */}
        <nav className="flex-1 overflow-y-auto no-scrollbar py-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`w-full flex items-start px-6 py-4 text-left transition-all
        ${selected === item.id
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-slate-500 hover:bg-slate-50"
                }
      `}
            >
              {/* Icon */}
              <span className="text-2xl min-w-8">{item.icon}</span>

              {/* Label + Description */}
              {(!isCollapsed || mobileOpen) && (
                <div className="ml-4 flex flex-col leading-tight">
                  <span className="font-semibold whitespace-nowrap">
                    {item.label}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    {item.desc}
                  </span>
                </div>
              )}
            </button>
          ))}
        </nav>


        {/* Logout at Bottom */}
        <button
          onClick={handleLogout}
          className="p-6 border-t border-slate-100 text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {(!isCollapsed || mobileOpen) && <span className="ml-3 font-bold">Logout</span>}
        </button>
      </aside>

      {/* --- Main Area --- */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-10 shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center space-x-4 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 overflow-x-auto">
              <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">Home</Link>
              <Link href="/camper-vans-for-sale" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">Van For Sale</Link>
              <Link href="/van-layouts" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">Van Layouts</Link>
            </div>
            <h2 className="sm:hidden text-base font-bold text-slate-800 tracking-tight truncate">
              {menuItems.find((i) => i.id === selected)?.label || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 bg-slate-50 px-3 md:px-4 py-2 rounded-full border border-slate-200 shrink-0">
            <span className="hidden md:inline text-sm font-bold text-slate-600">Super Admin</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>

        {/* The Content Area is the ONLY part that scrolls */}
        <main className="flex-1 overflow-y-auto p-3 md:p-8 custom-scrollbar bg-[#f8fafc]">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-3 md:p-6 min-h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}