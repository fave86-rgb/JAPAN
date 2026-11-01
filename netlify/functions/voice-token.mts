import OpenAI from "openai";
import type { Config, Context } from "@netlify/functions";

async function safetyId(context: Context) {
  const raw = `${context.site.id}:${context.ip}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const client = new OpenAI();
    const id = await safetyId(context);
    const secret = await client.realtime.clientSecrets.create({
      expires_after: { anchor: "created_at", seconds: 120 },
      session: {
        type: "realtime",
        model: "gpt-realtime-2.1-mini",
        output_modalities: ["audio"],
        instructions: "Sei la voce narrante italiana di una guida culturale. Leggi fedelmente il testo fornito, senza inventare o aggiungere informazioni. Tono naturale, caldo e sobrio, ritmo tranquillo e dizione chiara. Pronuncia con cura i nomi giapponesi.",
        audio: { output: { voice: "marin", speed: 0.95 } },
        max_output_tokens: 2048
      }
    }, {
      headers: { "OpenAI-Safety-Identifier": id }
    });

    return Response.json({ value: secret.value, expires_at: secret.expires_at });
  } catch (error) {
    console.error("voice-token", error);
    return Response.json({ error: "Voce AI non disponibile" }, { status: 502 });
  }
};

export const config: Config = {
  path: "/api/voice-token",
  method: "POST",
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ["ip", "domain"]
  }
};
