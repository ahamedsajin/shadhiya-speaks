import { json, readJson } from "@/lib/api";
import { insertAssessment } from "@/lib/leads";
import { parseAssessment } from "@/lib/validation";

export async function POST(request: Request) {
  const result = parseAssessment(await readJson(request));
  if (result.kind === "spam") return json(201, { id: null });
  if (result.kind === "invalid") return json(400, { error: "validation", fields: result.fields });
  try {
    const id = await insertAssessment(result.data);
    return json(201, { id });
  } catch (error) {
    console.error("Failed to save assessment booking", error);
    return json(500, { error: "server" });
  }
}
