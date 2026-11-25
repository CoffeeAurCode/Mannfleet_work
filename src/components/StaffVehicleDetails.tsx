"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DETAILS_FIELDS, TEMPLATES, normalizeMobile, previewMessage,
  type DetailsKind, type DetailsValues,
} from "@/lib/vehicle-details";

/**
 * Staff page: fill in an allotted booking and send the customer the approved
 * vehicle-details WhatsApp through Omni (see /api/staff/vehicle-details).
 * The password is kept in sessionStorage so a refresh doesn't ask again.
 */

const KEY_STORAGE = "mannfleet_staff_key";
const API = "/api/staff/vehicle-details";

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem 0.9rem",
  borderRadius: "0.75rem",
  background: "var(--glass-ultra)",
  border: "1px solid var(--border-subtle)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  fontFamily: "'Poppins', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.04em",
  color: "var(--text-55)", textTransform: "uppercase",
};

const emptyValues = (): DetailsValues =>
  Object.fromEntries(DETAILS_FIELDS.map((f) => [f.key, ""]));

type Status =
  | { state: "idle" }
  | { state: "confirm" }
  | { state: "sending" }
  | { state: "sent"; to: string; template: string; id: string }
  | { state: "error"; message: string; detail?: string };

export default function StaffVehicleDetails() {
  const [staffKey, setStaffKey] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Reading sessionStorage has to wait for the client; it can't be read
    // during render without a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStaffKey(sessionStorage.getItem(KEY_STORAGE));
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!staffKey) {
    return <Unlock onUnlock={(k) => { sessionStorage.setItem(KEY_STORAGE, k); setStaffKey(k); }} />;
  }
  return (
    <DetailsForm
      staffKey={staffKey}
      onLocked={() => { sessionStorage.removeItem(KEY_STORAGE); setStaffKey(null); }}
    />
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <main style={{ padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)", maxWidth: 1180, margin: "0 auto" }}>
        <span className="glass-badge" style={{ marginBottom: "0.8rem", display: "inline-block" }}>Staff only</span>
        <h1 className="font-serif" style={{
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 400, color: "var(--text-primary)",
          lineHeight: 1.1, margin: "0 0 0.5rem",
        }}>
          Send vehicle details <span className="italic" style={{ color: "var(--text-secondary)" }}>on WhatsApp</span>
        </h1>
        <p className="font-sans" style={{ fontSize: "0.92rem", color: "var(--text-secondary)", margin: "0 0 2rem", maxWidth: 640 }}>
          Once a car and chauffeur are allotted, fill this in and press Send. The customer gets
          Mann&apos;s approved WhatsApp message with the vehicle and chauffeur details.
        </p>
        {children}
      </main>
    </div>
  );
}

function Unlock({ onUnlock }: { onUnlock: (key: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-staff-key": password },
        body: JSON.stringify({ check: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) onUnlock(password);
      else setError(data.error || "Couldn't sign in.");
    } catch {
      setError("Network error. Check the connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <form onSubmit={submit} className="glass-panel" style={{
        borderRadius: "1.5rem", padding: "clamp(1.5rem, 4vw, 2rem)", maxWidth: 420,
        display: "flex", flexDirection: "column", gap: "0.9rem",
      }}>
        <label className="font-sans" style={labelStyle} htmlFor="staff-password">Staff password</label>
        <input
          id="staff-password" type="password" autoComplete="current-password" autoFocus
          value={password} onChange={(e) => setPassword(e.target.value)} style={inputBase}
        />
        {error && <p role="alert" style={{ margin: 0, fontSize: "0.85rem", color: "var(--accent)" }}>{error}</p>}
        <button type="submit" className="btn-primary" disabled={busy || !password} style={{ alignSelf: "flex-start" }}>
          {busy ? "Checking…" : "Open"}
        </button>
      </form>
    </Shell>
  );
}

function DetailsForm({ staffKey, onLocked }: { staffKey: string; onLocked: () => void }) {
  const [values, setValues] = useState<DetailsValues>(emptyValues);
  const [kind, setKind] = useState<DetailsKind>("new");
  // "Send to" follows Guest Mobile until staff type their own number in it.
  const [sendTo, setSendTo] = useState("");
  const [sendToEdited, setSendToEdited] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const recipient = sendToEdited ? sendTo : values.guestMobile;
  const normalized = normalizeMobile(recipient);
  const missing = DETAILS_FIELDS.filter((f) => f.required && !values[f.key].trim());
  const canSend = missing.length === 0 && normalized !== null;
  const preview = useMemo(() => previewMessage(values, kind), [values, kind]);

  function update(key: string, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (status.state !== "sending") setStatus({ state: "idle" });
  }

  async function send() {
    setStatus({ state: "sending" });
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-staff-key": staffKey },
        body: JSON.stringify({ ...values, kind, sendTo: recipient }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        onLocked();
        return;
      }
      if (!res.ok) {
        setStatus({ state: "error", message: data.error || "Sending failed.", detail: data.detail });
        return;
      }
      setStatus({ state: "sent", to: data.to, template: data.template, id: data.id });
    } catch {
      setStatus({ state: "error", message: "Network error. Nothing was sent; try again." });
    }
  }

  function clearForm() {
    setValues(emptyValues());
    setSendTo("");
    setSendToEdited(false);
    setKind("new");
    setStatus({ state: "idle" });
  }

  const shownNumber = normalized ? `+${normalized.slice(0, 2)} ${normalized.slice(2)}` : recipient;

  return (
    <Shell>
      <div style={{
        display: "grid", gap: "1.5rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", alignItems: "start",
      }}>
        <form
          className="glass-panel"
          style={{ borderRadius: "1.5rem", padding: "clamp(1.25rem, 3vw, 2rem)", display: "flex", flexDirection: "column", gap: "1.25rem" }}
          onSubmit={(e) => { e.preventDefault(); if (canSend) setStatus({ state: "confirm" }); }}
        >
          <fieldset style={{ border: 0, padding: 0, margin: 0, display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <legend className="font-sans" style={{ ...labelStyle, marginBottom: "0.5rem" }}>Message</legend>
            {(["new", "revised"] as const).map((k) => (
              <button
                key={k} type="button" aria-pressed={kind === k}
                onClick={() => { setKind(k); setStatus({ state: "idle" }); }}
                style={{
                  padding: "0.55rem 1rem", borderRadius: 999, cursor: "pointer", fontSize: "0.85rem",
                  fontFamily: "inherit",
                  border: `1px solid ${kind === k ? "var(--accent)" : "var(--border-subtle)"}`,
                  background: kind === k ? "var(--accent)" : "var(--glass-ultra)",
                  color: kind === k ? "#fff" : "var(--text-primary)",
                }}
              >
                {k === "new" ? "Vehicle details" : "Revised vehicle details"}
              </button>
            ))}
          </fieldset>

          <div style={{ display: "grid", gap: "0.9rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}>
            {DETAILS_FIELDS.map((f) => (
              <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label className="font-sans" style={labelStyle} htmlFor={`vd-${f.key}`}>
                  {f.label}{f.required && <span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>}
                </label>
                <input
                  id={`vd-${f.key}`} type={f.input} placeholder={f.placeholder}
                  value={values[f.key]} onChange={(e) => update(f.key, e.target.value)}
                  required={f.required} style={inputBase}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label className="font-sans" style={labelStyle} htmlFor="vd-sendTo">
              Send to WhatsApp number<span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>
            </label>
            <input
              id="vd-sendTo" type="tel" value={recipient} placeholder="Same as Guest Mobile No"
              onChange={(e) => { setSendTo(e.target.value); setSendToEdited(true); setStatus({ state: "idle" }); }}
              style={inputBase}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Filled from Guest Mobile No. Change it to send to the booker instead.
              {recipient && !normalized && <strong style={{ color: "var(--accent)" }}> Not a valid mobile number.</strong>}
            </span>
          </div>

          {status.state === "confirm" ? (
            <div role="alert" style={{
              borderRadius: "1rem", padding: "1rem", border: "1px solid var(--accent)",
              display: "flex", flexDirection: "column", gap: "0.75rem",
            }}>
              <span style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
                Send <strong>{TEMPLATES[kind]}</strong> to <strong>{shownNumber}</strong>? A WhatsApp message can&apos;t be unsent.
              </span>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                <button type="button" className="btn-primary" onClick={send}>Yes, send</button>
                <button type="button" onClick={() => setStatus({ state: "idle" })} style={secondaryButton}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
              <button type="submit" className="btn-primary" disabled={!canSend || status.state === "sending"}>
                {status.state === "sending" ? "Sending…" : "Send on WhatsApp"}
              </button>
              <button type="button" onClick={clearForm} style={secondaryButton}>Clear form</button>
              {missing.length > 0 && (
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Still needed: {missing.map((f) => f.label).join(", ")}
                </span>
              )}
            </div>
          )}

          {status.state === "sent" && (
            <p role="status" style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-primary)" }}>
              ✓ Sent <strong>{status.template}</strong> to +{status.to}. Delivery shows in Omni → Reports.
            </p>
          )}
          {status.state === "error" && (
            <div role="alert" style={{ fontSize: "0.88rem", color: "var(--accent)" }}>
              {status.message}
              {status.detail && (
                <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.72rem", color: "var(--text-muted)", margin: "0.4rem 0 0" }}>
                  {status.detail}
                </pre>
              )}
            </div>
          )}
        </form>

        <aside className="glass-panel" style={{ borderRadius: "1.5rem", padding: "clamp(1.25rem, 3vw, 2rem)", position: "sticky", top: "1.5rem" }}>
          <span className="font-sans" style={labelStyle}>Preview: what the customer gets</span>
          <pre style={{
            whiteSpace: "pre-wrap", wordBreak: "break-word", margin: "0.8rem 0 0",
            padding: "1rem", borderRadius: "0.9rem", background: "#E7FFDB", color: "#111b21",
            fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", lineHeight: 1.55,
          }}>
            {preview}
          </pre>
        </aside>
      </div>
    </Shell>
  );
}

const secondaryButton: React.CSSProperties = {
  padding: "0.6rem 1.1rem", borderRadius: 999, cursor: "pointer", fontSize: "0.85rem",
  fontFamily: "inherit", background: "transparent", color: "var(--text-primary)",
  border: "1px solid var(--border-subtle)",
};
