import { ArrowRight, CalendarClock, Crosshair, Handshake, MicVocal, Rocket, SlidersHorizontal, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { AnimatedHeading, Reveal } from "@/components/motion";
import { SiteImage } from "@/components/site-image";
import { buttonVariants } from "@/components/ui/button";
import { whatsappLink } from "@/lib/settings";
import { getSiteSettings } from "@/lib/settings-store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "1-to-1 IELTS & English Coaching",
  description:
    "Bespoke online instruction tailored entirely to your schedule, skill level, and specific weaknesses.",
};

const ENQUIRY_MESSAGE = "Hi Shadhiya! I'd like to enquire about 1-to-1 coaching.";

const PATHWAYS = [
  {
    icon: Rocket,
    title: "Full IELTS Fast-Track",
    text: "Complete Academic or General Training preparation on an accelerated, exam-focused timeline.",
  },
  {
    icon: Target,
    title: "Single-Module Coaching",
    text: "Targeted work on one module only — Writing Only or Speaking Only are the most requested.",
  },
  {
    icon: Handshake,
    title: "Interview Preparation",
    text: "Professional communication coaching for job interviews, visa interviews, and workplace presentations.",
  },
  {
    icon: MicVocal,
    title: "Confidence Intensive",
    text: "A public-speaking and confidence bootcamp to convert passive knowledge into active fluency.",
  },
];

const STEPS = [
  { icon: Crosshair, title: "Diagnose", text: "A free assessment pinpoints your exact level and weaknesses." },
  { icon: SlidersHorizontal, title: "Design", text: "A bespoke plan is built around your schedule and target score." },
  { icon: CalendarClock, title: "Deliver", text: "Private live sessions with feedback after every single task." },
];

export default async function OneToOnePage() {
  const { contact, images } = await getSiteSettings();
  const enquiryHref = whatsappLink(contact.whatsappNumber, ENQUIRY_MESSAGE);
  return (
    <div data-testid="one-to-one-page">
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">1-to-1 Coaching</p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl"
            lines={[
              "Personalized 1-to-1",
              <Fragment key="line">
                IELTS &amp; English <span className="italic text-emerald">Coaching</span>
              </Fragment>,
            ]}
          />
          <Reveal delay={0.45}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Bespoke online instruction tailored entirely to your schedule, skill level, and specific weaknesses.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <a
              href={enquiryHref}
              target="_blank"
              rel="noreferrer"
              data-testid="coaching-enquire-btn"
              className={cn(buttonVariants({ size: "lg" }), "mt-8 gap-2")}
            >
              <WhatsAppIcon size={16} />
              Enquire About 1-to-1 Coaching
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.3}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.2rem] border border-gold/50" />
              <SiteImage
                image={images.coaching}
                testId="coaching-hero-photo"
                width={800}
                height={1000}
                priority
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-obsidian/20"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand/70 py-20 lg:py-24" data-testid="pathways-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">01 — Custom Coaching Pathways</p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl">
              Your goal sets <span className="italic text-emerald">the syllabus.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PATHWAYS.map((pathway, i) => (
              <Reveal key={pathway.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10">
                  <div className="flex items-center justify-between">
                    <pathway.icon className="h-7 w-7 text-emerald" />
                    <span className="font-mono text-sm text-gold">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-semibold text-obsidian">{pathway.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{pathway.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-testid="how-it-works-section">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">02 — How It Works</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="rounded-3xl border border-line bg-white p-8 text-center">
                <span className="font-heading text-5xl font-semibold text-sand-deep">0{i + 1}</span>
                <step.icon className="mx-auto mt-4 h-6 w-6 text-emerald" />
                <h3 className="mt-3 font-heading text-2xl font-semibold text-obsidian">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link
              href="/free-assessment"
              data-testid="coaching-assessment-btn"
              className={buttonVariants({ size: "lg" })}
            >
              Start with a Free Assessment
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href={enquiryHref}
              target="_blank"
              rel="noreferrer"
              data-testid="coaching-whatsapp-btn"
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
      </section>
    </div>
  );
}
