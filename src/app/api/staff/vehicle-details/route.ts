import { createHash, timingSafeEqual } from "node:crypto";
import { omniConfigured, sendTemplate } from "@/lib/omni";
import {
  DETAILS_FIELDS, TEMPLATES, normalizeMobile, templateParams,
  type DetailsKind, type DetailsValues,
} from "@/lib/vehicle-details";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Staff-only: sends the vehicle-details WhatsApp (`vdetails` / `revisedvd`) to
 * a customer. The page sends the staff password in `x-staff-key`; it must
 * match STAFF_PASSWORD. Body `{ check: true }` only verifies the password.
 */

// Best-effort brute-force brake. Serverless instances don't share memory, so
// this slows guessing rather than stopping it; STAFF_PASSWORD must be long.
const failures = new Map<string, { count: number; until: number }>();
const MAX_FAILURES = 8;
const LOCK_MS = 15 * 60 * 1000;

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

function digest(s: string) {
  return createHash("sha256").update(s).digest();
}

function passwordOk(given: string | null) {
  const expected = process.env.STAFF_PASSWORD;
  if (!expected || !given) return false;
  return timingSafeEqual(digest(given), digest(expected));
}

export async function POST(req: Request) {
  if (!process.env.STAFF_PASSWORD) {
    console.error("Staff page not configured: set STAFF_PASSWORD");
    return Response.json({ error: "The staff page is not set up yet." }, { status: 503 });
  }

  const ip = clientIp(req);
  const now = Date.now();
  const record = failures.get(ip);
  if (record && record.count >= MAX_FAILURES && record.until > now) {
    return Response.json({ error: "Too many wrong passwords. Try again in 15 minutes." }, { status: 429 });
  }

  if (!passwordOk(req.headers.get("x-staff-key"))) {
    if (failures.size > 500) {
      for (const [key, r] of failures) if (r.until <= now) failures.delete(key);
    }
    const count = record && record.until > now ? record.count + 1 : 1;
    failures.set(ip, { count, until: now + LOCK_MS });
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }
  failures.delete(ip);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  if (input.check === true) return Response.json({ ok: true });

  const values: DetailsValues = {};
  for (const f of DETAILS_FIELDS) {
    const v = input[f.key];
    values[f.key] = typeof v === "string" ? v.trim() : "";
  }
  const missing = DETAILS_FIELDS.filter((f) => f.required && !values[f.key]).map((f) => f.label);
  if (missing.length) {
    return Response.json({ error: `Please fill in: ${missing.join(", ")}.` }, { status: 400 });
  }

  const sendTo = normalizeMobile(typeof input.sendTo === "string" ? input.sendTo : "");
  if (!sendTo) {
    return Response.json({ error: "Enter a valid WhatsApp number to send to." }, { status: 400 });
  }

  const kind: DetailsKind = input.kind === "revised" ? "revised" : "new";

  if (!omniConfigured()) {
    console.error("WhatsApp sending not configured: set OMNI_ACCESS_TOKEN");
    return Response.json({ error: "WhatsApp sending is not set up yet." }, { status: 503 });
  }

  const result = await sendTemplate({
    to: sendTo,
    name: TEMPLATES[kind],
    language: process.env.OMNI_TEMPLATE_LANGUAGE || "en",
    bodyParams: templateParams(values),
  });

  if (!result.ok) {
    return Response.json(
      { error: "WhatsApp did not accept the message.", detail: result.detail },
      { status: 502 },
    );
  }
  return Response.json({ ok: true, id: result.id, to: sendTo, template: TEMPLATES[kind] });
}
