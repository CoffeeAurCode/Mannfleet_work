"use client";

import { useSyncExternalStore } from "react";
import { isIntroDone, isIntroDoneOnServer, subscribeToIntro } from "@/lib/intro";

export default function ContentReveal({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore rather than an effect + event listener: LogoIntro's
  // effect commits before ours, so a synchronous skip (intro already seen this
  // session, reduced motion, autoplay blocked) fires `intro:done` before a
  // plain listener could subscribe. This re-reads the store on subscribe, so
  // that race cannot leave the page stuck at opacity 0.
  const visible = useSyncExternalStore(subscribeToIntro, isIntroDone, isIntroDoneOnServer);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: visible ? "opacity 0.5s ease" : "none",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      {children}
    </div>
  );
}
