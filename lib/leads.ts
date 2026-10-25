import type postgres from "postgres";
import { getDb } from "./db";
import { addDays, dayStartUtc } from "./dates";
import type { AssessmentRow, ContactRow } from "./export";
import type { LeadQuery, LeadType } from "./filters";
import { LEAD_STATUSES, type LeadStatus } from "./labels";
import { site } from "./site";
import type { AssessmentInput, ContactInput } from "./validation";

type Page = { limit: number | null; offset: number };

export type LeadStats = {
  assessments: { total: number; last7Days: number };
  contacts: { total: number; last7Days: number };
};

export async function insertAssessment(input: AssessmentInput): Promise<string> {
  const sql = await getDb();
  const [row] = await sql<{ id: string }[]>`
    insert into assessments
      (full_name, whatsapp, email, class_format, program, target_band, test_date, difficulty)
    values
      (${input.full_name}, ${input.whatsapp}, ${input.email}, ${input.class_format},
       ${input.program}, ${input.target_band}, ${input.test_date}, ${input.difficulty})
    returning id`;
  return row.id;
}

export async function insertContact(input: ContactInput): Promise<string> {
  const sql = await getDb();
  const [row] = await sql<{ id: string }[]>`
    insert into contacts (name, contact, message)
    values (${input.name}, ${input.contact}, ${input.message})
    returning id`;
  return row.id;
}

function likePattern(q: string): string {
  return `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
}

/** WHERE clause for the dashboard filters. `withStatus: false` is used for the per-status counts. */
function whereFor(sql: postgres.Sql, type: LeadType, query: LeadQuery, withStatus = true) {
  const pattern = likePattern(query.q);
  const search = !query.q
    ? sql``
    : type === "assessments"
      ? sql`and (full_name ilike ${pattern} or email ilike ${pattern} or whatsapp ilike ${pattern})`
      : sql`and (name ilike ${pattern} or contact ilike ${pattern} or message ilike ${pattern})`;
  const program = type === "assessments" && query.program ? sql`and program = ${query.program}` : sql``;
  const status = withStatus && query.status ? sql`and status = ${query.status}` : sql``;
  const from = query.from ? sql`and created_at >= ${dayStartUtc(query.from, site.timeZone)}` : sql``;
  const to = query.to ? sql`and created_at < ${dayStartUtc(addDays(query.to, 1), site.timeZone)}` : sql``;
  return sql`where true ${search} ${program} ${status} ${from} ${to}`;
}

function pageClause(sql: postgres.Sql, page: Page) {
  return page.limit === null ? sql`` : sql`limit ${page.limit} offset ${page.offset}`;
}

export async function listAssessments(
  query: LeadQuery,
  page: Page,
): Promise<{ rows: AssessmentRow[]; total: number }> {
  const sql = await getDb();
  const where = whereFor(sql, "assessments", query);
  const [rows, [{ total }]] = await Promise.all([
    sql<AssessmentRow[]>`
      select id, created_at, full_name, whatsapp, email, class_format, program,
             target_band, test_date::text as test_date, difficulty, status, notes, status_updated_at
      from assessments ${where}
      order by created_at desc, id desc
      ${pageClause(sql, page)}`,
    sql<{ total: number }[]>`select count(*)::int as total from assessments ${where}`,
  ]);
  return { rows: [...rows], total };
}

export async function listContacts(
  query: LeadQuery,
  page: Page,
): Promise<{ rows: ContactRow[]; total: number }> {
  const sql = await getDb();
  const where = whereFor(sql, "contacts", query);
  const [rows, [{ total }]] = await Promise.all([
    sql<ContactRow[]>`
      select id, created_at, name, contact, message, status, notes, status_updated_at
      from contacts ${where}
      order by created_at desc, id desc
      ${pageClause(sql, page)}`,
    sql<{ total: number }[]>`select count(*)::int as total from contacts ${where}`,
  ]);
  return { rows: [...rows], total };
}

/** How many leads of each status match the current filters (ignoring the status filter itself). */
export async function countByStatus(query: LeadQuery): Promise<Record<LeadStatus, number>> {
  const sql = await getDb();
  const rows = await sql<{ status: string; count: number }[]>`
    select status, count(*)::int as count
    from ${sql(query.type)} ${whereFor(sql, query.type, query, false)}
    group by status`;
  const counts = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0])) as Record<LeadStatus, number>;
  for (const row of rows) {
    if (row.status in counts) counts[row.status as LeadStatus] = row.count;
  }
  return counts;
}

/** Sets the status and/or notes of the given leads. Returns how many rows changed. */
export async function updateLeads(
  type: LeadType,
  ids: string[],
  change: { status?: LeadStatus; notes?: string },
): Promise<number> {
  const sql = await getDb();
  const status =
    change.status === undefined ? sql`` : sql`status = ${change.status}, status_updated_at = now(),`;
  const notes = change.notes === undefined ? sql`` : sql`notes = ${change.notes.trim() || null},`;
  const result = await sql`
    update ${sql(type)} set ${status} ${notes} id = id
    where id = any(${sql.array(ids)}::uuid[])`;
  return result.count;
}

/** Permanently deletes the given leads. Returns how many rows were removed. */
export async function deleteLeads(type: LeadType, ids: string[]): Promise<number> {
  const sql = await getDb();
  const result = await sql`delete from ${sql(type)} where id = any(${sql.array(ids)}::uuid[])`;
  return result.count;
}

export async function getLeadStats(now: Date = new Date()): Promise<LeadStats> {
  const sql = await getDb();
  const since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const [[a], [c]] = await Promise.all([
    sql<{ total: number; recent: number }[]>`
      select count(*)::int as total, count(*) filter (where created_at >= ${since})::int as recent
      from assessments`,
    sql<{ total: number; recent: number }[]>`
      select count(*)::int as total, count(*) filter (where created_at >= ${since})::int as recent
      from contacts`,
  ]);
  return {
    assessments: { total: a.total, last7Days: a.recent },
    contacts: { total: c.total, last7Days: c.recent },
  };
}
