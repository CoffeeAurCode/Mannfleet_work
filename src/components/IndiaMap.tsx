"use client";

import dynamic from "next/dynamic";

const IndiaMapLeaflet = dynamic(() => import("./IndiaMapLeaflet"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: "clamp(280px, 50vw, 480px)",
      background: "var(--glass-ultra)",
      borderRadius: "1.25rem",
      border: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <span className="font-sans" style={{ fontSize: "0.82rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
        Loading map…
      </span>
    </div>
  ),
});

export default function IndiaMap() {
  return (
    <div style={{ height: "clamp(280px, 50vw, 560px)", borderRadius: "1.25rem", overflow: "hidden" }}>
      <IndiaMapLeaflet />
    </div>
  );
}
