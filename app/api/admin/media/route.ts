import { json } from "@/lib/api";
import { isRequestAuthenticated } from "@/lib/auth";
import { MAX_MEDIA_BYTES, insertMedia } from "@/lib/settings-store";

/** Detects the real image type from the file's first bytes rather than trusting the browser. */
function sniffImageType(bytes: Buffer): string | null {
  const hex = bytes.subarray(0, 12).toString("hex");
  const ascii = bytes.subarray(0, 12).toString("latin1");
  if (hex.startsWith("89504e47")) return "image/png";
  if (hex.startsWith("ffd8ff")) return "image/jpeg";
  if (ascii.startsWith("GIF8")) return "image/gif";
  if (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP") return "image/webp";
  if (ascii.slice(4, 12) === "ftypavif" || ascii.slice(4, 12) === "ftypavis") return "image/avif";
  if (hex.startsWith("00000100")) return "image/x-icon";
  const head = bytes.subarray(0, 1024).toString("utf8").replace(/^﻿/, "").trimStart();
  if (head.startsWith("<") && /<svg[\s>]/i.test(bytes.toString("utf8"))) return "image/svg+xml";
  return null;
}

export async function POST(request: Request) {
  if (!(await isRequestAuthenticated(request))) return json(401, { error: "unauthorized" });

  let file: FormDataEntryValue | null = null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return json(400, { error: "Send the image as multipart form data in a `file` field." });
  }
  if (!(file instanceof File) || file.size === 0) return json(400, { error: "Choose an image to upload." });
  if (file.size > MAX_MEDIA_BYTES) return json(413, { error: "That image is larger than 4 MB." });

  const data = Buffer.from(await file.arrayBuffer());
  const contentType = sniffImageType(data);
  if (!contentType) return json(415, { error: "Use a PNG, JPG, WebP, GIF, AVIF, SVG or ICO image." });

  try {
    const url = await insertMedia({ contentType, filename: file.name.slice(0, 200) || null, data });
    return json(201, { url });
  } catch (error) {
    console.error("Failed to store upload", error);
    return json(500, { error: "Could not save the image. Please try again." });
  }
}
