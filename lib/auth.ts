import { createHash, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "ss_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
export const LOGIN_FAILURE_DELAY_MS = 500;

type AuthConfig = { email: string; password: string; secret: Uint8Array };

/** Admin settings from the environment, or null when any is missing or too weak. */
export function getAuthConfig(env: NodeJS.ProcessEnv = process.env): AuthConfig | null {
  const email = env.ADMIN_EMAIL?.trim();
  const password = env.ADMIN_PASSWORD;
  const secret = env.AUTH_SECRET;
  if (!email || !password || !secret || secret.length < 32) return null;
  return { email, password, secret: new TextEncoder().encode(secret) };
}

function sameValue(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkCredentials(
  email: string,
  password: string,
  env: NodeJS.ProcessEnv = process.env,
): "ok" | "invalid" | "unconfigured" {
  const config = getAuthConfig(env);
  if (!config) return "unconfigured";
  const emailOk = sameValue(email.trim().toLowerCase(), config.email.toLowerCase());
  const passwordOk = sameValue(password, config.password);
  return emailOk && passwordOk ? "ok" : "invalid";
}

export async function createSessionToken(secret: Uint8Array, now: Date = new Date()): Promise<string> {
  const iat = Math.floor(now.getTime() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin")
    .setIssuedAt(iat)
    .setExpirationTime(iat + SESSION_MAX_AGE_SECONDS)
    .sign(secret);
}

export async function verifySessionToken(token: string | undefined, secret: Uint8Array): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return payload.sub === "admin";
  } catch {
    return false;
  }
}

export function readCookie(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

export async function isRequestAuthenticated(
  request: Request,
  env: NodeJS.ProcessEnv = process.env,
): Promise<boolean> {
  const config = getAuthConfig(env);
  if (!config) return false;
  return verifySessionToken(readCookie(request.headers.get("cookie"), SESSION_COOKIE), config.secret);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
