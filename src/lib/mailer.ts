/**
 * Transactional email via the Resend REST API (no SDK, same fetch style as
 * /api/chat). Server-only: reads RESEND_API_KEY and RESERVATION_FROM from the
 * environment.
 */

type Email = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export function mailerConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESERVATION_FROM);
}

/** Resolves true when the provider accepted the message. Never throws. */
export async function sendEmail({ to, subject, text, html, replyTo }: Email) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESERVATION_FROM;
  if (!apiKey || !from) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend request failed", err);
    return false;
  }
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
