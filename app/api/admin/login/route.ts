import { NextResponse } from "next/server";
import { checkAdminLogin, type LoginResult } from "@/lib/admin-credentials";
import { readJson } from "@/lib/api";
import { LOGIN_FAILURE_DELAY_MS, SESSION_COOKIE, createSessionToken, sessionCookieOptions } from "@/lib/auth";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  const body = await readJson(request);
  const email = typeof body === "object" && body !== null ? (body as Record<string, unknown>).email : undefined;
  const password = typeof body === "object" && body !== null ? (body as Record<string, unknown>).password : undefined;
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  let result: LoginResult;
  try {
    result = await checkAdminLogin(email, password);
  } catch (error) {
    console.error("Admin login could not reach the database", error);
    return NextResponse.json({ error: "Can't reach the database right now. Please try again." }, { status: 503 });
  }
  if (result.status === "unconfigured") {
    console.error("Admin login is not configured: set ADMIN_EMAIL, ADMIN_PASSWORD and AUTH_SECRET (32+ chars).");
    return NextResponse.json({ error: "Admin login is not configured" }, { status: 500 });
  }
  if (result.status === "invalid") {
    await sleep(LOGIN_FAILURE_DELAY_MS);
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(result.secret, result.version), sessionCookieOptions());
  return response;
}
