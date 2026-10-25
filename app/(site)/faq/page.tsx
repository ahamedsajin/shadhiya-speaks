import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Accordion } from "@/components/accordion";
import { WhatsAppIcon } from "@/components/brand-icons";
import { AnimatedHeading, Reveal } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { FAQS } from "@/lib/content";
import { whatsappLink } from "@/lib/settings";
import { getSiteSettings } from "@/lib/settings-store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Everything you need to know before booking your first session.",
};

export default async function FaqPage() {
  const { contact } = await getSiteSettings();
  return (
    <div data-testid="faq-page">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">FAQ</p>
            </Reveal>
            <AnimatedHeading
              as="h1"
              className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl"
              lines={[
                <Fragment key="line">
                  Questions, <span className="italic text-emerald">Answered.</span>
                </Fragment>,
              ]}
            />
            <Reveal delay={0.35}>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Everything you need to know before booking your first session.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-[2rem] border border-line bg-white px-6 shadow-xl shadow-obsidian/5 sm:px-10">
              <Accordion items={FAQS} testidPrefix="faq" />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-sand/70 p-8 text-center">
              <p className="font-heading text-xl font-medium text-obsidian">Still unsure which course fits you?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/free-assessment" data-testid="faq-assessment-btn" className={buttonVariants()}>
                  Book a Free Assessment
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                <a
                  href={whatsappLink(contact.whatsappNumber, "Hi Shadhiya! I have a question about your courses.")}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="faq-whatsapp-btn"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "gap-2 border-emerald/40 text-emerald hover:bg-emerald hover:text-white",
                  )}
                >
                  <WhatsAppIcon size={15} />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
