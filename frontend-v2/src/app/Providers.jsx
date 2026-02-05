// src/components/Providers.js
"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { makeStore } from "./store";
export default function Providers({ children }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Enable RTK Query listeners (refetchOnFocus, etc.) — only once on client
  useEffect(() => {
    if (storeRef.current) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe; // cleanup on unmount
    }
  }, []); // empty deps → runs once

  return <Provider store={storeRef.current}>{children}</Provider>;
}
