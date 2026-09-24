import { notFound } from "next/navigation";

// Catch-all so unknown URLs render the site's own 404 inside the site layout
// (with several root layouts there is no single app-level not-found).
export default function Missing() {
  notFound();
}
