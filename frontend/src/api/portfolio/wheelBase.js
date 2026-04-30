// import axios from "axios";
// import Swal from "sweetalert2";

// export async function getByWheelBase(
//   wheelBase,
//   page = 1,
//   search = "",
//   model = "",
//   sit,
//   sleep
// ) {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_URL}/portfolio/wheel-base`,
//       {
//         params: {
//           wheelBase,
//           page,
//           limit: 10,
//           search,
//           model,
//           sit: sit,  // backend expects sit
//           sleep: sleep // backend expects sleep
//         },
//         withCredentials: true
//       }
//     );
// // console.log(response.data)

//     return {
//       success: true,
//       data: response.data.data || [],
//       total: response.data?.total || 0,
//       page: response.data?.page || 1,
//       pages: response.data?.pages || 1,
//       filters: response.data?.filters || {}
//     };
//   } catch (err) {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: err.response.data.message,
//     });
//     // console.error("❌ Error fetching portfolio:", err);

//   }
// }
