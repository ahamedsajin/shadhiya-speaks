import type { Metadata } from "next";
import { Fragment } from "react";
import { AnimatedHeading, Reveal } from "@/components/motion";
import { getSiteSettings } from "@/lib/settings-store";
import { AssessmentForm } from "./assessment-form";

export const metadata: Metadata = {
  title: "Book a Free Assessment",
  description:
    "Discover your current band level, identify language gaps, and receive a customized learning path.",
};

export default async function FreeAssessmentPage() {
  const { contact } = await getSiteSettings();
  return (
    <div data-testid="free-assessment-page">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">Free Assessment</p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl"
            lines={[
              <Fragment key="line">
                Book Your <span className="italic text-emerald">Free Assessment</span>
              </Fragment>,
            ]}
          />
          <Reveal delay={0.35}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Discover your current band level, identify language gaps, and receive a customized learning path.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <AssessmentForm whatsappNumber={contact.whatsappNumber} />
        </Reveal>
      </section>
    </div>
  );
}
