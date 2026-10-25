import type { SiteSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

const VARIANTS = {
  header: { primary: "text-obsidian", secondary: "text-2xl text-emerald", image: "h-10 max-w-[200px]" },
  sheet: { primary: "", secondary: "text-xl text-emerald", image: "h-9 max-w-[180px]" },
  footer: { primary: "", secondary: "text-2xl text-gold-light", image: "h-10 max-w-[200px]" },
};

/** The uploaded logo if there is one, otherwise the two-part text mark ("Shadhiya" + italic "Speaks"). */
export function BrandLogo({ brand, variant }: { brand: SiteSettings["brand"]; variant: keyof typeof VARIANTS }) {
  const styles = VARIANTS[variant];
  const src = variant === "footer" ? (brand.logoDark ?? brand.logo) : brand.logo;
  const name = [brand.primary, brand.secondary].filter(Boolean).join(" ");

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- logos have unknown dimensions; keep the file as uploaded
    return <img src={src} alt={name} className={cn("w-auto object-contain", styles.image)} />;
  }
  return (
    <>
      <span className={cn("font-mono text-xs font-semibold uppercase tracking-[0.28em]", styles.primary)}>
        {brand.primary}
      </span>
      {brand.secondary && <span className={cn("font-heading italic", styles.secondary)}>{brand.secondary}</span>}
    </>
  );
}
