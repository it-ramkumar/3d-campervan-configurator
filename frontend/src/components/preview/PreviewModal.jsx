import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPreview } from "../../redux/slices/previewSlice";


export default function PreviewModal({ setIsOpen }) {
const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]); // Array of quotes
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setData([]);

    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/quote/search`, {
        params: { email, phone },
      });
      if (res.status === 200) {
        setData(res.data.data); // Set array of quotes
      } else {
        setError("No quotes found in response");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleQuoteClick = (quote) => {
    dispatch(setPreview(quote));
    setIsOpen(false); // close modal after selection
  };

  return (
    // Modal backdrop
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Search Quote</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-3">{error}</p>}

        {/* Quotes List */}
        {data?.length > 0 && (
          <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
            {data?.map((item, index) => (
              <div
                key={index}
                onClick={() => handleQuoteClick(item)}
                className="border p-3 rounded-md cursor-pointer hover:bg-gray-100 transition"
              >
                <h4 className="font-semibold">Quote {index ? index + 1 : 1}:</h4>
                <p>{item?.name}</p>
                <p className="text-sm text-gray-500">{item?.email} | {item?.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
