import { NextResponse, type NextRequest } from "next/server";

/**
 * Guards the admin console with HTTP basic auth when ADMIN_USER / ADMIN_PASSWORD are set.
 * Placeholder until a real auth provider (Auth.js, Clerk, Supabase Auth…) is added.
 */
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return NextResponse.next(); // open in local dev

  const header = req.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const [u, p] = atob(encoded).split(":");
    if (u === user && p === pass) return NextResponse.next();
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Rippotai admin"' },
  });
}

export const config = { matcher: ["/admin/:path*"] };
