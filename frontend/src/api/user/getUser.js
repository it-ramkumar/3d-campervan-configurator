import axios from "axios";
import Swal from "sweetalert2";



export const getUser = async () => {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/quote/all-quotes`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
      Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });

    throw err.response?.data
  }
};