import { revalidatePath } from "next/cache";
import { json, readJson } from "@/lib/api";
import { isRequestAuthenticated } from "@/lib/admin-credentials";
import { settingsSchema } from "@/lib/settings";
import { saveSiteSettings } from "@/lib/settings-store";

export async function PUT(request: Request) {
  if (!(await isRequestAuthenticated(request))) return json(401, { error: "unauthorized" });

  const result = settingsSchema.safeParse(await readJson(request));
  if (!result.success) {
    const fields: Record<string, string> = {};
    for (const issue of result.error.issues) fields[issue.path.join(".")] ??= issue.message;
    return json(400, { error: "validation", fields });
  }

  try {
    await saveSiteSettings(result.data);
  } catch (error) {
    console.error("Failed to save site settings", error);
    return json(500, { error: "server" });
  }
  // Every public page shows settings (header, footer, contact details), so refresh them all.
  revalidatePath("/", "layout");
  return json(200, { settings: result.data });
}
