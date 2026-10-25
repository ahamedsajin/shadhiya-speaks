import { WhatsAppIcon } from "@/components/brand-icons";

export function WhatsAppFloat({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid="whatsapp-floating-cta"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-white shadow-xl shadow-emerald/30 transition-transform duration-300 hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald/40 [animation-duration:2.5s]" />
      <WhatsAppIcon size={24} className="relative" />
    </a>
  );
}
