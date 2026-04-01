import React, { useState, useEffect } from "react";
import axios from "axios";
import DropDownWithDelete from "@/components/Common/DropDownWithDelete/DropDownWithDelete";
import DynamicBlocks from "@/components/Common/DynamicBlock/DynamicBlock";
import { useSelector, useDispatch } from "react-redux";

export default function AdminForms() {
   const editData = useSelector((state) => state.editData.editData);
   const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [interiorForm, setInteriorForm] = useState({
    title: "",
    categoryId: "",
    subCategoryId: "",
    descriptions: [""],
    images: [],
    link: "",
    blocks: [] // ✅ Blocks yaha honge
  });

  const [activeTab, setActiveTab] = useState("category");
  const [loading, setLoading] = useState(false);

  // ============================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/system/category`);
      setCategories(res.data.data || []);
    } catch (err) {
      console.log("Category fetch error:", err);
    }
  };
  const updateBlocksState = (newBlocks) => {
    setInteriorForm(prev => ({
      ...prev,
      blocks: typeof newBlocks === 'function' ? newBlocks(prev.blocks) : newBlocks
    }));
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/system/subcategory`);
      setSubCategories(res.data.data || []);
    } catch (err) {
      console.log("SubCategory fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  // ✅ Edit Data useEffect
  useEffect(() => {
    if (editData) {
      setInteriorForm({
        title: editData.title || "",
        categoryId: editData.categoryId?._id || editData.categoryId || "",
        subCategoryId: editData.subCategoryId?._id || editData.subCategoryId || "",
        descriptions: editData.description && editData.description.length > 0
          ? editData.description
          : [""],
        images: editData.images || [],
        link: editData.link || "",
        blocks: editData.blocks || []
      });
    }
  }, [editData]);

  // ============================
  const [categoryForm, setCategoryForm] = useState({ title: "", description: "" });

  const handleExteriorCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/system/category`, {
        title: categoryForm.title,
        description: categoryForm.description
      });
      alert("Category Created Successfully!");
      setCategoryForm({ title: "", description: "" });
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  const [subCategoryForm, setSubCategoryForm] = useState({ title: "", description: "", categoryId: "" });

  const handleInteriorSubCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/system/subcategory`, {
        title: subCategoryForm.title,
        description: subCategoryForm.description,
        categoryId: subCategoryForm.categoryId
      });
      alert("SubCategory Created Successfully!");
      setSubCategoryForm({ title: "", description: "", categoryId: "" });
      fetchSubCategories();
    } catch (err) {
      console.error(err);
      alert("Error creating subcategory");
    } finally {
      setLoading(false);
    }
  };

  const handleInteriorImagesChange = (e) => {
    setInteriorForm(prev => ({ ...prev, images: [...e.target.files] }));
  };

  const handleExteriorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Blocks cleaning logic - DEEP COPY banao
      const cleanedBlocks = interiorForm.blocks
        .map((block) => {
          // ✅ Deep copy banao instead of shallow copy
          let b = JSON.parse(JSON.stringify(block));
          delete b._id; // New object ke liye _id hatana sahi hai

          if (b.block_type === "heading" || b.block_type === "subheading") {
            delete b.content; delete b.list_items; delete b.table_data;
          } else if (b.block_type === "paragraph") {
            delete b.title; delete b.list_items; delete b.table_data;
          } else if (b.block_type === "list") {
            delete b.content; delete b.table_data;
            if (b.list_items) {
              b.list_items = b.list_items
                .map(item => ({
                  text: item.text ? item.text.trim() : "",
                  sub_items: item.sub_items ? item.sub_items.filter(sub => sub && sub.trim() !== "").map(sub => sub.trim()) : []
                }))
                .filter(item => item.text !== "");
            }
          } else if (b.block_type === "table") {
            delete b.content; delete b.list_items;
            if (b.table_data && b.table_data.rows) {
              // ✅ New array banao, original modify mat karo
              b.table_data = {
                ...b.table_data,
                rows: b.table_data.rows.filter(row => row.some(cell => cell && cell.trim() !== ""))
              };
            }
          }
          return b;
        })
        .filter((block) => {
          return block.title?.trim() || block.content?.trim() || (block.block_type === "list" && block.list_items?.length > 0) || (block.block_type === "table" && block.table_data?.rows.length > 0);
        });

      // 2. Check if it's edit or create
      const isEdit = editData && editData._id && Object.keys(editData).length > 0;

      // 3. FormData Preparation
      const formData = new FormData();
      formData.append("data", JSON.stringify({
        categoryId: interiorForm.categoryId,
        subCategoryId: interiorForm.subCategoryId,
        link: interiorForm.link
      }));

      formData.append("blocks", JSON.stringify(cleanedBlocks));

      // Images append logic - Only new files for both create and edit
      interiorForm.images.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });

      // 4. API Call - Create or Edit
      if (isEdit) {
        // PUT request for edit
        await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/system/${editData._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Updated Successfully!");
      } else {
        // POST request for create
        await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/system`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Created Successfully!");
      }

      // 5. Reset Form & Clear Edit State
      setInteriorForm({
        categoryId: "", subCategoryId: "",
        images: [], link: "", blocks: []
      });

      // Clear Redux edit state
      dispatch({ type: 'CLEAR_EDIT_DATA' });

    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.response?.data?.message || "Error saving data");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  const tabs = [
    { id: "category", label: "Category" },
    { id: "subcategory", label: "SubCategory" },
    { id: "interior", label: "Interior Choice" }
  ];

  const filteredSubCategories = subCategories.filter(
    (sc) => sc.categoryId?._id === interiorForm.categoryId || String(sc.categoryId?._id) === interiorForm.categoryId
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 text-lg">Manage your categories and content</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${activeTab === tab.id
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Processing...</p>
          </div>
        </div>
      )}

      {/* ============================ */}
      {activeTab === "category" && (
        <form onSubmit={handleExteriorCategorySubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Create New Category
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Title *
            </label>
            <input
              type="text"
              placeholder="Enter category title"
              value={categoryForm.title}
              onChange={(e) => setCategoryForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter category description"
              value={categoryForm.description}
              onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            Create Category
          </button>
        </form>
      )}

      {/* ============================ */}
      {activeTab === "subcategory" && (
        <form onSubmit={handleInteriorSubCategorySubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Create New SubCategory
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SubCategory Title *
            </label>
            <input
              type="text"
              placeholder="Enter subcategory title"
              value={subCategoryForm.title}
              onChange={(e) => setSubCategoryForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <DropDownWithDelete
            value="system"
            items={categories}
            setItems={setCategories}
            selectedItem={subCategoryForm.categoryId}
            setSelectedItem={(val) => setSubCategoryForm(prev => ({ ...prev, categoryId: val }))}
            label="Parent Category"
            apiEndpoint="category"
          />

          <div className="mb-6 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter subcategory description"
              value={subCategoryForm.description}
              onChange={(e) => setSubCategoryForm(prev => ({ ...prev, description: e.target.value }))}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            Create SubCategory
          </button>
        </form>
      )}

      {/* ============================ */}
      {activeTab === "interior" && (
        <form onSubmit={handleExteriorSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            {editData && editData._id ? "Edit Interior Choice" : "Create New Interior Choice"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DropDownWithDelete
              value="system"
              items={categories}
              setItems={setCategories}
              selectedItem={interiorForm.categoryId}
              setSelectedItem={(val) => setInteriorForm(prev => ({ ...prev, categoryId: val }))}
              label="Category"
              apiEndpoint="category"
            />

            <DropDownWithDelete
              value="system"
              items={filteredSubCategories}
              setItems={setSubCategories}
              selectedItem={interiorForm.subCategoryId}
              setSelectedItem={(val) => setInteriorForm(prev => ({ ...prev, subCategoryId: val }))}
              label="SubCategory"
              apiEndpoint="subcategory"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4 border-t pt-4">Content Blocks</label>
            <DynamicBlocks
              blocks={interiorForm.blocks}
              setBlocks={updateBlocksState}
            />
          </div>
          {/* Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            <input
              type="file"
              multiple
              onChange={handleInteriorImagesChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md file:px-4 file:py-2 file:bg-blue-50"
            />
            <p className="mt-1 text-sm text-gray-500">Select multiple images</p>
          </div>

          {/* Link */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
            <input
              type="text"
              placeholder="Enter interior choice link"
              value={interiorForm.link}
              onChange={(e) => setInteriorForm(prev => ({ ...prev, link: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {editData && editData._id ? "Update Interior Choice" : "Create Interior Choice"}
          </button>
        </form>
      )}
    </div>
  );
}