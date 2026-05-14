import axios from "axios";
import Swal from "sweetalert2";
import { createPortfolio,updatePortfolio } from "@/api/portfolio/createPortfolio";

export const handlePortfolioSubmit = async ({
  e,
  editData,
  title,
  category,
  galleryFiles,
  existingGallery,
  removedExistingGallery,
  renderingFiles,           // 🆕 Added
  existingRendering,         // 🆕 Added
  removedExistingRendering,  // 🆕 Added
  features,
  mediaUrls,
  sold,
  van_listing,
  setLoading,
  setRemovedExistingGallery,
  setRemovedExistingRendering, // 🆕 Added
  clearForm,
  setSelected,
}) => {
  e.preventDefault();

  // Basic validation
  if (!title || !category || category.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Title and at least one category are required",
    });
    return;
  }

  try {
    setLoading(true);

    // 1️⃣ Delete removed images from S3 (Both Gallery & Renderings)
    const imagesToDelete = [...removedExistingGallery, ...removedExistingRendering];

    if (imagesToDelete.length > 0) {
      await Promise.all(
        imagesToDelete.map((url) =>
          axios.post(
            `${process.env.NEXT_PUBLIC_URL}/delete-image`,
            { imageUrl: url },
             { withCredentials: true }
          )
        )
      );
    }

    // 2️⃣ Prepare FormData
    const formDataToSend = new FormData();

    // --- GALLERY LOGIC ---
    galleryFiles.forEach((file) => formDataToSend.append("gallery", file));
    const finalOrderedGallery = existingGallery.filter(
      (url) => !removedExistingGallery.includes(url)
    );
    formDataToSend.append("existingGallery", JSON.stringify(finalOrderedGallery));

    // --- RENDERING LOGIC (New) ---
    renderingFiles.forEach((file) => formDataToSend.append("rendering", file));
    const finalOrderedRendering = existingRendering.filter(
      (url) => !removedExistingRendering.includes(url)
    );
    formDataToSend.append("existingRendering", JSON.stringify(finalOrderedRendering));

    // --- OTHER FIELDS ---
    formDataToSend.append("van_listing", JSON.stringify(van_listing));
    formDataToSend.append("sold", sold.toString());
    formDataToSend.append("category", JSON.stringify(category));

    // Detailed features cleanup
    const cleanedFeatures = features
      .map((feature) => ({
        ...feature,
        items: feature.items.filter((i) => i.trim() !== ""),
      }))
      .filter(
        (feature) =>
          feature.category.trim() !== "" || (feature.items && feature.items.length > 0)
      );
    formDataToSend.append("detailed_features", JSON.stringify(cleanedFeatures));

    // Media URLs cleanup
    const cleanedMediaUrls = mediaUrls.filter((url) => url.trim() !== "");
    formDataToSend.append("media", JSON.stringify(cleanedMediaUrls));

    // 3️⃣ Submit
    if (editData?._id) {
      await updatePortfolio(editData, formDataToSend);
    } else {
      await createPortfolio(formDataToSend);
    }

    // Cleanup and Reset
    clearForm();
    setSelected("portfolio-listing");
    setRemovedExistingGallery([]);
    setRemovedExistingRendering([]); // 🆕 Reset renderings removal list

    Swal.fire({
      icon: "success",
      title: "Success",
      text: editData ? "Portfolio updated successfully!" : "Portfolio created successfully!",
      timer: 2000,
      showConfirmButton: false
    });

  } catch (error) {
    console.error("Portfolio submit error:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
};