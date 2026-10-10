"use client";

import { useEffect, useRef, useState } from "react";
import { hasSeenIntroThisSession, markIntroDone } from "@/lib/intro";

const FADE_MS = 250;
// If the clip can't autoplay (iOS Low Power Mode, data saver), show its final
// frame as a still for this long instead.
const STILL_MS = 1000;
// If the clip never starts, don't hold the site behind a black screen.
const LOAD_TIMEOUT_MS = 2500;
// Hard ceiling once it is playing, in case playback stalls mid-clip.
const MAX_MS = 4000;

export default function LogoIntro() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const [still, setStill] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  const restartTimer = (ms: number) => {
    if (handledRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(dismiss, ms);
  };

  const showStill = () => {
    setStill(true);
    restartTimer(STILL_MS - FADE_MS);
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

    restartTimer(LOAD_TIMEOUT_MS);

    // Call play() ourselves rather than rely on the autoPlay attribute alone,
    // so a blocked autoplay is caught and falls back to the still.
    videoRef.current?.play().catch(showStill);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  const mediaStyle = { width: "min(80vw, 1080px)", height: "auto" } as const;

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
      {still ? (
        // Final frame of the clip, so the fallback looks like the clip's end.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/mann-intro-logo.webp"
          alt="Mann Fleet Partners"
          width={1080}
          height={540}
          onError={dismiss}
          style={mediaStyle}
        />
      ) : (
        // The client's 1.6s logo animation, cropped to the logo and stripped of
        // audio. It ends on the full logo, which holds while the overlay fades.
        <video
          ref={videoRef}
          src="/mann-intro-logo.mp4"
          aria-label="Mann Fleet Partners"
          width={1080}
          height={540}
          muted
          playsInline
          preload="auto"
          onPlaying={() => restartTimer(MAX_MS)}
          onEnded={dismiss}
          onError={showStill}
          style={mediaStyle}
        />
      )}
    </div>
  );
}
