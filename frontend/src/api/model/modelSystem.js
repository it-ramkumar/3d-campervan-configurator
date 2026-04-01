import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSystem = createAsyncThunk('models/fetchSystem', async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/models/system`, {
      withCredentials: true,
    });
  return res.data;
});
