import { isIsoDay } from "./dates";
import { LEAD_STATUSES, PROGRAMS, type LeadStatus, type Program } from "./labels";

export const PAGE_SIZE = 50;

export type LeadType = "assessments" | "contacts";

export type LeadQuery = {
  type: LeadType;
  q: string;
  from: string | null;
  to: string | null;
  program: Program | null;
  status: LeadStatus | null;
  page: number;
};

/** Reads dashboard/export filters from a query string. Anything malformed falls back to its default. */
export function parseLeadQuery(params: URLSearchParams): LeadQuery {
  const rawType = params.get("tab") ?? params.get("type");
  const type: LeadType = rawType === "contacts" ? "contacts" : "assessments";
  const q = (params.get("q") ?? "").trim().slice(0, 200);
  const day = (key: string) => {
    const v = params.get(key);
    return v && isIsoDay(v) ? v : null;
  };
  const rawProgram = params.get("program");
  const program = PROGRAMS.includes(rawProgram as Program) ? (rawProgram as Program) : null;
  const rawStatus = params.get("status");
  const status = LEAD_STATUSES.includes(rawStatus as LeadStatus) ? (rawStatus as LeadStatus) : null;
  const page = Number.parseInt(params.get("page") ?? "", 10);
  return {
    type,
    q,
    from: day("from"),
    to: day("to"),
    program,
    status,
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export function toSearchParams(record: Record<string, string | string[] | undefined>): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(record)) {
    const v = Array.isArray(value) ? value[0] : value;
    if (v !== undefined) params.set(key, v);
  }
  return params;
}

/** Builds "?tab=…" for links, leaving out defaults. */
export function leadQueryToSearch(query: LeadQuery, overrides: Partial<LeadQuery> = {}): string {
  const q = { ...query, ...overrides };
  const params = new URLSearchParams({ tab: q.type });
  if (q.q) params.set("q", q.q);
  if (q.from) params.set("from", q.from);
  if (q.to) params.set("to", q.to);
  if (q.program && q.type === "assessments") params.set("program", q.program);
  if (q.status) params.set("status", q.status);
  if (q.page > 1) params.set("page", String(q.page));
  return `?${params.toString()}`;
}

export function hasActiveFilters(query: LeadQuery): boolean {
  return Boolean(
    query.q || query.from || query.to || query.status || (query.type === "assessments" && query.program),
  );
}
