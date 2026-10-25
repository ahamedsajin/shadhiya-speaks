export type SubmitResult =
  | { ok: true }
  | { ok: false; fields: Record<string, string> | null };

/** Posts a lead form as JSON. Field errors come back from a 400; anything else is a generic failure. */
export async function submitLead(path: string, body: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) return { ok: true };
    if (response.status === 400) {
      const data = await response.json().catch(() => null);
      return { ok: false, fields: data?.fields ?? null };
    }
    return { ok: false, fields: null };
  } catch {
    return { ok: false, fields: null };
  }
}

/** Moves focus to the first field the server rejected. */
export function focusFirstInvalid(form: HTMLFormElement | null, fields: Record<string, string>, order: string[]) {
  const first = order.find((name) => fields[name]);
  if (!first || !form) return;
  form.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
}
