"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   GlimpsesSection — short muted loops from real deployments
   and press coverage. Clips are trimmed "glimpses" (12s each) and
   stripped of audio; each tile costs only its poster until the clip
   actually plays, so the home page stays light.
───────────────────────────────────────────────────────────────*/

type Glimpse = {
  id: string;
  src: string;
  poster: string;
  badge: string;
  title: string;
  caption: string;
  /** CSS aspect-ratio for the tile — matches each clip's own framing. */
  ratio: string;
};

const GLIMPSES: Record<"press" | "coach" | "arrival", Glimpse> = {
  press: {
    id: "press",
    src: "/glimpses/press-cnbc.mp4",
    poster: "/glimpses/press-cnbc.jpg",
    badge: "In the press",
    title: "CNBC Awaaz — Awaaz @ 9",
    caption:
      "National business television on the surge in luxury-fleet demand across Delhi through summit season.",
    ratio: "16 / 9",
  },
  coach: {
    id: "coach",
    src: "/glimpses/brics-coach.mp4",
    poster: "/glimpses/brics-coach.jpg",
    badge: "On deployment",
    title: "Delegate coach movement",
    caption:
      "Chief Ministers and Union Ministers boarding Mann coaches — one marshalled convoy in place of separate motorcades.",
    // Matches the clip's own 438x560 crop, so nothing is cover-cropped away.
    ratio: "438 / 560",
  },
  arrival: {
    id: "arrival",
    src: "/glimpses/ceremonial-arrival.mp4",
    poster: "/glimpses/ceremonial-arrival.jpg",
    badge: "Protocol",
    title: "Ceremonial arrival",
    caption:
      "Garlanded forecourt, receiving line, timed drop-offs — the last hundred metres, handled to protocol.",
    ratio: "16 / 10",
  },
};

/* ── Play / pause glyphs ──────────────────────────────────── */
function PlayGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}
function PauseGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="4.5" width="4" height="15" rx="1.2" />
      <rect x="14" y="4.5" width="4" height="15" rx="1.2" />
    </svg>
  );
}

/* ── A single glimpse tile ────────────────────────────────── */
function GlimpseCard({ glimpse }: { glimpse: Glimpse }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  /** User pressed pause — never auto-resume over that choice. */
  const heldRef = useRef(false);

  /* Play while on screen, pause when it leaves. The clip itself is not
     fetched until play() is first called — that is what `preload="none"`
     buys us, so the tile costs only its poster until it is actually seen.
     Attaching `src` up front (rather than gating it on this observer) keeps
     the play button working even where the observer is throttled, e.g. a
     backgrounded tab. */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = videoRef.current;
          if (!video || heldRef.current) continue;

          if (entry.isIntersecting) {
            // Autoplay can still be refused — the poster simply stays put.
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.35 },
    );

    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      heldRef.current = false;
      video.play().catch(() => {});
    } else {
      heldRef.current = true;
      video.pause();
    }
  }, []);

  return (
    <figure
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
      }}
    >
      <div
        ref={wrapRef}
        className="glimpse-frame"
        style={{
          position: "relative",
          aspectRatio: glimpse.ratio,
          borderRadius: "1.25rem",
          overflow: "hidden",
          background: "var(--glass-ultra)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 18px 44px rgba(0,0,0,0.20)",
        }}
      >
        <video
          ref={videoRef}
          src={glimpse.src}
          poster={glimpse.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${glimpse.title} — silent looping clip`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Bottom scrim so the badge and control stay legible */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.42) 100%)",
          }}
        />

        {/* Badge */}
        <span
          style={{
            position: "absolute",
            top: "0.85rem",
            left: "0.85rem",
            padding: "0.3rem 0.7rem",
            borderRadius: 999,
            background: "rgba(12,10,8,0.55)",
            border: "1px solid rgba(255,255,255,0.22)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {glimpse.badge}
        </span>

        {/* Play / pause */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${glimpse.title}` : `Play ${glimpse.title}`}
          style={{
            position: "absolute",
            right: "0.85rem",
            bottom: "0.85rem",
            width: 38,
            height: 38,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            background: "rgba(12,10,8,0.55)",
            border: "1px solid rgba(255,255,255,0.22)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#fff",
            cursor: "pointer",
            padding: 0,
            transition: "background 220ms ease, transform 220ms ease",
          }}
        >
          {playing ? <PauseGlyph /> : <PlayGlyph />}
        </button>
      </div>

      <figcaption>
        <h3
          className="font-serif"
          style={{
            fontSize: "1.15rem",
            fontWeight: 400,
            color: "var(--text-primary)",
            margin: "0 0 0.35rem",
            lineHeight: 1.25,
          }}
        >
          {glimpse.title}
        </h3>
        <p
          style={{
            fontSize: "0.82rem",
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          {glimpse.caption}
        </p>
      </figcaption>
    </figure>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION
════════════════════════════════════════════════════════════ */
export default function GlimpsesSection() {
  return (
    <section
      id="glimpses"
      style={{
        position: "relative",
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 5vw, 4rem)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
            marginBottom: "1.1rem",
          }}
        >
          <span className="glass-badge">from the field</span>
          <div className="rule-glass" style={{ width: "60px" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <h2
            className="text-emboss"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Glimpses from
            <br />
            <span style={{ color: "var(--text-80)" }}>the movement.</span>
          </h2>
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--text-secondary)",
              maxWidth: "360px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Not a showreel — a few seconds each from live summit deployments and
            national press coverage. Silent by design; tap any clip to hold it.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="glimpse-grid">
          <div className="glimpse-col">
            <GlimpseCard glimpse={GLIMPSES.press} />
            <GlimpseCard glimpse={GLIMPSES.arrival} />
          </div>

          <div className="glimpse-col">
            <GlimpseCard glimpse={GLIMPSES.coach} />

            {/* Closing note — fills the shorter right column */}
            <div
              className="glass-panel"
              style={{
                padding: "1.4rem 1.5rem",
                borderRadius: "1.25rem",
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.5,
                  color: "var(--text-primary)",
                  margin: "0 0 0.6rem",
                  fontWeight: 400,
                }}
              >
                Summits don&apos;t reschedule.
              </p>
              <p
                style={{
                  fontSize: "0.82rem",
                  lineHeight: 1.65,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                Every clip here is an ordinary working day for the operations desk
                — sequenced arrivals, marshalled convoys, and vehicles on the mark
                before the delegation does.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glimpse-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: clamp(1.25rem, 2.5vw, 2rem);
          align-items: start;
        }
        .glimpse-col {
          display: flex;
          flex-direction: column;
          gap: clamp(1.75rem, 3vw, 2.5rem);
        }
        .glimpse-frame :global(video) {
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .glimpse-frame:hover :global(video) {
          transform: scale(1.03);
        }
        .glimpse-frame :global(button:hover) {
          background: var(--accent);
          transform: scale(1.06);
        }
        @media (max-width: 860px) {
          .glimpse-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .glimpse-frame:hover :global(video) {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
