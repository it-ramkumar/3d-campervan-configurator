import axios from "axios";
export async function vansByStatus(status, page = 1, limit = 9) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/van/van-by-status`,
      {
        params: { status, page, limit },
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache', // Bilkul sahi add kiya aapne
        },
      }
    );

    return {
      success: true,
      data: response.data.data,
      hasMore: response.data.hasMore,
      total: response.data.total,
    };
  } catch (err) {
    // Swal.fire yahan se remove kar dein, varna production build fail ho sakti hai
    console.error("API Fetch Error:", err?.response?.data?.message || err.message);
    return { success: false, data: [], total: 0 };
  }
}