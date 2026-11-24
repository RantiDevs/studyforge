"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const VOICE_KEY = "sf_voice";

const FEMALE_HINTS = /(aria|jenny|sonia|libby|maisie|natasha|abbi|bella|hollie|olivia|emma|michelle|ava|jane|nancy|sara|ana|ivy|samantha|serena|karen|moira|tessa|fiona|victoria|susan|hazel|zira|female|woman|google uk english female|google us english)/i;
const MALE_HINTS = /(male(?!.*female)|david|mark|daniel|george|guy|ryan|james|thomas|alex|fred|ralph|eric|brian|christopher|roger|steffan|connor|\bman\b)/i;

function scoreVoice(v: SpeechSynthesisVoice): number {
  let s = 0;
  const name = v.name;
  if (/natural|neural|online/i.test(name)) s += 60; // modern neural voices sound far more human
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
  el.innerHTML = html
    .replace(/<\/(h[1-6]|p|li|div)>/gi, ". ")
    .replace(/<br\s*\/?>/gi, ", ");
  return (el.textContent || "").replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
}

function chunk(text: string, max = 200): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + s).length > max && cur) { out.push(cur.trim()); cur = s; } else cur += s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

export default function ReadAloud({ title, html, summary }: { title: string; html: string; summary: string }) {
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [rate, setRate] = useState(0.95);
  const [supported, setSupported] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState("");
  const runId = useRef(0);

  const stop = useCallback(() => {
    runId.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setState("idle");
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) { setSupported(false); return; }
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
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      runId.current++;
      window.speechSynthesis.cancel();
    };
  }, []);

  // Stop when the lesson changes
  useEffect(() => { stop(); }, [html, stop]);

  const play = (r: number, vName: string) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const id = ++runId.current;
    const voice = voices.find(v => v.name === vName);
    const parts = chunk(`${title}. ${htmlToText(html)} In summary. ${summary}`);
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(p);
      u.rate = r;
      u.pitch = 1.02;
      if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-GB";
      if (i === parts.length - 1) u.onend = () => { if (runId.current === id) setState("idle"); };
      u.onerror = () => { if (runId.current === id) setState("idle"); };
      synth.speak(u);
    });
    setState("playing");
  };

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (state === "idle") play(rate, voiceName);
    else if (state === "playing") { synth.pause(); setState("paused"); }
    else { synth.resume(); setState("playing"); }
  };

  const changeRate = (r: number) => { setRate(r); if (state !== "idle") play(r, voiceName); };
  const changeVoice = (n: string) => {
    setVoiceName(n);
    try { localStorage.setItem(VOICE_KEY, n); } catch { /* ignore */ }
    if (state !== "idle") play(rate, n);
  };

  if (!supported) return null;
  const natural = voices.find(v => v.name === voiceName) && /natural|neural|online/i.test(voiceName);
  return (
    <div className="glass rounded-xl p-3 space-y-2 border border-white/10">
      <div className="flex items-center gap-2">
        <button onClick={toggle} className="btn-neon text-white text-sm font-semibold px-4 py-2 rounded-lg">
          {state === "idle" ? "🔊 Listen" : state === "playing" ? "⏸ Pause" : "▶ Resume"}
        </button>
        {state !== "idle" && <button onClick={stop} className="glass border border-white/10 text-white text-sm px-3 py-2 rounded-lg">⏹</button>}
        <select value={rate} onChange={e => changeRate(Number(e.target.value))} className="ml-auto bg-bg-card border border-white/10 rounded-lg text-xs text-white px-2 py-2">
          {[0.8, 0.95, 1.1, 1.3].map(r => <option key={r} value={r}>{r}x</option>)}
        </select>
      </div>
      {voices.length > 1 && (
        <select value={voiceName} onChange={e => changeVoice(e.target.value)} className="w-full bg-bg-card border border-white/10 rounded-lg text-xs text-white px-2 py-2">
          {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
        </select>
      )}
      {voices.length > 0 && !natural && (
        <p className="text-[10px] text-txt-dim">Tip: pick a voice marked Natural or Online if your device has one. Those sound the most human.</p>
      )}
    </div>
  );
}
