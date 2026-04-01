import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import axios from "axios";
import Swal from "sweetalert2";

export const ExportScene = async (
  sceneRef,
  setUploadProgress,
  setIsUploading,
  setUploadSuccess,
  setModelUrl,
  router,
  cancelSourceRef
) => {
  return new Promise((resolve, reject) => {
    const scene = sceneRef.current?.getScene();
    if (!scene) return reject(new Error("Scene is undefined"));

    // ✅ show initial waiting box
    Swal.fire({
      title: "Preparing your model...",
      html: "Please wait while we prepare the 3D scene for upload.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // spinner
      },
    });

    const exporter = new GLTFExporter();

    exporter.parse(
      scene,
      async (gltf) => {
        Swal.close(); // waiting box close

        try {
          const blob = new Blob([gltf], { type: "application/octet-stream" });
          const formData = new FormData();
          formData.append("file", blob, "van-config.glb");

          setIsUploading(true);

          cancelSourceRef.current = axios.CancelToken.source();

          // 🔥 SweetAlert progress with cancel
          Swal.fire({
            title: "Uploading your model...",
            html: `
              <div class="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                <div id="swal-progress-bar" class="bg-green-500 h-3 w-0"></div>
              </div>
              <span id="swal-progress-text">0%</span>
            `,
            showConfirmButton: false,
            allowOutsideClick: false,
            showCancelButton: true,
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isDismissed && cancelSourceRef.current) {
              cancelSourceRef.current.cancel("User cancelled the upload");
            }
          });

          const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/model`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percent);

              const bar = document.getElementById("swal-progress-bar");
              const text = document.getElementById("swal-progress-text");
              if (bar) bar.style.width = percent + "%";
              if (text) text.textContent = percent + "%";
            },
            cancelToken: cancelSourceRef.current.token,
          });

          const data = res.data;
          if (data.url) {
            setUploadSuccess(true);
            setModelUrl(data.url);
            resolve(data)
            // router("/preview");
          } else {
            reject(new Error("No URL returned"));
          }
        } catch (err) {
          if (axios.isCancel(err)) {
            Swal.fire({
              icon: "info",
              title: "Upload Cancelled",
              text: "You cancelled the upload.",
            });
          } else {
            console.error("Upload failed:", err);
            Swal.fire({
              icon: "error",
              title: "Upload Failed",
              text: "Something went wrong while uploading your model.",
            });
          }
          reject(err);
        } finally {
          setIsUploading(false);
          cancelSourceRef.current = null; // ✅ reset for next upload
        }
      },
      (error) => reject(error),
      { binary: true }
    );
  });
};
