import { json, readJson } from "@/lib/api";
import { insertContact } from "@/lib/leads";
import { parseContact } from "@/lib/validation";

export async function POST(request: Request) {
  const result = parseContact(await readJson(request));
  if (result.kind === "spam") return json(201, { id: null });
  if (result.kind === "invalid") return json(400, { error: "validation", fields: result.fields });
  try {
    const id = await insertContact(result.data);
    return json(201, { id });
  } catch (error) {
    console.error("Failed to save contact enquiry", error);
    return json(500, { error: "server" });
  }
}
