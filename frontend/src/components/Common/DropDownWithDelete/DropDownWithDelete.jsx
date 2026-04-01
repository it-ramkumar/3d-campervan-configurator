import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function DropDownWithDelete({
    value,
    items,            // array of categories or subcategories
    setItems,         // setState for items
    selectedItem,     // selected item ID
    setSelectedItem,  // setState for selected item
    label = "Select", // label
    apiEndpoint = "category" // "category" or "subcategory"
}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  // Delete item
// Delete item
const deleteItem = async (id, title) => {
  if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
    try {
      // value = "interior" | "exterior" | "system"
      const url = `${process.env.NEXT_PUBLIC_URL}/${value}/${apiEndpoint}/${id}`;

      await axios.delete(url);

      alert(`${label} deleted successfully!`);
      setItems(items.filter((c) => c._id !== id));
      if (selectedItem === id) setSelectedItem("");

    } catch (err) {
      console.error(err);
      alert("Error deleting item");
    }
  }
};



    return (
        <div className="relative w-full" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
            >
                {selectedItem
                    ? items.find((i) => i._id === selectedItem)?.title
                    : `Select ${label.toLowerCase()}`}
                <span>{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
                    {items.map((i) => (
                        <li
                            key={i._id}
                            className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <span
                                onClick={() => {
                                    setSelectedItem(i._id);
                                    setOpen(false);
                                }}
                            >
                                {i.title}
                            </span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteItem(i._id, i.title);
                                }}
                                className="text-red-600 hover:text-red-800 ml-2"
                            >
                                🗑
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
