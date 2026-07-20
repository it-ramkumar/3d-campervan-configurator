import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Search, Plus, Box, Eye } from "lucide-react";
import Detail from './Detail';
import AdminDataTable from "../shared/AdminDataTable";

const BASE_VAN_CSV_COLUMNS = [
  { key: "layout", label: "Layout" },
  { key: "price", label: "Price" },
  { key: "drivetrain", label: "Drivetrain", accessor: (v) => v.spec?.drivetrain || "" },
  { key: "wheelBase", label: "Wheelbase", accessor: (v) => v.spec?.wheelBase || "" },
  { key: "seats", label: "Seats", accessor: (v) => v.spec?.sitSleep || "" },
  { key: "description", label: "Description", accessor: (v) => v.shortDescription || "" },
];

const BaseVanListing = ({ setSelected }) => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVan, setSelectedVan] = useState(null); // Modal ke liye state

  const API_URL = process.env.NEXT_PUBLIC_URL;

  // 1. Data Fetching
  const fetchVans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/add-base-van`);
      if (res.data.success) {
        setVans(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching vans:", err);
      toast.error("Failed to load vans.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Delete Handler — actual delete + state update; confirmation is
  // handled by AdminDataTable's built-in ConfirmDialog.
  const handleDelete = async (van) => {
    const res = await axios.delete(`${API_URL}/add-base-van/${van._id}`, {
      withCredentials: true,
    });

    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to delete van.");
    }

    setVans((prevVans) => prevVans.filter((v) => v._id !== van._id));
    if (selectedVan?._id === van._id) setSelectedVan(null);
  };

  useEffect(() => {
    fetchVans();
  }, []);

  const filteredVans = vans.filter((van) =>
    van.layout.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: "layout",
      label: "Layout",
      render: (van) => <span className="font-bold text-slate-800 text-sm">{van.layout}</span>,
    },
    {
      key: "drivetrain",
      label: "Drivetrain",
      hideOnMobile: true,
      render: (van) => <span className="text-xs font-bold text-slate-500">{van.spec?.drivetrain}</span>,
    },
    {
      key: "wheelBase",
      label: "Wheelbase",
      hideOnMobile: true,
      render: (van) => (
        <span className="text-sm text-slate-500">{van.spec?.wheelBase ? `${van.spec.wheelBase}"` : "-"}</span>
      ),
    },
    {
      key: "seats",
      label: "Seats",
      hideOnMobile: true,
      render: (van) => <span className="text-sm text-slate-500">{van.spec?.sitSleep ?? "-"}</span>,
    },
    {
      key: "price",
      label: "Price",
      render: (van) => <span className="text-blue-700 font-black text-sm">${van.price?.toLocaleString()}</span>,
    },
    {
      key: "description",
      label: "Description",
      hideOnMobile: true,
      render: (van) => <p className="text-sm text-slate-500 line-clamp-1 max-w-xs">{van.shortDescription}</p>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Base Vans Inventory</h1>
          <p className="text-sm text-slate-500 font-medium">Manage your 3D models and van specifications</p>
        </div>

        <button
          onClick={() => setSelected("BaseVan")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Plus size={18} /> Add More
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search layout..."
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <AdminDataTable
        columns={columns}
        rows={filteredVans}
        rowKey={(van) => van._id}
        loading={loading}
        emptyMessage="No vans found matching your search."
        imageColumn={{
          accessor: (van) => van.imgUrl,
          alt: (van) => van.layout,
          filename: (van) => van.layout,
        }}
        renderActions={(van) => (
          <>
            <button
              onClick={() => window.open(van.glbFileUrl, "_blank")}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="View 3D Model"
            >
              <Box size={16} />
            </button>
            <button
              onClick={() => setSelectedVan(van)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="View Details"
            >
              <Eye size={16} />
            </button>
          </>
        )}
        onDelete={handleDelete}
        deleteMessage={(van) => `Delete "${van.layout}"? This will delete the 3D model and image from S3 permanently.`}
        exportColumns={BASE_VAN_CSV_COLUMNS}
        exportFilename="base-vans"
      />

      {/* 3. Modal ko end mein render karein */}
      {selectedVan && (
        <Detail
          van={selectedVan}
          onClose={() => setSelectedVan(null)}
        />
      )}
    </div>
  );
};

export default BaseVanListing;
