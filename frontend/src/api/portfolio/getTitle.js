// export async function getTitle(page = 1, limit = 12) {
//   try {
//     // Naya minimal route call kar rahe hain
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_URL}/portfolio/titles-only?page=${page}&limit=${limit}&t=${Date.now()}`,
//       {
//         method: "GET",
//         cache: "no-store", // Cache save nahi hoga, foran update reflect hogi
//         headers: { "Content-Type": "application/json" }
//       }
//     );

//     const result = await response.json();
//     return result; // returns { success, data, pages, total }
//   } catch (err) {
//     console.error("Fetch Error:", err);
//     return { success: false, data: [] };
//   }
// }