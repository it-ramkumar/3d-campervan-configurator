export async function getAllPortfolio(params = {}) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/portfolio`);

    // ✅ ensure pagination always exists
    const cleanParams = {
      page: params.page || 1,
      limit: params.limit || 12,
      ...params,
    };

    Object.keys(cleanParams).forEach((key) => {
      const value = cleanParams[key];

      if (value === undefined || value === "") return;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v !== undefined && v !== "") {
            url.searchParams.append(key, v);
          }
        });
      } else {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      method: "GET",
      // cache: "force-cache",
      // next: {
      //   revalidate: 604800 // ✅ 7 days (weekly) - adjust based on your needs
      //   // 2592000 for monthly (30 days)
      //   // 1209600 for 2 weeks
      // },
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
      data,
    };

  } catch (err) {
    console.error("Error fetching portfolio:", err);

    return {
      success: false,
      error: err.message || "Network Error",
    };
  }
}