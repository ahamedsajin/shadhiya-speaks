"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { Fragment, useRef } from "react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { AnimatedHeading, Reveal } from "@/components/motion";
import { SiteImage } from "@/components/site-image";
import { buttonVariants } from "@/components/ui/button";
import type { ImageSetting, SiteSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

export function HomeHero({
  trainer,
  image,
  whatsappHref,
}: {
  trainer: SiteSettings["trainer"];
  image: ImageSetting;
  whatsappHref: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full bg-gold/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p
              className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-white px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-emerald"
              data-testid="hero-eyebrow"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              TESOL UK Certified · UAE
            </p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            className="mt-6 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl"
            lines={[
              "Speak English with Confidence.",
              <Fragment key="line">
                Prepare for IELTS with <span className="italic text-emerald">Purpose.</span>
              </Fragment>,
            ]}
          />
          <Reveal delay={0.5}>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
              data-testid="hero-subheadline"
            >
              Personalised online IELTS and English training designed to elevate your communication and achieve your
              band score goals.
            </p>
          </Reveal>
          <Reveal delay={0.65}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/free-assessment"
                data-testid="hero-book-assessment-btn"
                className={buttonVariants({ size: "lg" })}
              >
                Book a Free Assessment
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                data-testid="hero-whatsapp-btn"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2 border-emerald/40 text-emerald hover:bg-emerald hover:text-white",
                )}
              >
                <WhatsAppIcon size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.8}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-muted">
              <span>
                <strong className="font-heading text-xl text-obsidian">500+</strong> learners trained
              </span>
              <span>
                <strong className="font-heading text-xl text-obsidian">96%</strong> hit target band
              </span>
              <span>
                <strong className="font-heading text-xl text-obsidian">+1.5</strong> avg. band jump
              </span>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div style={{ y }} className="relative">
            <div className="absolute -inset-3 rounded-[2.2rem] border border-gold/50" />
            <SiteImage
              image={image}
              testId="hero-trainer-photo"
              width={800}
              height={1000}
              priority
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-obsidian/20"
            />
            {(trainer.name || trainer.title) && (
              <>
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-obsidian/45 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  {trainer.name && <p className="font-heading text-xl italic">{trainer.name}</p>}
                  {trainer.title && (
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">{trainer.title}</p>
                  )}
                </div>
              </>
            )}
          </motion.div>
          <div
            className="float-slow absolute -left-4 top-8 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:-left-8"
            data-testid="hero-band-badge"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">{trainer.badgeLabel}</p>
            <p className="font-heading text-2xl font-semibold text-emerald">{trainer.badgeValue}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
