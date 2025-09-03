import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchInterior = createAsyncThunk('models/fetchInterior', async () => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/models/interior`);
  return res.data;
});
