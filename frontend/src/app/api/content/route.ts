import { NextResponse } from "next/server";
import { getProjects, getServices, getSite, getTeam } from "@/lib/content";

/** GET /api/content — read-only JSON of the content layer (for the admin console, apps or a headless front end). */
export function GET() {
  return NextResponse.json({
    site: getSite(),
    projects: getProjects(),
    services: getServices(),
    team: getTeam(),
  });
}
