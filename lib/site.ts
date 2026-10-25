export const site = {
  name: "Shadhiya Speaks",
  timeZone: "Asia/Dubai",
};

/** wa.me link to any number, e.g. a lead's WhatsApp in the admin dashboard. */
export function whatsappChatLink(rawNumber: string): string {
  return `https://wa.me/${rawNumber.replace(/[^0-9]/g, "")}`;
}

/** Public base URL, without a trailing slash. */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const netlify = process.env.URL;
  const url = explicit || (vercel ? `https://${vercel}` : netlify) || "http://localhost:3000";
  return url.replace(/\/+$/, "");
}
