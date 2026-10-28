"use client";

import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { FACT_ICON_OPTIONS } from "@/components/fact-icons";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form-controls";
import { FACT_ICONS, type AboutFact, type FactIcon, type FooterLink } from "@/lib/settings";
import { cn } from "@/lib/utils";

function move<T>(items: T[], from: number, to: number): T[] {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function RowControls({
  index,
  count,
  onMove,
  onRemove,
  min,
  label,
}: {
  index: number;
  count: number;
  onMove: (to: number) => void;
  onRemove: () => void;
  min: number;
  label: string;
}) {
  const small = "h-8 w-8 shrink-0";
  return (
    <div className="flex shrink-0 gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={small}
        disabled={index === 0}
        onClick={() => onMove(index - 1)}
        aria-label={`Move ${label} up`}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={small}
        disabled={index === count - 1}
        onClick={() => onMove(index + 1)}
        aria-label={`Move ${label} down`}
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(small, "text-ink-muted hover:text-destructive")}
        disabled={count <= min}
        onClick={onRemove}
        aria-label={`Remove ${label}`}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

/** Edits a short list of text lines (add, remove, reorder). */
export function StringListEditor({
  label,
  hint,
  items,
  onChange,
  max,
  maxLength,
  addLabel,
  error,
  testId,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (items: string[]) => void;
  max: number;
  maxLength: number;
  addLabel: string;
  error?: string;
  testId?: string;
}) {
  return (
    <div className="space-y-3" data-testid={testId}>
      <div>
        <Label>{label}</Label>
        {hint && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
      </div>
      <ol className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-5 shrink-0 text-right font-mono text-xs text-ink-muted">{i + 1}</span>
            <Input
              value={item}
              maxLength={maxLength}
              onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
              aria-label={`${label} ${i + 1}`}
              className="h-9"
            />
            <RowControls
              index={i}
              count={items.length}
              min={1}
              label={`item ${i + 1}`}
              onMove={(to) => onChange(move(items, i, to))}
              onRemove={() => onChange(items.filter((_, j) => j !== i))}
            />
          </li>
        ))}
      </ol>
      {items.length < max && (
        <Button type="button" variant="outline" className="gap-1.5" onClick={() => onChange([...items, ""])}>
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      )}
      <FieldError id={`${testId ?? label}-error`} message={error} />
    </div>
  );
}

/** Edits the About page "At a Glance" cards: icon, label and text for each. */
export function FactsEditor({
  facts,
  onChange,
  max,
  error,
}: {
  facts: AboutFact[];
  onChange: (facts: AboutFact[]) => void;
  max: number;
  error?: string;
}) {
  const update = (i: number, patch: Partial<AboutFact>) =>
    onChange(facts.map((fact, j) => (j === i ? { ...fact, ...patch } : fact)));

  return (
    <div className="space-y-3" data-testid="settings-about-facts">
      <ol className="space-y-3">
        {facts.map((fact, i) => {
          const Icon = FACT_ICON_OPTIONS[fact.icon].icon;
          return (
            <li key={i} className="rounded-xl border border-line bg-cream/60 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="flex items-center gap-2 sm:w-44 sm:shrink-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                    <Icon className="h-4 w-4" />
                  </span>
                  <select
                    value={fact.icon}
                    onChange={(e) => update(i, { icon: e.target.value as FactIcon })}
                    aria-label={`Icon for card ${i + 1}`}
                    className="h-9 w-full rounded-lg border border-input bg-white px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {FACT_ICONS.map((key) => (
                      <option key={key} value={key}>
                        {FACT_ICON_OPTIONS[key].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                  <Input
                    value={fact.label}
                    maxLength={40}
                    onChange={(e) => update(i, { label: e.target.value })}
                    placeholder="Label, e.g. Certifications"
                    aria-label={`Label for card ${i + 1}`}
                    className="h-9 bg-white"
                  />
                  <Input
                    value={fact.value}
                    maxLength={120}
                    onChange={(e) => update(i, { value: e.target.value })}
                    placeholder="Text, e.g. UK TESOL-Certified English Language Trainer"
                    aria-label={`Text for card ${i + 1}`}
                    className="h-9 bg-white"
                  />
                </div>
                <RowControls
                  index={i}
                  count={facts.length}
                  min={1}
                  label={`card ${i + 1}`}
                  onMove={(to) => onChange(move(facts, i, to))}
                  onRemove={() => onChange(facts.filter((_, j) => j !== i))}
                />
              </div>
            </li>
          );
        })}
      </ol>
      {facts.length < max && (
        <Button
          type="button"
          variant="outline"
          className="gap-1.5"
          onClick={() => onChange([...facts, { icon: "check", label: "", value: "" }])}
        >
          <Plus className="h-4 w-4" />
          Add card
        </Button>
      )}
      <FieldError id="about-facts-error" message={error} />
    </div>
  );
}

/** Pages offered as suggestions when typing a link. */
const SITE_PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ielts-preparation", label: "IELTS Courses" },
  { href: "/spoken-english", label: "Spoken English" },
  { href: "/one-to-one-coaching", label: "1-to-1 Coaching" },
  { href: "/free-assessment", label: "Free Assessment" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/** Edits a list of links: text plus a site page or https:// URL for each. */
export function LinkListEditor({
  label,
  hint,
  links,
  onChange,
  max,
  linkOptional = false,
  error,
  testId,
}: {
  label: string;
  hint?: string;
  links: FooterLink[];
  onChange: (links: FooterLink[]) => void;
  max: number;
  linkOptional?: boolean;
  error?: string;
  testId: string;
}) {
  const listId = `${testId}-pages`;
  const update = (i: number, patch: Partial<FooterLink>) =>
    onChange(links.map((link, j) => (j === i ? { ...link, ...patch } : link)));

  return (
    <div className="space-y-3" data-testid={testId}>
      <div>
        <Label>{label}</Label>
        {hint && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
      </div>
      <datalist id={listId}>
        {SITE_PAGES.map((page) => (
          <option key={page.href} value={page.href}>
            {page.label}
          </option>
        ))}
      </datalist>
      <ol className="space-y-2">
        {links.map((link, i) => (
          <li key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="hidden w-5 shrink-0 text-right font-mono text-xs text-ink-muted sm:block">{i + 1}</span>
            <Input
              value={link.label}
              maxLength={40}
              onChange={(e) => update(i, { label: e.target.value })}
              placeholder="Link text"
              aria-label={`${label}: text for link ${i + 1}`}
              className="h-9 sm:flex-1"
            />
            <div className="flex items-center gap-2 sm:flex-1">
              <Input
                value={link.href}
                maxLength={500}
                list={listId}
                onChange={(e) => update(i, { href: e.target.value })}
                placeholder={linkOptional ? "Link (optional): /page or https://…" : "/page or https://…"}
                aria-label={`${label}: link for link ${i + 1}`}
                className="h-9"
              />
              <RowControls
                index={i}
                count={links.length}
                min={0}
                label={`link ${i + 1}`}
                onMove={(to) => onChange(move(links, i, to))}
                onRemove={() => onChange(links.filter((_, j) => j !== i))}
              />
            </div>
          </li>
        ))}
      </ol>
      {links.length < max && (
        <Button
          type="button"
          variant="outline"
          className="gap-1.5"
          onClick={() => onChange([...links, { label: "", href: linkOptional ? "" : "/" }])}
        >
          <Plus className="h-4 w-4" />
          Add link
        </Button>
      )}
      <FieldError id={`${testId}-error`} message={error} />
    </div>
  );
}
