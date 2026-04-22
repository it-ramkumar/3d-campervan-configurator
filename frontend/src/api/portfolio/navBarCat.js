import axios from "axios";
import Swal from "sweetalert2";

export async function getNavCat() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/portfolio/titles-only`,
      {

        withCredentials: true,
      }
    );
   

    return response.data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.message,
    });
    // console.error("❌ Error fetching portfolio:", err);

  }
}
