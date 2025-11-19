import React, { useState, useEffect } from "react";
import axios from "axios";

export default function InteriorChoicesPage() {
  const [allData, setAllData] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  // -------------------------
  // Fetch all from single API
  // -------------------------
  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/item`
      );
      const data = res.data.data || [];
      setAllData(data);

      // Unique Categories
      const cats = [];
      const map = new Map();

      data.forEach((x) => {
        if (x.categoryId && !map.has(x.categoryId._id)) {
          map.set(x.categoryId._id, true);
          cats.push(x.categoryId);
        }
      });

      setCategories(cats);
    } catch (e) {
      console.log("Error :", e);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // When category selected
  // -------------------------
  const handleCategory = (cat) => {
    setSelectedCategory(cat);

    // Subcategories of selected category
    const subs = [];
    const map = new Map();

    allData.forEach((x) => {
      if (x.categoryId?._id === cat._id && x.subCategoryId) {
        if (!map.has(x.subCategoryId._id)) {
          map.set(x.subCategoryId._id, true);
          subs.push(x.subCategoryId);
        }
      }
    });

    setSubCategories(subs);

    // No subcategory → show direct items
    if (subs.length === 0) {
      const items = allData.filter((i) => i.categoryId?._id === cat._id);
      setItems(items);
    } else {
      setItems([]); // empty until user selects subcategory
    }

    setSelectedSubCategory(null);
  };

  // -------------------------
  // When subcategory selected
  // -------------------------
  const handleSub = (sub) => {
    setSelectedSubCategory(sub);

    const its = allData.filter(
      (i) => i.subCategoryId?._id === sub._id
    );

    setItems(its); // Replace previous items
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) return <p className="p-10 text-center text-xl">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* CATEGORY GRID (FIRST VIEW) */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => handleCategory(cat)}
                className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold">{cat.title}</h3>
                <p className="text-gray-500 mt-2">{cat.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* SHOW SELECTED CATEGORY HEADING */}
        {selectedCategory && (
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold">{selectedCategory.title}</h1>
            <p className="text-gray-500 mt-2">{selectedCategory.description}</p>
          </div>
        )}

        {/* SUBCATEGORY BUTTONS → Single Line */}
        {subCategories.length > 0 && (
          <div className="flex gap-3 justify-center mb-10 flex-wrap">
            {subCategories.map((sub) => (
              <button
                key={sub._id}
                onClick={() => handleSub(sub)}
                className={`px-6 py-2 rounded-lg border text-sm shadow-sm transition
                  ${
                    selectedSubCategory?._id === sub._id
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-white hover:border-gray-500"
                  }`}
              >
                {sub.title}
              </button>
            ))}
          </div>
        )}

        {/* ITEMS (REPLACE — NOT BELOW ADD) */}
        {items.length > 0 && (
          <div className="space-y-16 mt-10">
            {items.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              >
                {/* LEFT TEXT */}
                <div>
                  <span className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-sm mb-3">
                    {item.subCategoryId?.title || selectedCategory.title}
                  </span>

                  <h2 className="text-3xl font-bold mb-4">{item.title}</h2>

                  <ul className="space-y-1">
                    {item.description?.map((line, i) => (
                      <li key={i} className="text-gray-700 text-lg">
                        • {line}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT IMAGE */}
                <div className="rounded-2xl shadow overflow-hidden">
                  {item.images?.[0] && (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-80 object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
