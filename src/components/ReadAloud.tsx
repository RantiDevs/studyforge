"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const VOICE_KEY = "sf_voice";
const CACHE_NAME = "sf-tts-v1";

const FEMALE_HINTS = /(aria|jenny|sonia|libby|maisie|natasha|abbi|bella|hollie|olivia|emma|michelle|ava|jane|nancy|sara|ana|ivy|samantha|serena|karen|moira|tessa|fiona|victoria|susan|hazel|zira|female|woman|google uk english female|google us english)/i;
const MALE_HINTS = /(male(?!.*female)|david|mark|daniel|george|guy|ryan|james|thomas|alex|fred|ralph|eric|brian|christopher|roger|steffan|connor|\bman\b)/i;

function scoreVoice(v: SpeechSynthesisVoice): number {
  let s = 0;
  const name = v.name;
  if (/natural|neural|online/i.test(name)) s += 60;
  if (/google/i.test(name)) s += 25;
  if (FEMALE_HINTS.test(name)) s += 30;
  if (MALE_HINTS.test(name) && !/female/i.test(name)) s -= 80;
  if (/espeak|compact|robot/i.test(name)) s -= 100;
  if (/^en-(GB|NG|ZA|US|AU|IN)/i.test(v.lang)) s += 15;
  if (/^en-GB/i.test(v.lang)) s += 5;
  if (!v.localService) s += 5;
  return s;
}

function htmlToText(html: string): string {
  const el = document.createElement("div");
  el.innerHTML = html.replace(/<\/(h[1-6]|p|li|div)>/gi, ". ").replace(/<br\s*\/?>/gi, ", ");
  return (el.textContent || "").replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
}

function chunk(text: string, max: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + s).length > max && cur) { out.push(cur.trim()); cur = s; } else cur += s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

async function hashText(text: string): Promise<string> {
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  } catch {
    let h = 0;
    for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
    return `f${h}-${text.length}`;
  }
}

/** Fetch a premium-voice audio chunk, using the on-device cache so each chunk is generated once. */
async function getPremiumAudio(text: string): Promise<string> {
  const key = new Request(`/__tts/${await hashText(text)}`);
  let cache: Cache | null = null;
  try { cache = await caches.open(CACHE_NAME); } catch { /* cache unavailable */ }
  const hit = cache ? await cache.match(key) : undefined;
  if (hit) return URL.createObjectURL(await hit.blob());
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("tts failed");
  const blob = await res.blob();
  if (cache) { try { await cache.put(key, new Response(blob, { headers: { "Content-Type": "audio/mpeg" } })); } catch { /* ignore */ } }
  return URL.createObjectURL(blob);
}

export default function ReadAloud({ title, html, summary }: { title: string; html: string; summary: string }) {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [rate, setRate] = useState(1);
  const [supported, setSupported] = useState(true);
  const [premium, setPremium] = useState(false);
  const [notice, setNotice] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState("");
  const runId = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const engine = useRef<"premium" | "device">("device");

  const stop = useCallback(() => {
    runId.current++;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setState("idle");
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/tts").then(r => r.json()).then(d => { if (!cancelled) setPremium(Boolean(d.enabled)); }).catch(() => {});
    if (!("speechSynthesis" in window)) { setSupported(false); return () => { cancelled = true; }; }
    const load = () => {
      const all = window.speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
      if (!all.length) return;
      const sorted = [...all].sort((a, b) => scoreVoice(b) - scoreVoice(a));
      setVoices(sorted);
      let saved = "";
      try { saved = localStorage.getItem(VOICE_KEY) || ""; } catch { /* ignore */ }
      setVoiceName(prev => prev || (sorted.some(v => v.name === saved) ? saved : sorted[0].name));
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      cancelled = true;
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      runId.current++;
      window.speechSynthesis.cancel();
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  useEffect(() => { stop(); setNotice(""); }, [html, stop]);

  const fullText = () => `${title}. ${htmlToText(html)} In summary. ${summary}`;

  const playDevice = (r: number, vName: string) => {
    engine.current = "device";
    const synth = window.speechSynthesis;
    synth.cancel();
    const id = ++runId.current;
    const voice = voices.find(v => v.name === vName);
    const parts = chunk(fullText(), 200);
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(p);
      u.rate = r * 0.95;
      u.pitch = 1.05;
      if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-GB";
      if (i === parts.length - 1) u.onend = () => { if (runId.current === id) setState("idle"); };
      u.onerror = () => { if (runId.current === id) setState("idle"); };
      synth.speak(u);
    });
    setState("playing");
  };

  const playPremium = async (r: number) => {
    engine.current = "premium";
    if (audioRef.current) audioRef.current.pause();
    window.speechSynthesis?.cancel();
    const id = ++runId.current;
    const parts = chunk(fullText(), 900);
    setState("loading");
    setNotice("");
    try {
      let next: Promise<string> = getPremiumAudio(parts[0]);
      for (let i = 0; i < parts.length; i++) {
        const url = await next;
        if (runId.current !== id) return;
        if (i + 1 < parts.length) next = getPremiumAudio(parts[i + 1]); // prefetch while this one plays
        const audio = new Audio(url);
        audio.playbackRate = r;
        audioRef.current = audio;
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error("audio"));
          audio.play().then(() => { if (runId.current === id) setState("playing"); }).catch(reject);
        });
        URL.revokeObjectURL(url);
        if (runId.current !== id) return;
      }
      setState("idle");
    } catch {
      if (runId.current !== id) return;
      setNotice("Premium voice is unavailable right now. Using your device voice.");
      playDevice(r, voiceName);
    }
  };

  const start = (r: number, vName: string) => { if (premium) playPremium(r); else playDevice(r, vName); };

  const toggle = () => {
    if (state === "idle") { start(rate, voiceName); return; }
    if (state === "loading") return;
    if (state === "playing") {
      if (engine.current === "premium") audioRef.current?.pause(); else window.speechSynthesis.pause();
      setState("paused");
    } else {
      if (engine.current === "premium") audioRef.current?.play(); else window.speechSynthesis.resume();
      setState("playing");
    }
  };

  const changeRate = (r: number) => {
    setRate(r);
    if (engine.current === "premium" && audioRef.current) audioRef.current.playbackRate = r;
    else if (state !== "idle") playDevice(r, voiceName);
  };
  const changeVoice = (n: string) => {
    setVoiceName(n);
    try { localStorage.setItem(VOICE_KEY, n); } catch { /* ignore */ }
    if (state !== "idle" && engine.current === "device") playDevice(rate, n);
  };

  if (!supported && !premium) return null;
  const natural = /natural|neural|online/i.test(voiceName);
  return (
    <div className="glass rounded-xl p-3 space-y-2 border border-white/10">
      <div className="flex items-center gap-2">
        <button onClick={toggle} disabled={state === "loading"} className="btn-neon text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-70">
          {state === "idle" ? "🔊 Listen" : state === "loading" ? "Preparing voice..." : state === "playing" ? "⏸ Pause" : "▶ Resume"}
        </button>
        {state !== "idle" && <button onClick={stop} className="glass border border-white/10 text-white text-sm px-3 py-2 rounded-lg">⏹</button>}
        <select value={rate} onChange={e => changeRate(Number(e.target.value))} className="ml-auto bg-bg-card border border-white/10 rounded-lg text-xs text-white px-2 py-2">
          {[0.85, 1, 1.15, 1.3].map(r => <option key={r} value={r}>{r}x</option>)}
        </select>
      </div>
      {premium && <p className="text-[10px] text-success">Premium voice on</p>}
      {!premium && voices.length > 1 && (
        <select value={voiceName} onChange={e => changeVoice(e.target.value)} className="w-full bg-bg-card border border-white/10 rounded-lg text-xs text-white px-2 py-2">
          {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
        </select>
      )}
      {!premium && voices.length > 0 && !natural && (
        <p className="text-[10px] text-txt-dim">Using your device voice. The premium voice is not switched on yet.</p>
      )}
      {notice && <p className="text-[10px] text-warn">{notice}</p>}
    </div>
  );
}
