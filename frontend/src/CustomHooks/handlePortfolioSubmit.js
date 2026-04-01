import axios from "axios";
import Swal from "sweetalert2";
import { createPortfolio,updatePortfolio } from "@/api/portfolio/createPortfolio";

export const handlePortfolioSubmit = async ({
  e,
  editData,
  title,
  category,
  galleryFiles,
  existingGallery, // Ye ab hamara naya order hai
  removedExistingGallery,
  features,
  mediaUrls,
  sold,
  van_listing,
  setLoading,
  setRemovedExistingGallery,
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

    // 1️⃣ Delete removed images from S3
    if (removedExistingGallery.length > 0) {
      await Promise.all(
        removedExistingGallery.map((url) =>
          axios.post(
            `${process.env.NEXT_PUBLIC_URL}/delete-image`,
            { imageUrl: url }
          )
        )
      );
    }

    // 2️⃣ Prepare FormData
    const formDataToSend = new FormData();

    // New gallery uploads (Files)
    galleryFiles.forEach((file) =>
      formDataToSend.append("gallery", file)
    );

    // ✅ REORDER LOGIC:
    // existingGallery mein images already waisi hain jaisi user ne drag ki hain.
    // Hum bas ye ensure kar rahe hain ki deleted images isme na hon.
    const finalOrderedGallery = existingGallery.filter(
      (url) => !removedExistingGallery.includes(url)
    );

    // Hum ise "galleryOrder" ya "existingGallery" ke naam se bhej sakte hain
    // Aapka backend jo bhi key expect kar raha ho (standard usually existingGallery hi rehta hai)
    formDataToSend.append(
      "existingGallery",
      JSON.stringify(finalOrderedGallery)
    );

    // Van listing
    formDataToSend.append("van_listing", JSON.stringify(van_listing));

    // Sold status
    formDataToSend.append("sold", sold.toString());

    // Category
    formDataToSend.append("category", JSON.stringify(category));

    // Detailed features
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

    // Media URLs
    const cleanedMediaUrls = mediaUrls.filter((url) => url.trim() !== "");
    formDataToSend.append("media", JSON.stringify(cleanedMediaUrls));

    // 3️⃣ Submit
    if (editData?._id) {
      await updatePortfolio(editData, formDataToSend);
    } else {
      await createPortfolio(formDataToSend);
    }

    clearForm();
    setSelected("portfolio-listing");
    setRemovedExistingGallery([]);

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