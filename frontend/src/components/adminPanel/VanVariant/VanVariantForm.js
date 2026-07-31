"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearEditData } from "@/redux/slices/editData";
import { ArrowLeft, Plus } from "lucide-react";

export default function VariantBuilder({ setSelected }) {
  const dispatch = useDispatch();
  const editData = useSelector((state) => state.editData.editData);

  const [vans, setVans] = useState([]);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState(null);

  // 🔥 NEW: selected van id
  const [selectedVanId, setSelectedVanId] = useState(null);

  // Set when the variant being edited is linked to a van that's no longer
  // in the assignable (available + published) list, so the edit screen can
  // still show/keep it instead of silently dropping the link.
  const [lockedVan, setLockedVan] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    parts: []
  });

  const applyVariant = (variant, vansData) => {
    setSelectedVariant(variant);

    setForm({
      name: variant.name,
      description: variant.description || "",
      parts: variant.parts?.map(p =>
        typeof p === "object" ? p._id : p
      ) || []
    });

    // vanId comes back populated ({ _id, title, ... }) from the list/edit
    // fetch, but as a plain id when a van is freshly picked from the select.
    const vanObj = variant.vanId && typeof variant.vanId === "object" ? variant.vanId : null;
    const vanId = vanObj ? vanObj._id : variant.vanId;

    setSelectedVanId(vanId || null); // 🔥 important

    const inAssignableList = vansData.some((v) => v.id === vanId);
    setLockedVan(
      vanObj && vanId && !inAssignableList
        ? { id: vanId, title: vanObj.van_listing?.title || vanObj.slug || "Unavailable van" }
        : null
    );
  };

  const fetchData = async () => {
    try {
      const [vanRes, partsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_URL}/van/available`),
        axios.get(`${process.env.NEXT_PUBLIC_URL}/van-parts`)
      ]);

      const vansData = vanRes.data.vans || [];
      setVans(vansData);
      setParts(partsRes.data.parts || []);

      if (editData) {
        // came here to edit a variant picked in the list
        applyVariant(editData, vansData);
      } else if (vansData.length > 0) {
        // 🔥 AUTO SELECT FIRST VAN
        setSelectedVanId(vansData[0].id);
      }

    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => dispatch(clearEditData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    dispatch(clearEditData());
    setSelectedVariant(null);
    setLockedVan(null);
    setForm({ name: "", description: "", parts: [] });
    setSelectedVanId(vans[0]?.id || null);
  };

  const togglePart = (id) => {
    setForm((prev) => {
      const exists = prev.parts.includes(id);

      return {
        ...prev,
        parts: exists
          ? prev.parts.filter(p => p !== id)
          : [...prev.parts, id]
      };
    });
  };

  const handleSave = async () => {
    if (!selectedVanId) {
      alert("Please select a van first!");
      return;
    }

    try {
      if (selectedVariant) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/variants/${selectedVariant._id}`,
          {
            ...form,
            vanId: selectedVanId // 🔥 was missing, so edits silently dropped the van link
          },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/variants`,
          {
            ...form,
            vanId: selectedVanId // 🔥 FIXED HERE
          },
          { withCredentials: true }
        );
      }

      dispatch(clearEditData());
      setSelected?.("VariantList");

    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 font-medium italic">
        <div className="animate-pulse">Loading builder data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between gap-3">
        <div>
          <button
            onClick={() => setSelected?.("VariantList")}
            className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-blue-600 transition-all mb-1"
          >
            <ArrowLeft size={15} /> Back to Variants
          </button>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            {selectedVariant ? "Edit Variant" : "Create Variant"}
          </h2>
        </div>
        {selectedVariant && (
          <button
            onClick={resetForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus size={16} /> New Variant
          </button>
        )}
      </div>

      <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white overflow-hidden min-h-[70vh]">
        {/* LEFT - PARTS */}
        <div className="w-3/4 p-4 overflow-y-auto">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wide mb-3">
            Select Parts
          </h3>
          {parts.length === 0 && (
            <p className="text-sm text-slate-400">No parts available.</p>
          )}
          <div className="grid grid-cols-4 gap-3">
            {parts.map(part => (
              <div
                key={part._id}
                onClick={() => togglePart(part._id)}
                className={`border p-2 cursor-pointer rounded-xl transition ${form.parts.includes(part._id)
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                    : "border-slate-100 hover:bg-slate-50"
                  }`}
              >
                <img src={part.thumbnail} className="h-20 w-full object-cover rounded-lg mb-2" alt={part.name} />
                <p className="font-bold text-xs text-slate-800 truncate">{part.name}</p>
                <p className="text-[10px] uppercase text-slate-400">{part.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - DETAILS PANEL */}
        <div className="w-1/4 border-l border-slate-100 p-4 space-y-3 overflow-y-auto">
          <input
            className="border border-slate-200 rounded-xl p-2.5 w-full text-sm outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="Variant Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            className="border border-slate-200 rounded-xl p-2.5 w-full text-sm outline-none focus:ring-2 focus:ring-blue-100 h-24"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 tracking-wide mb-1.5">
              Van
            </label>
            <select
              value={selectedVanId || ""}
              onChange={(e) => setSelectedVanId(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select a van</option>
              {lockedVan && (
                <option value={lockedVan.id}>
                  {lockedVan.title} (currently unavailable)
                </option>
              )}
              {vans.map((van) => (
                <option key={van.id} value={van.id}>
                  {van?.title}
                </option>
              ))}
            </select>
            {lockedVan && (
              <p className="text-[11px] text-amber-600 font-medium mt-1.5">
                This variant&apos;s van isn&apos;t published/available right now — keep it or pick another.
              </p>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-sm border border-slate-100">
            Selected Parts: <span className="font-bold">{form.parts.length}</span>
          </div>

          <button
            onClick={handleSave}
            disabled={!form.name}
            className={`w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all active:scale-95 ${!form.name ? "bg-slate-300" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
              }`}
          >
            {selectedVariant ? "Update Variant" : "Save Variant"}
          </button>
        </div>
      </div>
    </div>
  );
}