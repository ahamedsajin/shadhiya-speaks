import { NextResponse } from "next/server";
import { readJson } from "@/lib/api";
import {
  LOGIN_FAILURE_DELAY_MS,
  SESSION_COOKIE,
  checkCredentials,
  createSessionToken,
  getAuthConfig,
  sessionCookieOptions,
} from "@/lib/auth";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  const body = await readJson(request);
  const email = typeof body === "object" && body !== null ? (body as Record<string, unknown>).email : undefined;
  const password = typeof body === "object" && body !== null ? (body as Record<string, unknown>).password : undefined;
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const result = checkCredentials(email, password);
  if (result === "unconfigured") {
    console.error("Admin login is not configured: set ADMIN_EMAIL, ADMIN_PASSWORD and AUTH_SECRET (32+ chars).");
    return NextResponse.json({ error: "Admin login is not configured" }, { status: 500 });
  }
  if (result === "invalid") {
    await sleep(LOGIN_FAILURE_DELAY_MS);
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await createSessionToken(getAuthConfig()!.secret);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}
