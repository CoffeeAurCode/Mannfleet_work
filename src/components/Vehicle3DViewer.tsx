"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * 3D orbit view — the vehicle's photos stand on a rotating ring in real CSS 3D
 * space (perspective + preserve-3d). Drag, swipe, use the arrows or the
 * ← → keys to turn it; it auto-turns until the visitor takes over.
 * No WebGL and no model files, so it costs nothing beyond the photos already
 * on the fleet card.
 */
interface Props {
  images: string[];
  alt: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  indexObjectPositions?: (string | undefined)[];
  indexObjectFits?: ("cover" | "contain" | undefined)[];
}

const MAX_PANELS = 10;

export default function Vehicle3DViewer({
  images, alt, objectFit = "cover", objectPosition, indexObjectPositions, indexObjectFits,
}: Props) {
  const panels = images.slice(0, MAX_PANELS);
  const n = panels.length;
  const step = 360 / n;

  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const angle = useRef({ a: 0 });          // ring rotation in degrees
  const tween = useRef<gsap.core.Tween | null>(null);
  const autoCall = useRef<gsap.core.Tween | null>(null);
  const drag = useRef<{ x: number; lastX: number; lastT: number; v: number } | null>(null);
  const interacted = useRef(false);
  const radiusRef = useRef(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Measure the stage so the ring scales with the modal / card.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const apply = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;
    ring.style.transform = `translateZ(${-radiusRef.current}px) rotateY(${angle.current.a}deg)`;
    const idx = ((Math.round(-angle.current.a / step) % n) + n) % n;
    setActive((prev) => (prev === idx ? prev : idx));
  }, [n, step]);

  // Panel geometry
  const panelH = size.h * 0.68;
  const panelW = Math.min(size.w * 0.62, panelH * 1.6);
  const gap = size.w * 0.04;
  const radius = n > 1 ? (panelW / 2 + gap) / Math.tan(Math.PI / n) : 0;

  useEffect(() => { radiusRef.current = radius; apply(); }, [apply, radius]);

  const stopAuto = useCallback(() => {
    interacted.current = true;
    autoCall.current?.kill();
  }, []);

  const turnTo = useCallback((target: number, duration = 0.7) => {
    tween.current?.kill();
    tween.current = gsap.to(angle.current, {
      a: target, duration, ease: "power3.out", onUpdate: apply,
    });
  }, [apply]);

  const turnBy = useCallback((dir: 1 | -1) => {
    stopAuto();
    const base = Math.round(angle.current.a / step) * step;
    turnTo(base - dir * step);
  }, [step, stopAuto, turnTo]);

  // Gentle auto-turn until the visitor interacts (skipped for reduced motion).
  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tick = () => {
      if (interacted.current) return;
      const base = Math.round(angle.current.a / step) * step;
      turnTo(base - step, 1.1);
      autoCall.current = gsap.delayedCall(2.6, tick);
    };
    autoCall.current = gsap.delayedCall(1.6, tick);
    return () => { autoCall.current?.kill(); tween.current?.kill(); };
  }, [n, step, turnTo]);

  /* ── pointer drag ── */
  const onPointerDown = (e: React.PointerEvent) => {
    stopAuto();
    tween.current?.kill();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, lastX: e.clientX, lastT: performance.now(), v: 0 };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.lastX;
    const now = performance.now();
    const dt = Math.max(now - d.lastT, 1);
    const deg = dx * (180 / Math.max(size.w * 0.6, 200));
    angle.current.a += deg;
    d.v = deg / dt;           // degrees per ms
    d.lastX = e.clientX;
    d.lastT = now;
    apply();
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    setDragging(false);
    const fling = Math.abs(d.v) > 0.02 ? d.v * 220 : 0;  // momentum in degrees
    turnTo(Math.round((angle.current.a + fling) / step) * step, 0.9);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); turnBy(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); turnBy(1); }
  };

  const goTo = (i: number) => {
    stopAuto();
    const current = Math.round(angle.current.a / step) * step;
    const curIdx = ((Math.round(-current / step) % n) + n) % n;
    let diff = i - curIdx;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    turnTo(current - diff * step);
  };

  const arrow: React.CSSProperties = {
    position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 5,
    width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.5)", color: "#fff", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
  };

  return (
    <div
      ref={stageRef}
      role="group"
      aria-label={`${alt} — photo gallery. Drag or use the arrow keys to rotate.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        position: "absolute", inset: 0, overflow: "hidden", outline: "none",
        background: "radial-gradient(ellipse at 50% 38%, #2b2520 0%, #14110e 62%, #0b0907 100%)",
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "pan-y",
        userSelect: "none", WebkitUserSelect: "none",
      }}
    >
      {/* floor glow */}
      <div style={{
        position: "absolute", left: "50%", bottom: "13%", width: "70%", height: "10%",
        transform: "translateX(-50%)", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(200,40,40,0.28) 0%, transparent 70%)",
        filter: "blur(6px)", pointerEvents: "none",
      }} />

      {size.w > 0 && (
        <div style={{
          position: "absolute", inset: 0,
          perspective: `${size.w * 2.1}px`, perspectiveOrigin: "50% 45%",
        }}>
          <div ref={ringRef} style={{
            position: "absolute", left: "50%", top: "43%",
            width: 0, height: 0,
            transformStyle: "preserve-3d",
          }}>
            {panels.map((src, i) => (
              <div key={src + i} style={{
                position: "absolute",
                width: panelW, height: panelH,
                left: -panelW / 2, top: -panelH / 2,
                transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                borderRadius: 10, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
                background: "#1a1613",
              }}>
                <Image
                  src={src}
                  alt={`${alt} — view ${i + 1} of ${n}`}
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 70vw, 340px"
                  style={{
                    objectFit: indexObjectFits?.[i] ?? objectFit,
                    objectPosition: indexObjectPositions?.[i] ?? objectPosition,
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {n > 1 && (
        <>
          <button type="button" aria-label="Rotate left" style={{ ...arrow, left: "0.5rem" }}
            onPointerDown={(e) => e.stopPropagation()} onClick={() => turnBy(-1)}>&#10094;</button>
          <button type="button" aria-label="Rotate right" style={{ ...arrow, right: "0.5rem" }}
            onPointerDown={(e) => e.stopPropagation()} onClick={() => turnBy(1)}>&#10095;</button>
        </>
      )}

      {/* hint + position dots */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: "0.55rem", zIndex: 5,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
        pointerEvents: "none",
      }}>
        <span className="font-sans" style={{
          fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.62)",
        }}>Drag to rotate</span>
        <div style={{ display: "flex", gap: 6, pointerEvents: "auto" }} onPointerDown={(e) => e.stopPropagation()}>
          {panels.map((_, i) => (
            <button key={i} type="button" aria-label={`Show view ${i + 1}`} onClick={() => goTo(i)}
              style={{
                width: i === active ? 16 : 6, height: 6, borderRadius: 3, border: "none", padding: 0,
                background: i === active ? "var(--accent)" : "rgba(255,255,255,0.35)",
                cursor: "pointer", transition: "width 0.25s, background 0.25s",
              }} />
          ))}
        </div>
      </div>
    </div>
  );
}
