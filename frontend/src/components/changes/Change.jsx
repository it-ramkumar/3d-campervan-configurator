import React, { useState } from "react";

function Changes() {
 const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

 const handleFileChange = (e) => {
  setFiles(Array.from(e.target.files));
};
const handleUpload = async () => {
  if (!files || files.length === 0) {
    alert("Please select files first!");
    return;
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("file", file));

  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to process files");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "clean-files.zip"; // multiple files ka naam
    document.body.appendChild(a);
    a.click();
    a.remove();

  } catch (err) {
    console.error(err);
    alert("Error processing files!");
  }

  setLoading(false);
};

  return (
   <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center font-sans">
  <h1 className="text-3xl font-bold mb-6 text-gray-800">Tilda Cleaner Tool</h1>

<input
  type="file"
  accept=".zip,.html"
  multiple
  onChange={handleFileChange}
  className="block w-full max-w-md text-sm text-gray-600
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-500 file:text-white
             hover:file:bg-blue-600
             cursor-pointer"
/>


  <button
    onClick={handleUpload}
    disabled={loading}
    className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold transition-colors
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
  >
    {loading ? "Processing..." : "Upload & Convert"}
  </button>
</div>

  );
}

export default Changes;
