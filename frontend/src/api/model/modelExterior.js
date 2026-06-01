// import { createAsyncThunk } from "@reduxjs/toolkit";

// // Shared fetch utility
// const fetchModelData = async (endpoint, tag) => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/models/${endpoint}`, {
//       cache: 'force-cache',
//       next: { tags: [tag, 'models'], revalidate: 604800},
//       credentials: 'include',
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.data || data; // Handle both response structures
//   } catch (error) {
//     console.error(`Failed to fetch ${endpoint}:`, error.message);
//     throw error;
//   }
// };

// export const fetchModelAll = createAsyncThunk('models/fetchModelAll', async () => {
//   return fetchModelData('all', 'all-models');
// });

// export const fetchExterior = createAsyncThunk('models/fetchExterior', async () => {
//   return fetchModelData('exterior', 'exterior-models');
// });

// export const fetchInterior = createAsyncThunk('models/fetchInterior', async () => {
//   return fetchModelData('interior', 'interior-models');
// });

// export const fetchSystem = createAsyncThunk('models/fetchSystem', async () => {
//   return fetchModelData('system', 'system-models');
// });