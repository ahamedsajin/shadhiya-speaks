import { toCsv } from "./csv";
import { formatDateTimeInZone, todayInZone } from "./dates";
import { DIFFICULTY_LABELS, FORMAT_LABELS, PROGRAM_LABELS, STATUS_LABELS, type LeadStatus } from "./labels";
import type { AssessmentInput, ContactInput } from "./validation";

type LeadMeta = { id: string; created_at: Date; status: LeadStatus; notes: string | null; status_updated_at: Date | null };

export type AssessmentRow = AssessmentInput & LeadMeta;
export type ContactRow = ContactInput & LeadMeta;

const statusCells = (r: LeadMeta, timeZone: string) => [
  STATUS_LABELS[r.status] ?? r.status,
  r.notes,
  r.status_updated_at ? formatDateTimeInZone(r.status_updated_at, timeZone) : null,
];

export function assessmentsToCsv(rows: AssessmentRow[], timeZone: string): string {
  return toCsv(
    [
      "Submitted",
      "Full Name",
      "WhatsApp",
      "Email",
      "Program",
      "Class Format",
      "Target Band",
      "Test Date",
      "Difficulty",
      "Status",
      "Notes",
      "Status Updated",
    ],
    rows.map((r) => [
      formatDateTimeInZone(r.created_at, timeZone),
      r.full_name,
      r.whatsapp,
      r.email,
      PROGRAM_LABELS[r.program] ?? r.program,
      FORMAT_LABELS[r.class_format] ?? r.class_format,
      r.target_band,
      r.test_date,
      DIFFICULTY_LABELS[r.difficulty] ?? r.difficulty,
      ...statusCells(r, timeZone),
    ]),
  );
}

export function contactsToCsv(rows: ContactRow[], timeZone: string): string {
  return toCsv(
    ["Submitted", "Name", "Contact", "Message", "Status", "Notes", "Status Updated"],
    rows.map((r) => [
      formatDateTimeInZone(r.created_at, timeZone),
      r.name,
      r.contact,
      r.message,
      ...statusCells(r, timeZone),
    ]),
  );
}

export function exportFilename(type: "assessments" | "contacts", now: Date, timeZone: string): string {
  return `${type}-${todayInZone(now, timeZone)}.csv`;
}
