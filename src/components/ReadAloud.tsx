"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const VOICE_KEY = "sf_voice_choice";
const CACHE_NAME = "sf-voice-v1";

// Free, on-device neural voices (Kokoro). "device" falls back to the phone's built-in voice.
const VOICES = [
  { id: "af_heart", label: "Heart: warm and friendly" },
  { id: "af_bella", label: "Bella: bright and lively" },
  { id: "bf_emma", label: "Emma: cheerful British" },
  { id: "device", label: "Phone's built-in voice (no download)" },
];

/* ---------- text helpers ---------- */

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

/* ---------- neural voice worker (shared across lessons) ---------- */

type Listener = (msg: { type: string; id?: number; blob?: Blob; pct?: number; message?: string }) => void;
let worker: Worker | null = null;
const listeners = new Set<Listener>();
let nextId = 1;

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker("/tts-worker.js", { type: "module" });
    worker.onmessage = e => listeners.forEach(l => l(e.data));
    worker.onerror = () => listeners.forEach(l => l({ type: "error", message: "worker failed" }));
  }
  return worker;
}

function generate(text: string, voice: string): Promise<Blob> {
  const w = getWorker();
  const id = nextId++;
  return new Promise((resolve, reject) => {
    const l: Listener = m => {
      if (m.id !== undefined && m.id !== id) return;
      if (m.type === "audio" && m.blob) { listeners.delete(l); resolve(m.blob); }
      else if (m.type === "error") { listeners.delete(l); reject(new Error(m.message)); }
    };
    listeners.add(l);
    w.postMessage({ id, text, voice });
  });
}

/** Get audio for one chunk, generating it once and caching it on the device. */
async function getAudio(text: string, voice: string): Promise<string> {
  const key = new Request(`/__voice/${voice}/${await hashText(text)}`);
  let cache: Cache | null = null;
  try { cache = await caches.open(CACHE_NAME); } catch { /* unavailable */ }
  const hit = cache ? await cache.match(key) : undefined;
  if (hit) return URL.createObjectURL(await hit.blob());
  const blob = await generate(text, voice);
  if (cache) { try { await cache.put(key, new Response(blob, { headers: { "Content-Type": "audio/wav" } })); } catch { /* ignore */ } }
  return URL.createObjectURL(blob);
}

function neuralSupported(): boolean {
  return typeof Worker !== "undefined" && typeof WebAssembly !== "undefined";
}

/* ---------- device voice fallback ---------- */

function bestDeviceVoice(): SpeechSynthesisVoice | undefined {
  const all = window.speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
  const score = (v: SpeechSynthesisVoice) =>
    (/natural|neural|online/i.test(v.name) ? 60 : 0) + (/google/i.test(v.name) ? 25 : 0) +
    (/(female|aria|jenny|sonia|libby|samantha|serena|karen|moira|tessa|fiona|zira|hazel|susan)/i.test(v.name) ? 30 : 0) -
    (/(david|mark|daniel|george|guy|ryan|james|alex|fred|\bmale\b)/i.test(v.name) ? 80 : 0);
  return all.sort((a, b) => score(b) - score(a))[0];
}

/* ---------- component ---------- */

export default function ReadAloud({ title, html, summary }: { title: string; html: string; summary: string }) {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [rate, setRate] = useState(1);
  const [voice, setVoice] = useState("af_heart");
  const [downloadPct, setDownloadPct] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const runId = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const engine = useRef<"neural" | "device">("neural");

  useEffect(() => {
    let saved = "";
    try { saved = localStorage.getItem(VOICE_KEY) || ""; } catch { /* ignore */ }
    if (VOICES.some(v => v.id === saved)) setVoice(saved);
    else if (!neuralSupported()) setVoice("device");
    const l: Listener = m => {
      if (m.type === "progress" && typeof m.pct === "number") setDownloadPct(m.pct);
      if (m.type === "ready") setDownloadPct(null);
    };
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  const stop = useCallback(() => {
    runId.current++;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setState("idle");
  }, []);

  useEffect(() => () => stop(), [stop]);
  useEffect(() => { stop(); setNotice(""); }, [html, stop]);

  const fullText = () => `${title}. ${htmlToText(html)} In summary. ${summary}`;

  const playDevice = (r: number) => {
    engine.current = "device";
    if (!("speechSynthesis" in window)) { setNotice("This device has no built-in voice."); setState("idle"); return; }
    const synth = window.speechSynthesis;
    synth.cancel();
    const id = ++runId.current;
    const v = bestDeviceVoice();
    const parts = chunk(fullText(), 200);
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(p);
      u.rate = r * 0.95;
      u.pitch = 1.05;
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-GB";
      if (i === parts.length - 1) u.onend = () => { if (runId.current === id) setState("idle"); };
      u.onerror = () => { if (runId.current === id) setState("idle"); };
      synth.speak(u);
    });
    setState("playing");
  };

  const playNeural = async (r: number, v: string) => {
    engine.current = "neural";
    if (audioRef.current) audioRef.current.pause();
    const id = ++runId.current;
    const parts = chunk(fullText(), 260);
    setState("loading");
    setNotice("");
    try {
      let next: Promise<string> = getAudio(parts[0], v);
      for (let i = 0; i < parts.length; i++) {
        const url = await next;
        if (runId.current !== id) return;
        if (i + 1 < parts.length) next = getAudio(parts[i + 1], v); // prepare the next part while this one plays
        const audio = new Audio(url);
        audio.playbackRate = r;
        audioRef.current = audio;
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error("audio"));
          audio.play().then(() => { if (runId.current === id) setState(s => (s === "paused" ? s : "playing")); }).catch(reject);
        });
        URL.revokeObjectURL(url);
        if (runId.current !== id) return;
        if (i + 1 < parts.length) setState(s => (s === "paused" ? s : "loading"));
      }
      setState("idle");
    } catch {
      if (runId.current !== id) return;
      setNotice("The natural voice could not load (check your connection for the first download). Using the phone's voice instead.");
      playDevice(r);
    }
  };

  const start = (r: number, v: string) => { if (v === "device") playDevice(r); else playNeural(r, v); };

  const toggle = () => {
    if (state === "idle") { start(rate, voice); return; }
    if (state === "playing") {
      if (engine.current === "neural") audioRef.current?.pause(); else window.speechSynthesis.pause();
      setState("paused");
    } else if (state === "paused") {
      if (engine.current === "neural") audioRef.current?.play(); else window.speechSynthesis.resume();
      setState("playing");
    }
  };

  const changeRate = (r: number) => {
    setRate(r);
    if (engine.current === "neural" && audioRef.current) audioRef.current.playbackRate = r;
    else if (state !== "idle") playDevice(r);
  };

  const changeVoice = (v: string) => {
    setVoice(v);
    try { localStorage.setItem(VOICE_KEY, v); } catch { /* ignore */ }
    if (state !== "idle") start(rate, v);
  };

  const label = state === "idle" ? "🔊 Listen"
    : state === "loading" ? (downloadPct !== null ? `Downloading voice ${downloadPct}%` : "Preparing...")
    : state === "playing" ? "⏸ Pause" : "▶ Resume";

  return (
    <div className="glass rounded-xl p-3 space-y-2 border border-white/10">
      <div className="flex items-center gap-2">
        <button onClick={toggle} disabled={state === "loading" && !audioRef.current} className="btn-neon text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-70">
          {label}
        </button>
        {state !== "idle" && <button onClick={stop} className="glass border border-white/10 text-white text-sm px-3 py-2 rounded-lg">⏹</button>}
        <select value={rate} onChange={e => changeRate(Number(e.target.value))} className="ml-auto bg-bg-card border border-white/10 rounded-lg text-xs text-white px-2 py-2">
          {[0.85, 1, 1.15, 1.3].map(r => <option key={r} value={r}>{r}x</option>)}
        </select>
      </div>
      <select value={voice} onChange={e => changeVoice(e.target.value)} className="w-full bg-bg-card border border-white/10 rounded-lg text-xs text-white px-2 py-2">
        {VOICES.filter(v => v.id === "device" || neuralSupported()).map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
      </select>
      {voice !== "device" && (
        <p className="text-[10px] text-txt-dim">Free natural voice that runs on your phone. The first use downloads about 90 MB once; after that it works offline and each lesson&apos;s audio is saved.</p>
      )}
      {notice && <p className="text-[10px] text-warn">{notice}</p>}
    </div>
  );
}
