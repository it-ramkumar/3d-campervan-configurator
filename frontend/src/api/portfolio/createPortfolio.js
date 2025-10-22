import axios from "axios";

// ✅ Create portfolio
const createPortfolio = async (formDataToSend) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/portfolio`, formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },

            withCredentials: true,

        });
        alert("Portfolio created successfully!");
        return res.data;
    } catch (error) {
        console.error("❌ Error creating portfolio:", error);
        alert("Something went wrong while creating!");
        throw error;
    }
};

// ✅ Update portfolio
const updatePortfolio = async (editData, formDataToSend) => {
    try {
        if (!editData?._id) throw new Error("No portfolio ID to update!");
        const res = await axios.put(
            `${import.meta.env.VITE_REACT_APP_API_URL}/portfolio/${editData.slug}`,
            formDataToSend,
            { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );
        alert("Portfolio updated successfully!");
        console.log("✅ Success (Update):", res.data);
        return res.data;
    } catch (error) {
        console.error("❌ Error updating portfolio:", error);
        alert("Something went wrong while updating!");
        throw error;
    }
};

export { createPortfolio, updatePortfolio };
