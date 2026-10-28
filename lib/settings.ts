import { z } from "zod";

/** Editable site content. Shared by the admin form (client) and the public pages (server). */

export type ImageSetting = { src: string; alt: string };

export type SocialKey = "instagram" | "youtube" | "facebook" | "tiktok";

export type SiteSettings = {
  brand: {
    /** Text logo, e.g. "Shadhiya" + italic "Speaks". Shown when no logo image is set. */
    primary: string;
    secondary: string;
    logo: string | null;
    /** Optional variant for the dark footer. Falls back to `logo`. */
    logoDark: string | null;
    favicon: string | null;
  };
  contact: {
    /** Digits only, with country code, e.g. 971501234567. */
    whatsappNumber: string;
    whatsappMessage: string;
    email: string;
    /** Empty string hides that icon. */
    socials: Record<SocialKey, string>;
    /** Shown in the footer under Connect. Empty hides it; line breaks are kept. */
    address: string;
    /** Optional "Get directions" link for the address (e.g. Google Maps). */
    mapUrl: string;
  };
  trainer: {
    name: string;
    title: string;
    badgeLabel: string;
    badgeValue: string;
  };
  images: {
    homeHero: ImageSetting;
    about: ImageSetting;
    aboutCampus: ImageSetting;
    ielts: ImageSetting;
    coaching: ImageSetting;
  };
  /** The scrolling credentials strip under the Home page hero. */
  marquee: string[];
  /** Trainer highlights: Home page section, and "What's covered" on the course pages. */
  highlights: {
    credentials: string[];
    ielts: ProgramHighlights;
    spoken: ProgramHighlights;
  };
  about: {
    /** The "At a Glance" cards on the About page. */
    facts: AboutFact[];
    /** The dark badge on the About photo. Empty value hides it. */
    badgeValue: string;
    badgeLabel: string;
  };
};

export type ProgramHighlights = { title: string; summary: string; items: string[] };

export const FACT_ICONS = ["award", "graduation", "book", "clipboard", "monitor", "check", "users", "mic"] as const;
export type FactIcon = (typeof FACT_ICONS)[number];
export type AboutFact = { icon: FactIcon; label: string; value: string };

export type ImageSlot = keyof SiteSettings["images"];

export const SOCIALS: { key: SocialKey; name: "Instagram" | "YouTube" | "Facebook" | "TikTok" }[] = [
  { key: "instagram", name: "Instagram" },
  { key: "youtube", name: "YouTube" },
  { key: "facebook", name: "Facebook" },
  { key: "tiktok", name: "TikTok" },
];

const PORTRAIT =
  "https://images.unsplash.com/photo-1573496527892-904f897eb744?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxmZW1hbGUlMjBlZHVjYXRvciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDB8fHx8MTc5MDE3ODQ0NHww&ixlib=rb-4.1.0&q=85";
const PORTRAIT_ALT =
  "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwzfHxmZW1hbGUlMjBlZHVjYXRvciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDB8fHx8MTc5MDE3ODQ0NHww&ixlib=rb-4.1.0&q=85";
const ABU_DHABI =
  "https://images.unsplash.com/photo-1734009775179-07f428483783?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxhYnUlMjBkaGFiaSUyMG1vZGVybiUyMGFyY2hpdGVjdHVyZSUyMGxhbmRtYXJrfGVufDB8fHx8MTc5MDE3ODQ0NHww&ixlib=rb-4.1.0&q=85";
const CLASSROOM =
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHw0fHxzdHVkZW50cyUyMGNsYXNzcm9vbSUyMHN0dWR5aW5nJTIwbGVhcm5pbmd8ZW58MHx8fHwxNzkwMTc4NDQ0fDA&ixlib=rb-4.1.0&q=85";

export const DEFAULT_SETTINGS: SiteSettings = {
  brand: { primary: "Shadhiya", secondary: "Speaks", logo: null, logoDark: null, favicon: null },
  contact: {
    whatsappNumber: "971501234567",
    whatsappMessage: "Hi Shadhiya! I'd like to know more about your IELTS & English training.",
    email: "hello@shadhiyaspeaks.com",
    socials: {
      instagram: "https://instagram.com/shadhiya.speaks",
      youtube: "https://youtube.com/@shadhiyaspeaks",
      facebook: "https://facebook.com/shadhiyaspeaks",
      tiktok: "https://tiktok.com/@shadhiya.speaks",
    },
    address: "",
    mapUrl: "",
  },
  trainer: {
    name: "Shadhiya Shekkeer",
    title: "English Trainer & IELTS Specialist",
    badgeLabel: "Latest result",
    badgeValue: "Band 8.0",
  },
  images: {
    homeHero: { src: PORTRAIT, alt: "Shadhiya Shekkeer — TESOL UK Certified IELTS & English Trainer" },
    about: { src: PORTRAIT_ALT, alt: "Shadhiya Shekkeer conducting a personalized strategy session" },
    aboutCampus: { src: ABU_DHABI, alt: "Abu Dhabi modern skyline" },
    ielts: { src: CLASSROOM, alt: "Students collaborating in intensive IELTS preparation" },
    coaching: { src: PORTRAIT_ALT, alt: "Shadhiya in a personalized coaching session" },
  },
  marquee: [
    "TESOL UK Certified",
    "5+ Years UAE IELTS Exam Supervision",
    "8+ Years Academic Experience",
    "Band 8.0 Achievers",
    "Live 1-to-1 & Micro-Batch Classes",
    "Computer-Based Test Simulation",
    "IELTS Academic & General Training",
  ],
  highlights: {
    credentials: [
      "UK TESOL-Certified English Language Trainer",
      "Around five years of experience in IELTS test supervision and IELTS training",
    ],
    ielts: {
      title: "IELTS Preparation",
      summary:
        "Personalised IELTS Academic and General Training preparation, with structured practice in Listening, Reading, Writing and Speaking.",
      items: [
        "IELTS Academic",
        "IELTS General Training",
        "Listening and Reading practice",
        "Writing Task 1 and Task 2 guidance",
        "Speaking practice and feedback",
        "Mock tests and exam strategies",
      ],
    },
    spoken: {
      title: "Spoken English and Communication",
      summary:
        "Practical, interactive English coaching focused on everyday conversations, fluency and confident communication.",
      items: [
        "Everyday English conversations",
        "Fluency-building practice",
        "Vocabulary in real-life situations",
        "Listening-based learning",
        "Sentence formation through speaking",
        "Confidence and communication skills",
      ],
    },
  },
  about: {
    facts: [
      { icon: "award", label: "Certifications", value: "UK TESOL-Certified English Language Trainer" },
      { icon: "graduation", label: "Higher Education", value: "MPhil · MBA · MCom · BBA" },
      { icon: "book", label: "Academic Experience", value: "8 Years in Higher Education Teaching" },
      {
        icon: "clipboard",
        label: "IELTS Expertise",
        value: "Around five years of experience in IELTS test supervision and IELTS training",
      },
      { icon: "monitor", label: "Delivery", value: "Individual, small-group, online & offline" },
    ],
    badgeValue: "13+",
    badgeLabel: "Years in education",
  },
};

/** Uploaded files are served from here; the id is a uuid plus an extension. */
export const MEDIA_PATH = /^\/api\/media\/[0-9a-f-]{36}\.(png|jpg|webp|gif|svg|ico|avif)$/;
const HTTPS_URL = /^https:\/\/[^\s"'<>]+$/;

const imageSrc = z
  .string()
  .trim()
  .max(1000, "Image URL is too long")
  .refine((v) => MEDIA_PATH.test(v) || HTTPS_URL.test(v), "Upload an image or use an https:// image URL");

const optionalImage = imageSrc.nullable();

const text = (label: string, max: number, min = 1) =>
  z
    .string()
    .trim()
    .min(min, `${label} is required`)
    .max(max, `${label} must be ${max} characters or fewer`);

const socialUrl = z
  .string()
  .trim()
  .max(300, "Link is too long")
  .refine((v) => v === "" || HTTPS_URL.test(v), "Use a full https:// link, or leave it empty to hide the icon");

const program = z.object({
  title: text("Title", 60),
  summary: text("Summary", 300),
  items: z.array(text("List item", 80)).min(1, "Add at least one item").max(10, "Use up to 10 items"),
});

const image = z.object({ src: imageSrc, alt: z.string().trim().max(200, "Alt text must be 200 characters or fewer") });

export const settingsSchema = z.object({
  brand: z.object({
    primary: text("Logo text", 40),
    secondary: text("Logo second word", 40, 0),
    logo: optionalImage,
    logoDark: optionalImage,
    favicon: optionalImage,
  }),
  contact: z.object({
    whatsappNumber: z
      .string()
      .transform((v) => v.replace(/[\s()+-]/g, ""))
      .pipe(z.string().regex(/^\d{7,15}$/, "Enter the number with country code, digits only (e.g. 971501234567)")),
    whatsappMessage: text("Default WhatsApp message", 300),
    email: z.string().trim().max(200).pipe(z.email("Enter a valid email address")),
    socials: z.object({ instagram: socialUrl, youtube: socialUrl, facebook: socialUrl, tiktok: socialUrl }),
    address: z.string().trim().max(300, "Address must be 300 characters or fewer"),
    mapUrl: z
      .string()
      .trim()
      .max(500, "Link is too long")
      .refine((v) => v === "" || HTTPS_URL.test(v), "Use a full https:// link, or leave it empty"),
  }),
  trainer: z.object({
    // Optional: an empty name or title is simply not shown on the photo.
    name: text("Trainer name", 60, 0),
    title: text("Trainer title", 80, 0),
    badgeLabel: text("Badge label", 30),
    badgeValue: text("Badge value", 30),
  }),
  images: z.object({
    homeHero: image,
    about: image,
    aboutCampus: image,
    ielts: image,
    coaching: image,
  }),
  marquee: z.array(text("Strip item", 60)).min(1, "Add at least one item").max(12, "Use up to 12 items"),
  highlights: z.object({
    credentials: z
      .array(text("Highlight", 120))
      .min(1, "Add at least one highlight")
      .max(4, "Use up to 4 highlights"),
    ielts: program,
    spoken: program,
  }),
  about: z.object({
    facts: z
      .array(z.object({ icon: z.enum(FACT_ICONS), label: text("Card label", 40), value: text("Card text", 120) }))
      .min(1, "Add at least one card")
      .max(6, "Use up to 6 cards"),
    badgeValue: text("Badge value", 20, 0),
    badgeLabel: text("Badge label", 40, 0),
  }),
});

type Plain = Record<string, unknown>;
const isPlain = (v: unknown): v is Plain => typeof v === "object" && v !== null && !Array.isArray(v);

function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlain(base) || !isPlain(override)) return base;
  const out: Plain = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (!(key in base)) continue;
    const current = (base as Plain)[key];
    out[key] = isPlain(current) ? deepMerge(current, value) : value;
  }
  return out as T;
}

/**
 * Stored settings merged over the defaults, so fields added later get sensible values.
 * Anything that no longer validates falls back to the defaults.
 */
export function resolveSettings(stored: unknown): SiteSettings {
  const merged = deepMerge(DEFAULT_SETTINGS, stored);
  const result = settingsSchema.safeParse(merged);
  return result.success ? result.data : DEFAULT_SETTINGS;
}

/** Media ids referenced anywhere in the settings. */
export function mediaIdsIn(settings: SiteSettings): string[] {
  const ids = new Set<string>();
  const visit = (value: unknown) => {
    if (typeof value === "string") {
      const match = /^\/api\/media\/([0-9a-f-]{36})\./.exec(value);
      if (match) ids.add(match[1]);
    } else if (isPlain(value)) {
      Object.values(value).forEach(visit);
    }
  };
  visit(settings);
  return [...ids];
}

/** wa.me link to a number with an optional prefilled message. */
export function whatsappLink(number: string, text?: string): string {
  const base = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** next/image can optimize our uploads and Unsplash; other hosts are shown as-is. */
export function isOptimizableImage(src: string): boolean {
  return (src.startsWith("/api/media/") && !src.endsWith(".svg")) || src.startsWith("https://images.unsplash.com/");
}
