/**
 * Downloads an image URL as a file. Falls back to opening it in a new tab
 * if the fetch is blocked (e.g. by CORS on a CDN that doesn't allow it).
 * @param {string} url
 * @param {string} filename - without extension guess; falls back to url basename
 */
export async function downloadImage(url, filename) {
  if (!url) return;

  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error("Fetch failed");
    const blob = await response.blob();
    const extension = blob.type?.split("/")[1] || "jpg";
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${filename || "image"}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch (err) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
