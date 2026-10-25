# Shadhiya Speaks — Next.js rebuild with leads dashboard

Date: 2026-10-25
Status: Draft for review

## 1. Goal

Rebuild the Emergent-generated site at
`https://shadhiya-trainer.preview.emergentagent.com/` (a Vite + React SPA served
from `shadhiya-trainer.preview.static.emergentagent.com`) as a Next.js project the
owner controls and can host on Vercel or Netlify. Add an admin dashboard where
the owner can view both lead forms and export them to CSV.

Success means:

- Every public page matches the original in copy, layout and visual style.
- Both forms save leads to a hosted Postgres database (Neon).
- The owner signs in at `/admin`, browses and filters leads, and downloads
  exactly the filtered rows as a CSV that opens cleanly in Excel and Google
  Sheets.
- The same code deploys to Vercel or Netlify with only environment variables
  changing.

### Decisions already made

| Topic | Decision |
| --- | --- |
| Framework | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 |
| Database | Neon Postgres |
| Admin login | One admin, credentials in environment variables |
| Export | CSV |

### Assumptions

- The owner of this Emergent app wants the code; content and design are kept.
- Contact details in the original (`971501234567`, `hello@shadhiyaspeaks.com`,
  social handles) and the Unsplash photos are placeholders to confirm later.
  They live in one config file so they are easy to change.

## 2. Scope

### In scope

- 9 public pages, shared header/footer, floating WhatsApp button, toasts.
- Free Assessment form and Contact form, posting to API routes that validate
  and store leads.
- Admin login, leads dashboard (stats, two tabs, search/filter/paginate,
  lead details), CSV export.
- Local development database without a Neon account.
- Deployment guide for Vercel and Netlify.

### Out of scope (can be added later)

- Email/WhatsApp notifications on new leads.
- Editing, deleting or tagging leads (status/CRM fields).
- Multiple admin users or password reset.
- Rate limiting beyond the honeypot field.
- Privacy Policy and Terms pages (the original shows them as unlinked text;
  kept that way).
- CMS or content editing from the dashboard.

## 3. Architecture

```
Browser ──► Next.js on Vercel/Netlify
              ├─ (site) pages: pre-rendered Server Components,
              │    client components only for forms, menu, animation
              ├─ POST /api/assessments, POST /api/contact ──► lib/leads ──► Neon
              ├─ /admin (Server Component, reads Neon directly)
              ├─ /api/admin/login, /api/admin/logout
              ├─ GET /api/admin/export ──► lib/leads + lib/csv ──► CSV download
              └─ proxy.ts guards /admin/* and /api/admin/* (except login)
```

Filter state on the dashboard lives in the URL query string
(`/admin?tab=assessments&q=&from=&to=&program=&page=`). The export link reuses
the same query string, so the CSV always matches what's on screen.

### Project layout

```
shadhiya-speaks/
  app/
    (site)/layout.tsx          header, footer, WhatsApp float, smooth scroll
    (site)/page.tsx            Home
    (site)/about/page.tsx
    (site)/ielts-preparation/page.tsx
    (site)/spoken-english/page.tsx
    (site)/one-to-one-coaching/page.tsx
    (site)/free-assessment/page.tsx + assessment-form.tsx (client)
    (site)/testimonials/page.tsx
    (site)/faq/page.tsx
    (site)/contact/page.tsx + contact-form.tsx (client)
    admin/layout.tsx           minimal admin chrome (no public header/footer)
    admin/login/page.tsx
    admin/page.tsx             dashboard
    api/assessments/route.ts
    api/contact/route.ts
    api/admin/login/route.ts
    api/admin/logout/route.ts
    api/admin/export/route.ts
    layout.tsx                 fonts, <Toaster>, base metadata
    not-found.tsx, sitemap.ts, robots.ts
  components/                  site-header, site-footer, whatsapp-float, reveal,
                               animated-heading, smooth-scroll, ui/*
  lib/
    site.ts                    WhatsApp number, email, socials, time zone
    content.ts                 testimonials, FAQs, highlights, nav links
    db.ts                      postgres client + ensureSchema()
    validation.ts              zod schemas for both forms
    leads.ts                   insert / list / count / stats queries
    csv.ts                     CSV builder
    auth.ts                    credential check, session sign/verify
  proxy.ts
  tests/                       Vitest unit + integration tests
  .env.example, README.md, DEPLOY.md
```

## 4. Public site

- **Routes:** `/`, `/about`, `/ielts-preparation`, `/spoken-english`,
  `/one-to-one-coaching`, `/free-assessment`, `/testimonials`, `/faq`,
  `/contact`. Copy, testimonials, FAQs and section structure are ported word
  for word from the original bundle.
- **Header:** brand mark ("Shadhiya" mono + "Speaks" italic), 7 nav links with
  active underline, WhatsApp icon button, "Book Free Assessment" button; slide-in
  sheet menu below the `xl` breakpoint.
- **Footer:** brand + tagline, Quick Links, Services, Connect (WhatsApp, socials,
  email), IELTS trademark disclaimer, copyright.
- **Design tokens** (from the original CSS): cream `#faf7f2`, sand `#f3ede2`,
  obsidian `#121915`, emerald `#0f5132`, gold `#c59b27`, gold-light `#d4af37`,
  line `#e5ded4`, ink-muted `#525c58`. Fonts via `next/font`: Inter (headings),
  Plus Jakarta Sans (body), JetBrains Mono (labels).
- **Motion:** `motion` fade/slide-in on scroll, line-by-line heading reveal,
  Lenis smooth scrolling. All motion is disabled under
  `prefers-reduced-motion`.
- **Images:** `next/image` with the original Unsplash URLs
  (`images.unsplash.com` allowed in `next.config`).
- **SEO:** per-page `<title>` and description (the original's title was
  "frontend"), `sitemap.xml`, `robots.txt` disallowing `/admin` and `/api`.

## 5. Lead capture

### Free Assessment — `POST /api/assessments`

Request body (same field names as the original):

| Field | Rule |
| --- | --- |
| `full_name` | required, 1–120 chars, trimmed |
| `whatsapp` | required, 6–30 chars of digits, spaces, `+ ( ) -`; at least 7 digits |
| `email` | required, valid email, ≤ 200 chars |
| `class_format` | `group` \| `one-to-one` |
| `program` | `academic` \| `general` \| `spoken` |
| `target_band` | optional, ≤ 60 chars |
| `test_date` | optional, `YYYY-MM-DD` |
| `difficulty` | `writing` \| `speaking` \| `reading` \| `listening` |
| `company` | honeypot, must be empty |

### Contact — `POST /api/contact`

| Field | Rule |
| --- | --- |
| `name` | required, 1–120 chars |
| `contact` | required, 3–200 chars (WhatsApp number or email) |
| `message` | required, 1–5000 chars |
| `company` | honeypot, must be empty |

### Responses (both endpoints)

- `201 { "id": "<uuid>" }`: saved.
- `201 { "id": null }`: honeypot filled; nothing stored, so bots see success.
- `400 { "error": "validation", "fields": { "<field>": "<message>" } }`.
- `500 { "error": "server" }`: database failure; logged on the server.

The client forms keep the original behavior: inline submit state ("Booking…",
"Sending…"), the success panel with "Send to Shadhiya on WhatsApp" for
assessments, and toasts for contact success and errors. Field errors from a 400
show under the matching input.

### Data model

```sql
create table if not exists assessments (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  full_name    text not null,
  whatsapp     text not null,
  email        text not null,
  class_format text not null check (class_format in ('group','one-to-one')),
  program      text not null check (program in ('academic','general','spoken')),
  target_band  text,
  test_date    date,
  difficulty   text not null check (difficulty in ('writing','speaking','reading','listening'))
);
create index if not exists assessments_created_at_idx on assessments (created_at desc);

create table if not exists contacts (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  contact    text not null,
  message    text not null
);
create index if not exists contacts_created_at_idx on contacts (created_at desc);
```

`lib/db.ts` runs this schema once per server process (memoized) before the
first query, so a fresh database needs no manual setup step.

### Database connection

- Driver: `postgres` (postgres.js) with `max: 1` and `prepare: false`, which
  works with Neon's pooled connection string and with any local Postgres.
- Connection string: `DATABASE_URL`, falling back to `NETLIFY_DATABASE_URL`
  (set automatically by Netlify DB). If neither is set, API routes return 500
  and log a clear message.

## 6. Admin

### Login and session

- `/admin/login`: email + password form posting to `POST /api/admin/login`.
- Credentials are checked against `ADMIN_EMAIL` and `ADMIN_PASSWORD` using a
  constant-time comparison of SHA-256 digests.
- On success, set cookie `ss_admin`: an HS256 JWT (`jose`) signed with
  `AUTH_SECRET`, 7-day expiry, `httpOnly`, `sameSite=lax`, `secure` in
  production, `path=/`.
- Wrong credentials return 401 with "Invalid email or password" after a fixed
  ~500 ms delay. If any of the three admin variables is missing (or
  `AUTH_SECRET` is under 32 characters), login fails closed with
  "Admin login is not configured".
- `POST /api/admin/logout` clears the cookie and redirects to `/admin/login`.
- `proxy.ts` redirects unauthenticated `/admin/*` requests to `/admin/login`
  and returns 401 for `/api/admin/*` (login excepted). The dashboard page and
  export route also verify the session themselves.

### Dashboard (`/admin`)

- Header: "Leads Dashboard", Logout button.
- Stat cards: total assessment bookings, total contact enquiries, and the count
  from the last 7 days for each.
- Tabs: **Assessments** and **Enquiries**.
- Filters (GET form, so state is in the URL): text search, from/to date, and a
  program filter on the Assessments tab. Search is a case-insensitive match on
  name, email and WhatsApp (assessments) or name, contact and message
  (enquiries). Dates are inclusive and interpreted in the site time zone
  (`Asia/Dubai`, set in `lib/site.ts`).
- Table, newest first, 50 rows per page with Previous/Next and "Showing X–Y of
  Z":
  - Assessments: Submitted, Name, Program, Format, Target, Test date,
    Difficulty, Contact (WhatsApp + email buttons).
  - Enquiries: Submitted, Name, Contact, Message (truncated).
  - Clicking a row expands it to show every field, including the full message.
- Empty states: "No bookings yet." / "No enquiries yet." and "No leads match
  these filters." when filters are active.
- "Export CSV" button on each tab linking to `/api/admin/export` with the
  current filters.

### CSV export — `GET /api/admin/export`

- Query: `type=assessments|contacts`, plus `q`, `from`, `to`, `program`; no
  pagination (all matching rows).
- Response: `text/csv; charset=utf-8` with a UTF-8 BOM (so Excel reads Arabic
  and other non-ASCII names correctly) and
  `Content-Disposition: attachment; filename="assessments-2026-10-25.csv"`.
- Columns:
  - Assessments: Submitted (Asia/Dubai, `YYYY-MM-DD HH:mm`), Full Name,
    WhatsApp, Email, Program, Class Format, Target Band, Test Date, Difficulty
    (human labels, e.g. "Academic IELTS", "1-to-1").
  - Contacts: Submitted, Name, Contact, Message.
- Escaping: RFC 4180 (quote fields containing commas, quotes or newlines;
  double inner quotes); CRLF line endings.
- Spreadsheet formula injection guard: a cell starting with `=`, `@`, tab or
  carriage return, or with `+`/`-` when it is not a plain phone number or
  number, gets a leading `'`.

## 7. Configuration

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon pooled connection string (Vercel's Neon integration sets it) |
| `NETLIFY_DATABASE_URL` | Used if `DATABASE_URL` is absent (Netlify DB sets it) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `AUTH_SECRET` | ≥ 32 random characters for signing the session cookie |
| `NEXT_PUBLIC_SITE_URL` | Optional public URL for `sitemap.xml`; falls back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL` or Netlify's `URL` |

`.env.example` documents all six.

## 8. Local development

- `npm run db:local` runs the `pglite-server` CLI (from
  `@electric-sql/pglite-socket`) on `127.0.0.1:54329` with data in `.pglite/`
  (git-ignored), so the full app runs without a Neon account.
- `.env.example` includes the matching local `DATABASE_URL`.

## 9. Deployment

`DEPLOY.md` covers:

- **Vercel:** import the repo, add Neon from the Storage tab (sets
  `DATABASE_URL`), add the three admin variables, deploy.
- **Netlify:** import the repo (Next.js runtime is detected automatically),
  enable Netlify DB or paste a Neon connection string as `DATABASE_URL`, add
  the three admin variables, deploy.
- Post-deploy check: submit both forms, sign in to `/admin`, export a CSV.

## 10. Testing

- **Unit (Vitest):**
  - `validation`: valid payloads, each invalid field, the honeypot.
  - `csv`: escaping, BOM, CRLF line endings, formula guard (phone numbers stay
    untouched), column labels.
  - `auth`: correct and wrong credentials, missing configuration, token
    sign/verify, expired or tampered tokens.
- **Integration (Vitest + PGlite server):** POST both API routes → rows stored;
  list and filter queries return the right rows; the export route returns a CSV
  matching the filters; admin routes reject requests without a session.
- **Manual browser check:** every page renders and matches the original's
  visuals; both forms submit; login, filters, pagination and CSV download work;
  mobile width has no horizontal scroll.
- `next build` passes with no type or lint errors.

## 11. Open items for the owner

- Confirm the real WhatsApp number, email and social links.
- Replace the stock Unsplash photos with real photos of Shadhiya.
- Consider adding a Privacy Policy page, since the forms collect personal
  data.
