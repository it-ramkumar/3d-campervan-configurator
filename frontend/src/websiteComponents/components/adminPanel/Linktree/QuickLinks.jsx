import React, { useEffect, useState } from "react";
import axios from "axios";
import { setEditData, clearEditData } from "../../../../redux/slices/editData";
import { useDispatch } from "react-redux";

const QuickLinks = ({ setSelected }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Fetch quick links
  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/quick-links`);
      setLinks(res.data.links || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load links.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/quick-links/${id}`);
        setLinks(links.filter((link) => link._id !== id));
      } catch (err) {
        alert("Failed to delete link");
      }
    }
  };

  // Edit handler
  const handleEdit = (link) => {
    dispatch(setEditData(link)); // Redux mein data save karein
    setSelected("addQuickLink"); // Form par navigate karein
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header section with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Quick Links</h1>
        <button
          onClick={() => {
            dispatch(clearEditData()); // Add karte waqt purana edit data clear karein
            setSelected("addQuickLink");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Link
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {links.map((link) => (
          <div
            key={link._id}
            className="group relative bg-white rounded-2xl shadow p-4 hover:shadow-lg transition-shadow border border-gray-100"
          >
            {/* Link Content */}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3"
            >
              {link.icon && (
                <img
                  src={link.icon}
                  alt={link.title}
                  className="w-10 h-10 object-cover rounded-full"
                />
              )}
              <span className="font-medium text-lg truncate">{link.title}</span>
            </a>

            {/* Action Buttons (Edit/Delete) */}
            <div className="flex justify-end mt-4 space-x-2 border-t pt-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(link)}
                className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md hover:bg-yellow-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(link._id)}
                className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;