import { showQuoteForm } from "./showQuoteForm";
import Swal from "sweetalert2";
import { ExportScene } from "./exportSceneToOrder";
import axios from "axios";
import { setPreview } from "../redux/slices/previewSlice";
export const handleGetQuote = async (sceneRef,
    setUploadProgress,
    setIsUploading,
    setUploadSuccess,
    setModelUrl,
    addedModels,
    router,
    dispatch) => {
    showQuoteForm(async (formData) => {
        // Required: Name, Email, Phone
        if (
            !formData.name || !formData.name.trim() ||
            !formData.email || !formData.email.trim() ||
            !formData.phone || !formData.phone.trim()
        ) {
            Swal.fire({
                icon: "warning",
                title: "Required Fields Missing",
                text: "Please enter your name, email, and phone number to get a quote.",
            });
            return;
        }

        try {
            // Scene export -> returns { id, modelUrl }
            const { id, url } = await ExportScene(
                sceneRef,
                setUploadProgress,
                setIsUploading,
                setUploadSuccess,
                setModelUrl,
                router
            );
            // console.log(id,"id")

            // Send to backend
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                model: {
                    id: id,
                    url: url
                },
                parts: addedModels
            };

            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/quote`, payload);
            //    localStorage.setItem("quote", JSON.stringify(res.data.quote));
            dispatch(setPreview(res.data.quote));
            Swal.fire({
                icon: "success",
                title: "Submitted!",
                text: "Your quote request—including your model—has been received.",
            });
        } catch (err) {
            console.error("❌ Quote submission failed:", err);
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong while submitting your quote.",
            });
        }
    });
};