import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";



export default function TestInteriorChoices() {

     const [interiors, setInteriors] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchInteriors = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/item`, {
        params: { search: query },
      });
      setInteriors(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch interiors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInteriors();
  }, []);

  console.log(interiors)
  return (
    <div>
      hello

    </div>
  )
}
