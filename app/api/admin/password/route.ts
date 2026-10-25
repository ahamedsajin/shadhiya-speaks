import { NextResponse } from "next/server";
import { z } from "zod";
import { MIN_PASSWORD_LENGTH, changeAdminPassword, isRequestAuthenticated } from "@/lib/admin-credentials";
import { json, readJson } from "@/lib/api";
import { LOGIN_FAILURE_DELAY_MS, SESSION_COOKIE, createSessionToken, sessionCookieOptions } from "@/lib/auth";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `Use at least ${MIN_PASSWORD_LENGTH} characters`)
      .max(200, "Use 200 characters or fewer"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, { path: ["confirmPassword"], message: "Passwords don't match" })
  .refine((d) => d.newPassword !== d.currentPassword, {
    path: ["newPassword"],
    message: "Choose a password different from the current one",
  });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Changes the admin password, keeps this browser signed in and signs out every other session. */
export async function POST(request: Request) {
  if (!(await isRequestAuthenticated(request))) return json(401, { error: "unauthorized" });

  const parsed = schema.safeParse(await readJson(request));
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) fields[String(issue.path[0] ?? "form")] ??= issue.message;
    return json(400, { error: "validation", fields });
  }

  try {
    const result = await changeAdminPassword(parsed.data.currentPassword, parsed.data.newPassword);
    if (result.status === "unconfigured") return json(500, { error: "Admin login is not configured" });
    if (result.status === "wrong-current") {
      await sleep(LOGIN_FAILURE_DELAY_MS);
      return json(400, { error: "validation", fields: { currentPassword: "Current password is incorrect" } });
    }
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(SESSION_COOKIE, await createSessionToken(result.secret, result.version), sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Failed to change admin password", error);
    return json(500, { error: "server" });
  }
}
