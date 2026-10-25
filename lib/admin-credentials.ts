import { SESSION_COOKIE, getAuthConfig, readCookie, readSessionToken } from "./auth";
import { DatabaseConfigError, getDb } from "./db";
import { hashPassword, safeEqual, sha256Hex, verifyPassword } from "./password";

/**
 * The admin password starts as ADMIN_PASSWORD from the environment. Changing it in the
 * dashboard stores a hash in `admin_credentials`, tagged with a fingerprint of ADMIN_PASSWORD
 * at that moment. If ADMIN_PASSWORD is later changed in the hosting settings, the fingerprint
 * no longer matches and the environment password takes over again — that's the recovery path.
 */

type StoredCredential = { password_hash: string; env_fingerprint: string; version: number };

type ActiveCredential = {
  email: string;
  secret: Uint8Array;
  /** Changes whenever the password changes; sessions carry it. */
  version: string;
  source: "env" | "dashboard";
  check: (password: string) => Promise<boolean>;
};

// A short cache keeps admin requests from re-reading the row every time. It lives on globalThis so
// every route bundle in this process shares it and sees a password change immediately.
const CACHE_MS = 10_000;
type Cache = { row: StoredCredential | null; expires: number } | null;
const globalCred = globalThis as typeof globalThis & { __shadhiyaCredCache?: { value: Cache } };
const cache = (globalCred.__shadhiyaCredCache ??= { value: null });

async function loadStored(): Promise<StoredCredential | null> {
  if (cache.value && cache.value.expires > Date.now()) return cache.value.row;
  let row: StoredCredential | null = null;
  try {
    const sql = await getDb();
    [row = null] = await sql<StoredCredential[]>`
      select password_hash, env_fingerprint, version from admin_credentials where id = 1`;
  } catch (error) {
    // Without a database there can be no dashboard password, so the environment one applies.
    if (!(error instanceof DatabaseConfigError)) throw error;
  }
  cache.value = { row, expires: Date.now() + CACHE_MS };
  return row;
}

/** The password currently in force, or null when admin login isn't configured. Throws if the database is unreachable. */
export async function getActiveCredential(): Promise<ActiveCredential | null> {
  const config = getAuthConfig();
  if (!config) return null;
  const fingerprint = sha256Hex(config.password);
  const stored = await loadStored();

  if (stored && safeEqual(stored.env_fingerprint, fingerprint)) {
    return {
      email: config.email,
      secret: config.secret,
      version: `db:${stored.version}`,
      source: "dashboard",
      check: (password) => verifyPassword(password, stored.password_hash),
    };
  }
  return {
    email: config.email,
    secret: config.secret,
    version: `env:${fingerprint.slice(0, 16)}`,
    source: "env",
    check: async (password) => safeEqual(password, config.password),
  };
}

export type LoginResult =
  | { status: "ok"; version: string; secret: Uint8Array }
  | { status: "invalid" }
  | { status: "unconfigured" };

export async function checkAdminLogin(email: string, password: string): Promise<LoginResult> {
  const active = await getActiveCredential();
  if (!active) return { status: "unconfigured" };
  const emailOk = safeEqual(email.trim().toLowerCase(), active.email.toLowerCase());
  const passwordOk = await active.check(password);
  return emailOk && passwordOk ? { status: "ok", version: active.version, secret: active.secret } : { status: "invalid" };
}

/** True when the token is genuine, unexpired and issued for the current password. */
export async function isSessionTokenCurrent(token: string | undefined): Promise<boolean> {
  try {
    const active = await getActiveCredential();
    if (!active) return false;
    const session = await readSessionToken(token, active.secret);
    return session !== null && session.version === active.version;
  } catch (error) {
    console.error("Could not verify admin session", error);
    return false;
  }
}

export async function isRequestAuthenticated(request: Request): Promise<boolean> {
  return isSessionTokenCurrent(readCookie(request.headers.get("cookie"), SESSION_COOKIE));
}

export const MIN_PASSWORD_LENGTH = 8;

export type ChangeResult =
  | { status: "ok"; version: string; secret: Uint8Array }
  | { status: "wrong-current" }
  | { status: "unconfigured" };

/** Replaces the admin password. Every session except the one re-issued by the caller stops working. */
export async function changeAdminPassword(current: string, next: string): Promise<ChangeResult> {
  const active = await getActiveCredential();
  if (!active) return { status: "unconfigured" };
  if (!(await active.check(current))) return { status: "wrong-current" };

  const config = getAuthConfig()!;
  const sql = await getDb();
  const [row] = await sql<{ version: number }[]>`
    insert into admin_credentials (id, password_hash, env_fingerprint, version, updated_at)
    values (1, ${await hashPassword(next)}, ${sha256Hex(config.password)}, 1, now())
    on conflict (id) do update set
      password_hash = excluded.password_hash,
      env_fingerprint = excluded.env_fingerprint,
      version = admin_credentials.version + 1,
      updated_at = now()
    returning version`;
  cache.value = null;
  return { status: "ok", version: `db:${row.version}`, secret: config.secret };
}
