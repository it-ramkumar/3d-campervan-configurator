import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminForms() {
  // ================= State Management =================
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
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

  const handleCategorySubmit = async (e) => {
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

  const handleSubCategorySubmit = async (e) => {
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

  // ================= InteriorChoice Form =================
  const [interiorForm, setInteriorForm] = useState({
    title: "",
    categoryId: "",
    subCategoryId: "",
    descriptions: [""],
    images: [],
    link: ""
  });

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

  const handleInteriorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: interiorForm.title,
          categoryId: interiorForm.categoryId,
          subCategoryId: interiorForm.subCategoryId,
          link: interiorForm.link
        })
      );
      formData.append("description", JSON.stringify(interiorForm.descriptions));
      interiorForm.images.forEach((file) => formData.append("images", file));

      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/interior`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("InteriorChoice Created Successfully!");
      setInteriorForm({ title: "", categoryId: "", subCategoryId: "", descriptions: [""], images: [], link: "" });
    } catch (err) {
      console.error(err);
      alert("Error creating InteriorChoice");
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
            className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${
              activeTab === tab.id
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
        <form onSubmit={handleCategorySubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Create New Category
          </h2>

          <div className="mb-4">
            <label htmlFor="category-title" className="block text-sm font-medium text-gray-700 mb-2">
              Category Title *
            </label>
            <input
              id="category-title"
              type="text"
              placeholder="Enter category title"
              value={categoryForm.title}
              onChange={(e) => setCategoryForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="category-desc" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="category-desc"
              placeholder="Enter category description"
              value={categoryForm.description}
              onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            disabled={loading}
          >
            Create Category
          </button>
        </form>
      )}

      {/* ================= SubCategory Form ================= */}
      {activeTab === "subcategory" && (
        <form onSubmit={handleSubCategorySubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Create New SubCategory
          </h2>

          <div className="mb-4">
            <label htmlFor="subcategory-title" className="block text-sm font-medium text-gray-700 mb-2">
              SubCategory Title *
            </label>
            <input
              id="subcategory-title"
              type="text"
              placeholder="Enter subcategory title"
              value={subCategoryForm.title}
              onChange={(e) => setSubCategoryForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subcategory-category" className="block text-sm font-medium text-gray-700 mb-2">
              Parent Category *
            </label>
            <select
              id="subcategory-category"
              value={subCategoryForm.categoryId}
              onChange={(e) => setSubCategoryForm(prev => ({ ...prev, categoryId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="subcategory-desc" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="subcategory-desc"
              placeholder="Enter subcategory description"
              value={subCategoryForm.description}
              onChange={(e) => setSubCategoryForm(prev => ({ ...prev, description: e.target.value }))}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            disabled={loading}
          >
            Create SubCategory
          </button>
        </form>
      )}

      {/* ================= InteriorChoice Form ================= */}
      {activeTab === "interior" && (
        <form onSubmit={handleInteriorSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Create New Interior Choice
          </h2>

          <div className="mb-4">
            <label htmlFor="interior-title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              id="interior-title"
              type="text"
              placeholder="Enter interior choice title"
              value={interiorForm.title}
              onChange={(e) => setInteriorForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="interior-category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="interior-category"
                value={interiorForm.categoryId}
                onChange={(e) => setInteriorForm(prev => ({ ...prev, categoryId: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category (optional)</option>
                {categories.map((c) => (

                  <option key={c._id} value={c._id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="interior-subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                SubCategory
              </label>
              <select
                id="interior-subcategory"
                value={interiorForm.subCategoryId}
                onChange={(e) => setInteriorForm(prev => ({ ...prev, subCategoryId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select subcategory (optional)</option>
                {filteredSubCategories.map(sc => (
                  <option key={sc._id} value={sc._id}>{sc.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Descriptions</label>
            {interiorForm.descriptions.map((desc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Description ${index + 1}`}
                  value={desc}
                  onChange={(e) => handleInteriorDescChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {interiorForm.descriptions.length > 1 && (
                  <button
                    type="button"
                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                    onClick={() => removeDescriptionField(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors text-sm font-medium"
              onClick={addDescriptionField}
            >
              + Add Description
            </button>
          </div>

          <div className="mb-6">
            <label htmlFor="interior-images" className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <input
              id="interior-images"
              type="file"
              multiple
              onChange={handleInteriorImagesChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-sm text-gray-500">Select multiple images</p>
          </div>

          <div className="mb-4">
            <label htmlFor="interior-link" className="block text-sm font-medium text-gray-700 mb-2">
              Link
            </label>
            <input
              id="interior-link"
              type="text"
              placeholder="Enter interior choice link (optional)"
              value={interiorForm.link}
              onChange={(e) => setInteriorForm(prev => ({ ...prev, link: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            disabled={loading}
          >
            Create Interior Choice
          </button>
        </form>
      )}
    </div>
  );
}
