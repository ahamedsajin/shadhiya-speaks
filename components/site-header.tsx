"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { BrandLogo } from "@/components/brand-logo";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/content";
import type { SiteSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

const slug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");


export function SiteHeader({ brand, whatsappHref }: { brand: SiteSettings["brand"]; whatsappHref: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-obsidian/10 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" data-testid="nav-brand-link" className="flex items-baseline gap-1.5">
          <BrandLogo brand={brand} variant="header" />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" data-testid="nav-desktop-menu">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`nav-${slug(link.label)}-link`}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-emerald",
                isActive(link.href)
                  ? "text-emerald underline underline-offset-8 decoration-gold decoration-2"
                  : "text-obsidian/75",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-whatsapp-btn"
            aria-label="Chat on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-obsidian/15 text-emerald transition-colors hover:border-emerald hover:bg-emerald hover:text-white"
          >
            <WhatsAppIcon size={17} />
          </a>
          <Link href="/free-assessment" data-testid="nav-assessment-cta" className={buttonVariants()}>
            Book Free Assessment
          </Link>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              data-testid="nav-mobile-menu-btn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-obsidian/15 xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-xs data-[state=closed]:animate-[sheet-fade-out_150ms_ease-in-out] data-[state=open]:animate-[sheet-fade-in_150ms_ease-in-out]" />
            <Dialog.Content
              data-testid="nav-mobile-sheet"
              aria-describedby={undefined}
              className="fixed inset-y-0 right-0 z-50 flex h-full w-3/4 flex-col gap-4 border-l bg-cream bg-clip-padding text-sm text-popover-foreground shadow-lg data-[state=closed]:animate-[sheet-out_200ms_ease-in-out] data-[state=open]:animate-[sheet-in_200ms_ease-in-out] sm:max-w-sm"
            >
              <div className="flex flex-col gap-0.5 p-4">
                <Dialog.Title className="flex items-baseline gap-1.5 font-heading text-base font-medium text-foreground">
                  <BrandLogo brand={brand} variant="sheet" />
                </Dialog.Title>
              </div>
              <nav className="mt-6 flex flex-col gap-1 px-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    data-testid={`nav-mobile-${slug(link.label)}-link`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3 font-heading text-2xl transition-colors",
                      isActive(link.href) ? "text-emerald" : "text-obsidian/80 hover:bg-sand",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 px-3">
                  <Link
                    href="/free-assessment"
                    onClick={() => setOpen(false)}
                    data-testid="nav-mobile-assessment-cta"
                    className={cn(buttonVariants(), "w-full")}
                  >
                    Book Free Assessment
                  </Link>
                </div>
              </nav>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "absolute top-3 right-3")}
                >
                  <X />
                  <span className="sr-only">Close</span>
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
