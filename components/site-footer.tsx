import { MapPin } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { SOCIAL_ICONS, WhatsAppIcon } from "@/components/brand-icons";
import { BrandLogo } from "@/components/brand-logo";
import { SOCIALS, whatsappLink, type FooterLink, type SiteSettings } from "@/lib/settings";

const slug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const iconLink =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold-light hover:text-gold-light";
const heading = "font-mono text-xs uppercase tracking-[0.22em] text-gold-light";

/** Site pages open in place; full https:// links open in a new tab. */
function FooterAnchor({ link, className, testId }: { link: FooterLink; className: string; testId?: string }) {
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={className} data-testid={testId}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noreferrer" className={className} data-testid={testId}>
      {link.label}
    </a>
  );
}

function LinkColumn({ title, links, testPrefix }: { title: string; links: FooterLink[]; testPrefix: string }) {
  if (links.length === 0) return null;
  return (
    <div>
      <p className={heading}>{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link, i) => (
          <li key={i}>
            <FooterAnchor
              link={link}
              className="text-sm text-[#A2B3AB] transition-colors hover:text-gold-light"
              testId={`${testPrefix}${slug(link.label)}-link`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const { brand, contact, footer } = settings;
  const copyright = footer.copyright.replaceAll("{year}", String(new Date().getFullYear()));
  const legal: ReactNode[] = footer.legalLinks.map((link, i) =>
    link.href ? (
      <FooterAnchor key={i} link={link} className="transition-colors hover:text-gold-light" />
    ) : (
      <span key={i}>{link.label}</span>
    ),
  );

  return (
    <footer className="bg-obsidian text-[#FDFCFA]" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <BrandLogo brand={brand} variant="footer" />
            </div>
            {footer.tagline && <p className="mt-3 font-heading text-lg italic text-[#A2B3AB]">{footer.tagline}</p>}
            {footer.description && (
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#A2B3AB]">{footer.description}</p>
            )}
          </div>

          <LinkColumn title={footer.headings.quickLinks} links={footer.quickLinks} testPrefix="footer-" />
          <LinkColumn title={footer.headings.services} links={footer.services} testPrefix="footer-service-" />

          <div>
            <p className={heading}>{footer.headings.connect}</p>
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
                <p className={heading}>{footer.headings.address}</p>
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
          {footer.disclaimer && (
            <p className="mx-auto max-w-3xl whitespace-pre-line text-center text-xs leading-relaxed text-[#A2B3AB]/80">
              {footer.disclaimer}
            </p>
          )}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-[#A2B3AB] sm:flex-row">
            <p>{copyright}</p>
            {legal.length > 0 && (
              <p className="flex gap-4">
                {legal.map((item, i) => (
                  <Fragment key={i}>
                    {i > 0 && <span className="text-white/20">|</span>}
                    {item}
                  </Fragment>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
