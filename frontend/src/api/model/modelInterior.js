import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchInterior = createAsyncThunk('models/fetchInterior', async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/models/interior`, {
      withCredentials: true,
    });

  return res.data.data;
});
