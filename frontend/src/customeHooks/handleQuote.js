import { showQuoteForm } from "./showQuoteForm";
import Swal from "sweetalert2";
// import { ExportScene } from "./exportSceneToOrder";
import axios from "axios";
import { setPreview } from "../redux/slices/previewSlice";

export const handleGetQuote = async (
  sceneRef,
  setUploadProgress,
  setIsUploading,
  setUploadSuccess,
  setModelUrl,
  addedModels,
  router,
  dispatch,
  cancelSourceRef, // 👈 extra arg,
    BaseVan
) => {
  showQuoteForm(async (formData) => {
    if (
      !formData.name?.trim() ||
      !formData.email?.trim() ||
      !formData.phone?.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields Missing",
        text: "Please enter your name, email, and phone number to get a quote.",
      });
      return;
    }

    try {
      // const { id, url } = await ExportScene(
      //   sceneRef,
      //   setUploadProgress,
      //   setIsUploading,
      //   setUploadSuccess,
      //   setModelUrl,
      //   router,
      //   cancelSourceRef
      // );
      console.log(addedModels,"added models")
const configData = addedModels?.map(part => ({
        id: part.id || part._id,
        label: part.label,
        type: part.type,
        // Agat admin ko exact positions dikhani hain:
        position: part.position ? [part.position.x, part.position.y, part.position.z] : null,
        rotation: part.rotation ? [part.rotation.x, part.rotation.y, part.rotation.z] : null
      }));
    const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        model: {
          id: BaseVan?.id || "base-van",
          layout: BaseVan?.layout
        },
        parts: configData,
        submittedAt: new Date().toISOString()
      };

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/quote`,
        payload
      );

      dispatch(setPreview(res.data.quote));
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your quote request—including your model—has been received.",
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        Swal.fire({
          icon: "info",
          title: "Cancelled",
          text: "Upload cancelled by you.",
        });
      } else {
        console.error("❌ Quote submission failed:", err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong while submitting your quote.",
        });
      }
    }
  });
};
