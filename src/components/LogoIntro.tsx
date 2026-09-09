"use client";

import { useEffect, useRef, useState } from "react";
import { hasSeenIntroThisSession, markIntroDone } from "@/lib/intro";

export default function LogoIntro() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handledRef = useRef(false);
  const safetyIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (handledRef.current) return;
    handledRef.current = true;
    if (safetyIdRef.current) clearTimeout(safetyIdRef.current);
    setFading(true);
    // Signal content to reveal only after overlay has fully faded out
    setTimeout(() => {
      setShow(false);
      markIntroDone();
    }, 500);
  };

  // Called as a React prop so it fires even if metadata was already loaded
  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid || handledRef.current) return;
    const duration = isFinite(vid.duration) && vid.duration > 0 ? vid.duration : 15;
    // Safety fallback: only fires if onEnded never fires
    if (safetyIdRef.current) clearTimeout(safetyIdRef.current);
    safetyIdRef.current = setTimeout(dismiss, duration * 1000 + 2000);
  };

  useEffect(() => {
    const skip = () => {
      handledRef.current = true;
      setShow(false);
      markIntroDone();
    };

    // Play at most once per session — a reload or a fresh tab of an inner page
    // (e.g. arriving on /reservation) must not sit through the 15s animation.
    if (hasSeenIntroThisSession()) {
      skip();
      return;
    }

    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      skip();
      return;
    }

    const vid = videoRef.current;
    if (!vid) return;

    // Do not make the rest of the site depend on the video returning metadata.
    // Some laptop/browser combinations can leave an autoplaying MP4 in a
    // loading state forever; without this timer the fixed overlay blocks every
    // navigation and action on the page.
    safetyIdRef.current = setTimeout(dismiss, 12_000);

    // Attempt play (muted autoplay should succeed in all browsers)
    vid.play().catch(() => {
      // Autoplay blocked — skip intro immediately
      skip();
    });

    // If metadata was already loaded before this effect ran (preload="auto"
    // can do this), handleLoadedMetadata won't fire again — set safety now.
    if (vid.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      if (safetyIdRef.current) clearTimeout(safetyIdRef.current);
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
        transition: "opacity 0.5s ease",
        willChange: "opacity",
        pointerEvents: fading ? "none" : "auto",
        cursor: "pointer",
      }}
    >
      <video
        ref={videoRef}
        src="/Maan Logo Animation_01.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={dismiss}
        onError={dismiss}
        onAbort={dismiss}
        onStalled={dismiss}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />

      {/* Skip affordance — nobody should be trapped in a 15s animation */}
      <span
        className="font-sans"
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 5vw, 3rem)",
          right: "clamp(1.5rem, 5vw, 3rem)",
          padding: "0.5rem 1.1rem",
          borderRadius: 9999,
          border: "1px solid rgba(255,255,255,0.28)",
          background: "rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.75)",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Skip
      </span>
    </div>
  );
}
