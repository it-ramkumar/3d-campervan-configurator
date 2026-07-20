"use client";
import axios from "axios";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Plus, Pencil } from "lucide-react";
import AdminDataTable from "../shared/AdminDataTable";

const PARTS_CSV_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "model", label: "Model" },
];

export default function PartsManager({ setSelected }) {
  const dispatch = useDispatch();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch parts
  const fetchParts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/van-parts`, {
        withCredentials: true,
      });
      const data = res.data;

      setParts(data.parts || []);
    } catch (err) {
      console.error("Failed to load parts", err);
      toast.error("Failed to load parts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  // Delete part
  const handleDelete = async (part) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}/van-parts/${part._id}`, {
      withCredentials: true,
    });

    setParts((prev) => prev.filter((p) => p._id !== part._id));
  };

  // Edit
  const handleEdit = (part) => {
    dispatch(setEditData(part));
    setSelected("VanParts");
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (p) => <span className="font-bold text-slate-800 text-sm">{p.name}</span>,
    },
    {
      key: "category",
      label: "Category",
      render: (p) => <span className="text-xs font-bold text-slate-500">{p.category}</span>,
    },
    {
      key: "model",
      label: "Model",
      hideOnMobile: true,
      render: (p) => <p className="text-sm text-slate-500 line-clamp-1 max-w-xs">{p.model}</p>,
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex justify-between items-center gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Parts Library</h2>
          <p className="text-sm text-slate-500 font-medium">Manage 3D parts used across van builds</p>
        </div>

        <button
          onClick={() => {
            setSelected("VanParts");
            dispatch(clearEditData());
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Part
        </button>
      </div>

      <AdminDataTable
        columns={columns}
        rows={parts}
        rowKey={(p) => p._id}
        loading={loading}
        emptyMessage="No parts found."
        imageColumn={{
          accessor: (p) => p.thumbnail,
          alt: (p) => p.name,
          filename: (p) => p.name,
        }}
        renderActions={(p) => (
          <button
            onClick={() => handleEdit(p)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
            title="Edit"
          >
            <Pencil size={16} />
          </button>
        )}
        onDelete={handleDelete}
        deleteMessage={(p) => `Delete the part "${p.name}"? This cannot be undone.`}
        exportColumns={PARTS_CSV_COLUMNS}
        exportFilename="van-parts"
      />
    </div>
  );
}
