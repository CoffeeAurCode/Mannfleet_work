import { BOOKING_EMAIL, WHATSAPP_NUMBER } from "@/lib/contact";
import { escapeHtml, mailerConfigured, sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FIELD_CHARS = 2000;
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

/** Booking sections, in the order the form shows them. */
const SECTIONS: { heading: string; fields: [key: string, label: string][] }[] = [
  { heading: "Guest", fields: [["guestName", "Name"], ["contactNumber", "Phone"], ["emailAddress", "Email"]] },
  {
    heading: "Trip duration",
    fields: [["dateOfTravel", "Date of travel"], ["endDate", "End date"], ["numberOfDays", "Number of days"]],
  },
  {
    heading: "Pick-up",
    fields: [
      ["pickupTime", "Time"], ["cityName", "City"], ["flightDetails", "Flight details"],
      ["airportName", "Airport"], ["terminal", "Terminal"], ["hotelName", "Hotel"],
      ["residenceAddress", "Residence address"],
    ],
  },
  { heading: "Drop-off", fields: [["dropoffLocation", "Location"]] },
  {
    heading: "Requirements",
    fields: [
      ["noOfPersons", "No. of persons"], ["selectedVehicle", "Vehicle from fleet page"],
      ["vehiclePreferences", "Vehicle preference"], ["servicesRequired", "Services required"],
    ],
  },
];

const REQUIRED = [
  "guestName", "contactNumber", "emailAddress", "dateOfTravel", "endDate",
  "pickupTime", "cityName", "dropoffLocation", "noOfPersons",
];

type Booking = Record<string, string>;

/** Header values (subject) must be a single line. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

function bookingText(b: Booking) {
  return SECTIONS.map(({ heading, fields }) => {
    const rows = fields.filter(([k]) => b[k]).map(([k, label]) => `  ${label}: ${b[k]}`);
    return rows.length ? `${heading.toUpperCase()}\n${rows.join("\n")}` : "";
  })
    .filter(Boolean)
    .join("\n\n");
}

function bookingHtml(b: Booking) {
  return SECTIONS.map(({ heading, fields }) => {
    const rows = fields
      .filter(([k]) => b[k])
      .map(
        ([k, label]) =>
          `<tr><td style="padding:3px 16px 3px 0;color:#777;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
          `<td style="padding:3px 0;color:#222">${escapeHtml(b[k]).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("");
    return rows
      ? `<h3 style="margin:20px 0 6px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#c8282a">${escapeHtml(heading)}</h3>` +
          `<table style="border-collapse:collapse;font-size:14px">${rows}</table>`
      : "";
  }).join("");
}

const shell = (inner: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#222">${inner}</div>`;

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const booking: Booking = {};
  for (const { fields } of SECTIONS) {
    for (const [key] of fields) {
      const v = input[key];
      booking[key] = typeof v === "string" ? v.trim().slice(0, MAX_FIELD_CHARS) : "";
    }
  }

  const missing = REQUIRED.filter((k) => !booking[k]);
  if (missing.length) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(booking.emailAddress)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!mailerConfigured()) {
    console.error("Reservation email not configured: set RESEND_API_KEY and RESERVATION_FROM");
    return Response.json({ error: "Booking email is unavailable right now." }, { status: 503 });
  }

  const guest = oneLine(booking.guestName);
  const vehicle = oneLine(booking.selectedVehicle);
  const text = bookingText(booking);
  const html = bookingHtml(booking);

  // 1. The booking itself → support inbox. Reply goes straight to the guest.
  //    If this fails the booking has not reached us, so the caller must know.
  const supportSent = await sendEmail({
    to: BOOKING_EMAIL,
    replyTo: booking.emailAddress,
    subject: vehicle ? `New reservation — ${vehicle} — ${guest}` : `New reservation — ${guest}`,
    text: `New reservation request from mannfleetpartners.com\n\n${text}`,
    html: shell(
      `<h2 style="margin:0 0 4px;font-weight:600">New reservation request</h2>` +
        `<p style="margin:0;color:#777;font-size:13px">Submitted on mannfleetpartners.com. Reply to this email to reach the guest.</p>` +
        html,
    ),
  });
  if (!supportSent) {
    return Response.json({ error: "We couldn't send your booking." }, { status: 502 });
  }

  // 2. Confirmation → the guest's own address. The booking is already safe at
  //    support, so a failure here is reported but is not an error.
  const firstName = oneLine(guest.split(" ").filter((p) => !/^(mr|ms|mrs|dr)\.?$/i.test(p))[0] ?? "") || "valued guest";
  const confirmationSent = await sendEmail({
    to: booking.emailAddress,
    replyTo: BOOKING_EMAIL,
    subject: "We've received your reservation request — MANN",
    text:
      `Dear ${firstName},\n\n` +
      `Thank you for choosing MANN. We've received your reservation request and our team will confirm it within 2 hours.\n\n` +
      `${text}\n\n` +
      `Need to change something? Reply to this email, write to ${BOOKING_EMAIL} or message us on WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n\n` +
      `MANN — Premium Car Rental\nhttps://www.mannfleetpartners.com`,
    html: shell(
      `<h2 style="margin:0 0 8px;font-weight:600">Thank you, ${escapeHtml(firstName)}</h2>` +
        `<p style="margin:0 0 4px;line-height:1.6">We&apos;ve received your reservation request. Our team will confirm it within 2 hours.</p>` +
        `<p style="margin:0;color:#777;font-size:13px">Here is what you sent us:</p>` +
        html +
        `<p style="margin:24px 0 0;line-height:1.6;font-size:14px">Need to change something? Reply to this email, write to ` +
        `<a href="mailto:${BOOKING_EMAIL}" style="color:#c8282a">${BOOKING_EMAIL}</a> or ` +
        `<a href="https://wa.me/${WHATSAPP_NUMBER}" style="color:#c8282a">message us on WhatsApp</a>.</p>` +
        `<p style="margin:20px 0 0;color:#777;font-size:12px">MANN — Premium Car Rental · mannfleetpartners.com</p>`,
    ),
  });

  return Response.json({ ok: true, confirmationSent });
}
