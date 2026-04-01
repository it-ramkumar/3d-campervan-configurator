// import axios from "axios";
// import Swal from "sweetalert2";
// import { clearEditData } from "../../redux/slices/editData";


// export const handleVanSubmit = async ({
//   e,
//   formData,
//   features,
//   galleryFiles,
//   existingGallery,
//   removedExistingGallery,
//   mediaUrls,
//   editData,
//   setLoading,
//   setRemovedExistingGallery,
//   setSelected,
//   resetForm,
//   dispatch,
// }) => {
//   e.preventDefault();

//   setLoading(true);

//   try {
//     // Delete removed images from server
//     if (removedExistingGallery.length > 0) {
//       await Promise.all(
//         removedExistingGallery.map((url) =>
//           axios.post(`${process.env.NEXT_PUBLIC_URL}/delete-image`, { imageUrl: url })
//         )
//       );
//     }

//     const formToSend = new FormData();

//     // Add new gallery files
//     galleryFiles.forEach((file) => formToSend.append("gallery", file));

//     // Add remaining existing gallery URLs
//     const updatedExistingGallery = existingGallery.filter(
//       (url) => !removedExistingGallery.includes(url)
//     );
//     formToSend.append("existingGallery", JSON.stringify(updatedExistingGallery));

//     // Add cleaned media URLs
//     const cleanedMediaUrls = mediaUrls.filter((url) => url.trim() !== "");
//     formToSend.append("media", JSON.stringify(cleanedMediaUrls));

//     // Add main van data
//     formToSend.append("van_listing", JSON.stringify(formData.van_listing));
//     formToSend.append("sold", formData.sold);
//     formToSend.append("detailed_features", JSON.stringify(features));

//     // Call API to create or update
//     if (editData?._id) {
//       await axios.put(`${process.env.NEXT_PUBLIC_URL}/vans/${editData._id}`, formToSend);
//     } else {
//       await axios.post(`${process.env.NEXT_PUBLIC_URL}/vans`, formToSend);
//     }

//     // Reset form & states
//     resetForm();
//     setRemovedExistingGallery([]);
//     setSelected("Vans-listing");
//     if (dispatch) dispatch(clearEditData());
//   } catch (err) {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: err?.response?.data?.message || err.message || "Something went wrong",
//     });
//   } finally {
//     setLoading(false);
//   }
// };
