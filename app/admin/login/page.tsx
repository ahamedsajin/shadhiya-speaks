import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/admin-session";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Admin Login" };

/** Only same-site admin paths are allowed as a post-login destination. */
function safeNext(value: string | string[] | undefined): string {
  const next = Array.isArray(value) ? value[0] : value;
  return next && next.startsWith("/admin") && !next.startsWith("/admin/login") ? next : "/admin";
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const next = safeNext((await searchParams).next);
  if (await hasAdminSession()) redirect(next);

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-24" data-testid="admin-login-page">
      <LoginForm next={next} />
    </div>
  );
}
