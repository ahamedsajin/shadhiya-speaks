import { ArrowRight, BadgeCheck, Check, GraduationCap, MessagesSquare, UserRound } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import type { SiteSettings } from "@/lib/settings";

/** Home page "Meet Your Trainer" section: credentials plus what each programme covers. */
export function TrainerHighlights({ highlights }: { highlights: SiteSettings["highlights"] }) {
  const programs = [
    { ...highlights.ielts, icon: GraduationCap, href: "/ielts-preparation", cta: "Explore IELTS" },
    { ...highlights.spoken, icon: MessagesSquare, href: "/spoken-english", cta: "Explore Spoken English" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-testid="trainer-highlights">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">01 — Meet Your Trainer</p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl">
          What you&apos;ll learn, and <span className="italic text-emerald">who you&apos;ll learn from.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2" data-testid="trainer-credentials">
        {highlights.credentials.map((credential, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <p className="font-heading text-lg font-medium leading-snug text-obsidian">{credential}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {programs.map((program, i) => (
          <Reveal key={program.href} delay={i * 0.08}>
            <div
              className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10"
              data-testid={`highlight-card-${i + 1}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <program.icon className="h-7 w-7 text-emerald" />
                  <span className="font-mono text-sm text-gold">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-heading text-2xl font-semibold text-obsidian">{program.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{program.summary}</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {program.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-obsidian/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={program.href}
                className="group mt-8 inline-flex items-center gap-2 self-start text-sm font-medium text-emerald"
              >
                {program.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.16}>
        <Link
          href="/one-to-one-coaching"
          data-testid="highlight-one-to-one-link"
          className="group mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-sand/60 px-6 py-5 transition-all duration-300 hover:border-gold/60 hover:bg-sand sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex items-start gap-3 sm:items-center">
            <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-emerald sm:mt-0" />
            <span>
              <span className="font-heading font-semibold text-obsidian">Prefer private sessions?</span>{" "}
              <span className="text-ink-muted">
                1-to-1 coaching focused strictly on your specific weaknesses and targets.
              </span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-emerald">
            Book Private Session
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
