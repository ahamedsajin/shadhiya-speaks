import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { whatsappLink } from "@/lib/settings";
import { getSiteSettings } from "@/lib/settings-store";

// Pages are pre-rendered and refreshed when settings are saved; this is a safety net.
export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const whatsappHref = whatsappLink(settings.contact.whatsappNumber, settings.contact.whatsappMessage);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-cream text-foreground">
        <SiteHeader brand={settings.brand} whatsappHref={whatsappHref} />
        <main className="pt-20">{children}</main>
        <SiteFooter settings={settings} />
        <WhatsAppFloat href={whatsappHref} />
      </div>
    </SmoothScroll>
  );
}
