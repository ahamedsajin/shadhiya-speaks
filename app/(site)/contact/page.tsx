import { Mail } from "lucide-react";
import type { Metadata } from "next";
import { SOCIAL_ICONS, WhatsAppIcon } from "@/components/brand-icons";
import { AnimatedHeading, Reveal } from "@/components/motion";
import { SOCIALS, whatsappLink } from "@/lib/settings";
import { getSiteSettings } from "@/lib/settings-store";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have questions about our upcoming batches or coaching options? Reach out to us directly.",
};

const card =
  "flex items-center gap-5 rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/50 hover:shadow-lg";

export default async function ContactPage() {
  const { contact } = await getSiteSettings();
  const socials = SOCIALS.filter((social) => contact.socials[social.key]);
  return (
    <div data-testid="contact-page">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">Contact</p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl"
            lines={["Start Your English &", <span key="j" className="italic text-emerald">IELTS Journey</span>]}
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Have questions about our upcoming batches or coaching options? Reach out to us directly.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5" data-testid="contact-channels">
            <Reveal>
              <a href={whatsappLink(contact.whatsappNumber, contact.whatsappMessage)} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-card" className={card}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                  <WhatsAppIcon size={22} />
                </span>
                <span>
                  <span className="block font-heading text-xl font-semibold text-obsidian">WhatsApp</span>
                  <span className="text-sm text-ink-muted">Quickest response for quick questions</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <a href={`mailto:${contact.email}`} data-testid="contact-email-card" className={card}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-heading text-xl font-semibold text-obsidian">Email</span>
                  <span className="text-sm text-ink-muted">{contact.email} — formal inquiries &amp; support</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="rounded-3xl border border-line bg-white p-6">
                <p className="font-heading text-xl font-semibold text-obsidian">Socials</p>
                <div className="mt-4 flex gap-3">
                  {socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.name];
                    return (
                      <a
                        key={social.name}
                        href={contact.socials[social.key]}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.name}
                        data-testid={`contact-social-${social.name.toLowerCase()}-link`}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-obsidian/15 text-obsidian/70 transition-colors hover:border-emerald hover:bg-emerald hover:text-white"
                      >
                        <Icon size={17} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
