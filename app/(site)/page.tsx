import { ArrowRight, Award, BadgeCheck, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Marquee, Reveal } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { CREDENTIALS, TESTIMONIALS } from "@/lib/content";
import { whatsappLink } from "@/lib/settings";
import { getSiteSettings } from "@/lib/settings-store";
import { cn } from "@/lib/utils";
import { HomeHero } from "./home-hero";
import { TrainerHighlights } from "./trainer-highlights";

export const metadata: Metadata = {
  title: { absolute: "Shadhiya Speaks — IELTS & Spoken English Training" },
  description:
    "Personalised online IELTS and English training designed to elevate your communication and achieve your band score goals.",
};

const REASONS = [
  {
    n: "01",
    icon: BadgeCheck,
    title: "Supervision Insight",
    text: "Real experience inside UAE IELTS exam environments — five years of supervision at Abu Dhabi University means you train with someone who has watched thousands of real test days unfold.",
  },
  {
    n: "02",
    icon: Award,
    title: "Targeted Feedback",
    text: "Detailed essay corrections mapped to band descriptors and real-time speaking evaluation — you always know exactly what is holding your score back and how to fix it.",
  },
  {
    n: "03",
    icon: Users,
    title: "Small-Group Focus",
    text: "Micro-batches ensure every learner gets active speaking time in every session. You will never sit silently at the back of a crowded class.",
  },
];

export default async function HomePage() {
  const { contact, trainer, images, highlights } = await getSiteSettings();
  return (
    <div data-testid="home-page">
      <HomeHero
        trainer={trainer}
        image={images.homeHero}
        whatsappHref={whatsappLink(contact.whatsappNumber, contact.whatsappMessage)}
      />
      <Marquee items={CREDENTIALS} />

      <TrainerHighlights highlights={highlights} />

      <section className="bg-obsidian py-20 text-[#FDFCFA] lg:py-28" data-testid="why-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-light">02 — The Manifesto</p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Why train with <span className="italic text-gold-light">Shadhiya?</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {REASONS.map((reason, i) => (
              <Reveal key={reason.n} delay={i * 0.1}>
                <div className="border-t border-white/15 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-5xl font-semibold text-gold-light/90">{reason.n}</span>
                    <reason.icon className="h-6 w-6 text-gold-light" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A2B3AB]">{reason.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-testid="testimonials-teaser">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">03 — Success Stories</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl">
            Real learners. <span className="italic text-emerald">Real progress.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-8">
                <blockquote className="flex-1 font-heading text-lg italic leading-relaxed text-obsidian">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="font-medium text-obsidian">{t.name}</p>
                  <p className="text-sm text-ink-muted">{t.course}</p>
                  <p className="mt-2 inline-block rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald">
                    {t.challenge} → {t.outcome}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <Link
            href="/testimonials"
            data-testid="testimonials-read-all-link"
            className="mt-10 inline-flex items-center gap-2 font-medium text-emerald transition-colors hover:text-emerald-deep"
          >
            Read All Success Stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2.5rem] bg-obsidian px-8 py-16 text-center text-[#FDFCFA] sm:px-16 lg:py-20"
            data-testid="conversion-banner"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald/40 blur-3xl" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-light">Free Assessment</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Unsure of your current <span className="italic text-gold-light">English level?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#A2B3AB]">
              Take our quick online assessment to get personalized feedback and a recommended study path.
            </p>
            <Link
              href="/free-assessment"
              data-testid="banner-book-assessment-btn"
              className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-gold text-obsidian hover:bg-gold-light")}
            >
              Book Your Free Assessment Now
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
