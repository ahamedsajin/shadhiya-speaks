import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      <header className="border-b border-obsidian/10 bg-cream/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="flex items-baseline gap-1.5">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-obsidian">Shadhiya</span>
            <span className="font-heading text-2xl italic text-emerald">Speaks</span>
            <span className="ml-2 hidden rounded-full bg-emerald/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald sm:inline">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <AdminNav />
            <Link
              href="/"
              target="_blank"
              className="hidden text-sm font-medium text-obsidian/75 transition-colors hover:text-emerald sm:inline"
            >
              View site →
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
