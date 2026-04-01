import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExterior = createAsyncThunk('models/fetchExterior', async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/models/exterior`, {
      withCredentials: true,
    });
  return res.data;
});