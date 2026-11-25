/**
 * The "vehicle details" WhatsApp message staff send once a car and chauffeur
 * are allotted. It uses the client's two Meta-approved Omni templates, which
 * must not be edited (client, 25 Nov 2026): `vdetails` for a first send and
 * `revisedvd` for a change. Both take the same 15 body values in this order;
 * their header, helpline line, footer and "Call us" button are fixed text.
 *
 * Shared by the staff page (form + preview) and /api/staff/vehicle-details.
 */

export const TEMPLATES = { new: "vdetails", revised: "revisedvd" } as const;
export type DetailsKind = keyof typeof TEMPLATES;

export type DetailsField = {
  key: string;
  /** The label exactly as it reads in the template. */
  label: string;
  required: boolean;
  input: "text" | "date" | "time" | "tel";
  placeholder?: string;
};

/** Template order: index 0 fills {{1}} … index 14 fills {{15}}. */
export const DETAILS_FIELDS: DetailsField[] = [
  { key: "serviceCity", label: "Service City", required: true, input: "text", placeholder: "Delhi" },
  { key: "serviceDate", label: "Service Date", required: true, input: "date" },
  { key: "jobNo", label: "Job No", required: false, input: "text", placeholder: "180025-06" },
  { key: "billTo", label: "Bill To", required: false, input: "text", placeholder: "Company or client" },
  { key: "bookedBy", label: "Booked By", required: false, input: "text", placeholder: "Self" },
  { key: "guestName", label: "Guest Name", required: true, input: "text" },
  { key: "guestMobile", label: "Guest Mobile No", required: true, input: "tel", placeholder: "98100 08008" },
  { key: "reportingAddress", label: "Reporting Address", required: true, input: "text" },
  { key: "reportingTime", label: "Reporting Time", required: true, input: "time" },
  { key: "tourProgram", label: "Tour Program", required: false, input: "text", placeholder: "Local / Outstation / Airport" },
  { key: "vehicleRequest", label: "Vehicle Request", required: false, input: "text", placeholder: "Innova" },
  { key: "vehicleAllotted", label: "Vehicle Allotted", required: true, input: "text", placeholder: "Fortuner" },
  { key: "vehicleNo", label: "Vehicle No", required: true, input: "text", placeholder: "DL1NA4829" },
  { key: "chauffeurName", label: "Chauffeur's Name", required: true, input: "text" },
  { key: "chauffeurMobile", label: "Chauffeur's Mobile No", required: true, input: "tel" },
];

export type DetailsValues = Record<string, string>;

/** "2025-12-08" → "08-12-2025", the format the client's own sends use. */
export function formatServiceDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : iso.trim();
}

/**
 * One template value. WhatsApp rejects empty values and values containing
 * newlines, tabs or more than four spaces in a row, so those are cleaned up
 * and an empty optional field is sent as "-".
 */
export function toParam(field: DetailsField, raw: string | undefined) {
  let v = (raw ?? "").replace(/[\r\n\t]+/g, " ").replace(/ {2,}/g, " ").trim();
  if (field.input === "date") v = formatServiceDate(v);
  return (v || "-").slice(0, 200);
}

export function templateParams(values: DetailsValues) {
  return DETAILS_FIELDS.map((f) => toParam(f, values[f.key]));
}

/**
 * Indian mobile (10 digits, optional +91 / 91 / 0) → "91XXXXXXXXXX". Any other
 * number written with a leading + is kept as international digits. Returns
 * null when it can't be a WhatsApp number.
 */
export function normalizeMobile(raw: string) {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`;
  if (/^0[6-9]\d{9}$/.test(digits)) return `91${digits.slice(1)}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return digits;
  if (trimmed.startsWith("+") && /^\d{8,15}$/.test(digits)) return digits;
  return null;
}

/** What the customer will see, for the page's preview. Mirrors the approved text. */
export function previewMessage(values: DetailsValues, kind: DetailsKind) {
  const p = templateParams(values);
  const intro = kind === "revised"
    ? "Please find below the revised vehicle details for the given service"
    : "Please find below the vehicle details for the given service";
  return [
    "Greetings From Mann Fleet Partners Limited!",
    "",
    intro,
    ...DETAILS_FIELDS.map((f, i) => `${f.label}: ${p[i]}`),
    "Mann Help Line : 9990222999, 9891919292",
    "",
    "We wish you a safe journey and a productive trip ahead",
    "[ Call us for any query ]",
  ].join("\n");
}
