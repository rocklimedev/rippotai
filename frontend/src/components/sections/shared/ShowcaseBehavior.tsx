"use client";

import { useScopedBehavior } from "@/lib/scope";
import init from "./showcase.behavior";

export default function ShowcaseBehavior() {
  useScopedBehavior(init);
  return null;
}
