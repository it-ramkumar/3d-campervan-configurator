import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSystem = createAsyncThunk('models/fetchSystem', async () => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/models/system`);
  return res.data;
});
