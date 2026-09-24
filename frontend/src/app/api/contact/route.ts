import { NextResponse } from "next/server";
import { emailOK, str } from "@/lib/validate";

/**
 * POST /api/contact — project / consultation / hello enquiries.
 * The public contact page still opens the visitor's mail app (mailto) exactly like the
 * static build; this endpoint is ready for when a mail provider or CRM is connected
 * (Resend, SES, HubSpot…) and for the admin console inbox.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });

  const enquiry = {
    intent: str(body.intent, 20) || "project",
    name: str(body.name, 120),
    email: str(body.email, 200),
    phone: str(body.phone, 40),
    kind: str(body.kind, 80),
    where: str(body.where, 120),
    services: Array.isArray(body.services) ? body.services.map((s: unknown) => str(s, 60)).slice(0, 8) : [],
    message: str(body.message, 4000),
  };
  if (!enquiry.name || !emailOK(enquiry.email)) {
    return NextResponse.json({ ok: false, error: "Name and a valid email are required" }, { status: 422 });
  }

  // TODO: deliver to process.env.CONTACT_TO via your mail provider and/or persist for the admin inbox.
  return NextResponse.json({ ok: true, received: enquiry }, { status: 202 });
}
