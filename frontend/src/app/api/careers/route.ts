import { NextResponse } from "next/server";
import { getDepartments } from "@/lib/content";
import { emailOK, str } from "@/lib/validate";

/** POST /api/careers — job applications (multipart, so a portfolio file can be attached later). */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "Expected multipart/form-data" }, { status: 400 });

  const application = {
    name: str(form.get("name"), 120),
    email: str(form.get("email"), 200),
    phone: str(form.get("phone"), 40),
    designation: str(form.get("designation"), 120),
    interest: str(form.get("interest"), 60),
    note: str(form.get("note"), 4000),
    file: form.get("cv") instanceof File ? (form.get("cv") as File).name : null,
  };
  if (!application.name || !emailOK(application.email)) {
    return NextResponse.json({ ok: false, error: "Name and a valid email are required" }, { status: 422 });
  }
  if (application.interest && !getDepartments().includes(application.interest)) {
    return NextResponse.json({ ok: false, error: "Unknown department" }, { status: 422 });
  }

  // TODO: upload the file (S3/R2/Blob), email the studio, list it in the admin console.
  return NextResponse.json({ ok: true, received: application }, { status: 202 });
}
