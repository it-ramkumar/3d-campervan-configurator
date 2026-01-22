import React, { useState, useEffect } from "react";
import axios from "axios";
import DropDownWithDelete from "../../Common/DropDownWithDelete/DropDownWithDelete";
import DynamicBlocks from "../../Common/DynamicBlock/DynamicBlock";

export default function AdminForms() {
  // ================= State Management =================
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

  // ================= Fetch Data =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/interior/category`);
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
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/interior/subcategory`);
      setSubCategories(res.data.data || []);
    } catch (err) {
      console.log("SubCategory fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  // ================= Category Form =================
  const [categoryForm, setCategoryForm] = useState({ title: "", description: "" });

  const handleExteriorCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/interior/category`, {
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

  // ================= SubCategory Form =================
  const [subCategoryForm, setSubCategoryForm] = useState({ title: "", description: "", categoryId: "" });

  const handleInteriorSubCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/interior/subcategory`, {
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



  const handleInteriorDescChange = (index, value) => {
    const newDescriptions = [...interiorForm.descriptions];
    newDescriptions[index] = value;
    setInteriorForm(prev => ({ ...prev, descriptions: newDescriptions }));
  };

  const addDescriptionField = () => {
    setInteriorForm(prev => ({ ...prev, descriptions: [...prev.descriptions, ""] }));
  };

  const removeDescriptionField = (index) => {
    if (interiorForm.descriptions.length > 1) {
      const newDescriptions = interiorForm.descriptions.filter((_, i) => i !== index);
      setInteriorForm(prev => ({ ...prev, descriptions: newDescriptions }));
    }
  };

  const handleInteriorImagesChange = (e) => {
    setInteriorForm(prev => ({ ...prev, images: [...e.target.files] }));
  };
  const handleExteriorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Blocks ko clean aur unmein se unwanted fields ko remove karein
      const cleanedBlocks = interiorForm.blocks
        .map((block) => {
          // Deep copy banayein
          let b = { ...block };

          // Remove _id from block to save space (since we are not using it)
          delete b._id;

          // Block type ke hisaab se cleaning aur unwanted keys delete karna
          if (b.block_type === "heading" || b.block_type === "subheading") {
            delete b.content;
            delete b.list_items;
            delete b.table_data;
          }
          else if (b.block_type === "paragraph") {
            delete b.title;
            delete b.list_items;
            delete b.table_data;
          }
          // ... existing code inside map function ...

          else if (b.block_type === "list") {
            delete b.content;
            delete b.table_data;

            // ✅ New Nested List Cleaning Logic
            if (b.list_items) {
              b.list_items = b.list_items
                .map(item => ({
                  // Main text ko trim karein
                  text: item.text ? item.text.trim() : "",
                  // Sub-items array ko filter aur trim karein
                  sub_items: item.sub_items
                    ? item.sub_items.filter(sub => sub && sub.trim() !== "").map(sub => sub.trim())
                    : []
                }))
                // Sirf wahi main items rakhein jinka text khali nahi hai
                .filter(item => item.text !== "");
            }
          }

          // ... rest of the code ...
          else if (b.block_type === "table") {
            delete b.content;
            delete b.list_items;
            // Khali rows filter karein
            if (b.table_data) {
              b.table_data.rows = b.table_data.rows.filter(row =>
                row.some(cell => cell && cell.trim() !== "")
              );
            }
          }
          return b;
        })
        .filter((block) => {
          const hasTitle = block.title && block.title.trim() !== "";
          const hasContent = block.content && block.content.trim() !== "";

          // ✅ List check ko nested structure ke liye update kiya
          const hasListItems = block.block_type === "list" &&
            block.list_items &&
            block.list_items.length > 0;

          const hasTableData = block.block_type === "table" &&
            block.table_data &&
            block.table_data.rows.length > 0;

          return hasTitle || hasContent || hasListItems || hasTableData;
        });

      // 2. FormData preparation
      const formData = new FormData();

      formData.append("data", JSON.stringify({
        title: interiorForm.title,
        categoryId: interiorForm.categoryId,
        subCategoryId: interiorForm.subCategoryId,
        link: interiorForm.link
      }));

      // Filter empty descriptions
      const validDescriptions = interiorForm.descriptions.filter(d => d.trim() !== "");
      formData.append("description", JSON.stringify(validDescriptions));

      // ✅ Cleaned blocks bhej rahe hain (Ab isme junk keys nahi hain)
      formData.append("blocks", JSON.stringify(cleanedBlocks));

      interiorForm.images.forEach((file) => formData.append("images", file));

      // 3. API Call
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/interior`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("InteriorChoice Created Successfully!");

      // Reset Form
      setInteriorForm({
        title: "", categoryId: "", subCategoryId: "",
        descriptions: [""], images: [], link: "", blocks: []
      });

    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.response?.data?.message || "Error creating InteriorChoice");
    } finally {
      setLoading(false);
    }
  };
  // ================= Tab Navigation =================
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

      {/* ================= Category Form ================= */}
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

      {/* ================= SubCategory Form ================= */}
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
            value="interior"
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

      {/* ================= InteriorChoice Form ================= */}
      {activeTab === "interior" && (
        <form onSubmit={handleExteriorSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Create New Interior Choice
          </h2>

          {/* Interior Title (Fixed) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              placeholder="Enter interior choice title"
              value={interiorForm.title}
              onChange={(e) => setInteriorForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DropDownWithDelete
              value="interior"
              items={categories}
              setItems={setCategories}
              selectedItem={interiorForm.categoryId}
              setSelectedItem={(val) => setInteriorForm(prev => ({ ...prev, categoryId: val }))}
              label="Category"
              apiEndpoint="category"
            />

            <DropDownWithDelete
              value="interior"
              items={filteredSubCategories}
              setItems={setSubCategories}
              selectedItem={interiorForm.subCategoryId}
              setSelectedItem={(val) => setInteriorForm(prev => ({ ...prev, subCategoryId: val }))}
              label="SubCategory"
              apiEndpoint="subcategory"
            />
          </div>

          {/* Descriptions */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Descriptions</label>
            {interiorForm.descriptions.map((desc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Description ${index + 1}`}
                  value={desc}
                  onChange={(e) => handleInteriorDescChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {interiorForm.descriptions.length > 1 && (
                  <button
                    type="button"
                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => removeDescriptionField(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={addDescriptionField}
            >
              + Add Description
            </button>
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
            Create Interior Choice
          </button>
        </form>
      )}
    </div>
  );
}
