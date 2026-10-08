"use client";

import { useEffect, useRef, useState } from "react";
import { hasSeenIntroThisSession, markIntroDone } from "@/lib/intro";

// The client wants the opening logo on screen for one second, fade included.
const VISIBLE_MS = 1000;
const FADE_MS = 250;
// If the logo image never loads, don't hold the site behind a black screen.
const LOAD_TIMEOUT_MS = 2500;

export default function LogoIntro() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const handledRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (handledRef.current) return;
    handledRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setFading(true);
    // Signal content to reveal only after overlay has fully faded out
    setTimeout(() => {
      setShow(false);
      markIntroDone();
    }, FADE_MS);
  };

  // Start the one-second clock only once the logo is actually painted, so a
  // slow connection doesn't spend the whole second on an empty black screen.
  const startClock = () => {
    if (handledRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(dismiss, VISIBLE_MS - FADE_MS);
  };

  useEffect(() => {
    const skip = () => {
      handledRef.current = true;
      setShow(false);
      markIntroDone();
    };

    // Play at most once per session — a reload or a fresh tab of an inner page
    // (e.g. arriving on /reservation) skips straight to content.
    if (hasSeenIntroThisSession()) {
      skip();
      return;
    }

    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      skip();
      return;
    }

    timerRef.current = setTimeout(dismiss, LOAD_TIMEOUT_MS);

    // A cached image can finish loading before hydration attaches onLoad.
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      startClock();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <div
      onClick={dismiss}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
      onKeyDown={(e) => { if (e.key === "Escape" || e.key === "Enter") dismiss(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        willChange: "opacity",
        pointerEvents: fading ? "none" : "auto",
        cursor: "pointer",
      }}
    >
      {/* Final frame of the old logo animation, cropped to the logo. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/mann-intro-logo.webp"
        alt="Mann Fleet Partners"
        width={1200}
        height={440}
        fetchPriority="high"
        onLoad={startClock}
        onError={dismiss}
        style={{
          width: "min(62.5vw, 1200px)",
          height: "auto",
        }}
      />
    </div>
  );
}
