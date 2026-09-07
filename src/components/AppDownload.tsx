"use client";

import Image from "next/image";
import { APP_STORE_URL, PLAY_STORE_URL, APP_QR } from "@/lib/app-links";

/* ── Store glyphs ──────────────────────────────────────────── */
function AppleGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 12.54c-.03-2.5 2.04-3.7 2.13-3.76-1.16-1.7-2.97-1.93-3.61-1.96-1.54-.16-3 .9-3.78.9-.78 0-1.98-.88-3.25-.86-1.67.03-3.21.97-4.07 2.46-1.74 3.02-.44 7.49 1.24 9.94.82 1.2 1.8 2.55 3.08 2.5 1.24-.05 1.7-.8 3.2-.8 1.49 0 1.91.8 3.21.78 1.33-.03 2.17-1.22 2.98-2.43.94-1.39 1.33-2.74 1.35-2.81-.03-.01-2.59-1-2.61-3.95zM14.6 4.97c.68-.83 1.14-1.98 1.01-3.13-.98.04-2.17.65-2.88 1.47-.63.73-1.19 1.9-1.04 3.02 1.1.09 2.22-.55 2.91-1.36z" />
    </svg>
  );
}

function PlayGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.18 23.76A1.5 1.5 0 0 1 2 22.29V1.71A1.5 1.5 0 0 1 3.18.24L14.45 12 3.18 23.76zm2.3-1.1L16.3 12 5.48 1.34 4.5 2.54v18.92l.98 1.2zm8.35-5.42L8.24 21l7.38 1.38c.8.15 1.38-.38 1.38-1.18v-.44l-3.17-3.52zm0-10.48L17.23 4 9.65 1.08 8.64 2.7 13.83 7V6.76zm3.88 10.86L22 14.94v-5.88L17.71 6.3l-3.88 5.7 3.88 5.62z" />
    </svg>
  );
}

type Platform = {
  key: "ios" | "android";
  glyph: React.ReactNode;
  eyebrow: string;
  name: string;
  href: string;
  qr: string;
  scanLabel: string;
};

const PLATFORMS: Platform[] = [
  {
    key: "ios",
    glyph: <AppleGlyph />,
    eyebrow: "Download on the",
    name: "App Store",
    href: APP_STORE_URL,
    qr: APP_QR.ios,
    scanLabel: "Scan with your iPhone camera",
  },
  {
    key: "android",
    glyph: <PlayGlyph />,
    eyebrow: "Get it on",
    name: "Google Play",
    href: PLAY_STORE_URL,
    qr: APP_QR.android,
    scanLabel: "Scan with your Android camera",
  },
];

function QRCard({ platform }: { platform: Platform }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.9rem",
        padding: "1.25rem",
        borderRadius: "1.25rem",
        background: "var(--glass-light)",
        border: "1px solid var(--border-subtle)",
        flex: "1 1 200px",
        maxWidth: 260,
      }}
    >
      {/* QR sits on solid white regardless of theme — scanners need the contrast */}
      <div
        style={{
          background: "#fff",
          borderRadius: "0.9rem",
          padding: "0.6rem",
          lineHeight: 0,
          boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
        }}
      >
        <Image
          src={platform.qr}
          alt={`QR code to download the Mann Fleet app on ${platform.name}`}
          width={148}
          height={148}
          style={{ display: "block", width: 148, height: 148 }}
          unoptimized
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <p
          className="font-sans"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: "0 0 0.25rem",
          }}
        >
          <span style={{ color: "var(--text-55)" }}>{platform.glyph}</span>
          {platform.name}
        </p>
        <p
          className="font-sans"
          style={{ fontSize: "0.72rem", color: "var(--text-55)", margin: 0, lineHeight: 1.5 }}
        >
          {platform.scanLabel}
        </p>
      </div>

      <a
        href={platform.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans"
        style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "var(--accent)",
          textDecoration: "none",
          borderBottom: "1px solid transparent",
          transition: "border-color 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = "var(--accent)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = "transparent"; }}
      >
        Or open the store link
      </a>
    </div>
  );
}

/**
 * Download-the-app block with scannable QR codes for both platforms.
 *
 * QR codes are the point, not decoration: an App Store link clicked on a Mac
 * hands off to the desktop Mac App Store, which cannot install an iPhone-only
 * app. Scanning from the phone sidesteps that entirely.
 */
export default function AppDownload() {
  return (
    <section
      id="app"
      style={{
        scrollMarginTop: "6rem",
        padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem)",
        background: "var(--bg-base)",
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          borderRadius: "1.75rem",
          padding: "clamp(1.75rem, 5vw, 3rem)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(1.75rem, 5vw, 3rem)",
        }}
      >
        {/* Copy */}
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>
            Mann Fleet App
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--text-primary)",
              margin: "0 0 1rem",
            }}
          >
            Book a chauffeur<br />
            <span className="italic" style={{ color: "var(--text-secondary)" }}>from your pocket</span>
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              margin: "0 0 1.5rem",
              maxWidth: 460,
            }}
          >
            Track your ride in real time, manage reservations and reach your chauffeur
            directly. Point your phone camera at the code for your platform.
          </p>

          {/* Direct store buttons — for anyone already reading this on a phone */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
            {PLATFORMS.map((p) => (
              <a
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.65rem 1.15rem",
                  background: "var(--glass-light)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--text-50)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
              >
                <span style={{ color: "var(--text-55)", display: "flex" }}>{p.glyph}</span>
                <span>
                  <span
                    className="font-sans"
                    style={{ display: "block", fontSize: "0.6rem", color: "var(--text-35)", lineHeight: 1 }}
                  >
                    {p.eyebrow.toUpperCase()}
                  </span>
                  <span
                    className="font-sans"
                    style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-80)", lineHeight: 1.35 }}
                  >
                    {p.name}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* QR codes */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            flex: "0 1 auto",
            justifyContent: "center",
          }}
        >
          {PLATFORMS.map((p) => (
            <QRCard key={p.key} platform={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
