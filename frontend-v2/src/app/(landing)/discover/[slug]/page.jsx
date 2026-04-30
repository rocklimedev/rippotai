// app/(landing)/discover/[slug]/page.jsx

import { SITE } from "@/data/site";
import { notFound } from "next/navigation";
import LandingClient from "./LandingClient";
export default async function LandingPage({ params }) {
  const { slug } = await params;

  const config = SITE.landings[slug];

  if (!config) return notFound();

  return <LandingClient slug={slug} config={config} />;
}
