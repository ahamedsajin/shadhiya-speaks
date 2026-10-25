"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Leads" },
  { href: "/admin/settings", label: "Site settings" },
];

export function AdminNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin/login")) return null;
  return (
    <nav className="flex items-center gap-1" aria-label="Admin">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3",
              active ? "bg-emerald text-white" : "text-obsidian/75 hover:bg-sand hover:text-emerald",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
