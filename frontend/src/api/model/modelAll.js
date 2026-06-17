// Shared fetch utility
const fetchModelData = async (endpoint, tag) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/models/${endpoint}`, {
      cache: 'force-cache',
      next: { tags: [tag, 'models'], revalidate: 604800 }, // 1 week cache revalidation
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data,"model")
    return data.data || data; // Handles nested wrapper and standard arrays
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error.message);
    throw error;
  }
};

// Pura data single API network trigger se single fetch karega
export const fetchAllConfiguratorData = async () => {
  return fetchModelData('all', 'all-models');
};