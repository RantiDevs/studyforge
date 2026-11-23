"use client";
import { useEffect, useRef, useState } from "react";

function htmlToText(html: string): string {
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || "").replace(/\s+/g, " ").trim();
}

function chunk(text: string, max = 220): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + s).length > max && cur) { out.push(cur); cur = s; } else cur += s;
  }
  if (cur) out.push(cur);
  return out;
}

export default function ReadAloud({ title, html, summary }: { title: string; html: string; summary: string }) {
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [rate, setRate] = useState(1);
  const [supported, setSupported] = useState(true);
  const runId = useRef(0);

  const stop = () => {
    runId.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setState("idle");
  };

  useEffect(() => {
    setSupported("speechSynthesis" in window);
    return () => { runId.current++; if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  }, []);

  // Stop when the lesson changes
  useEffect(() => { stop(); }, [html]);

  const play = (r: number) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const id = ++runId.current;
    const parts = chunk(`${title}. ${htmlToText(html)} Summary. ${summary}`);
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(p);
      u.rate = r;
      u.lang = "en-GB";
      if (i === parts.length - 1) u.onend = () => { if (runId.current === id) setState("idle"); };
      u.onerror = () => { if (runId.current === id) setState("idle"); };
      synth.speak(u);
    });
    setState("playing");
  };

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (state === "idle") play(rate);
    else if (state === "playing") { synth.pause(); setState("paused"); }
    else { synth.resume(); setState("playing"); }
  };

  const changeRate = (r: number) => {
    setRate(r);
    if (state !== "idle") play(r);
  };

  if (!supported) return null;
  return (
    <div className="glass rounded-xl p-3 flex items-center gap-2 border border-white/10">
      <button onClick={toggle} className="btn-neon text-white text-sm font-semibold px-4 py-2 rounded-lg">
        {state === "idle" ? "🔊 Listen" : state === "playing" ? "⏸ Pause" : "▶ Resume"}
      </button>
      {state !== "idle" && <button onClick={stop} className="glass border border-white/10 text-white text-sm px-3 py-2 rounded-lg">⏹</button>}
      <select value={rate} onChange={e => changeRate(Number(e.target.value))} className="ml-auto bg-bg-card border border-white/10 rounded-lg text-xs text-white px-2 py-2">
        {[0.8, 1, 1.25, 1.5].map(r => <option key={r} value={r}>{r}x</option>)}
      </select>
    </div>
  );
}
