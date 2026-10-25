import { z } from "zod";
import { json, readJson } from "@/lib/api";
import { isRequestAuthenticated } from "@/lib/admin-credentials";
import { LEAD_STATUSES } from "@/lib/labels";
import { deleteLeads, updateLeads } from "@/lib/leads";

const target = {
  type: z.enum(["assessments", "contacts"]),
  ids: z.array(z.uuid()).min(1, "Select at least one lead").max(500, "Select 500 leads or fewer"),
};

const updateSchema = z
  .object({
    ...target,
    status: z.enum(LEAD_STATUSES).optional(),
    notes: z.string().max(2000, "Notes must be 2000 characters or fewer").optional(),
  })
  .refine((d) => d.status !== undefined || d.notes !== undefined, "Nothing to update")
  .refine((d) => d.notes === undefined || d.ids.length === 1, "Notes can only be saved on one lead at a time");

const deleteSchema = z.object(target);

function invalid(error: z.ZodError) {
  return json(400, { error: error.issues[0]?.message ?? "Invalid request" });
}

/** Change the status and/or notes of one or more leads. */
export async function PATCH(request: Request) {
  if (!(await isRequestAuthenticated(request))) return json(401, { error: "unauthorized" });
  const parsed = updateSchema.safeParse(await readJson(request));
  if (!parsed.success) return invalid(parsed.error);

  const { type, ids, status, notes } = parsed.data;
  try {
    return json(200, { updated: await updateLeads(type, ids, { status, notes }) });
  } catch (error) {
    console.error("Failed to update leads", error);
    return json(500, { error: "server" });
  }
}

/** Permanently delete one or more leads. */
export async function DELETE(request: Request) {
  if (!(await isRequestAuthenticated(request))) return json(401, { error: "unauthorized" });
  const parsed = deleteSchema.safeParse(await readJson(request));
  if (!parsed.success) return invalid(parsed.error);

  try {
    return json(200, { deleted: await deleteLeads(parsed.data.type, parsed.data.ids) });
  } catch (error) {
    console.error("Failed to delete leads", error);
    return json(500, { error: "server" });
  }
}
