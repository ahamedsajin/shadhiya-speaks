import { z } from "zod";
import { CLASS_FORMATS, DIFFICULTIES, PROGRAMS, type ClassFormat, type Difficulty, type Program } from "./labels";
import { isIsoDay } from "./dates";

export type AssessmentInput = {
  full_name: string;
  whatsapp: string;
  email: string;
  class_format: ClassFormat;
  program: Program;
  target_band: string | null;
  test_date: string | null;
  difficulty: Difficulty;
};

export type ContactInput = {
  name: string;
  contact: string;
  message: string;
};

export type ParseResult<T> =
  | { kind: "valid"; data: T }
  | { kind: "spam" }
  | { kind: "invalid"; fields: Record<string, string> };

const required = (label: string, max: number) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be ${max} characters or fewer`);

/** Blank strings and missing values become null. */
const blankToNull = (v: unknown) => (typeof v === "string" && v.trim() !== "" ? v.trim() : null);

const whatsapp = z
  .string({ error: "WhatsApp number is required" })
  .trim()
  .regex(/^[+\d\s()-]{6,30}$/, "Enter a valid WhatsApp number")
  .refine((v) => (v.match(/\d/g) ?? []).length >= 7, "Enter a valid WhatsApp number");

const assessmentSchema = z.object({
  full_name: required("Full name", 120),
  whatsapp,
  email: z
    .string({ error: "Email is required" })
    .trim()
    .max(200, "Email must be 200 characters or fewer")
    .pipe(z.email("Enter a valid email address")),
  class_format: z.enum(CLASS_FORMATS, { error: "Choose a class format" }),
  program: z.enum(PROGRAMS, { error: "Choose a program" }),
  target_band: z.preprocess(
    blankToNull,
    z.string().max(60, "Target must be 60 characters or fewer").nullable(),
  ),
  test_date: z.preprocess(blankToNull, z.string().refine(isIsoDay, "Enter a valid date").nullable()),
  difficulty: z.enum(DIFFICULTIES, { error: "Choose a difficulty area" }),
});

const contactSchema = z.object({
  name: required("Name", 120),
  contact: z
    .string({ error: "Contact details are required" })
    .trim()
    .min(3, "Enter a WhatsApp number or email")
    .max(200, "Contact must be 200 characters or fewer"),
  message: required("Message", 5000),
});

function isSpam(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false;
  const honeypot = (body as Record<string, unknown>).company;
  return typeof honeypot === "string" && honeypot.trim() !== "";
}

function parse<T>(schema: z.ZodType<T>, body: unknown): ParseResult<T> {
  if (isSpam(body)) return { kind: "spam" };
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { kind: "invalid", fields: { form: "Invalid submission" } };
  }
  const result = schema.safeParse(body);
  if (result.success) return { kind: "valid", data: result.data };
  const fields: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    fields[key] ??= issue.message;
  }
  return { kind: "invalid", fields };
}

export function parseAssessment(body: unknown): ParseResult<AssessmentInput> {
  return parse(assessmentSchema, body) as ParseResult<AssessmentInput>;
}

export function parseContact(body: unknown): ParseResult<ContactInput> {
  return parse(contactSchema, body);
}
