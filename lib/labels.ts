export const PROGRAMS = ["academic", "general", "spoken"] as const;
export const CLASS_FORMATS = ["group", "one-to-one"] as const;
export const DIFFICULTIES = ["writing", "speaking", "reading", "listening"] as const;

export type Program = (typeof PROGRAMS)[number];
export type ClassFormat = (typeof CLASS_FORMATS)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];

export const PROGRAM_LABELS: Record<Program, string> = {
  academic: "Academic IELTS",
  general: "General IELTS",
  spoken: "Spoken English",
};

export const FORMAT_LABELS: Record<ClassFormat, string> = {
  group: "Small Group",
  "one-to-one": "1-to-1",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  writing: "Writing",
  speaking: "Speaking",
  reading: "Reading",
  listening: "Listening",
};

export const LEAD_STATUSES = ["new", "contacted", "follow_up", "converted", "not_converted"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  follow_up: "Follow up",
  converted: "Converted",
  not_converted: "Not converted",
};

/** Pill colours for each status, in the site palette. */
export const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "border-obsidian/15 bg-white text-obsidian",
  contacted: "border-sky-700/20 bg-sky-50 text-sky-800",
  follow_up: "border-gold/40 bg-gold/10 text-[#8a6a12]",
  converted: "border-emerald/30 bg-emerald/10 text-emerald",
  not_converted: "border-destructive/20 bg-destructive/5 text-destructive",
};
