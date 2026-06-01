/**
 * Fetch all vans from backend
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function availableVans() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/van/available`, {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 604800, // 7 days
        tags: ['vans', 'available-vans'] // For manual purge when inventory changes
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.vans || [],
    };
  } catch (err) {
    console.error("Error fetching available vans:", err);

    if (typeof window !== 'undefined') {
      const Swal = (await import('sweetalert2')).default;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Failed to fetch available vans",
      });
    }

    return {
      success: false,
      data: [],
      error: err.message
    };
  }
}