# Deploying

The app runs on Vercel or Netlify with no code changes. Both need a Postgres database (Neon) and three admin settings.

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Neon **pooled** connection string. Vercel's Neon integration sets this for you. |
| `NETLIFY_DATABASE_URL` | Set automatically by Netlify DB; used when `DATABASE_URL` is absent. |
| `ADMIN_EMAIL` | The email you'll sign in to `/admin` with. |
| `ADMIN_PASSWORD` | The starting password. After signing in you can change it in **Admin → Account**. |
| `AUTH_SECRET` | 32+ random characters. Generate one with `openssl rand -base64 32`. |
| `NEXT_PUBLIC_SITE_URL` | Optional. Your final domain, e.g. `https://shadhiyaspeaks.com`, used in `sitemap.xml`. |

The database tables (leads, site settings and uploaded images) are created automatically on first use. There's no migration step.

The public pages are pre-rendered at build time using the saved site settings, and refreshed automatically whenever you save in **Admin → Site settings**. If the database isn't connected during the first build, the pages use the original content until the next save (or within an hour).

First push the project to a GitHub (or GitLab/Bitbucket) repository.

## Vercel

1. In Vercel, choose **Add New → Project** and import the repository. The Next.js settings are detected automatically.
2. Before (or right after) the first deploy, open the project's **Storage** tab, choose **Create Database → Neon**, and connect it to the project. This adds `DATABASE_URL`.
3. Under **Settings → Environment Variables**, add `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `AUTH_SECRET` (and optionally `NEXT_PUBLIC_SITE_URL`) for Production.
4. Redeploy so the new variables take effect.

## Netlify

1. In Netlify, choose **Add new project → Import an existing project** and pick the repository. Netlify detects Next.js and uses its Next.js runtime automatically. Keep the default build command (`npm run build`).
2. Add a database, either way:
   - **Netlify DB:** enable it for the project (Extensions → Neon / Netlify DB). This sets `NETLIFY_DATABASE_URL`.
   - **Your own Neon project:** create one at neon.tech and add its pooled connection string as `DATABASE_URL`.
3. Under **Project configuration → Environment variables**, add `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `AUTH_SECRET` (and optionally `NEXT_PUBLIC_SITE_URL`).
4. Trigger a new deploy.

## After deploying, check

1. Submit the Free Assessment form, and you should see "You're booked in."
2. Submit the Contact form, and you should see "Enquiry sent".
3. Open `/admin`, sign in, and confirm both leads are listed.
4. Click **Export CSV** and open the file in Excel or Google Sheets.
5. Open **Site settings**, change something (e.g. the WhatsApp number), save, and reload the home page to see it.

## Troubleshooting

- **Login says "Admin login is not configured":** `ADMIN_EMAIL`, `ADMIN_PASSWORD` or `AUTH_SECRET` is missing, or `AUTH_SECRET` is shorter than 32 characters. Fix it and redeploy.
- **Forms show "Could not submit":** the database variable is missing or wrong. Check `DATABASE_URL` / `NETLIFY_DATABASE_URL` and the function logs.
- **Dashboard says "Couldn't load leads":** same cause as above.
- **Image upload fails with "larger than 4 MB":** Vercel limits uploads to about 4.5 MB per request. Photos are shrunk automatically, so this only happens with very large SVG/GIF files; export a smaller file.
- **Changing the admin password:** use **Admin → Account**. It signs out other devices straight away.
- **Forgot the admin password:** set a new `ADMIN_PASSWORD` in Vercel/Netlify and redeploy. It replaces the password set in the dashboard, and you can sign in with it immediately.
- **Sign everyone out:** change `AUTH_SECRET` and redeploy.
