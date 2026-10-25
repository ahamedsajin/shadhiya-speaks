import { ArrowRight, Quote } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedHeading, Reveal } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { TESTIMONIALS } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Student Results & Testimonials",
  description: "Authentic stories, score improvements, and experiences from past students.",
};

export default function TestimonialsPage() {
  return (
    <div data-testid="testimonials-page">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">Testimonials</p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl"
            lines={["Real Learners.", <span key="p" className="italic text-emerald">Real Progress.</span>]}
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Authentic stories, score improvements, and experiences from past students.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10">
                <Quote className="h-6 w-6 text-gold" />
                <blockquote className="mt-4 flex-1 font-heading text-lg italic leading-relaxed text-obsidian">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="font-medium text-obsidian">{t.name}</p>
                  <p className="text-sm text-ink-muted">{t.course}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-sand px-3 py-1 font-mono text-ink-muted">{t.challenge}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gold" />
                    <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono font-medium text-emerald">
                      {t.outcome}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 rounded-[2.5rem] bg-obsidian px-8 py-14 text-center text-[#FDFCFA] sm:px-16">
            <h2 className="mx-auto max-w-xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Your story could be <span className="italic text-gold-light">next.</span>
            </h2>
            <Link
              href="/free-assessment"
              data-testid="testimonials-cta-btn"
              className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-gold text-obsidian hover:bg-gold-light")}
            >
              Book Your Free Assessment
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
