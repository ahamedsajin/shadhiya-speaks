export type ImageKind = "photo" | "logo" | "favicon";

const MAX_BYTES = 4 * 1024 * 1024;
const MAX_EDGE: Record<ImageKind, number> = { photo: 2000, logo: 800, favicon: 256 };
const PASS_THROUGH = new Set(["image/svg+xml", "image/x-icon", "image/vnd.microsoft.icon", "image/gif"]);

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not process this image."))), type, quality),
  );
}

/**
 * Shrinks a picked file before upload: photos and logos become WebP (keeping transparency),
 * favicons become PNG. SVG, ICO and GIF files are uploaded unchanged.
 */
async function prepareImage(file: File, kind: ImageKind): Promise<Blob> {
  if (PASS_THROUGH.has(file.type)) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("This browser can't read that image. Please use a JPG, PNG or WebP file.");
  }
  const scale = Math.min(1, MAX_EDGE[kind] / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob =
    kind === "favicon" ? await canvasToBlob(canvas, "image/png") : await canvasToBlob(canvas, "image/webp", 0.86);
  // Keep the original if re-encoding didn't help and it's already small enough.
  return blob.size >= file.size && file.size <= MAX_BYTES ? file : blob;
}

/** Uploads an image from the user's device and returns its public URL. */
export async function uploadImage(file: File, kind: ImageKind): Promise<string> {
  if (!file.type.startsWith("image/") && !/\.(ico|svg)$/i.test(file.name)) {
    throw new Error("Please choose an image file.");
  }
  const blob = await prepareImage(file, kind);
  if (blob.size > MAX_BYTES) throw new Error("That image is larger than 4 MB, even after resizing.");

  const body = new FormData();
  body.append("file", blob, file.name);
  const response = await fetch("/api/admin/media", { method: "POST", body });
  const data = await response.json().catch(() => null);
  if (response.status === 401) throw new Error("Your session expired. Please sign in again.");
  if (!response.ok || typeof data?.url !== "string") throw new Error(data?.error ?? "Upload failed. Please try again.");
  return data.url;
}
