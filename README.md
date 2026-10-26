# Shadhiya Speaks

Next.js rebuild of the Shadhiya Speaks IELTS & English training site (originally generated on Emergent), with lead capture and an admin dashboard.

- **Public site:** Home, About, IELTS Courses, Spoken English, 1-to-1 Coaching, Free Assessment, Testimonials, FAQ, Contact. Copy, layout and styling match the original.
- **Lead forms:** the Free Assessment and Contact forms save to Postgres (`/api/assessments`, `/api/contact`).
- **Admin → Leads** (`/admin`): both forms' leads with search, date, program and status filters, pagination, and **Export CSV** (exports exactly the filtered rows, including status and notes). Each lead has a status — New, Contacted, Follow up, Converted, Not converted — and private notes. Tick several leads to change their status or delete them in one go; deleting always asks for confirmation and is permanent.
- **Admin → Site settings** (`/admin/settings`): change the logo, favicon, contact details (WhatsApp, email, social links), the home-page trainer card (name, title, result badge), the scrolling credentials strip under the hero, the trainer highlights (Home page “Meet Your Trainer” section and the “What's covered” lists on the IELTS and Spoken English pages), the About page “At a Glance” cards and photo badge, and every photo. Photos can be uploaded from your device or pasted as a link. Saving updates the live site immediately.
- **Admin → Account** (`/admin/account`): change the admin password. It's stored hashed in the database and signs out any other devices. `ADMIN_PASSWORD` is only the starting password; setting a new `ADMIN_PASSWORD` in your hosting settings replaces the dashboard password (use this if you forget it).

## Run it locally

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local   # then set ADMIN_EMAIL, ADMIN_PASSWORD and AUTH_SECRET
npm run db:local             # terminal 1: local Postgres (PGlite) on 127.0.0.1:54329
npm run dev                  # terminal 2: http://localhost:3000
```

Sign in at http://localhost:3000/admin with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env.local`. Tables are created automatically on first use. Delete the `.pglite/` folder to reset the local database. The local database is a lightweight stand-in for Postgres: if two apps use it at once (for example `npm run build` while `npm run dev` is running) a request can occasionally fail — just refresh. This doesn't happen with Neon.

## How uploads are stored

Images uploaded in Site settings are stored in the same Postgres database (table `media`) and served from `/api/media/…`, so no extra storage service is needed on Vercel or Netlify. Photos are resized in the browser to at most 2000px and converted to WebP before upload (logos 800px, favicons 256px PNG; SVG, ICO and GIF are kept as-is). The limit is 4 MB per file. Images that are no longer used are deleted automatically a week after you replace them.

## Where things live

| What | Where |
| --- | --- |
| Logo, favicon, contact details, trainer card, credentials strip, trainer highlights, About cards, photos | **Admin → Site settings** (defaults in `lib/settings.ts`) |
| Nav links, testimonials, FAQs | `lib/content.ts` |
| Site time zone | `lib/site.ts` |
| Page copy | `app/(site)/<page>/page.tsx` |
| Colors and fonts | `app/globals.css`, `app/layout.tsx` |
| Form validation rules | `lib/validation.ts` |
| Database schema and queries | `lib/db.ts`, `lib/leads.ts`, `lib/settings-store.ts` |
| Admin login, session and password | `lib/auth.ts`, `lib/admin-credentials.ts`, `lib/password.ts`, `proxy.ts`, `app/api/admin/*` |
| Admin dashboard | `app/admin/page.tsx`, `components/admin/lead-tables.tsx`, `app/api/admin/leads/route.ts` |

`docs/reference/original-app.js` is the original site's extracted source, kept only as a porting reference.

## Before launch

- In **Admin → Site settings**, replace the placeholder WhatsApp number (`971501234567`), email and social links.
- In the same page, swap the Unsplash stock photos for real photos of Shadhiya, and upload a logo and favicon if you have them.
- Consider adding a Privacy Policy page, since the forms collect personal data.

## Deploying

See [DEPLOY.md](DEPLOY.md) for Vercel and Netlify.
