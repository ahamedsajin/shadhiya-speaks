import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { MIN_PASSWORD_LENGTH, getActiveCredential } from "@/lib/admin-credentials";
import { hasAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  if (!(await hasAdminSession())) redirect("/admin/login?next=/admin/account");
  const active = await getActiveCredential();

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8" data-testid="admin-account">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">Admin</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold text-obsidian sm:text-4xl">Account</h1>

      <section className="mt-10 rounded-2xl border border-line bg-white p-6 sm:p-8">
        <h2 className="font-heading text-xl font-semibold text-obsidian">Sign-in email</h2>
        <p className="mt-2 text-obsidian">{active?.email}</p>
        <p className="mt-2 text-sm text-ink-muted">
          The email is set by <code className="rounded bg-sand px-1.5 py-0.5 text-xs">ADMIN_EMAIL</code> in your
          hosting settings.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-white p-6 sm:p-8">
        <h2 className="font-heading text-xl font-semibold text-obsidian">Change password</h2>
        <p className="mt-1 text-sm text-ink-muted">
          {active?.source === "dashboard"
            ? "You're using a password set here in the dashboard."
            : "You're using the starting password from your hosting settings."}{" "}
          Changing it signs out any other devices; you stay signed in here.
        </p>
        <div className="mt-6">
          <ChangePasswordForm minLength={MIN_PASSWORD_LENGTH} />
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-dashed border-line bg-sand/40 p-6 text-sm leading-relaxed text-ink-muted">
        <p className="font-medium text-obsidian">Forgot your password?</p>
        <p className="mt-1">
          Set a new <code className="rounded bg-white px-1.5 py-0.5 text-xs">ADMIN_PASSWORD</code> in your Vercel or
          Netlify environment variables and redeploy. It replaces the password set here, and you can sign in with it
          straight away.
        </p>
      </section>
    </div>
  );
}
