"use client";

import { KeyRound, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS: { href: string; label: string; short?: string; icon?: LucideIcon }[] = [
  { href: "/admin", label: "Leads" },
  { href: "/admin/settings", label: "Site settings", short: "Settings" },
  { href: "/admin/account", label: "Account", icon: KeyRound },
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
            aria-label={link.icon ? link.label : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3",
              active ? "bg-emerald text-white" : "text-obsidian/75 hover:bg-sand hover:text-emerald",
            )}
          >
            {link.icon && <link.icon className="h-4 w-4" />}
            {link.short && <span className="sm:hidden">{link.short}</span>}
            <span className={link.icon || link.short ? "hidden sm:inline" : undefined}>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
