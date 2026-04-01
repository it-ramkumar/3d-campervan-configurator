"use client";

import React from "react";
import {
  handleFeatureChange,
  addFeatureItem,
  removeFeatureCategory,
  removeFeatureItem,
} from "../../../CustomHooks/featureCategoryHandlers";

export default function DetailedFeatures({ features = [], setFeatures }) {
  // features = [] default value set karne se crash nahi hoga

  const addFeatureCategory = () => {
    setFeatures((prev) => {
      // Agar prev array nahi hai to usey array banao
      const currentFeatures = Array.isArray(prev) ? prev : [];
      return [...currentFeatures, { category: "", items: [""] }];
    });
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Detailed Features
      </h3>

      {/* Safety check: check if it's an array before mapping */}
      {Array.isArray(features) && features.map((feature, fIndex) => (
        <div
          key={fIndex}
          className="border border-gray-200 rounded-lg p-4 mb-4"
        >
          {/* Category Input */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              placeholder="Enter category"
              value={feature.category || ""}
              onChange={(e) =>
                handleFeatureChange(setFeatures, fIndex, "category", e.target.value)
              }
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Items */}
          <div className="space-y-2 mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Items
            </label>

            {feature?.items?.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter item"
                  value={item || ""}
                  onChange={(e) =>
                    handleFeatureChange(setFeatures, fIndex, "item", e.target.value, i)
                  }
                  className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
                />

                <button
                  type="button"
                  onClick={() => removeFeatureItem(setFeatures, fIndex, i)}
                  className="px-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Category Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addFeatureItem(setFeatures, fIndex)}
              className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
            >
              + Add Item
            </button>

            <button
              type="button"
              onClick={() => removeFeatureCategory(setFeatures, fIndex)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
            >
              Remove Category
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addFeatureCategory}
        className="w-full mt-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        + Add Feature Category
      </button>
    </div>
  );
}