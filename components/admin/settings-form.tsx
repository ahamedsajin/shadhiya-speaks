"use client";

import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { ImageField } from "@/components/admin/image-field";
import { FactsEditor, StringListEditor } from "@/components/admin/list-editors";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/form-controls";
import {
  DEFAULT_SETTINGS,
  SOCIALS,
  whatsappLink,
  type ImageSlot,
  type ProgramHighlights,
  type SiteSettings,
} from "@/lib/settings";

type Errors = Record<string, string>;

const IMAGE_SLOTS: { slot: ImageSlot; label: string; hint: string; preview: string }[] = [
  { slot: "homeHero", label: "Home page — trainer photo", hint: "The large photo in the trainer card. Portrait (4:5) works best.", preview: "h-40 w-32" },
  { slot: "about", label: "About page — trainer photo", hint: "Portrait (4:5) works best.", preview: "h-40 w-32" },
  { slot: "aboutCampus", label: "About page — exam supervision photo", hint: "Shown in the “UAE Exam Supervision” card. Portrait (3:4).", preview: "h-40 w-30" },
  { slot: "ielts", label: "IELTS Courses page — photo", hint: "Landscape (4:3) works best.", preview: "h-28 w-36" },
  { slot: "coaching", label: "1-to-1 Coaching page — photo", hint: "Portrait (4:5) works best.", preview: "h-40 w-32" },
];

function Section({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      <h2 className="font-heading text-xl font-semibold text-obsidian">{title}</h2>
      <p className="mt-1 text-sm text-ink-muted">{description}</p>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  error,
  hint,
  placeholder,
  type = "text",
  maxLength,
  testId,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  testId?: string;
}) {
  const id = `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-9"
        data-testid={testId}
      />
      {hint && !error && <p className="text-xs text-ink-muted">{hint}</p>}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [settings, setSettings] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const dirty = JSON.stringify(settings) !== JSON.stringify(saved);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function set<S extends keyof SiteSettings>(section: S, patch: Partial<SiteSettings[S]>) {
    setSettings((s) => ({ ...s, [section]: { ...s[section], ...patch } }));
  }
  function setImage(slot: ImageSlot, patch: Partial<SiteSettings["images"][ImageSlot]>) {
    setSettings((s) => ({ ...s, images: { ...s.images, [slot]: { ...s.images[slot], ...patch } } }));
  }
  function setProgram(key: "ielts" | "spoken", patch: Partial<ProgramHighlights>) {
    setSettings((s) => ({ ...s, highlights: { ...s.highlights, [key]: { ...s.highlights[key], ...patch } } }));
  }
  /** First error for a field or anything inside it (lists report errors per item). */
  const errorFor = (prefix: string) =>
    Object.entries(errors).find(([key]) => key === prefix || key.startsWith(`${prefix}.`))?.[1];
  function setSocial(key: keyof SiteSettings["contact"]["socials"], value: string) {
    setSettings((s) => ({ ...s, contact: { ...s.contact, socials: { ...s.contact.socials, [key]: value } } }));
  }

  async function save() {
    setSaving(true);
    setErrors({});
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await response.json().catch(() => null);
      if (response.status === 401) {
        toast.error("Your session expired. Please sign in again.");
        router.push("/admin/login?next=/admin/settings");
        return;
      }
      if (response.status === 400 && data?.fields) {
        setErrors(data.fields);
        toast.error("Please fix the highlighted fields.");
        return;
      }
      if (!response.ok || !data?.settings) throw new Error();
      setSettings(data.settings);
      setSaved(data.settings);
      toast.success("Saved — the website now shows your changes.");
    } catch {
      toast.error("Could not save. Check the database connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  const { brand, contact, trainer, images, highlights, about } = settings;

  return (
    <div className="space-y-8 pb-28">
      <Section title="Logo & favicon" description="Shown in the header, mobile menu, footer and browser tab.">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TextField
            label="Logo text — first word"
            value={brand.primary}
            onChange={(v) => set("brand", { primary: v })}
            error={errors["brand.primary"]}
            maxLength={40}
            testId="settings-brand-primary"
          />
          <TextField
            label="Logo text — second word (italic)"
            value={brand.secondary}
            onChange={(v) => set("brand", { secondary: v })}
            error={errors["brand.secondary"]}
            maxLength={40}
          />
        </div>
        <div className="rounded-xl border border-dashed border-line bg-cream px-5 py-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Header preview</p>
          <div className="flex items-baseline gap-1.5">
            <BrandLogo brand={brand} variant="header" />
          </div>
        </div>
        <ImageField
          label="Logo image (optional)"
          hint="Replaces the text logo. Use a PNG or SVG with a transparent background; it's shown about 40px tall."
          kind="logo"
          value={brand.logo}
          defaultValue={null}
          onChange={(v) => set("brand", { logo: v })}
          previewClassName="h-24 w-48"
          error={errors["brand.logo"]}
          testId="settings-logo"
        />
        <ImageField
          label="Logo for the dark footer (optional)"
          hint="A light version of your logo for the dark footer. If empty, the main logo is used."
          kind="logo"
          value={brand.logoDark}
          defaultValue={null}
          onChange={(v) => set("brand", { logoDark: v })}
          previewClassName="h-24 w-48 bg-obsidian"
          error={errors["brand.logoDark"]}
          testId="settings-logo-dark"
        />
        <ImageField
          label="Favicon (browser tab icon)"
          hint="A square PNG, SVG or ICO, at least 64×64. Browsers can take a while to show a new favicon."
          kind="favicon"
          value={brand.favicon}
          defaultValue={null}
          onChange={(v) => set("brand", { favicon: v })}
          previewClassName="h-20 w-20"
          error={errors["brand.favicon"]}
          testId="settings-favicon"
        />
      </Section>

      <Section
        title="Contact details"
        description="Used for every WhatsApp button, the email links, the Contact page and the footer (including the address)."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <TextField
              label="WhatsApp number"
              value={contact.whatsappNumber}
              onChange={(v) => set("contact", { whatsappNumber: v })}
              error={errors["contact.whatsappNumber"]}
              hint="With country code, e.g. 971501234567 (spaces and + are fine)."
              placeholder="971501234567"
              testId="settings-whatsapp"
            />
            <a
              href={whatsappLink(contact.whatsappNumber || "0", contact.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald hover:underline"
            >
              Test this WhatsApp link <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <TextField
            label="Email address"
            type="email"
            value={contact.email}
            onChange={(v) => set("contact", { email: v })}
            error={errors["contact.email"]}
            testId="settings-email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="field-whatsapp-message">Default WhatsApp message</Label>
          <Textarea
            id="field-whatsapp-message"
            value={contact.whatsappMessage}
            maxLength={300}
            rows={2}
            onChange={(e) => set("contact", { whatsappMessage: e.target.value })}
            aria-invalid={errors["contact.whatsappMessage"] ? true : undefined}
          />
          <p className="text-xs text-ink-muted">
            Prefilled when visitors tap the general WhatsApp buttons (header, footer, floating button, Contact page).
          </p>
          <FieldError id="whatsapp-message-error" message={errors["contact.whatsappMessage"]} />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="field-address">Address (optional)</Label>
            <Textarea
              id="field-address"
              value={contact.address}
              maxLength={300}
              rows={3}
              onChange={(e) => set("contact", { address: e.target.value })}
              placeholder={"Office 12, Example Building\nAl Ain, Abu Dhabi, UAE"}
              aria-invalid={errors["contact.address"] ? true : undefined}
              data-testid="settings-address"
            />
            <p className="text-xs text-ink-muted">Shown in the footer under Connect. Leave empty to hide it.</p>
            <FieldError id="address-error" message={errors["contact.address"]} />
          </div>
          <TextField
            label="Map link (optional)"
            value={contact.mapUrl}
            onChange={(v) => set("contact", { mapUrl: v })}
            error={errors["contact.mapUrl"]}
            hint="e.g. a Google Maps link. Adds “Get directions” under the address."
            placeholder="https://maps.app.goo.gl/…"
            testId="settings-map-url"
          />
        </div>
        <div>
          <p className="text-sm font-medium">Social links</p>
          <p className="mt-1 text-xs text-ink-muted">Leave a link empty to hide that icon.</p>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SOCIALS.map((social) => (
              <TextField
                key={social.key}
                label={social.name}
                value={contact.socials[social.key]}
                onChange={(v) => setSocial(social.key, v)}
                error={errors[`contact.socials.${social.key}`]}
                placeholder={`https://${social.key}.com/…`}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section title="Trainer card" description="The name, title and result badge on the home page photo.">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px]">
          <div className="grid grid-cols-1 content-start gap-6 sm:grid-cols-2">
            <TextField
              label="Trainer name (optional)"
              value={trainer.name}
              onChange={(v) => set("trainer", { name: v })}
              error={errors["trainer.name"]}
              hint="Leave empty to hide it on the photo. Also used in the About page heading."
              maxLength={60}
              testId="settings-trainer-name"
            />
            <TextField
              label="Trainer title (optional)"
              value={trainer.title}
              onChange={(v) => set("trainer", { title: v })}
              error={errors["trainer.title"]}
              hint="Leave empty to hide it on the photo."
              maxLength={80}
              testId="settings-trainer-title"
            />
            <TextField
              label="Badge label"
              value={trainer.badgeLabel}
              onChange={(v) => set("trainer", { badgeLabel: v })}
              error={errors["trainer.badgeLabel"]}
              maxLength={30}
              testId="settings-badge-label"
            />
            <TextField
              label="Badge value"
              value={trainer.badgeValue}
              onChange={(v) => set("trainer", { badgeValue: v })}
              error={errors["trainer.badgeValue"]}
              maxLength={30}
              testId="settings-badge-value"
            />
          </div>
          <div className="relative mx-auto w-[220px] pt-3 pl-3" aria-label="Trainer card preview">
            <div className="relative">
              <div className="absolute -inset-2 rounded-[1.4rem] border border-gold/50" />
              {/* eslint-disable-next-line @next/next/no-img-element -- live preview of the chosen photo */}
              <img
                src={images.homeHero.src}
                alt=""
                className="aspect-[4/5] w-full rounded-[1.25rem] object-cover shadow-xl shadow-obsidian/20"
              />
              {(trainer.name.trim() || trainer.title.trim()) && (
                <>
                  <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-t from-obsidian/45 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    {trainer.name.trim() && <p className="font-heading text-sm italic">{trainer.name}</p>}
                    {trainer.title.trim() && (
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/80">{trainer.title}</p>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="absolute -left-1 top-6 rounded-xl border border-line bg-white/95 px-3 py-2 shadow-lg">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink-muted">{trainer.badgeLabel}</p>
              <p className="font-heading text-base font-semibold text-emerald">{trainer.badgeValue}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Credentials strip"
        description="The scrolling strip under the Home page hero. Items scroll in this order and repeat."
      >
        <StringListEditor
          label="Strip items"
          hint="Keep each item short, e.g. “TESOL UK Certified”. They're shown in capitals."
          items={settings.marquee}
          onChange={(marquee) => setSettings((s) => ({ ...s, marquee }))}
          max={12}
          maxLength={60}
          addLabel="Add item"
          error={errorFor("marquee")}
          testId="settings-marquee"
        />
      </Section>

      <Section
        title="Trainer highlights"
        description="The “Meet Your Trainer” section on the Home page. Each programme's summary and list also appear as “What's covered” on its course page."
      >
        <StringListEditor
          label="Credentials"
          hint="Short lines shown at the top of the section, e.g. certifications and experience."
          items={highlights.credentials}
          onChange={(credentials) => set("highlights", { credentials })}
          max={4}
          maxLength={120}
          addLabel="Add credential"
          error={errorFor("highlights.credentials")}
          testId="settings-credentials"
        />
        {(
          [
            { key: "ielts", label: "IELTS programme", page: "IELTS Courses page" },
            { key: "spoken", label: "Spoken English programme", page: "Spoken English page" },
          ] as const
        ).map(({ key, label, page }) => (
          <div key={key} className="space-y-4 rounded-xl border border-line p-5" data-testid={`settings-program-${key}`}>
            <p className="font-heading text-lg font-semibold text-obsidian">
              {label} <span className="text-sm font-normal text-ink-muted">· Home page and {page}</span>
            </p>
            <TextField
              label={`${label} — title`}
              value={highlights[key].title}
              onChange={(v) => setProgram(key, { title: v })}
              error={errors[`highlights.${key}.title`]}
              maxLength={60}
            />
            <div className="space-y-2">
              <Label htmlFor={`field-${key}-summary`}>Summary</Label>
              <Textarea
                id={`field-${key}-summary`}
                value={highlights[key].summary}
                maxLength={300}
                rows={2}
                onChange={(e) => setProgram(key, { summary: e.target.value })}
                aria-invalid={errors[`highlights.${key}.summary`] ? true : undefined}
              />
              <FieldError id={`${key}-summary-error`} message={errors[`highlights.${key}.summary`]} />
            </div>
            <StringListEditor
              label="What's covered"
              items={highlights[key].items}
              onChange={(items) => setProgram(key, { items })}
              max={10}
              maxLength={80}
              addLabel="Add item"
              error={errorFor(`highlights.${key}.items`)}
              testId={`settings-${key}-items`}
            />
          </div>
        ))}
      </Section>

      <Section title="About page" description="The “At a Glance” cards and the dark badge on the trainer photo.">
        <FactsEditor
          facts={about.facts}
          onChange={(facts) => set("about", { facts })}
          max={6}
          error={errorFor("about.facts")}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TextField
            label="Photo badge — value (optional)"
            value={about.badgeValue}
            onChange={(v) => set("about", { badgeValue: v })}
            error={errors["about.badgeValue"]}
            hint="e.g. 13+. Leave empty to hide the badge."
            maxLength={20}
            testId="settings-about-badge-value"
          />
          <TextField
            label="Photo badge — label (optional)"
            value={about.badgeLabel}
            onChange={(v) => set("about", { badgeLabel: v })}
            error={errors["about.badgeLabel"]}
            hint="e.g. Years in education."
            maxLength={40}
          />
        </div>
      </Section>

      <Section title="Photos" description="Upload from your device or paste an image link. Large photos are resized automatically.">
        {IMAGE_SLOTS.map(({ slot, label, hint, preview }) => (
          <ImageField
            key={slot}
            label={label}
            hint={hint}
            kind="photo"
            value={images[slot].src}
            defaultValue={DEFAULT_SETTINGS.images[slot].src}
            onChange={(v) => setImage(slot, { src: v ?? DEFAULT_SETTINGS.images[slot].src })}
            alt={images[slot].alt}
            onAltChange={(v) => setImage(slot, { alt: v })}
            previewClassName={preview}
            error={errors[`images.${slot}.src`]}
            altError={errors[`images.${slot}.alt`]}
            testId={`settings-image-${slot}`}
          />
        ))}
      </Section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-sm text-ink-muted" aria-live="polite">
            {dirty ? "You have unsaved changes." : "All changes saved."}
          </p>
          <div className="flex gap-3">
            {dirty && (
              <Button type="button" variant="ghost" size="lg" onClick={() => setSettings(saved)} disabled={saving}>
                Discard
              </Button>
            )}
            <Button type="button" size="lg" onClick={save} disabled={!dirty || saving} data-testid="settings-save-btn">
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
