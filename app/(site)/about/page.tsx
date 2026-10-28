import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FACT_ICON_OPTIONS } from "@/components/fact-icons";
import { AnimatedHeading, Reveal } from "@/components/motion";
import { SiteImage } from "@/components/site-image";
import { buttonVariants } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/settings-store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Shadhiya Shekkeer",
  description:
    "Shadhiya combines academic rigour with practical coaching to help students navigate both IELTS exams and real-world English communication.",
};

// Card grids keep the original five-across layout and adapt when cards are added or removed.
const FACT_COLUMNS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

const PHILOSOPHY = ["Learn", "Practise", "Speak", "Improve"];

export default async function AboutPage() {
  const { trainer, images, about } = await getSiteSettings();
  return (
    <div data-testid="about-page">
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.2rem] border border-gold/50" />
              <SiteImage
                image={images.about}
                testId="about-trainer-photo"
                width={800}
                height={1000}
                priority
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-obsidian/20"
              />
              {about.badgeValue && (
                <div className="absolute -bottom-6 -right-4 rounded-2xl bg-obsidian px-5 py-4 text-[#FDFCFA] shadow-xl sm:-right-8">
                  <p className="font-heading text-3xl font-semibold text-gold-light">{about.badgeValue}</p>
                  {about.badgeLabel && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A2B3AB]">
                      {about.badgeLabel}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">About</p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl"
            lines={
              trainer.name
                ? [
                    "Meet Your Trainer:",
                    <span key="name" className="italic text-emerald">
                      {trainer.name}
                    </span>,
                  ]
                : ["Meet Your Trainer"]
            }
          />
          <Reveal delay={0.4}>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              English Language Trainer &amp; IELTS Specialist
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg" data-testid="about-bio">
              Shadhiya combines academic rigour with practical coaching to help students navigate both IELTS exams and
              real-world English communication. Her methodology goes beyond test mechanics to build lasting speaking
              confidence — shaped by five years supervising real IELTS exams in the UAE.
            </p>
          </Reveal>
          <Reveal delay={0.55}>
            <Link
              href="/free-assessment"
              data-testid="about-assessment-btn"
              className={cn(buttonVariants({ size: "lg" }), "mt-8")}
            >
              Book a Free Assessment
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand/70 py-20 lg:py-24" data-testid="qualifications-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">At a Glance</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl">
              Qualifications &amp; <span className="italic text-emerald">Experience</span>
            </h2>
          </Reveal>
          <div className={cn("mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2", FACT_COLUMNS[about.facts.length])}>
            {about.facts.map((fact, i) => {
              const Icon = FACT_ICON_OPTIONS[fact.icon].icon;
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-lg">
                    <Icon className="h-6 w-6 text-emerald" />
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">{fact.label}</p>
                    <p className="mt-2 font-heading text-lg font-medium leading-snug text-obsidian">{fact.value}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-line bg-white sm:flex-row">
              <SiteImage
                image={images.aboutCampus}
                testId="about-abudhabi-photo"
                width={768}
                height={1024}
                sizes="(min-width: 640px) 256px, 100vw"
                className="h-44 w-full object-cover sm:h-auto sm:w-64"
              />
              <div className="p-6 sm:py-8">
                <p className="font-mono text-base uppercase tracking-[0.2em] text-gold sm:text-xl">UAE Exam Supervision</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  Five years supervising official IELTS exam sessions — seating plans, speaking schedules, examiner
                  rubrics. Your preparation is built on what actually happens inside the test room.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-testid="philosophy-section">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">The Teaching Philosophy</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PHILOSOPHY.map((step, i) => (
            <Reveal key={step} delay={i * 0.1}>
              <div className="relative rounded-3xl border border-line bg-white p-8 text-center">
                <span className="font-heading text-5xl font-semibold text-sand-deep">0{i + 1}</span>
                <p className="mt-3 font-heading text-2xl font-semibold text-obsidian">{step}</p>
                {i < PHILOSOPHY.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-gold lg:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <blockquote className="mx-auto mt-14 max-w-3xl text-center font-heading text-2xl italic leading-relaxed text-obsidian sm:text-3xl">
            “True language capability comes from active production, constructive feedback, and continuous practice —{" "}
            <span className="text-emerald">not passive listening.</span>”
          </blockquote>
        </Reveal>
      </section>
    </div>
  );
}
