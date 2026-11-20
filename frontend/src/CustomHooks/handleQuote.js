import axios from "axios";
import Swal from "sweetalert2";
// import { setPreview } from "@/redux/slices/previewSlice";
import { showQuoteForm } from "./showQuoteForm"
import { sendToCrm } from "@/lib/crm";

export const handleGetQuote = async (
  addedModels,
  dispatch,
  BaseVan,
  setLoading
) => {
  showQuoteForm(async (formData) => {
    try {
      setLoading(true);

      // Safety check for models
      const modelsArray = Array.isArray(addedModels) ? addedModels : (addedModels?.addedModels || []);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        model: {
          id: BaseVan?._id || BaseVan?.id, // 👈 Make sure this isn't undefined
          layout: BaseVan?.layout || "Standard"
        },
        parts: modelsArray.map(part => ({
          id: part.id || part._id,
          label: part.label,
          type: part.type
        })),
        submittedAt: new Date().toISOString()
      };

      // Copy every configurator quote to the BBV CRM (fire-and-forget), even if the API below fails (2026-11-20).
      sendToCrm({
        name: formData.name, email: formData.email, phone: formData.phone || "",
        lead_source: "configurator",
        message: ("3D configurator quote: " + payload.model.layout + ". Parts: " +
          payload.parts.map(p => p.label).filter(Boolean).join(", ")).slice(0, 1400),
      });

      if (!payload.model.id) {
        throw new Error("BaseVan ID is missing. Cannot submit quote.");
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/quote`,
        payload
      );

      setLoading(false);
      // dispatch(setPreview(res.data.quote));
      Swal.fire({ icon: "success", title: "Success", text: "Quote submitted!" });

    } catch (err) {
      setLoading(false);
      console.error("Submission Error Details:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.response?.data?.message || "Please select a van model before submitting."
      });
    }
  });
};