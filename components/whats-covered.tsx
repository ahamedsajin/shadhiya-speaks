import { Check } from "lucide-react";
import { Reveal } from "@/components/motion";
import type { ProgramHighlights } from "@/lib/settings";

/** Course page summary and checklist, from the same highlights shown on the Home page. */
export function WhatsCovered({ program }: { program: ProgramHighlights }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8" data-testid="whats-covered">
      <Reveal>
        <div className="grid grid-cols-1 gap-8 rounded-[2rem] border border-line bg-white p-8 sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">What&apos;s Covered</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-obsidian sm:text-3xl">
              {program.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{program.summary}</p>
          </div>
          <ul className="grid grid-cols-1 content-start gap-3 sm:grid-cols-2 lg:col-span-7">
            {program.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl bg-sand/60 px-4 py-3 text-obsidian/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
