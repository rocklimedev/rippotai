"use client";

import { useEffect } from "react";
import { useScopedBehavior } from "@/lib/scope";
import init from "./projectBehavior";

/** Mounts the project page behaviour after the server-rendered markup is in the DOM. */
export default function Behavior() {
  useScopedBehavior(init);
  // never leave the body scroll-locked when leaving the page
  useEffect(() => () => document.body.classList.remove("is-locked"), []);
  return null;
}
