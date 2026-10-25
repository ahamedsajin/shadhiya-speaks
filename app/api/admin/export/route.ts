import { json } from "@/lib/api";
import { isRequestAuthenticated } from "@/lib/admin-credentials";
import { assessmentsToCsv, contactsToCsv, exportFilename } from "@/lib/export";
import { parseLeadQuery } from "@/lib/filters";
import { listAssessments, listContacts } from "@/lib/leads";
import { site } from "@/lib/site";

export async function GET(request: Request) {
  if (!(await isRequestAuthenticated(request))) return json(401, { error: "unauthorized" });

  const query = parseLeadQuery(new URL(request.url).searchParams);
  const all = { limit: null, offset: 0 };
  try {
    const csv =
      query.type === "contacts"
        ? contactsToCsv((await listContacts(query, all)).rows, site.timeZone)
        : assessmentsToCsv((await listAssessments(query, all)).rows, site.timeZone);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${exportFilename(query.type, new Date(), site.timeZone)}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to export leads", error);
    return json(500, { error: "server" });
  }
}
