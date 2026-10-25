import { ArrowRight, Brain, Briefcase, MessagesSquare, Mic, Sparkles, UsersRound, Video } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { AnimatedHeading, Reveal } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { WhatsCovered } from "@/components/whats-covered";
import { getSiteSettings } from "@/lib/settings-store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Spoken English Training",
  description:
    "Overcome hesitation, expand your workplace vocabulary, and start thinking directly in English.",
};

const FOCUS_AREAS = [
  {
    icon: MessagesSquare,
    title: "Everyday Fluency",
    text: "Real-life conversational practice and overcoming public hesitation — small talk, opinions, storytelling.",
  },
  {
    icon: Briefcase,
    title: "Workplace English",
    text: "Professional etiquette, email articulation, and presentation skills for meetings, interviews, and clients.",
  },
  {
    icon: Mic,
    title: "Pronunciation & Clarity",
    text: "Accent reduction strategies and continuous speaking practice so you are understood the first time, every time.",
  },
  {
    icon: Brain,
    title: "Natural Thinking",
    text: "Exercises designed to stop internal translation from your native language and start thinking directly in English.",
  },
];

const DETAILS = [
  { icon: Video, label: "Format", value: "Live Interactive Online Sessions" },
  { icon: UsersRound, label: "Who It's For", value: "Working professionals, job seekers & adult learners" },
  { icon: Sparkles, label: "Outcome", value: "Natural fluency without hesitation or mental translation" },
];

export default async function SpokenEnglishPage() {
  const { highlights } = await getSiteSettings();
  return (
    <div data-testid="spoken-english-page">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-emerald/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">Spoken English</p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl"
            lines={[
              "Speak English Clearly,",
              <Fragment key="line">
                Naturally, and <span className="italic text-emerald">Confidently</span>
              </Fragment>,
            ]}
          />
          <Reveal delay={0.45}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Overcome hesitation, expand your workplace vocabulary, and start thinking directly in English.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <Link
              href="/free-assessment"
              data-testid="spoken-start-journey-btn"
              className={cn(buttonVariants({ size: "lg" }), "mt-8")}
            >
              Start Your English Journey
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <WhatsCovered program={highlights.spoken} />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8" data-testid="focus-areas-section">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">01 — Core Focus Areas</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {FOCUS_AREAS.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10">
                <div className="flex items-center justify-between">
                  <area.icon className="h-7 w-7 text-emerald" />
                  <span className="font-mono text-sm text-gold">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-heading text-2xl font-semibold text-obsidian">{area.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{area.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-obsidian py-20 text-[#FDFCFA] lg:py-24" data-testid="spoken-details-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-light">02 — Course Details</p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for adults who <span className="italic text-gold-light">need English to work.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {DETAILS.map((detail, i) => (
              <Reveal key={detail.label} delay={i * 0.1}>
                <div className="border-t border-white/15 pt-6">
                  <detail.icon className="h-6 w-6 text-gold-light" />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A2B3AB]">{detail.label}</p>
                  <p className="mt-2 font-heading text-xl font-medium leading-snug">{detail.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25}>
            <Link
              href="/free-assessment"
              data-testid="spoken-details-cta-btn"
              className={cn(buttonVariants({ size: "lg" }), "mt-12 bg-gold text-obsidian hover:bg-gold-light")}
            >
              Start Your English Journey
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
