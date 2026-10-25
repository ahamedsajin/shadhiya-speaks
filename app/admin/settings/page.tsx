import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/admin/settings-form";
import { hasAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/settings-store";

export const metadata: Metadata = { title: "Site Settings" };

export default async function SettingsPage() {
  if (!(await hasAdminSession())) redirect("/admin/login?next=/admin/settings");
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8" data-testid="admin-settings">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">Admin</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold text-obsidian sm:text-4xl">Site Settings</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Change your logo, contact details, trainer card and photos. Changes go live on the website as soon as you save.
      </p>
      <div className="mt-10">
        <SettingsForm initial={settings} />
      </div>
    </div>
  );
}
