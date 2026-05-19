"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function VanParts() {

  const editData = useSelector((state) => state.editData.editData);

  const [form, setForm] = useState({
    name: "",
    category: "kitchen",
  });

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [loading, setLoading] = useState(false);

  // -----------------------------------
  // 🔥 Autofill form on edit
  // -----------------------------------
  useEffect(() => {

    if (editData) {
      setForm({
        name: editData.name || "",
        category: editData.category || "kitchen",
      });
    }

  }, [editData]);

  // -----------------------------------
  // Handle input change
  // -----------------------------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------------
  // Submit
  // -----------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);

      if (file) {
        formData.append("model", file);
      }

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // -----------------------------------
      // 🔥 EDIT REQUEST
      // -----------------------------------
      if (editData?._id) {

        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/van-parts/${editData._id}`,
          formData,
          {
            withCredentials: true,
          }
        );

        console.log("✅ Updated:", res.data);

        alert("Part updated successfully");

      }

      // -----------------------------------
      // 🔥 CREATE REQUEST
      // -----------------------------------
      else {

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/van-parts`,
          formData,
          {
            withCredentials: true,
          }
        );

        console.log("✅ Created:", res.data);

        alert("Part created successfully");
      }

      // -----------------------------------
      // Reset form
      // -----------------------------------
      setForm({
        name: "",
        category: "kitchen",
      });

      setFile(null);
      setThumbnail(null);

    } catch (err) {

      console.error(err);

      alert(
        err?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4"
    >

      {/* Name */}
      <input
        name="name"
        placeholder="Part Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Category */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="kitchen">Kitchen</option>
        <option value="bed">Bed</option>
        <option value="table">Table</option>
        <option value="bathroom">Bathroom</option>
      </select>

      {/* Existing Preview */}
      {editData?.thumbnail && (
        <Image
          src={editData.thumbnail}
          alt="thumbnail"
          width={128}
          height={128}
          className="w-32 h-32 object-cover rounded border"
        />
      )}

      {/* GLB Upload */}
      <div>
        <label className="block mb-1">
          Upload GLB
        </label>

        <input
          type="file"
          accept=".glb"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      {/* Thumbnail Upload */}
      <div>
        <label className="block mb-1">
          Upload Thumbnail
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading
          ? "Saving..."
          : editData
            ? "Edit Parts Listing"
            : "Create Parts Listing"}
      </button>

    </form>
  );
}