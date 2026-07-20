"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DetailModal from "./Detail";
import { Search, Eye, Pencil } from "lucide-react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import AdminDataTable from "../shared/AdminDataTable";

const CSV_COLUMNS = [
  { key: "category", label: "Category", accessor: (i) => i.subCategoryId?.categoryId?.title || "General" },
  { key: "subcategory", label: "Subcategory", accessor: (i) => i.subCategoryId?.title || "" },
  { key: "title", label: "Title" },
  { key: "createdAt", label: "Created At", accessor: (i) => (i.createdAt ? new Date(i.createdAt).toLocaleString() : "") },
];

export default function ExteriorList({ setSelected }) {
  const [interiors, setInteriors] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInteriors = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/exterior`,
        { params: { search: query } }
      );
      setInteriors(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInteriors();
  }, []);

  const handleSearch = () => {
    fetchInteriors(searchTerm);
  };

  const handleDelete = async (item) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}/exterior/${item._id}`, { withCredentials: true });
    setInteriors((prev) => prev.filter((i) => i._id !== item._id));
    if (selectedItem?._id === item._id) setSelectedItem(null);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const columns = [
    {
      key: "category",
      label: "Category",
      render: (item) => (
        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-md">
          {item.subCategoryId?.categoryId?.title || "General"}
        </span>
      ),
    },
    {
      key: "title",
      label: "Title",
      render: (item) => <span className="font-bold text-slate-800 text-sm">{item.title}</span>,
    },
    {
      key: "subcategory",
      label: "Subcategory",
      hideOnMobile: true,
      render: (item) => (
        <span className="text-slate-400 text-xs font-medium italic">
          {item.subCategoryId?.title || "No Subcategory"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Exterior Choices</h2>
          <p className="text-sm text-slate-500">Manage customizable exterior components</p>
        </div>

        <button
          onClick={() => {
            setSelected("exterior-form");
            dispatch(clearEditData());
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span> Add New Choice
        </button>
      </div>

      {/* --- Search Bar --- */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search choices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          Search
        </button>
      </div>

      <AdminDataTable
        columns={columns}
        rows={interiors}
        rowKey={(item) => item._id}
        loading={loading}
        emptyMessage="No items found."
        imageColumn={{
          accessor: (item) => item.images?.[0],
          alt: (item) => item.title,
          filename: (item) => item.title || item._id,
        }}
        renderActions={(item) => (
          <>
            <button
              onClick={() => handleView(item)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="View"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => {
                setSelected("exterior-form");
                dispatch(setEditData(item));
              }}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
          </>
        )}
        onDelete={handleDelete}
        deleteMessage={(item) => `Delete "${item.title}"? This will remove the item from your choices.`}
        exportColumns={CSV_COLUMNS}
        exportFilename="exterior-choices"
      />

      {openModal && (
        <DetailModal
          item={selectedItem}
          onClose={() => {
            setOpenModal(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}
