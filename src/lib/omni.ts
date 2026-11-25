/**
 * WhatsApp template sends through Tata Tele Business "Smartflo Omni" (the
 * client's WhatsApp Business API provider). Server-only: reads
 * OMNI_ACCESS_TOKEN, the WhatsApp channel's access token from
 * omni.tatatelebusiness.com → Settings → Channels → WhatsApp → Details.
 * API reference: https://help.omni.tatatelebusiness.com/api-reference
 */

const OMNI_API = "https://wb.omni.tatatelebusiness.com";

export function omniConfigured() {
  return Boolean(process.env.OMNI_ACCESS_TOKEN);
}

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; status: number; detail: string };

/** Sends an approved text template. Never throws. */
export async function sendTemplate({ to, name, language = "en", bodyParams }: {
  to: string;
  name: string;
  language?: string;
  bodyParams: string[];
}): Promise<SendResult> {
  const token = process.env.OMNI_ACCESS_TOKEN;
  if (!token) return { ok: false, status: 503, detail: "OMNI_ACCESS_TOKEN is not set" };

  try {
    const res = await fetch(`${OMNI_API}/whatsapp-cloud/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        to,
        type: "template",
        source: "external",
        template: {
          name,
          language: { code: language },
          components: [
            { type: "body", parameters: bodyParams.map((text) => ({ type: "text", text })) },
          ],
        },
      }),
    });
    const text = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("Omni send failed", res.status, text);
      return { ok: false, status: res.status, detail: text.slice(0, 500) };
    }
    let id = "";
    try {
      id = String(JSON.parse(text).id ?? "");
    } catch {
      /* a 2xx without JSON still means it was accepted */
    }
    return { ok: true, id };
  } catch (err) {
    console.error("Omni request failed", err);
    return { ok: false, status: 502, detail: "Could not reach Omni" };
  }
}
