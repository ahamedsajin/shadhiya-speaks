const PLAIN_NUMBER = /^[+-]?[\d\s().-]+$/;

/**
 * Escapes one CSV cell (RFC 4180) and neutralises spreadsheet formulas.
 * Phone numbers like "+971 50 123 4567" and plain numbers are left untouched.
 */
export function escapeCsvCell(value: string | null | undefined): string {
  let v = value ?? "";
  const first = v.charAt(0);
  if (
    first === "=" ||
    first === "@" ||
    first === "\t" ||
    first === "\r" ||
    ((first === "+" || first === "-") && !PLAIN_NUMBER.test(v))
  ) {
    v = `'${v}`;
  }
  return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/** Builds a CSV document with a UTF-8 BOM (so Excel reads non-ASCII text) and CRLF rows. */
export function toCsv(header: string[], rows: (string | null | undefined)[][]): string {
  const lines = [header, ...rows].map((row) => row.map(escapeCsvCell).join(","));
  return `﻿${lines.join("\r\n")}\r\n`;
}
