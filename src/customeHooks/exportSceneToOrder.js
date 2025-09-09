import Swal from "sweetalert2";
import AWS from "aws-sdk";
import { Buffer } from "buffer";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

export const ExportScene = (sceneRef, setUploadProgress, setIsUploading, setUploadSuccess, setModelUrl, router) => {
    return new Promise((resolve, reject) => {
        const scene = sceneRef.current?.getScene();
        if (!scene) {
            console.error("Scene is undefined.");
            return reject(new Error("Scene is undefined"));
        }

        const BUCKET = import.meta.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME;
        const ACCESS_KEY = import.meta.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID;
        const SECRET_KEY = import.meta.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY;
        const REGION = import.meta.env.VITE_REACT_APP_AWS_REGION;

        if (!BUCKET || !ACCESS_KEY || !SECRET_KEY || !REGION) {
            Swal.fire({
                icon: "error",
                title: "AWS Configuration Error",
                text: "Missing AWS credentials or bucket name in .env",
            });
            return reject(new Error("Missing AWS credentials"));
        }

        AWS.config.update({
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_KEY,
            region: REGION,
        });

        const s3 = new AWS.S3({ apiVersion: "2012-10-17" });

        // ✅ Generate a unique ID for model
        const modelId = uuidv4();
        const exportCount = Date.now();
        const fileKey = `${modelId}-${exportCount}-campervan-sp-144.glb`;

        const exporter = new GLTFExporter();

        Swal.fire({
            title: "Please Wait...",
            html: "Exporting your van configuration. Please wait...",
            allowOutsideClick: false,
                showConfirmButton: false,
                   showCancelButton: true,
                 cancelButtonText: "Cancel", // 👈 ye button hide karega
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {
    if (result.isDismissed) {
        console.log("User canceled the export");
    }
});

        exporter.parse(
            scene,
            (gltf) => {
                const params = {
                    Bucket: BUCKET,
                    Key: fileKey,
                    Body: Buffer.from(gltf),
                    ContentType: "application/octet-stream",
                };

                const upload = s3.upload(params);

                upload.on("httpUploadProgress", (progress) => {
                    const percent = Math.round(
                        (progress.loaded * 100) / progress.total
                    );
                    setUploadProgress(percent);
                    Swal.update({
                        html: `Uploading... <strong>${percent}%</strong>`,
                    });
                });

                upload.send((err, data) => {
                    setIsUploading(false);
                    if (err) {
                        console.error("S3 Upload Error:", err);
                        Swal.fire({
                            icon: "error",
                            title: "Upload Failed",
                            text: err.message || "An error occurred during S3 upload.",
                        });
                        return reject(err);
                    }

                    const getSignedUrlParams = {
                        Bucket: BUCKET,
                        Key: fileKey,
                        Expires: 60 * 60 * 24 * 7, // 7 days
                    };

                    s3.getSignedUrl(
                        "getObject",
                        getSignedUrlParams,
                        async (err, url) => {
                            if (err) {
                                console.error("Presigned URL Error:", err);
                                Swal.fire({
                                    icon: "error",
                                    title: "Failed to Generate Link",
                                    text: err.message || "Could not generate access link.",
                                });
                                return reject(err);
                            }

                            setUploadProgress(0);
                            setUploadSuccess(true);
                            setModelUrl(url);

                            // ✅ Return both ID & URL
                            resolve({
                                id: modelId,
                                url
                            });
                        }
                    );
                    router("/preview")
                });
            },
            (error) => {
                console.error("Export Error:", error);
                setIsUploading(false);
                Swal.fire({
                    icon: "error",
                    title: "Export Failed",
                    text: error.message || "Could not export 3D scene.",
                });
                reject(error);
            },
            { binary: true }
        );
    });
};
