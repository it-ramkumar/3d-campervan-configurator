import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchModelAll = createAsyncThunk('models/fetchModelAll', async () => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/models/all`);
    return res.data;
});