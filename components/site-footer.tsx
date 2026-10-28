import { MapPin } from "lucide-react";
import Link from "next/link";
import { SOCIAL_ICONS, WhatsAppIcon } from "@/components/brand-icons";
import { BrandLogo } from "@/components/brand-logo";
import { FOOTER_LINKS, SERVICE_LINKS } from "@/lib/content";
import { SOCIALS, whatsappLink, type SiteSettings } from "@/lib/settings";

const slug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const iconLink =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold-light hover:text-gold-light";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const { brand, contact } = settings;
  return (
    <footer className="bg-obsidian text-[#FDFCFA]" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <BrandLogo brand={brand} variant="footer" />
            </div>
            <p className="mt-3 font-heading text-lg italic text-[#A2B3AB]">IELTS • English • Confidence</p>
            <p className="mt-2 text-sm leading-relaxed text-[#A2B3AB]">
              Online IELTS &amp; English training for ambitious learners in the UAE and beyond.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-light">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A2B3AB] transition-colors hover:text-gold-light"
                    data-testid={`footer-${slug(link.label)}-link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-light">Services</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A2B3AB] transition-colors hover:text-gold-light"
                    data-testid={`footer-service-${slug(link.label)}-link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-light">Connect</p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={whatsappLink(contact.whatsappNumber, contact.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                data-testid="footer-whatsapp-link"
                aria-label="WhatsApp"
                className={iconLink}
              >
                <WhatsAppIcon size={16} />
              </a>
              {SOCIALS.filter((social) => contact.socials[social.key]).map((social) => {
                const Icon = SOCIAL_ICONS[social.name];
                return (
                  <a
                    key={social.name}
                    href={contact.socials[social.key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    data-testid={`footer-social-${social.name.toLowerCase()}-link`}
                    className={iconLink}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="mt-4 block text-sm text-[#A2B3AB] transition-colors hover:text-gold-light"
              data-testid="footer-email-link"
            >
              {contact.email}
            </a>
            {contact.address && (
              <div className="mt-8" data-testid="footer-address">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-light">Address</p>
                <address className="mt-4 flex items-start gap-2 text-sm not-italic leading-relaxed text-[#A2B3AB]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                  <span className="whitespace-pre-line">{contact.address}</span>
                </address>
                {contact.mapUrl && (
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="footer-directions-link"
                    className="ml-6 mt-2 inline-block text-sm text-[#A2B3AB] underline-offset-4 transition-colors hover:text-gold-light hover:underline"
                  >
                    Get directions →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#A2B3AB]/80">
            Shadhiya Speaks provides independent language training and test preparation. IELTS is a registered
            trademark of University of Cambridge ESOL, the British Council, and IDP Education Australia. Shadhiya
            Speaks is not an official test center or partner. Score improvements depend on individual effort and
            consistency.
          </p>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-[#A2B3AB] sm:flex-row">
            <p>© 2026 Shadhiya Speaks. All Rights Reserved.</p>
            <p className="flex gap-4">
              <span className="cursor-pointer transition-colors hover:text-gold-light">Privacy Policy</span>
              <span className="text-white/20">|</span>
              <span className="cursor-pointer transition-colors hover:text-gold-light">Terms of Service</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
