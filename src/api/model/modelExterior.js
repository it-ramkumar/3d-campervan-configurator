import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExterior = createAsyncThunk('models/fetchExterior', async () => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/models/exterior`);
  return res.data;
});