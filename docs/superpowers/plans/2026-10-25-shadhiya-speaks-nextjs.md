# Shadhiya Speaks Next.js Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Emergent "Shadhiya Speaks" site as a Next.js app with Postgres-backed lead forms and an admin dashboard with CSV export, deployable to Vercel or Netlify.

**Architecture:** Next.js App Router. Public pages are pre-rendered Server Components under the `app/(site)` route group, with client components only for forms, the mobile menu and animation. Forms post to route handlers that validate with zod and write to Postgres through postgres.js. `/admin` is a Server Component that queries Postgres directly; its filter state lives in the URL, which the CSV export route reuses. `proxy.ts` plus per-route checks guard admin with a signed JWT cookie.

**Tech Stack:** Next.js 16.4 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, postgres 3.4, zod 4, jose 6, motion 14, lenis 1.3, sonner 2, lucide-react 1.x, @radix-ui/react-dialog, class-variance-authority, clsx, tailwind-merge; Vitest 5 with @electric-sql/pglite + @electric-sql/pglite-socket for tests and local dev.

**Spec:** `docs/superpowers/specs/2026-10-25-shadhiya-speaks-nextjs-design.md`
**Porting reference:** `docs/reference/original-app.js` (original app code, a minified-name legend, button variants, custom CSS, brand icon paths)

## Global Constraints

- Project root: `/Users/cashify/Documents/Dev/Sajin/shadhiya-speaks`. Node 26.12.1 is installed.
- Next.js 16: use `proxy.ts` exporting `proxy()`, not `middleware.ts`. Page `params` and `searchParams` are Promises.
- Marketing copy, testimonials, FAQs, section order and Tailwind classes come word for word from `docs/reference/original-app.js`. Do not rewrite copy.
- Design tokens: cream `#faf7f2`, sand `#f3ede2`, obsidian `#121915`, emerald `#0f5132`, gold `#c59b27`, gold-light `#d4af37`, line `#e5ded4`, ink-muted `#525c58`. Use the shadcn variables listed in the reference header. Fonts via `next/font/google`: Inter → `--font-heading`, Plus Jakarta Sans → `--font-sans`, JetBrains Mono → `--font-mono`.
- Site time zone: `Asia/Dubai`, read from `site.timeZone` and never hard-coded elsewhere.
- DB: `postgres(url, { max: 1, prepare: false })`, where url is `process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL`. Use `||` so an empty string falls through.
- Session cookie `ss_admin`: HS256 JWT signed with `AUTH_SECRET` (≥ 32 chars), 7-day expiry, `httpOnly`, `sameSite: "lax"`, `secure` when `NODE_ENV === "production"`, `path: "/"`.
- Env vars: `DATABASE_URL`, `NETLIFY_DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`.
- Never import `server-only` or `next/headers` in `lib/` modules that tests import. Only `lib/admin-session.ts` may use `next/headers`.
- All motion respects reduced motion: `<MotionConfig reducedMotion="user">`, and Lenis does not start when `prefers-reduced-motion: reduce`.
- Brand icons (WhatsApp, Instagram, YouTube, Facebook, TikTok) are inline SVGs built from `BRAND_ICON_PATHS` in the reference (viewBox `0 0 24 24`). Do not add an icon package for them.
- Commit after each task on `main` in the local repo. Never push.

## Review Focus

- **Whitespace-only required fields** (`"   "` as a name or message) must be rejected as empty, not stored. Tested in Task 2.
- **Malformed dashboard/export query strings** (`page=abc`, `from=2026-13-45`, `tab=xyz`, `program=foo`) must fall back to defaults, never 500. Tested in Task 5.
- **UAE day boundaries** in date filters: a lead at 23:30 Dubai time on the `to` date is included; one at 00:30 the next Dubai day is excluded. Tested in Task 5.
- **Search with `%`, `_` or quotes** must match literally, with no wildcard or SQL effects. Tested in Task 5.
- **Non-JSON or non-object POST bodies** to the form APIs must return 400 `validation`, not 500. Tested in Task 6.

---

### Task 1: Scaffold project, tooling and site config

**Files:**
- Create (via create-next-app): `package.json`, `app/`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`
- Create: `vitest.config.ts`, `tests/setup/pglite.ts`, `.env.example`, `lib/site.ts`, `lib/utils.ts`, `tests/site.test.ts`
- Modify: `.gitignore` (add `.pglite/`), `app/globals.css`, `app/layout.tsx`, `next.config.ts`

**Interfaces:**
- Produces:
  - `site`: `{ name: "Shadhiya Speaks", whatsappNumber: "971501234567", email: "hello@shadhiyaspeaks.com", timeZone: "Asia/Dubai", defaultWhatsappMessage: "Hi Shadhiya! I'd like to know more about your IELTS & English training.", socials: { name: "Instagram" | "YouTube" | "Facebook" | "TikTok"; href: string }[] }` (hrefs from `Up` in the reference)
  - `whatsappLink(text?: string): string` returns `https://wa.me/${site.whatsappNumber}?text=<encoded>`, using the default message when `text` is omitted.
  - `whatsappChatLink(rawNumber: string): string` returns `https://wa.me/<digits only>`.
  - `siteUrl(): string` returns `NEXT_PUBLIC_SITE_URL`, else `https://${VERCEL_PROJECT_PRODUCTION_URL}`, else Netlify's `URL`, else `http://localhost:3000`, with no trailing slash.
  - `cn(...inputs: ClassValue[]): string` in `lib/utils.ts` (clsx + tailwind-merge).
  - Vitest env: `DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54330/postgres`, `ADMIN_EMAIL=admin@test.local`, `ADMIN_PASSWORD=correct-horse`, `AUTH_SECRET=test-secret-test-secret-test-secret-123`. A PGlite socket server runs on port 54330 for the whole test run.

- [ ] **Step 1: Scaffold.** From the project root (it already contains `docs/`, which create-next-app allows), run:
  `npx -y create-next-app@16.4.3 . --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --turbopack --no-react-compiler --yes`
  Expected: "Success! Created shadhiya-speaks", plus a git repo with an initial commit.
- [ ] **Step 2: Install dependencies.**
  `npm i postgres@3.4.9 zod@4.6.7 jose@6.2.13 motion@14.6.0 lenis@1.3.27 sonner@2.0.8 lucide-react@1.61.0 @radix-ui/react-dialog class-variance-authority clsx tailwind-merge`
  `npm i -D vitest@5.0.5 @electric-sql/pglite@0.5.11 @electric-sql/pglite-socket@0.2.14`
- [ ] **Step 3: Configure Vitest and the test database.** Create `vitest.config.ts` with `environment: "node"`, `fileParallelism: false`, `globalSetup: ["./tests/setup/pglite.ts"]`, the env above, and alias `@` → project root. Create `tests/setup/pglite.ts`:

```ts
import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";

export default async function setup() {
  const db = await PGlite.create();
  const server = new PGLiteSocketServer({ db, host: "127.0.0.1", port: 54330 });
  await server.start();
  return async () => {
    await server.stop();
    await db.close();
  };
}
```

  Add scripts: `"test": "vitest run"`, `"typecheck": "tsc --noEmit"`, `"db:local": "pglite-server --db=./.pglite --host=127.0.0.1 --port=54329 --max-connections=4"`.
- [ ] **Step 4: Write the failing tests** in `tests/site.test.ts`:

```ts
expect(whatsappLink("Hi & bye")).toBe("https://wa.me/971501234567?text=Hi%20%26%20bye");
expect(whatsappLink()).toContain(encodeURIComponent(site.defaultWhatsappMessage));
expect(whatsappChatLink("+971 50-123 (4567)")).toBe("https://wa.me/971501234567");
// siteUrl: stub env with vi.stubEnv
// NEXT_PUBLIC_SITE_URL="https://x.com/" -> "https://x.com"
// only VERCEL_PROJECT_PRODUCTION_URL="x.vercel.app" -> "https://x.vercel.app"
// only URL="https://x.netlify.app" -> "https://x.netlify.app"
// none set -> "http://localhost:3000"
```

- [ ] **Step 5: Run `npm test`.** Expected: FAIL, `lib/site` not found.
- [ ] **Step 6: Implement `lib/site.ts` and `lib/utils.ts`** to the interfaces above.
- [ ] **Step 7: Run `npm test`.** Expected: PASS.
- [ ] **Step 8: Theme and fonts.**
  - In `app/globals.css`, set the Tailwind v4 `@theme` colors (`--color-cream`, `--color-sand`, `--color-obsidian`, `--color-emerald`, `--color-gold`, `--color-gold-light`, `--color-line`, `--color-ink-muted`), the shadcn `:root` variables from the reference header mapped through `@theme inline` (`--color-background: var(--background)`, etc.), `--radius: .75rem`, the font variables, and the custom CSS from the reference header (marquee, `::selection`). Remove the create-next-app dark-mode block; the original is light-only.
  - In `app/layout.tsx`, load the three fonts, set `<html lang="en">`, body classes `bg-cream text-foreground font-sans antialiased`, render `<Toaster position="top-center" richColors />` from sonner, and set `metadata` with `metadataBase: new URL(siteUrl())`, title template `"%s | Shadhiya Speaks"` and default title `"Shadhiya Speaks — IELTS & Spoken English Training"`.
  - Delete the create-next-app demo content from `app/page.tsx` and leave a placeholder `<main />`.
  - In `next.config.ts`, add `images.remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }]`.
- [ ] **Step 9: Write `.env.example`** with all six variables, comments, and the local value `DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54329/postgres`. Add `.pglite/` to `.gitignore`.
- [ ] **Step 10: Verify.** Run `npm run lint && npm run typecheck && npm test && npm run build`. Expected: all pass; the build lists route `/`.
- [ ] **Step 11: Commit.** `git add -A && git commit -m "chore: scaffold Next.js app with theme, test DB and site config"`

### Task 2: Labels and form validation

**Files:**
- Create: `lib/labels.ts`, `lib/validation.ts`
- Test: `tests/validation.test.ts`

**Interfaces:**
- Produces:
  - `PROGRAMS = ["academic","general","spoken"] as const`, `CLASS_FORMATS = ["group","one-to-one"] as const`, `DIFFICULTIES = ["writing","speaking","reading","listening"] as const`
  - Types `Program`, `ClassFormat`, `Difficulty`
  - `PROGRAM_LABELS: Record<Program,string>` = Academic IELTS / General IELTS / Spoken English
  - `FORMAT_LABELS: Record<ClassFormat,string>` = Small Group / 1-to-1
  - `DIFFICULTY_LABELS: Record<Difficulty,string>` = Writing / Speaking / Reading / Listening
  - `type AssessmentInput = { full_name: string; whatsapp: string; email: string; class_format: ClassFormat; program: Program; target_band: string | null; test_date: string | null; difficulty: Difficulty }`
  - `type ContactInput = { name: string; contact: string; message: string }`
  - `type ParseResult<T> = { kind: "valid"; data: T } | { kind: "spam" } | { kind: "invalid"; fields: Record<string, string> }`
  - `parseAssessment(body: unknown): ParseResult<AssessmentInput>` and `parseContact(body: unknown): ParseResult<ContactInput>`

- [ ] **Step 1: Write the failing tests** in `tests/validation.test.ts`. `valid` is a complete assessment payload.

```ts
expect(parseAssessment(valid)).toEqual({ kind: "valid", data: { ...valid, target_band: null, test_date: null } }); // when both omitted
expect(parseAssessment({ ...valid, target_band: "", test_date: "" })).toMatchObject({ kind: "valid", data: { target_band: null, test_date: null } });
expect(parseAssessment({ ...valid, full_name: "  Aisha  " })).toMatchObject({ data: { full_name: "Aisha" } });
expect(parseAssessment({ ...valid, full_name: "   " })).toMatchObject({ kind: "invalid", fields: { full_name: expect.any(String) } });
expect(parseAssessment({ ...valid, whatsapp: "abc12345" }).kind).toBe("invalid");
expect(parseAssessment({ ...valid, whatsapp: "+971 50" }).kind).toBe("invalid");          // < 7 digits
expect(parseAssessment({ ...valid, whatsapp: "+971 (50) 123-4567" }).kind).toBe("valid");
expect(parseAssessment({ ...valid, email: "nope" }).kind).toBe("invalid");
expect(parseAssessment({ ...valid, program: "toefl" }).kind).toBe("invalid");
expect(parseAssessment({ ...valid, test_date: "2026-02-30" }).kind).toBe("invalid");
expect(parseAssessment({ ...valid, full_name: "x".repeat(121) }).kind).toBe("invalid");
expect(parseAssessment({ ...valid, company: "Acme" })).toEqual({ kind: "spam" });
expect(parseAssessment({ company: "Acme" })).toEqual({ kind: "spam" });                   // spam check runs before validation
expect(parseAssessment(null).kind).toBe("invalid");
expect(parseAssessment("text").kind).toBe("invalid");
expect(parseContact({ name: "Sam", contact: "sam@x.com", message: "Hi" })).toEqual({ kind: "valid", data: { name: "Sam", contact: "sam@x.com", message: "Hi" } });
expect(parseContact({ name: "Sam", contact: "ab", message: "Hi" }).kind).toBe("invalid");
expect(parseContact({ name: "Sam", contact: "sam@x.com", message: "  \n " }).kind).toBe("invalid");
expect(parseContact({ name: "Sam", contact: "sam@x.com", message: "x".repeat(5001) }).kind).toBe("invalid");
```

- [ ] **Step 2: Run `npx vitest run tests/validation.test.ts`.** Expected: FAIL, module not found.
- [ ] **Step 3: Implement `lib/labels.ts` and `lib/validation.ts`.** Use zod objects with `.trim()` before the length checks. Apply the field rules from the spec's §5 tables. The `whatsapp` regex is `^[+\d\s()-]{6,30}$` with a refine requiring at least 7 digits. `test_date` must match `YYYY-MM-DD` and round-trip through `new Date(...)` as the same day. The honeypot field `company` is checked first. `fields` maps each issue's first path segment to its message.
- [ ] **Step 4: Run the test again.** Expected: PASS.
- [ ] **Step 5: Commit.** `git add lib tests && git commit -m "feat: add lead labels and form validation"`

### Task 3: Dates, CSV and export formatting

**Files:**
- Create: `lib/dates.ts`, `lib/csv.ts`, `lib/export.ts`
- Test: `tests/dates.test.ts`, `tests/csv.test.ts`, `tests/export.test.ts`

**Interfaces:**
- Consumes: labels (Task 2); `AssessmentRow` / `ContactRow` (defined here, reused by Task 5)
- Produces:
  - `lib/dates.ts`:
    - `isIsoDay(v: string): boolean`
    - `addDays(day: string, n: number): string`
    - `dayStartUtc(day: string, timeZone: string): Date`
    - `todayInZone(now: Date, timeZone: string): string` ("YYYY-MM-DD")
    - `formatDateTimeInZone(d: Date, timeZone: string): string` ("YYYY-MM-DD HH:mm", 24-hour)
    - `formatDisplayDate(d: Date, timeZone: string): string` ("25 Oct 2026")
  - `lib/csv.ts`: `escapeCsvCell(v: string | null | undefined): string` and `toCsv(header: string[], rows: (string | null | undefined)[][]): string`
  - `lib/export.ts`:
    - `type AssessmentRow = AssessmentInput & { id: string; created_at: Date }`
    - `type ContactRow = ContactInput & { id: string; created_at: Date }`
    - `assessmentsToCsv(rows: AssessmentRow[], timeZone: string): string`
    - `contactsToCsv(rows: ContactRow[], timeZone: string): string`
    - `exportFilename(type: "assessments" | "contacts", now: Date, timeZone: string): string`

- [ ] **Step 1: Write the failing tests.**

```ts
// dates
expect(isIsoDay("2026-02-28")).toBe(true); expect(isIsoDay("2026-02-30")).toBe(false); expect(isIsoDay("26-1-1")).toBe(false);
expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
expect(dayStartUtc("2026-10-25", "Asia/Dubai").toISOString()).toBe("2026-10-24T20:00:00.000Z");
expect(todayInZone(new Date("2026-10-25T21:00:00Z"), "Asia/Dubai")).toBe("2026-10-26");
expect(formatDateTimeInZone(new Date("2026-10-25T10:05:00Z"), "Asia/Dubai")).toBe("2026-10-25 14:05");
expect(formatDisplayDate(new Date("2026-10-25T21:00:00Z"), "Asia/Dubai")).toBe("26 Oct 2026");
// csv
expect(escapeCsvCell('He said "hi", ok')).toBe('"He said ""hi"", ok"');
expect(escapeCsvCell("line1\nline2")).toBe('"line1\nline2"');
expect(escapeCsvCell(null)).toBe("");
expect(escapeCsvCell("=SUM(A1)")).toBe("'=SUM(A1)");
expect(escapeCsvCell("@cmd")).toBe("'@cmd");
expect(escapeCsvCell("-2+3")).toBe("'-2+3");
expect(escapeCsvCell("+971 50 123 4567")).toBe("+971 50 123 4567");
expect(escapeCsvCell("-42")).toBe("-42");
expect(escapeCsvCell("فاطمة")).toBe("فاطمة");
const out = toCsv(["A", "B"], [["1", "2"]]);
expect(out.startsWith("﻿")).toBe(true); expect(out).toBe("﻿A,B\r\n1,2\r\n");
// export: row = { id: "r1", created_at: new Date("2026-10-25T10:05:00Z"), full_name: "Fathima R.", whatsapp: "+971 50 123 4567",
//   email: "f@x.com", class_format: "one-to-one", program: "academic", target_band: "Band 7.5", test_date: "2026-12-01", difficulty: "writing" }
expect(assessmentsToCsv([row], "Asia/Dubai").split("\r\n")[0]).toBe("﻿Submitted,Full Name,WhatsApp,Email,Program,Class Format,Target Band,Test Date,Difficulty");
expect(assessmentsToCsv([row], "Asia/Dubai").split("\r\n")[1]).toBe("2026-10-25 14:05,Fathima R.,+971 50 123 4567,f@x.com,Academic IELTS,1-to-1,Band 7.5,2026-12-01,Writing");
expect(contactsToCsv([contact], "Asia/Dubai").split("\r\n")[0]).toBe("﻿Submitted,Name,Contact,Message");
expect(exportFilename("contacts", new Date("2026-10-25T21:00:00Z"), "Asia/Dubai")).toBe("contacts-2026-10-26.csv");
```

- [ ] **Step 2: Run `npx vitest run tests/dates.test.ts tests/csv.test.ts tests/export.test.ts`.** Expected: FAIL.
- [ ] **Step 3: Implement.**
  - `dates`: use `Intl.DateTimeFormat` with `timeZone` and `formatToParts`. `dayStartUtc` takes the UTC midnight guess, subtracts the zone's offset at that instant, and re-checks the offset once.
  - `escapeCsvCell`: first apply the guard. Prefix `'` when the value starts with `=`, `@`, `\t` or `\r`, or when it starts with `+`/`-` and does not match `^[+-]?[\d\s().-]+$`. Then quote when the value contains `,`, `"`, `\r` or `\n`, doubling inner quotes.
  - `toCsv`: BOM, CRLF after every row including the last.
  - Null cells export as empty strings.
- [ ] **Step 4: Run the tests again.** Expected: PASS.
- [ ] **Step 5: Commit.** `git add lib tests && git commit -m "feat: add zoned date helpers and CSV export formatting"`

### Task 4: Admin credentials and session tokens

**Files:**
- Create: `lib/auth.ts`
- Test: `tests/auth.test.ts`

**Interfaces:**
- Produces:
  - `SESSION_COOKIE = "ss_admin"`
  - `SESSION_MAX_AGE_SECONDS = 604800`
  - `LOGIN_FAILURE_DELAY_MS = 500`
  - `getAuthConfig(env?: NodeJS.ProcessEnv): { email: string; password: string; secret: Uint8Array } | null` returns null if any value is missing or the secret is under 32 chars.
  - `checkCredentials(email: string, password: string, env?): "ok" | "invalid" | "unconfigured"` compares case-insensitively for email and exactly for password, via SHA-256 + `timingSafeEqual`.
  - `createSessionToken(secret: Uint8Array, now?: Date): Promise<string>` with `sub: "admin"`, `iat`, `exp = now + 7d`.
  - `verifySessionToken(token: string | undefined, secret: Uint8Array): Promise<boolean>`
  - `readCookie(cookieHeader: string | null, name: string): string | undefined`
  - `isRequestAuthenticated(request: Request, env?): Promise<boolean>`
  - `sessionCookieOptions(): { httpOnly: true; sameSite: "lax"; secure: boolean; path: "/"; maxAge: number }`

- [ ] **Step 1: Write the failing tests:**

```ts
expect(checkCredentials("admin@test.local", "correct-horse")).toBe("ok");
expect(checkCredentials("ADMIN@test.local", "correct-horse")).toBe("ok");
expect(checkCredentials("admin@test.local", "wrong")).toBe("invalid");
expect(checkCredentials("other@test.local", "correct-horse")).toBe("invalid");
expect(checkCredentials("a", "b", { ...process.env, AUTH_SECRET: "short" })).toBe("unconfigured");
expect(checkCredentials("a", "b", { ...process.env, ADMIN_PASSWORD: "" })).toBe("unconfigured");
const { secret } = getAuthConfig()!;
const token = await createSessionToken(secret);
expect(await verifySessionToken(token, secret)).toBe(true);
expect(await verifySessionToken(token + "x", secret)).toBe(false);
expect(await verifySessionToken(token, new TextEncoder().encode("another-secret-another-secret-123"))).toBe(false);
expect(await verifySessionToken(await createSessionToken(secret, new Date(Date.now() - 8 * 864e5)), secret)).toBe(false);
expect(await verifySessionToken(undefined, secret)).toBe(false);
expect(readCookie("a=1; ss_admin=tok; b=2", "ss_admin")).toBe("tok");
expect(await isRequestAuthenticated(new Request("http://t/", { headers: { cookie: `ss_admin=${token}` } }))).toBe(true);
expect(await isRequestAuthenticated(new Request("http://t/"))).toBe(false);
```

- [ ] **Step 2: Run `npx vitest run tests/auth.test.ts`.** Expected: FAIL.
- [ ] **Step 3: Implement `lib/auth.ts`** with `jose` (`SignJWT`, `jwtVerify`, algorithm `HS256`) and `node:crypto` (`createHash`, `timingSafeEqual`).
- [ ] **Step 4: Run the test again.** Expected: PASS.
- [ ] **Step 5: Commit.** `git add lib/auth.ts tests/auth.test.ts && git commit -m "feat: add admin credential check and session tokens"`

### Task 5: Database layer, lead queries and dashboard filters

**Files:**
- Create: `lib/db.ts`, `lib/leads.ts`, `lib/filters.ts`, `tests/helpers/db.ts`
- Test: `tests/filters.test.ts`, `tests/leads.test.ts`

**Interfaces:**
- Consumes: `AssessmentInput`, `ContactInput`, `Program`, `PROGRAMS` (Task 2); `AssessmentRow`, `ContactRow`, `dayStartUtc`, `addDays`, `isIsoDay` (Task 3); `site.timeZone` (Task 1)
- Produces:
  - `lib/db.ts`:
    - `class DatabaseConfigError extends Error`
    - `SCHEMA_SQL: string` (the spec's §5 SQL, verbatim)
    - `getDb(): Promise<postgres.Sql>` lazily creates the client, runs `SCHEMA_SQL` once per process via a memoized promise using `sql.unsafe`, and throws `DatabaseConfigError` when no URL is set.
    - `closeDb(): Promise<void>` ends the client and resets the memo; tests use it.
  - `lib/filters.ts`:
    - `PAGE_SIZE = 50`
    - `type LeadType = "assessments" | "contacts"`
    - `type LeadQuery = { type: LeadType; q: string; from: string | null; to: string | null; program: Program | null; page: number }`
    - `parseLeadQuery(params: URLSearchParams): LeadQuery` (`tab` or `type` selects the type; default `assessments`)
    - `toSearchParams(record: Record<string, string | string[] | undefined>): URLSearchParams` (first value of arrays)
    - `leadQueryToSearch(query: LeadQuery, overrides?: Partial<LeadQuery>): string` returns `?tab=…` and omits empty/default values (`page` 1, empty `q`, null dates/program).
  - `lib/leads.ts`:
    - `insertAssessment(input: AssessmentInput): Promise<string>` and `insertContact(input: ContactInput): Promise<string>` return the id.
    - `listAssessments(query: LeadQuery, opts: { limit: number | null; offset: number }): Promise<{ rows: AssessmentRow[]; total: number }>`
    - `listContacts(query: LeadQuery, opts: { limit: number | null; offset: number }): Promise<{ rows: ContactRow[]; total: number }>`
    - `getLeadStats(now?: Date): Promise<{ assessments: { total: number; last7Days: number }; contacts: { total: number; last7Days: number } }>`
  - `tests/helpers/db.ts`: `resetTables(): Promise<void>` runs `getDb()` then `truncate assessments, contacts`. `insertAssessmentAt(input, createdAt: Date)` and `insertContactAt(input, createdAt: Date)` insert with an explicit `created_at`.

- [ ] **Step 1: Write the failing filter tests** in `tests/filters.test.ts`:

```ts
const p = (s: string) => parseLeadQuery(new URLSearchParams(s));
expect(p("")).toEqual({ type: "assessments", q: "", from: null, to: null, program: null, page: 1 });
expect(p("tab=contacts&q=%20sam%20&from=2026-10-01&to=2026-10-25&page=3")).toEqual({ type: "contacts", q: "sam", from: "2026-10-01", to: "2026-10-25", program: null, page: 3 });
expect(p("tab=xyz&page=abc&from=2026-13-45&program=foo")).toEqual({ type: "assessments", q: "", from: null, to: null, program: null, page: 1 });
expect(p("page=-2").page).toBe(1);
expect(p("program=general").program).toBe("general");
expect(leadQueryToSearch(p("tab=contacts&q=sam&page=2"), { page: 3 })).toBe("?tab=contacts&q=sam&page=3");
expect(leadQueryToSearch(p(""))).toBe("?tab=assessments");
expect(toSearchParams({ a: ["1", "2"], b: undefined, c: "x" }).toString()).toBe("a=1&c=x");
```

- [ ] **Step 2: Write the failing integration tests** in `tests/leads.test.ts`, with `beforeEach(resetTables)` and `afterAll(closeDb)`:
  - `insertAssessment` returns a uuid, and `listAssessments(p(""), { limit: 50, offset: 0 })` returns that row with `test_date` as `"2026-12-01"` (a string) and `created_at` as a `Date`.
  - With rows at `2026-10-24T19:30:00Z` (23:30 Dubai on 10-24) and `2026-10-24T20:30:00Z` (00:30 Dubai on 10-25), `to=2026-10-24` returns only the first and `from=2026-10-25` returns only the second.
  - `q` matches name, email or WhatsApp case-insensitively. With names `"100% Ali"` and `"1000 Ali"`, `q=100%` returns only `"100% Ali"`, and `q=a_i` matches neither. `q="O'Brien"` finds `"Liam O'Brien"`.
  - `program=spoken` filters assessments. Contacts search name, contact and message.
  - Ordering is newest first. With 60 rows, `limit 50, offset 50` returns 10 rows and `total` is 60. `limit: null` returns all 60.
  - `getLeadStats(new Date("2026-10-25T12:00:00Z"))` with rows at −1 day and −8 days returns `{ total: 2, last7Days: 1 }` for that type.
  - Connection fallback: with `vi.stubEnv("DATABASE_URL", "")`, `vi.stubEnv("NETLIFY_DATABASE_URL", <test URL>)` and `closeDb()` first, `getDb()` connects and a query works. With both empty, it rejects with `DatabaseConfigError`.
- [ ] **Step 3: Run `npx vitest run tests/filters.test.ts tests/leads.test.ts`.** Expected: FAIL.
- [ ] **Step 4: Implement `lib/db.ts`, `lib/filters.ts`, `lib/leads.ts` and `tests/helpers/db.ts`.**
  - Build WHERE clauses from postgres.js fragments.
  - Search: escape `\`, `%` and `_` with a backslash, then use `ilike ${"%" + escaped + "%"}`.
  - Dates: `from` → `created_at >= dayStartUtc(from, site.timeZone)`; `to` → `created_at < dayStartUtc(addDays(to, 1), site.timeZone)`.
  - Select `test_date::text as test_date` and `count(*)::int`.
  - Order by `created_at desc, id desc`.
- [ ] **Step 5: Run the tests again.** Expected: PASS.
- [ ] **Step 6: Commit.** `git add lib tests && git commit -m "feat: add Postgres lead storage, queries and dashboard filters"`

### Task 6: Public lead API routes

**Files:**
- Create: `app/api/assessments/route.ts`, `app/api/contact/route.ts`, `lib/api.ts`
- Test: `tests/api-leads.test.ts`

**Interfaces:**
- Consumes: `parseAssessment`, `parseContact` (Task 2); `insertAssessment`, `insertContact` (Task 5); `DatabaseConfigError` (Task 5)
- Produces:
  - `POST` handlers returning the spec's §5 responses
  - `lib/api.ts`: `readJson(request: Request): Promise<unknown>` returns `undefined` on unparseable bodies, and `jsonError(status: number, body: object): Response`

- [ ] **Step 1: Write the failing tests:**

```ts
const post = (handler, body: BodyInit) => handler(new Request("http://t/api", { method: "POST", body, headers: { "content-type": "application/json" } }));
let res = await post(assessmentsPOST, JSON.stringify(valid));
expect(res.status).toBe(201); expect((await res.json()).id).toMatch(/^[0-9a-f-]{36}$/);
expect((await listAssessments(parseLeadQuery(new URLSearchParams()), { limit: null, offset: 0 })).total).toBe(1);
res = await post(assessmentsPOST, JSON.stringify({ ...valid, company: "bot" }));
expect(res.status).toBe(201); expect(await res.json()).toEqual({ id: null });     // and still only 1 row stored
res = await post(assessmentsPOST, JSON.stringify({ ...valid, email: "x" }));
expect(res.status).toBe(400); expect(await res.json()).toMatchObject({ error: "validation", fields: { email: expect.any(String) } });
expect((await post(assessmentsPOST, "not json{")).status).toBe(400);
expect((await post(assessmentsPOST, "[1,2]")).status).toBe(400);
expect((await post(contactPOST, JSON.stringify({ name: "Sam", contact: "sam@x.com", message: "Hello" }))).status).toBe(201);
// DB not configured: vi.stubEnv("DATABASE_URL", ""); vi.stubEnv("NETLIFY_DATABASE_URL", ""); await closeDb();
// -> status 500, body { error: "server" }; then vi.unstubAllEnvs() and closeDb()
```

- [ ] **Step 2: Run `npx vitest run tests/api-leads.test.ts`.** Expected: FAIL.
- [ ] **Step 3: Implement the handlers.** Parse with `readJson`, then `parseX`: on `spam` → 201 `{id:null}`; on `invalid` → 400; on `valid` → insert → 201 `{id}`. Catch errors, `console.error` them, and return 500 `{error:"server"}`. Export `dynamic = "force-dynamic"`.
- [ ] **Step 4: Run the test again.** Expected: PASS.
- [ ] **Step 5: Commit.** `git add app/api lib/api.ts tests && git commit -m "feat: add assessment and contact lead APIs"`

### Task 7: Admin login, logout and route protection

**Files:**
- Create: `app/api/admin/login/route.ts`, `app/api/admin/logout/route.ts`, `proxy.ts`, `lib/admin-session.ts`
- Test: `tests/api-admin-auth.test.ts`

**Interfaces:**
- Consumes: Task 4 exports; `readJson`, `jsonError` (Task 6)
- Produces:
  - `POST /api/admin/login`:
    - body `{ email, password }` → 200 `{ ok: true }` with `Set-Cookie: ss_admin=…`
    - wrong credentials → 401 `{ error: "Invalid email or password" }` after `LOGIN_FAILURE_DELAY_MS`
    - unconfigured → 500 `{ error: "Admin login is not configured" }`
    - malformed body → 400 `{ error: "validation" }`
  - `POST /api/admin/logout` → 303 to `/admin/login`, with the cookie cleared (`maxAge: 0`).
  - `proxy(request: NextRequest): Promise<NextResponse>` with matcher `["/admin/:path*", "/api/admin/:path*"]`:
    - `/admin/login` and `/api/admin/login` pass through.
    - Other `/admin/*` requests without a valid session redirect (307) to `/admin/login?next=<path+search>`.
    - Other `/api/admin/*` requests without a valid session get 401 `{ error: "unauthorized" }`.
  - `lib/admin-session.ts`: `hasAdminSession(): Promise<boolean>`, using `cookies()` from `next/headers` and `verifySessionToken`.

- [ ] **Step 1: Write the failing tests:**

```ts
const login = (body: unknown) => loginPOST(new Request("http://t/api/admin/login", { method: "POST", body: JSON.stringify(body) }));
let res = await login({ email: "admin@test.local", password: "correct-horse" });
expect(res.status).toBe(200);
const setCookie = res.headers.get("set-cookie")!;
expect(setCookie).toMatch(/^ss_admin=/); expect(setCookie).toMatch(/HttpOnly/i); expect(setCookie).toMatch(/SameSite=lax/i); expect(setCookie).toMatch(/Max-Age=604800/);
const t0 = Date.now(); res = await login({ email: "admin@test.local", password: "nope" });
expect(res.status).toBe(401); expect(Date.now() - t0).toBeGreaterThanOrEqual(450);
vi.stubEnv("AUTH_SECRET", "short"); expect((await login({ email: "a", password: "b" })).status).toBe(500); vi.unstubAllEnvs();
res = await logoutPOST(new Request("http://t/api/admin/logout", { method: "POST" }));
expect(res.status).toBe(303); expect(res.headers.get("location")).toMatch(/\/admin\/login$/); expect(res.headers.get("set-cookie")).toMatch(/Max-Age=0/);
const cookie = setCookie.split(";")[0];
expect((await proxy(new NextRequest("http://t/admin?tab=contacts"))).headers.get("location")).toBe("http://t/admin/login?next=%2Fadmin%3Ftab%3Dcontacts");
expect((await proxy(new NextRequest("http://t/admin", { headers: { cookie } }))).headers.get("x-middleware-next")).toBe("1");
expect((await proxy(new NextRequest("http://t/admin/login"))).headers.get("x-middleware-next")).toBe("1");
expect((await proxy(new NextRequest("http://t/api/admin/export"))).status).toBe(401);
expect((await proxy(new NextRequest("http://t/api/admin/export", { headers: { cookie: "ss_admin=forged" } }))).status).toBe(401);
```

- [ ] **Step 2: Run `npx vitest run tests/api-admin-auth.test.ts`.** Expected: FAIL.
- [ ] **Step 3: Implement the routes, `proxy.ts` and `lib/admin-session.ts`.** Set cookies with `NextResponse.cookies.set(SESSION_COOKIE, token, sessionCookieOptions())`. Pass-through is `NextResponse.next()`.
- [ ] **Step 4: Run the test again.** Expected: PASS.
- [ ] **Step 5: Commit.** `git add app/api/admin proxy.ts lib/admin-session.ts tests && git commit -m "feat: add admin login, logout and route protection"`

### Task 8: CSV export route

**Files:**
- Create: `app/api/admin/export/route.ts`
- Test: `tests/api-export.test.ts`

**Interfaces:**
- Consumes: `isRequestAuthenticated` (Task 4); `parseLeadQuery`, `listAssessments`, `listContacts` (Task 5); `assessmentsToCsv`, `contactsToCsv`, `exportFilename` (Task 3); `site.timeZone`
- Produces: `GET /api/admin/export?type|tab=…&q=&from=&to=&program=`, which returns 200 `text/csv; charset=utf-8` with `Content-Disposition: attachment; filename="…"` and `Cache-Control: no-store`, or 401 without a session.

- [ ] **Step 1: Write the failing tests.** Seed 2 assessments (programs `academic` and `spoken`) and 1 contact, and get a cookie via `createSessionToken`.

```ts
const get = (qs: string, cookie?: string) => exportGET(new Request(`http://t/api/admin/export${qs}`, { headers: cookie ? { cookie } : {} }));
expect((await get("?type=assessments")).status).toBe(401);
let res = await get("?type=assessments&program=spoken", cookie);
expect(res.status).toBe(200); expect(res.headers.get("content-type")).toBe("text/csv; charset=utf-8");
expect(res.headers.get("content-disposition")).toMatch(/^attachment; filename="assessments-\d{4}-\d{2}-\d{2}\.csv"$/);
const body = await res.text();
expect(body.split("\r\n").filter(Boolean)).toHaveLength(2);                 // header + 1 matching row
expect(body).toContain("Spoken English");
res = await get("?tab=contacts", cookie); expect((await res.text()).split("\r\n")[0]).toBe("﻿Submitted,Name,Contact,Message");
res = await get("?type=bogus&page=zz", cookie); expect(res.status).toBe(200);    // falls back to assessments
```

- [ ] **Step 2: Run `npx vitest run tests/api-export.test.ts`.** Expected: FAIL.
- [ ] **Step 3: Implement the route** with `limit: null`, `offset: 0` and `dynamic = "force-dynamic"`.
- [ ] **Step 4: Run the test again.** Expected: PASS.
- [ ] **Step 5: Commit.** `git add app/api/admin/export tests && git commit -m "feat: add filtered CSV export for leads"`

### Task 9: Site shell and shared UI

**Files:**
- Create: `lib/content.ts`, `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/label.tsx`, `components/ui/textarea.tsx`, `components/ui/choice-pills.tsx`, `components/brand-icons.tsx`, `components/reveal.tsx`, `components/animated-heading.tsx`, `components/marquee.tsx`, `components/smooth-scroll.tsx`, `components/site-header.tsx`, `components/site-footer.tsx`, `components/whatsapp-float.tsx`, `app/(site)/layout.tsx`, `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts`
- Move: `app/page.tsx` → `app/(site)/page.tsx` (placeholder until Task 10)

**Interfaces:**
- Consumes: `site`, `whatsappLink`, `siteUrl`, `cn` (Task 1)
- Produces:
  - `lib/content.ts`:
    - `NAV_LINKS` (reference `Hp`), `FOOTER_LINKS` (`$p`), `SERVICE_LINKS` (`em`)
    - `CREDENTIALS` (`Jp`), `TESTIMONIALS` (`Yp`), `FAQS` (`Xp`)
    - `IMAGES = { portrait: Wp, portraitAlt: Gp, abuDhabi: Kp, classroom: qp }`
  - `Button` and `buttonVariants({ variant, size })`, ported from reference section 1 (cva). Links styled as buttons use `<Link className={buttonVariants(...)}>`.
  - `Input`, `Label`, `Textarea`, ported from the reference (`EE`, `DE`, `IE`).
  - `ChoicePills<T extends string>({ options: { value: T; label: string }[]; value: T; onChange(v: T): void; name: string })`, ported from `ME` as `role="radiogroup"` with buttons using `role="radio"` and `aria-checked`.
  - Brand icon components `WhatsAppIcon`, `InstagramIcon`, `YouTubeIcon`, `FacebookIcon`, `TikTokIcon`, each taking `({ size?: number; className?: string })`.
  - `Reveal({ children, delay?, className? })` (`$`), `AnimatedHeading({ lines, className?, lineClassName?, delay? })` (`GT`), `Marquee({ items })` (`KT`). All are client components.
  - `SmoothScroll()`: a client component that starts Lenis `{ duration: 1.15, smoothWheel: true }` with a RAF loop, skipped under reduced motion, wrapped in `<MotionConfig reducedMotion="user">`.

- [ ] **Step 1: Port the data and UI primitives** into the files above, copying strings and class lists verbatim from the reference.
- [ ] **Step 2: Port the header (`Zp`), footer (`tm`) and floating WhatsApp button (`nm`).** Active nav state uses `usePathname()`. The mobile menu uses `@radix-ui/react-dialog` styled as the original right-side sheet: `bg-cream`, close button top-right, closes on link click.
- [ ] **Step 3: Write `app/(site)/layout.tsx`.** Render `SmoothScroll`, `SiteHeader`, `<main className="pt-20">`, `SiteFooter` and `WhatsAppFloat`.
- [ ] **Step 4: Add `not-found.tsx`, `sitemap.ts` and `robots.ts`.**
  - `not-found.tsx`: heading "Page not found" in the site style, with a link home.
  - `sitemap.ts`: the 9 public routes with absolute URLs from `siteUrl()`.
  - `robots.ts`: allow `/`, disallow `/admin` and `/api`, and point to the sitemap.
- [ ] **Step 5: Verify.** Run `npm run lint && npm run typecheck && npm run build`. Expected: pass. Then run `npm run dev` and open `http://localhost:3000` in the browser at 1280px and 375px widths, next to `https://shadhiya-trainer.preview.static.emergentagent.com/`. Expected: the header, mobile sheet, footer and floating button match. There's no horizontal scroll at 375px, Tab focus is visible in the sheet, and Escape closes it.
- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat: add site shell, shared UI and SEO routes"`

### Task 10: Home, About, Testimonials and FAQ pages

**Files:**
- Create: `app/(site)/page.tsx` (from `YT`), `app/(site)/about/page.tsx` (`QT`), `app/(site)/testimonials/page.tsx` (`PE`), `app/(site)/faq/page.tsx` (`FE`). Put page-local data arrays (e.g. `qT`, `JT`) in the page file or a sibling `data.ts`.

**Interfaces:**
- Consumes: Task 9 components and `lib/content.ts`
- Produces: page `metadata` with these titles; the descriptions are each page's hero sub-paragraph from the reference:
  - `/`: absolute title "Shadhiya Speaks — IELTS & Spoken English Training"
  - `/about`: "About Shadhiya Shekkeer"
  - `/testimonials`: "Student Results & Testimonials"
  - `/faq`: "FAQ"

- [ ] **Step 1: Port the pages** section by section, keeping text, `data-testid`s, images (`next/image` with `sizes`; hero image `priority`) and classes. Keep pages as Server Components; only `Reveal`, `AnimatedHeading`, `Marquee` and the FAQ accordion are client components. If the FAQ uses an accordion in the reference, implement it with `<details>`/`<summary>`, styled to match.
- [ ] **Step 2: Verify.** Run `npm run build`. Expected: these 4 routes listed as static (○). In the browser, compare each page against the original at 1280px and 375px. Expected: same copy and section order, no layout breaks, no console errors, and with reduced motion emulated, content is visible without animation.
- [ ] **Step 3: Commit.** `git add -A && git commit -m "feat: port Home, About, Testimonials and FAQ pages"`

### Task 11: IELTS, Spoken English and 1-to-1 Coaching pages

**Files:**
- Create: `app/(site)/ielts-preparation/page.tsx` (`rE`), `app/(site)/spoken-english/page.tsx` (`aE`), `app/(site)/one-to-one-coaching/page.tsx` (`cE`)

**Interfaces:**
- Consumes: Task 9 components, `whatsappLink(text)` for the page-specific WhatsApp messages in the reference
- Produces: titles "IELTS Preparation (Academic & General)", "Spoken English Training" and "1-to-1 IELTS & English Coaching", with each page's hero sub-paragraph as the description.

- [ ] **Step 1: Port the three pages** with the same rules as Task 10.
- [ ] **Step 2: Verify** with the same checks as Task 10, Step 2, for these 3 routes.
- [ ] **Step 3: Commit.** `git add -A && git commit -m "feat: port IELTS, Spoken English and 1-to-1 pages"`

### Task 12: Free Assessment and Contact pages with working forms

**Files:**
- Create: `app/(site)/free-assessment/page.tsx`, `app/(site)/free-assessment/assessment-form.tsx` (client), `app/(site)/contact/page.tsx`, `app/(site)/contact/contact-form.tsx` (client), `components/honeypot.tsx`

**Interfaces:**
- Consumes: `POST /api/assessments` and `POST /api/contact` (Task 6); `ChoicePills`, `Input`, `Label`, `Textarea`, `Button` (Task 9); `whatsappLink` and `PROGRAM_LABELS` / `FORMAT_LABELS` / `DIFFICULTY_LABELS`
- Produces:
  - Titles "Book a Free Assessment" and "Contact".
  - `Honeypot()` renders a visually hidden `company` input with `tabIndex={-1}`, `autoComplete="off"` and `aria-hidden`.

- [ ] **Step 1: Port both pages and forms** from `NE` and `RE`.
  - **Default values:** format `group`, program `academic`, difficulty `writing`.
  - **Submit:** POST JSON with `fetch`; the button is disabled with "Booking…" / "Sending…" while pending.
  - **400 response:** show each `fields[name]` message under its input (`aria-invalid`, `aria-describedby`) and focus the first invalid field.
  - **Other errors:** toast "Could not submit — please try again or reach us on WhatsApp." (assessment) or "Could not send — please try WhatsApp instead." (contact).
  - **Assessment success:** show the "You're booked in." panel with the WhatsApp summary link, built with the same template as `b` in `NE`.
  - **Contact success:** toast "Enquiry sent — Shadhiya will get back to you shortly." and clear the fields.
- [ ] **Step 2: Verify end to end.**
  - Start the database with `npm run db:local` in one terminal. Copy `.env.example` to `.env.local` with local values, then run `npm run dev`.
  - In the browser, submit the assessment form and expect the success panel; its WhatsApp link carries the summary.
  - Double-click submit on a slow connection (DevTools throttling) and expect exactly one stored row.
  - Submit with email `a@b`, which passes the browser's check but fails the server's. Expect the server's field error under Email and no new row.
  - Submit the contact form: expect the success toast and cleared fields.
  - Confirm the row counts with a one-off `node --env-file=.env.local -e` script using postgres.js `select count(*)::int from assessments` (and `contacts`).
- [ ] **Step 3: Commit.** `git add -A && git commit -m "feat: port Free Assessment and Contact pages with live forms"`

### Task 13: Admin login page and leads dashboard

**Files:**
- Create:
  - `app/admin/layout.tsx` (`metadata.robots = { index: false }`, minimal chrome: brand mark + "Admin")
  - `app/admin/login/page.tsx` and `app/admin/login/login-form.tsx` (client)
  - `app/admin/page.tsx`
  - `components/admin/stat-cards.tsx`, `components/admin/lead-filters.tsx`, `components/admin/assessments-table.tsx` (client), `components/admin/contacts-table.tsx` (client), `components/admin/pagination.tsx`

**Interfaces:**
- Consumes: `hasAdminSession` (Task 7); `parseLeadQuery`, `toSearchParams`, `leadQueryToSearch`, `PAGE_SIZE` (Task 5); `listAssessments`, `listContacts`, `getLeadStats` (Task 5); `formatDisplayDate`, `formatDateTimeInZone` (Task 3); labels (Task 2); `whatsappChatLink` (Task 1)
- Produces:
  - **Login page:** a port of the original login card (`YE` logged-out branch). Submitting posts to `/api/admin/login`. On 200 → `router.replace(next ?? "/admin")`, where `next` is only honored if it starts with `/admin`. Otherwise it shows the error text from the response. If already signed in, the page redirects to `/admin`.
  - **Dashboard page** (`async ({ searchParams })`):
    - If there's no session → `redirect("/admin/login")`.
    - Header "Leads Dashboard" and Logout (`<form method="post" action="/api/admin/logout">`).
    - Four stat cards: Assessment Bookings, Contact Enquiries, and the last 7 days for each.
    - Tab links (`leadQueryToSearch(q, { type, page: 1 })`).
    - The filter GET form: search, from, to, plus program on the assessments tab. It has a hidden `tab`, an "Apply" button and a "Clear" link.
    - "Export CSV" link: `/api/admin/export${leadQueryToSearch(q, { page: 1 })}` with `download`.
    - The table and pagination ("Showing X–Y of Z", Previous/Next links).
    - On query failure → the text "Couldn't load leads. Check the database connection and try again." with a Retry link.
  - **Tables:** columns per the spec §6. Clicking a row (or pressing Enter/Space on it, since rows have `tabIndex={0}` and `aria-expanded`) toggles a detail row with every field and the full message.
    - Assessment contact cell: WhatsApp (`whatsappChatLink`) and `mailto:` icon buttons with `aria-label`s.
    - Empty states: "No bookings yet." / "No enquiries yet.", or "No leads match these filters." when any filter is set.

- [ ] **Step 1: Implement the login page and form.**
- [ ] **Step 2: Implement the dashboard page and admin components.**
- [ ] **Step 3: Verify in the browser** (db:local + dev server, with the leads from Task 12 plus 60 seeded rows via a one-off `node` script using `insertAssessment`):
  - `/admin` redirects to login. A wrong password shows "Invalid email or password". The right one lands on the dashboard.
  - The stats match the row counts. Pagination shows 50 rows, then the remainder.
  - Search, the date range and the program filter change the rows, and the URL updates.
  - Export downloads a CSV with exactly the filtered rows; open it and check the header and a non-ASCII name.
  - Row expand works with mouse and keyboard.
  - Logout returns to login, and `/admin` redirects again.
  - At 375px the table scrolls inside its container, not the page.
  - Stop db:local and reload: the error message shows instead of a crash.
- [ ] **Step 4: Run `npm run lint && npm run typecheck && npm test && npm run build`.** Expected: pass.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: add admin login and leads dashboard with filters and export"`

### Task 14: Docs and final verification

**Files:**
- Create: `DEPLOY.md`
- Modify: `README.md` (replace the create-next-app text)

**Interfaces:**
- Consumes: everything above
- Produces: the docs described in the spec §8–9

- [ ] **Step 1: Write `README.md`.** Cover what the project is; local setup (`npm i`, `cp .env.example .env.local`, `npm run db:local`, `npm run dev`); `npm test`; where content lives (`lib/site.ts`, `lib/content.ts`, page files); and the open items from the spec §11.
- [ ] **Step 2: Write `DEPLOY.md`.**
  - **Vercel:** push to GitHub → import → Storage → Neon (sets `DATABASE_URL`) → add `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET` (`openssl rand -base64 32`) and optionally `NEXT_PUBLIC_SITE_URL` → deploy.
  - **Netlify:** import → build settings auto-detected → enable Netlify DB (sets `NETLIFY_DATABASE_URL`) or add a Neon `DATABASE_URL` → the same admin variables → deploy.
  - Post-deploy checklist.
  - Troubleshooting: "Admin login is not configured", 500 on form submit when the DB variable is missing.
- [ ] **Step 3: Run the full verification.** `npm run lint && npm run typecheck && npm test && npm run build`. Expected: all pass. Then do a final browser pass over all 9 public pages plus admin at 1280px and 375px against the original.
- [ ] **Step 4: Commit.** `git add -A && git commit -m "docs: add README and deployment guide"`
