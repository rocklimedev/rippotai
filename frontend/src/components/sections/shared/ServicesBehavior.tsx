"use client";

import { useScopedBehavior } from "@/lib/scope";
import init from "./services.behavior";

export default function ServicesBehavior() {
  useScopedBehavior(init);
  return null;
}
