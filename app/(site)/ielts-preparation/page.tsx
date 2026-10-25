import { ArrowRight, GraduationCap, Highlighter, Keyboard, Monitor, Plane, Timer } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Accordion } from "@/components/accordion";
import { WhatsAppIcon } from "@/components/brand-icons";
import { AnimatedHeading, Reveal } from "@/components/motion";
import { SiteImage } from "@/components/site-image";
import { WhatsCovered } from "@/components/whats-covered";
import { buttonVariants } from "@/components/ui/button";
import { whatsappLink } from "@/lib/settings";
import { getSiteSettings } from "@/lib/settings-store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "IELTS Preparation (Academic & General)",
  description:
    "Academic & General Training modules covered through live practice, essay corrections, and full test simulations.",
};

const TRACKS = [
  {
    icon: GraduationCap,
    title: "Academic IELTS",
    text: "Tailored for university admissions, academic registration, and professional licensing.",
    tag: "For study & licensing",
  },
  {
    icon: Plane,
    title: "General Training IELTS",
    text: "Focused on work visas, migration requirements, and employment needs.",
    tag: "For migration & work",
  },
];

const MODULES = [
  {
    question: "Listening",
    answer:
      "Question-type strategies for every format, note-taking techniques that capture answers the first time, and distraction-avoidance drills for the trickiest Part 3 & 4 recordings.",
  },
  {
    question: "Reading",
    answer:
      "Time management systems, skimming and scanning protocols, and keyword targeting — so you finish all three passages with minutes to spare instead of guessing the last ten.",
  },
  {
    question: "Writing",
    answer:
      "Task 1 & Task 2 structure frameworks, cohesion and coherence training, grammar precision work, and personalized essay marking mapped to the official band descriptors.",
  },
  {
    question: "Speaking",
    answer:
      "Mock interviews under real exam timing, topic development strategies, vocabulary expansion, and real-time pronunciation feedback from a trainer who supervised UAE exam sessions.",
  },
];

const CBT_FEATURES = [
  { icon: Monitor, text: "Direct familiarization with the computer-based test interface" },
  { icon: Highlighter, text: "On-screen reading strategies and digital listening navigation" },
  { icon: Keyboard, text: "Timed typing practice for Writing Task 1 & Task 2" },
];

const DETAILS = [
  { label: "Format", value: "Live Online (Interactive)" },
  { label: "Batch Size", value: "Small-group micro-batches or 1-to-1 options" },
  {
    label: "Includes",
    value: "Practice materials, writing feedback, mock speaking tests, computer-based practice",
  },
];

const PASSAGE_LINES = ["w-full", "w-11/12", "w-full gold", "w-4/5", "w-full", "w-2/3", "w-full gold", "w-5/6"];

export default async function IeltsPage() {
  const { contact, images, highlights } = await getSiteSettings();
  return (
    <div data-testid="ielts-page">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-gold/15 blur-3xl" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">IELTS Preparation</p>
            </Reveal>
            <AnimatedHeading
              as="h1"
              className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl"
              lines={[
                "Structured IELTS Preparation",
                <Fragment key="line">
                  with <span className="italic text-emerald">Proven Strategies</span>
                </Fragment>,
              ]}
            />
            <Reveal delay={0.45}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Academic &amp; General Training modules covered through live practice, essay corrections, and full test
                simulations.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/free-assessment"
                  data-testid="ielts-assessment-btn"
                  className={buttonVariants({ size: "lg" })}
                >
                  Book a Free IELTS Assessment
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                <a
                  href={whatsappLink(contact.whatsappNumber, "Hi Shadhiya! I'd like to enquire about IELTS preparation.")}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="ielts-whatsapp-btn"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "gap-2 border-emerald/40 text-emerald hover:bg-emerald hover:text-white",
                  )}
                >
                  <WhatsAppIcon size={16} />
                  Enquire via WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.3}>
              <SiteImage
                image={images.ielts}
                testId="ielts-hero-photo"
                width={1000}
                height={750}
                priority
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full rounded-[2rem] border border-line object-cover shadow-2xl shadow-obsidian/15"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <WhatsCovered program={highlights.ielts} />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8" data-testid="tracks-section">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">01 — Programme Tracks</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TRACKS.map((track, i) => (
            <Reveal key={track.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10">
                <div className="flex items-center justify-between">
                  <track.icon className="h-7 w-7 text-emerald" />
                  <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald">
                    {track.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-2xl font-semibold text-obsidian">{track.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{track.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand/70 py-20 lg:py-24" data-testid="modules-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">02 — Module Breakdown</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl">
              Every module. <span className="italic text-emerald">Mastered.</span>
            </h2>
          </Reveal>
          <div className="mt-10">
            <Accordion items={MODULES} testidPrefix="ielts-module" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-testid="cbt-section">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">03 — Special Feature</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl">
                Computer-Based <span className="italic text-emerald">Test Simulation</span>
              </h2>
              <ul className="mt-6 space-y-4">
                {CBT_FEATURES.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3 text-ink-muted">
                    <feature.icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div
                className="overflow-hidden rounded-3xl border border-white/10 bg-obsidian shadow-2xl"
                data-testid="cbt-preview"
                aria-hidden="true"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#A2B3AB]">IELTS CBT — Reading</p>
                  <span className="flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 font-mono text-xs text-gold-light">
                    <Timer className="h-3.5 w-3.5" /> 00:59:32
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-6 p-6">
                  <div className="space-y-3">
                    {PASSAGE_LINES.map((line, i) => {
                      const [width, tone] = line.split(" ");
                      return (
                        <div
                          key={i}
                          className={cn("h-2.5 rounded", width, tone === "gold" ? "bg-gold/40" : "bg-white/15")}
                        />
                      );
                    })}
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="rounded-xl border border-white/10 p-3">
                        <p className="font-mono text-[10px] text-[#A2B3AB]">Question {n}</p>
                        <div className="mt-2 h-2 w-full rounded bg-white/15" />
                        <div className="mt-2 flex gap-2">
                          <span className="h-5 w-8 rounded border border-emerald/60 bg-emerald/30" />
                          <span className="h-5 w-8 rounded border border-white/15" />
                          <span className="h-5 w-8 rounded border border-white/15" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 border-t border-white/10 px-6 py-3">
                  {Array.from({ length: 40 }, (_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full",
                        i < 12 ? "bg-emerald" : i < 15 ? "bg-gold" : "bg-white/15",
                      )}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8" data-testid="course-details">
        <Reveal>
          <div className="rounded-[2.5rem] border border-line bg-white p-8 sm:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">04 — Course Details</p>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {DETAILS.map((detail) => (
                <div key={detail.label} className="border-t-2 border-gold/60 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">{detail.label}</p>
                  <p className="mt-2 font-heading text-lg font-medium leading-snug text-obsidian">{detail.value}</p>
                </div>
              ))}
            </div>
            <Link
              href="/free-assessment"
              data-testid="details-assessment-btn"
              className={cn(buttonVariants({ size: "lg" }), "mt-10")}
            >
              Book a Free IELTS Assessment
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
