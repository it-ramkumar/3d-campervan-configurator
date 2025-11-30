import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailSettingsForm = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [newRecipient, setNewRecipient] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch current settings on mount
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/lead-emails`)
      .then(res => {
        if (res.data.success) {
          setSenderEmail(res.data.senderEmail || '');
          setRecipients(res.data.recipients || []);
        }
      })
      .catch(err => console.error(err));
  }, []);

  // -----------------------------
  // Update Sender Email + Password
  // -----------------------------
  const handleSenderUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/sender`, {
        senderEmail,
        password
      });
      if (res.data.success) setMessage('Sender updated successfully');
    } catch (err) {
      console.error(err);
      setMessage('Error updating sender');
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Add Recipient
  // -----------------------------
  const handleAddRecipient = async () => {
    if (!newRecipient) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/recipient/add`, {
        email: newRecipient
      });
      if (res.data.success) {
        setRecipients(res.data.recipients);
        setNewRecipient('');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding recipient');
    }
  };

  // -----------------------------
  // Remove Recipient
  // -----------------------------
  const handleRemoveRecipient = async (email) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/recipient/remove`, { email });
      if (res.data.success) setRecipients(res.data.recipients);
    } catch (err) {
      console.error(err);
      alert('Error removing recipient');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Email Settings Dashboard</h2>

      <form onSubmit={handleSenderUpdate} className="mb-6">
        <label className="block mb-2">Sender Email:</label>
        <input
          type="email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />

        <label className="block mb-2">Sender App Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Save Sender'}
        </button>
      </form>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Recipients</h3>

        <div className="flex mb-2">
          <input
            type="email"
            value={newRecipient}
            placeholder="Add recipient email"
            onChange={(e) => setNewRecipient(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button
            onClick={handleAddRecipient}
            className="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>

        <ul className="list-disc pl-5">
          {recipients.map((r) => (
            <li key={r} className="flex justify-between items-center mb-1">
              {r}
              <button
                onClick={() => handleRemoveRecipient(r)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
};

export default EmailSettingsForm;
