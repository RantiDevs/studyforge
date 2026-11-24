import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// A bright, warm, upbeat female voice. Override with ELEVENLABS_VOICE_ID in Vercel.
const DEFAULT_VOICE = "cgSgspJ2msm6clMCkdW9";
const MAX_CHARS = 1500;

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

// Lets the client know whether premium voice is configured (never exposes the key).
export async function GET() {
  return NextResponse.json({ enabled: Boolean(process.env.ELEVENLABS_API_KEY) });
}

export async function POST(req: NextRequest) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return NextResponse.json({ error: "Premium voice is not configured." }, { status: 503 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let text = "";
  try {
    const body = await req.json();
    text = typeof body.text === "string" ? body.text.trim() : "";
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (!text || text.length > MAX_CHARS) return NextResponse.json({ error: "Text missing or too long" }, { status: 400 });

  const voice = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE;
  const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: process.env.ELEVENLABS_MODEL || "eleven_turbo_v2_5",
      voice_settings: { stability: 0.35, similarity_boost: 0.8, style: 0.6, use_speaker_boost: true },
    }),
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Voice service error", status: upstream.status }, { status: 502 });
  }
  return new NextResponse(upstream.body, {
    headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
  });
}
