import axios from "axios";
import Swal from "sweetalert2";


// ✅ Create portfolio
const createPortfolio = async (formDataToSend) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/portfolio`, formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,

        });

        Swal.fire({
            icon: "success",
            title: "Successfully!",
            text: res.data.message,
            showConfirmButton: false
        });
        return res.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message,
        });
        throw error;
    }
};


const updatePortfolio = async (editData, formDataToSend) => {
    try {
        if (!editData?._id) throw new Error("No portfolio ID to update!");
        const res = await axios.put(
            `${process.env.NEXT_PUBLIC_URL}/portfolio/${editData.slug}`,
            formDataToSend,
            { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );

        Swal.fire({
            icon: "success",
            title: "Successfully!",
            text: res.data.message,
            showConfirmButton: false
        });
        return res.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message,
        });
        throw error;
    }
};

export { createPortfolio, updatePortfolio };
