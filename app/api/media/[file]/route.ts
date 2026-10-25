import { getMedia } from "@/lib/settings-store";

const FILE = /^([0-9a-f-]{36})\.[a-z]+$/;

/** Serves an uploaded image. Ids never change content, so responses are cached for a year. */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const match = FILE.exec((await params).file);
  if (!match) return new Response("Not found", { status: 404 });

  try {
    const media = await getMedia(match[1]);
    if (!media) return new Response("Not found", { status: 404 });
    return new Response(new Uint8Array(media.data), {
      headers: {
        "Content-Type": media.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        // Uploaded SVGs must never run scripts if opened directly.
        "Content-Security-Policy": "default-src 'none'; img-src data:; style-src 'unsafe-inline'; sandbox",
      },
    });
  } catch (error) {
    console.error("Failed to load media", error);
    return new Response("Server error", { status: 500 });
  }
}
