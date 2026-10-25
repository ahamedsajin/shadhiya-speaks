import postgres from "postgres";

export class DatabaseConfigError extends Error {
  constructor() {
    super("No database configured: set DATABASE_URL (or NETLIFY_DATABASE_URL).");
    this.name = "DatabaseConfigError";
  }
}

export const SCHEMA_SQL = `
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

-- Lead management (added later; safe to re-run on existing tables).
alter table assessments add column if not exists status text not null default 'new';
alter table assessments add column if not exists notes text;
alter table assessments add column if not exists status_updated_at timestamptz;
alter table contacts add column if not exists status text not null default 'new';
alter table contacts add column if not exists notes text;
alter table contacts add column if not exists status_updated_at timestamptz;
create index if not exists assessments_status_idx on assessments (status);
create index if not exists contacts_status_idx on contacts (status);

create table if not exists site_settings (
  id         int primary key default 1 check (id = 1),
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists media (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  content_type text not null,
  filename     text,
  size         int not null,
  data         bytea not null,
  orphaned_at  timestamptz
);
`;

type DbState = { client: postgres.Sql | null; ready: Promise<postgres.Sql> | null; schema: string | null };

// Kept on globalThis so dev hot reloads reuse one connection instead of opening a new one each time.
const globalDb = globalThis as typeof globalThis & { __shadhiyaDb?: DbState };
const state: DbState = (globalDb.__shadhiyaDb ??= { client: null, ready: null, schema: null });

/** Returns a connected client, creating or updating the tables on first use in this process. */
export function getDb(): Promise<postgres.Sql> {
  if (!state.ready || state.schema !== SCHEMA_SQL) {
    let sql = state.client;
    if (!sql) {
      const url = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
      if (!url) return Promise.reject(new DatabaseConfigError());
      sql = postgres(url, { max: 1, prepare: false, onnotice: () => {} });
      state.client = sql;
    }
    const client = sql;
    state.schema = SCHEMA_SQL;
    state.ready = client
      .unsafe(SCHEMA_SQL)
      .then(() => client)
      .catch((error) => {
        state.ready = null;
        state.client = null;
        state.schema = null;
        void client.end({ timeout: 1 });
        throw error;
      });
  }
  return state.ready;
}

export async function closeDb(): Promise<void> {
  const sql = state.client;
  state.client = null;
  state.ready = null;
  state.schema = null;
  if (sql) await sql.end({ timeout: 5 });
}
