import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react"; // delete icon

const EmailManager = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all emails
  const fetchEmails = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/emails`);
      if (res.data.success) setEmails(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // Submit email
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/emails`, { email });
      if (res.data.success) {
        setStatus("Email saved successfully!");
        setEmail("");
        fetchEmails(); // refresh list
      }
    } catch (err) {
      if (err.response?.data?.message) setStatus(err.response.data.message);
      else setStatus("Server error, try again later");
    }
  };

  // Delete email
  const deleteEmail = async (id) => {
    if (!confirm("Are you sure you want to delete this email?")) return;
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/emails/${id}`);
      if (res.data.success) {
        setEmails(emails.filter((e) => e._id !== id));
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
      {/* Form */}
      <h2 className="text-xl font-bold mb-4">Add Email</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {status && <p className="mb-4 text-gray-700">{status}</p>}

      {/* Email List */}
      <h2 className="text-xl font-bold mb-2">All Emails</h2>
      {loading ? (
        <p>Loading emails...</p>
      ) : emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <ul className="space-y-2">
          {emails.map((e) => (
            <li
              key={e._id}
              className="flex justify-between items-center p-2 border rounded-md"
            >
              <span>{e.email}</span>
              <Trash2
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => deleteEmail(e._id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailManager;
