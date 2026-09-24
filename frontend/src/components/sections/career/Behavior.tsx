"use client";

import { useScopedBehavior } from "@/lib/scope";
import init from "./careerBehavior";

/** Mounts the career page's interactive behaviour after the server-rendered markup is in the DOM. */
export default function Behavior() {
  useScopedBehavior(init);
  return null;
}
