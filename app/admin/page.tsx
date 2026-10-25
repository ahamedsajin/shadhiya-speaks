import { Download, LogOut, RefreshCw } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AssessmentsTable, ContactsTable, type AssessmentView, type ContactView } from "@/components/admin/lead-tables";
import { buttonVariants } from "@/components/ui/button";
import { hasAdminSession } from "@/lib/admin-session";
import { formatDisplayDate, formatDisplayDateTime } from "@/lib/dates";
import type { AssessmentRow, ContactRow } from "@/lib/export";
import {
  PAGE_SIZE,
  hasActiveFilters,
  leadQueryToSearch,
  parseLeadQuery,
  toSearchParams,
  type LeadQuery,
} from "@/lib/filters";
import {
  DIFFICULTY_LABELS,
  FORMAT_LABELS,
  LEAD_STATUSES,
  PROGRAMS,
  PROGRAM_LABELS,
  STATUS_LABELS,
  STATUS_STYLES,
  type LeadStatus,
} from "@/lib/labels";
import { countByStatus, getLeadStats, listAssessments, listContacts, type LeadStats } from "@/lib/leads";
import { site, whatsappChatLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Leads Dashboard" };

const tz = site.timeZone;

function leadMeta(r: AssessmentRow | ContactRow) {
  return {
    id: r.id,
    submitted: formatDisplayDate(r.created_at, tz),
    submittedFull: formatDisplayDateTime(r.created_at, tz),
    status: r.status,
    notes: r.notes,
    statusUpdated: r.status_updated_at ? formatDisplayDateTime(r.status_updated_at, tz) : null,
  };
}

function toAssessmentView(r: AssessmentRow): AssessmentView {
  return {
    ...leadMeta(r),
    name: r.full_name,
    whatsapp: r.whatsapp,
    whatsappHref: whatsappChatLink(r.whatsapp),
    email: r.email,
    program: PROGRAM_LABELS[r.program] ?? r.program,
    format: FORMAT_LABELS[r.class_format] ?? r.class_format,
    target: r.target_band,
    testDate: r.test_date,
    difficulty: DIFFICULTY_LABELS[r.difficulty] ?? r.difficulty,
  };
}

function contactHref(contact: string): string | null {
  if (/^\S+@\S+\.\S+$/.test(contact)) return `mailto:${contact}`;
  if ((contact.match(/\d/g) ?? []).length >= 7 && /^[+\d\s()-]+$/.test(contact)) return whatsappChatLink(contact);
  return null;
}

function toContactView(r: ContactRow): ContactView {
  return {
    ...leadMeta(r),
    name: r.name,
    contact: r.contact,
    contactHref: contactHref(r.contact),
    message: r.message,
  };
}

type Loaded =
  | {
      ok: true;
      stats: LeadStats;
      statusCounts: Record<LeadStatus, number>;
      total: number;
      assessments: AssessmentView[];
      contacts: ContactView[];
    }
  | { ok: false };

async function load(query: LeadQuery): Promise<Loaded> {
  try {
    const page = { limit: PAGE_SIZE, offset: (query.page - 1) * PAGE_SIZE };
    const stats = await getLeadStats();
    const statusCounts = await countByStatus(query);
    if (query.type === "contacts") {
      const { rows, total } = await listContacts(query, page);
      return { ok: true, stats, statusCounts, total, assessments: [], contacts: rows.map(toContactView) };
    }
    const { rows, total } = await listAssessments(query, page);
    return { ok: true, stats, statusCounts, total, assessments: rows.map(toAssessmentView), contacts: [] };
  } catch (error) {
    console.error("Failed to load leads dashboard", error);
    return { ok: false };
  }
}

function StatCard({ value, label, tone }: { value: number; label: string; tone: "emerald" | "gold" | "muted" }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-6 py-4">
      <p
        className={cn(
          "font-heading text-3xl font-semibold",
          tone === "emerald" ? "text-emerald" : tone === "gold" ? "text-gold" : "text-obsidian",
        )}
      >
        {value}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">{label}</p>
    </div>
  );
}

const fieldLabel = "font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted";
const field =
  "h-9 w-full rounded-lg border border-input bg-white px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await hasAdminSession())) redirect("/admin/login");

  const query = parseLeadQuery(toSearchParams(await searchParams));
  const data = await load(query);
  const isAssessments = query.type === "assessments";
  const filtered = hasActiveFilters(query);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" data-testid="admin-dashboard">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">Admin</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-obsidian sm:text-4xl">Leads Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin${leadQueryToSearch(query)}`}
            className={cn(buttonVariants({ variant: "outline" }), "gap-1")}
            data-testid="admin-refresh-btn"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Link>
          <form method="post" action="/api/admin/logout">
            <button
              type="submit"
              className={cn(buttonVariants({ variant: "outline" }), "gap-1")}
              data-testid="admin-logout-btn"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </div>

      {!data.ok ? (
        <div className="mt-16 rounded-2xl border border-line bg-white p-10 text-center" data-testid="admin-error">
          <p className="text-ink-muted">Couldn&apos;t load leads. Check the database connection and try again.</p>
          <Link href={`/admin${leadQueryToSearch(query)}`} className={cn(buttonVariants(), "mt-4")}>
            Retry
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4" data-testid="admin-stats">
            <StatCard value={data.stats.assessments.total} label="Assessment Bookings" tone="emerald" />
            <StatCard value={data.stats.assessments.last7Days} label="Bookings · Last 7 days" tone="muted" />
            <StatCard value={data.stats.contacts.total} label="Contact Enquiries" tone="gold" />
            <StatCard value={data.stats.contacts.last7Days} label="Enquiries · Last 7 days" tone="muted" />
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-2" role="tablist" aria-label="Lead type">
            {(
              [
                { type: "assessments", label: "Free Assessment Bookings", count: data.stats.assessments.total },
                { type: "contacts", label: "Contact Enquiries", count: data.stats.contacts.total },
              ] as const
            ).map((tab) => (
              <Link
                key={tab.type}
                href={`/admin${leadQueryToSearch(query, { type: tab.type, page: 1, program: null, status: null })}`}
                role="tab"
                aria-selected={query.type === tab.type}
                data-testid={`admin-tab-${tab.type}`}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  query.type === tab.type
                    ? "border-emerald bg-emerald text-white shadow-md shadow-emerald/20"
                    : "border-line bg-white text-obsidian/75 hover:border-emerald/50 hover:text-emerald",
                )}
              >
                {tab.label} <span className="ml-1 opacity-75">({tab.count})</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Filter by status" data-testid="status-filters">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Status</span>
            <Link
              href={`/admin${leadQueryToSearch(query, { status: null, page: 1 })}`}
              aria-current={query.status === null ? "true" : undefined}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                query.status === null
                  ? "border-obsidian bg-obsidian text-white"
                  : "border-line bg-white text-obsidian/75 hover:border-obsidian/40",
              )}
            >
              All{" "}
              <span className="opacity-70">({LEAD_STATUSES.reduce((n, s) => n + data.statusCounts[s], 0)})</span>
            </Link>
            {LEAD_STATUSES.map((status) => (
              <Link
                key={status}
                href={`/admin${leadQueryToSearch(query, { status: query.status === status ? null : status, page: 1 })}`}
                aria-current={query.status === status ? "true" : undefined}
                data-testid={`status-filter-${status}`}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  STATUS_STYLES[status],
                  query.status === status ? "ring-2 ring-obsidian/70 ring-offset-1" : "opacity-80 hover:opacity-100",
                )}
              >
                {STATUS_LABELS[status]} <span className="opacity-70">({data.statusCounts[status]})</span>
              </Link>
            ))}
          </div>

          <form
            method="get"
            action="/admin"
            className="mt-4 grid grid-cols-1 items-end gap-4 rounded-2xl border border-line bg-white p-5 sm:grid-cols-2 lg:grid-cols-12"
            data-testid="admin-filters"
          >
            <input type="hidden" name="tab" value={query.type} />
            {query.status && <input type="hidden" name="status" value={query.status} />}
            <label className={cn("space-y-1.5", isAssessments ? "lg:col-span-4" : "lg:col-span-6")}>
              <span className={fieldLabel}>Search</span>
              <input
                type="search"
                name="q"
                defaultValue={query.q}
                placeholder={isAssessments ? "Name, email or WhatsApp" : "Name, contact or message"}
                className={field}
              />
            </label>
            <label className="space-y-1.5 lg:col-span-2">
              <span className={fieldLabel}>From</span>
              <input type="date" name="from" defaultValue={query.from ?? ""} className={field} />
            </label>
            <label className="space-y-1.5 lg:col-span-2">
              <span className={fieldLabel}>To</span>
              <input type="date" name="to" defaultValue={query.to ?? ""} className={field} />
            </label>
            {isAssessments && (
              <label className="space-y-1.5 lg:col-span-2">
                <span className={fieldLabel}>Program</span>
                <select name="program" defaultValue={query.program ?? ""} className={field}>
                  <option value="">All programs</option>
                  {PROGRAMS.map((p) => (
                    <option key={p} value={p}>
                      {PROGRAM_LABELS[p]}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <div className="flex gap-2 lg:col-span-2">
              <button type="submit" className={cn(buttonVariants({ size: "lg" }), "flex-1")}>
                Apply
              </button>
              {filtered && (
                <Link
                  href={`/admin?tab=${query.type}`}
                  className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-ink-muted")}
                >
                  Clear
                </Link>
              )}
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink-muted" data-testid="admin-result-count">
              {data.total === 0
                ? "No results"
                : `Showing ${Math.min((query.page - 1) * PAGE_SIZE + 1, data.total)}–${Math.min(
                    query.page * PAGE_SIZE,
                    data.total,
                  )} of ${data.total}`}
              {filtered && " (filtered)"}
            </p>
            <a
              href={`/api/admin/export${leadQueryToSearch(query, { page: 1 })}`}
              download
              data-testid="admin-export-btn"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "gap-1.5 border-emerald/40 text-emerald hover:bg-emerald hover:text-white",
              )}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </a>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-white">
            {isAssessments ? (
              <AssessmentsTable
                rows={data.assessments}
                emptyMessage={filtered ? "No leads match these filters." : "No bookings yet."}
              />
            ) : (
              <ContactsTable
                rows={data.contacts}
                emptyMessage={filtered ? "No leads match these filters." : "No enquiries yet."}
              />
            )}
          </div>

          {data.total > PAGE_SIZE && (
            <nav className="mt-6 flex items-center justify-between" aria-label="Pagination">
              {query.page > 1 ? (
                <Link
                  href={`/admin${leadQueryToSearch(query, { page: query.page - 1 })}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  ← Previous
                </Link>
              ) : (
                <span />
              )}
              <span className="text-sm text-ink-muted">
                Page {query.page} of {Math.max(1, Math.ceil(data.total / PAGE_SIZE))}
              </span>
              {query.page * PAGE_SIZE < data.total ? (
                <Link
                  href={`/admin${leadQueryToSearch(query, { page: query.page + 1 })}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Next →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
