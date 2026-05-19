"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function VariantBuilder() {
  const [vans, setVans] = useState([]);
  const [parts, setParts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState(null);

  // 🔥 NEW: selected van id
  const [selectedVanId, setSelectedVanId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    parts: []
  });

  const fetchData = async () => {
    try {
      const [vanRes, partsRes, variantRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_URL}/van/available`),
        axios.get(`${process.env.NEXT_PUBLIC_URL}/van-parts`),
        axios.get(`${process.env.NEXT_PUBLIC_URL}/variants`)
      ]);

      const vansData = vanRes.data.vans || [];
      setVans(vansData);
      setParts(partsRes.data.parts || []);
      setVariants(variantRes.data.variants || []);

      // 🔥 AUTO SELECT FIRST VAN
      if (vansData.length > 0) {
        setSelectedVanId(vansData[0]._id);
      }

    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);

    setForm({
      name: variant.name,
      description: variant.description || "",
      parts: variant.parts?.map(p =>
        typeof p === "object" ? p._id : p
      ) || []
    });

    setSelectedVanId(variant.vanId); // 🔥 important
  };

  const resetForm = () => {
    setSelectedVariant(null);
    setForm({ name: "", description: "", parts: [] });
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
          form,
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

      resetForm();
      fetchData();

    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  if (loading) return <div className="p-10">Loading Data...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* LEFT - VARIANTS */}
      <div className="w-1/4 border-r p-3 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">Variants</h2>
          <button onClick={resetForm} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">+ New</button>
        </div>
        {variants.map(v => (
          <div
            key={v._id}
            onClick={() => handleSelectVariant(v)}
            className={`p-3 border mb-2 cursor-pointer rounded transition ${selectedVariant?._id === v._id ? "border-black bg-gray-100" : "bg-white hover:bg-gray-50"
              }`}
          >
            <p className="font-semibold">{v.name}</p>
            <p className="text-xs text-gray-500">{v.parts?.length || 0} parts</p>
          </div>
        ))}
      </div>

      {/* CENTER - PARTS */}
      <div className="w-2/4 p-4 overflow-auto">
        <h2 className="font-bold mb-3">Select Parts</h2>
        <div className="grid grid-cols-3 gap-3">
          {parts.map(part => (
            <div
              key={part._id}
              onClick={() => togglePart(part._id)}
              className={`border p-2 cursor-pointer rounded-lg transition ${form.parts.includes(part._id) ? "border-green-500 bg-green-50 ring-2 ring-green-200" : "bg-white"
                }`}
            >
              <img src={part.thumbnail} className="h-20 w-full object-cover rounded mb-2" alt={part.name} />
              <p className="font-medium text-sm truncate">{part.name}</p>
              <p className="text-[10px] uppercase text-gray-400">{part.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - EDIT PANEL */}
      <div className="w-1/4 border-l p-4 bg-white">
        <h2 className="font-bold mb-4">{selectedVariant ? "Edit Variant" : "Create New Variant"}</h2>
        <div className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Variant Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            className="border p-2 w-full rounded h-24"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
         <div className="mb-4">
  <label className="block text-sm font-medium mb-1">
    Select Van
  </label>

  <select
    value={selectedVanId || ""}
    onChange={(e) => setSelectedVanId(e.target.value)}
    className="w-full border p-2 rounded"
  >
    {/* Yeh raha khali (placeholder) option */}
    <option value="">Select a van</option>

    {vans.map((van) => (
      <option key={van.id} value={van.id}>
        {van?.title}
      </option>
    ))}
  </select>
</div>
          <div className="p-3 bg-gray-100 rounded text-sm">
            Selected Parts: <span className="font-bold">{form.parts.length}</span>
          </div>
          <button
            onClick={handleSave}
            disabled={!form.name}
            className={`w-full py-3 rounded font-bold text-white transition ${!form.name ? "bg-gray-300" : "bg-black hover:bg-gray-800"
              }`}
          >
            {selectedVariant ? "Update Variant" : "Save Variant"}
          </button>
        </div>
      </div>
    </div>
  );
}