import { cache } from "react";
import { getDb } from "./db";
import { DEFAULT_SETTINGS, mediaIdsIn, resolveSettings, type SiteSettings } from "./settings";

/**
 * Current site settings. Public pages are pre-rendered, so this runs at build time and
 * again whenever settings are saved (the save route revalidates every page).
 * Falls back to the defaults if the database is unavailable.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const sql = await getDb();
    const [row] = await sql<{ data: unknown }[]>`select data from site_settings where id = 1`;
    return resolveSettings(row?.data ?? {});
  } catch (error) {
    console.warn("Using default site settings:", error instanceof Error ? error.message : error);
    return DEFAULT_SETTINGS;
  }
});

/** Saves validated settings and retires uploads nothing points to any more. */
export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const sql = await getDb();
  const ids = mediaIdsIn(settings);
  await sql`
    insert into site_settings (id, data, updated_at)
    values (1, ${sql.json(settings)}, now())
    on conflict (id) do update set data = excluded.data, updated_at = now()`;
  // Uploads still in use are kept; unused ones are marked, then deleted after a grace period
  // so cached pages that still show them don't break. Fresh uploads (not yet saved) are left alone.
  await sql`update media set orphaned_at = null where id = any(${sql.array(ids)}::uuid[])`;
  await sql`
    update media set orphaned_at = now()
    where orphaned_at is null
      and not (id = any(${sql.array(ids)}::uuid[]))
      and created_at < now() - interval '1 hour'`;
  await sql`delete from media where orphaned_at < now() - interval '7 days'`;
}

export const MEDIA_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
};

export const MAX_MEDIA_BYTES = 4 * 1024 * 1024;

export async function insertMedia(file: {
  contentType: string;
  filename: string | null;
  data: Buffer;
}): Promise<string> {
  const sql = await getDb();
  const [row] = await sql<{ id: string }[]>`
    insert into media (content_type, filename, size, data)
    values (${file.contentType}, ${file.filename}, ${file.data.length}, ${file.data})
    returning id`;
  return `/api/media/${row.id}.${MEDIA_TYPES[file.contentType]}`;
}

export async function getMedia(id: string): Promise<{ contentType: string; data: Buffer } | null> {
  const sql = await getDb();
  const [row] = await sql<{ content_type: string; data: Buffer }[]>`
    select content_type, data from media where id = ${id}`;
  return row ? { contentType: row.content_type, data: row.data } : null;
}
