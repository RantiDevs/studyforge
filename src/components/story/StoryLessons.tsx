"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Flashcard, Lesson, QuizQuestion } from "../../lib/types";
import type { StoryTheme } from "../../data/stories";
import type { Beat, Character, ChapterScript, CourseScript, Scene } from "../../data/scripts/types";
import { BossBattle } from "../ThemedGames";

/* Visual-novel teaching game. Course outline = chapter map. Each chapter is a scripted scene:
   characters teach in short lines, and interactive beats (decisions, ordering, sorting, matching,
   calculations, blanks) make the learner apply each idea immediately, with hints and feedback. */

/* ---------------- helpers ---------------- */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function textOf(html: string): string {
  if (typeof document === "undefined") return html.replace(/<[^>]+>/g, " ");
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || "").replace(/\s+/g, " ").trim();
}

function splitLines(text: string, max = 200): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + s).length > max && cur) { out.push(cur.trim()); cur = s; } else cur += s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** For chapters without a hand-written script: teach each section, then check with the chapter's questions. */
function autoScript(lesson: Lesson, qs: QuizQuestion[], defaultScene: string): ChapterScript {
  const beats: Beat[] = [{ t: "scene", scene: defaultScene }, { t: "say", who: "mentor", text: `Today's topic: ${lesson.title}. I'll explain it bit by bit, and you'll try things as we go.` }];
  const parts = lesson.content.split(/(?=<h[23][^>]*>)/i).filter(p => p.trim());
  const queue = [...qs];
  parts.forEach(part => {
    const m = part.match(/^<h[23][^>]*>([\s\S]*?)<\/h[23]>/i);
    if (m) beats.push({ t: "say", who: "mentor", text: `Let's talk about ${textOf(m[1])}.` });
    const body = m ? part.slice(m[0].length) : part;
    body.split(/<\/(?:p|li)>/i).map(textOf).filter(s => s.length > 2).forEach(chunk => splitLines(chunk).forEach(line => beats.push({ t: "say", who: "mentor", text: line })));
    const q = queue.shift();
    if (q) beats.push({ t: "choice", who: "mentor", prompt: q.question, options: q.options, correct: q.correctIndex, right: q.explanation || "Exactly right!", wrong: q.explanation || "Not quite. Have another look.", hint: "Think back to what I just explained." });
  });
  queue.slice(0, 3).forEach(q => beats.push({ t: "choice", who: "mentor", prompt: q.question, options: q.options, correct: q.correctIndex, right: q.explanation || "Correct!", wrong: q.explanation || "Not quite.", hint: "Look at the key terms of this chapter." }));
  beats.push({ t: "say", who: "mentor", text: `That's ${lesson.title} done. ${lesson.summary}` });
  return { lesson: lesson.order + 1, scene: defaultScene, beats };
}

/* ---------------- voice ---------------- */

let cachedVoice: SpeechSynthesisVoice | null | undefined;
function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice;
  const all = window.speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
  if (!all.length) return null;
  const score = (v: SpeechSynthesisVoice) =>
    (/natural|neural|online/i.test(v.name) ? 60 : 0) + (/google/i.test(v.name) ? 25 : 0) +
    (/(female|aria|jenny|sonia|libby|samantha|serena|karen|moira|tessa|fiona|zira|hazel|susan)/i.test(v.name) ? 30 : 0) -
    (/(david|mark|daniel|george|guy|ryan|james|alex|fred|\bmale\b)/i.test(v.name) ? 80 : 0);
  cachedVoice = [...all].sort((a, b) => score(b) - score(a))[0];
  return cachedVoice;
}
function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  if (v) { u.voice = v; u.lang = v.lang; }
  u.rate = 1; u.pitch = 1.08;
  window.speechSynthesis.speak(u);
}
function stopSpeaking() { if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel(); }

/* ---------------- progress ---------------- */

interface Progress { completed: number[]; scores: Record<number, number>; bossBeaten: boolean }
const emptyProgress: Progress = { completed: [], scores: {}, bossBeaten: false };

/* ---------------- main component ---------------- */

export default function StoryLessons({ courseId, theme, script, lessons, quizzes, flashcards, onXP, onExit }: {
  courseId: string; theme: StoryTheme; script?: CourseScript; lessons: Lesson[]; quizzes: QuizQuestion[]; flashcards: Flashcard[];
  onXP: (n: number) => void; onExit: () => void;
}) {
  const key = `sf_vn_${courseId}`;
  const chapters = useMemo(() => [...lessons].sort((a, b) => a.order - b.order), [lessons]);
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [view, setView] = useState<{ v: "home" } | { v: "play"; idx: number } | { v: "done"; idx: number; score: number } | { v: "boss" } | { v: "ending" }>({ v: "home" });
  const [voiceOn, setVoiceOn] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem(key); if (raw) setProgress({ ...emptyProgress, ...JSON.parse(raw) }); } catch { /* ignore */ }
    try { setVoiceOn(localStorage.getItem("sf_vn_voice") === "1"); } catch { /* ignore */ }
  }, [key]);
  useEffect(() => () => stopSpeaking(), []);

  const save = (p: Progress) => { setProgress(p); try { localStorage.setItem(key, JSON.stringify(p)); } catch { /* ignore */ } };
  const toggleVoice = () => { const v = !voiceOn; setVoiceOn(v); if (!v) stopSpeaking(); try { localStorage.setItem("sf_vn_voice", v ? "1" : "0"); } catch { /* ignore */ } };

  const characters: Record<string, Character> = useMemo(() => ({
    mentor: { name: theme.mentorName, emoji: theme.mentor, color: theme.accent, role: "Your mentor" },
    you: { name: "You", emoji: theme.player, color: "#06b6d4" },
    ...(script?.characters || {}),
  }), [script, theme]);
  const scenes: Record<string, Scene> = useMemo(() => ({
    default: { name: theme.title, sky: [theme.floor[0], theme.wall], ground: theme.wall, props: theme.obstacles.slice(0, 3) },
    ...(script?.scenes || {}),
  }), [script, theme]);

  const scriptFor = useCallback((idx: number): ChapterScript => {
    const lesson = chapters[idx];
    const written = script?.chapters.find(c => c.lesson === idx + 1);
    if (written) return written;
    return autoScript(lesson, quizzes.filter(q => q.lessonId === lesson.id), "default");
  }, [chapters, script, quizzes]);

  const unlocked = (i: number) => i === 0 || progress.completed.includes(i - 1);
  const allDone = chapters.length > 0 && chapters.every((_, i) => progress.completed.includes(i));

  if (view.v === "boss") {
    return <BossBattle questions={quizzes} bossName={theme.bossName} bossEmoji={theme.bossEmoji}
      onXP={n => { onXP(n + 150); save({ ...progress, bossBeaten: true }); setView({ v: "ending" }); }}
      onExit={() => setView({ v: "home" })} />;
  }

  if (view.v === "play") {
    return (
      <ChapterPlayer
        key={view.idx}
        chapterNo={view.idx + 1}
        total={chapters.length}
        lesson={chapters[view.idx]}
        script={scriptFor(view.idx)}
        characters={characters}
        scenes={scenes}
        voiceOn={voiceOn}
        onToggleVoice={toggleVoice}
        onExit={() => { stopSpeaking(); setView({ v: "home" }); }}
        onFinish={score => {
          stopSpeaking();
          const first = !progress.completed.includes(view.idx);
          save({ ...progress, completed: first ? [...progress.completed, view.idx] : progress.completed, scores: { ...progress.scores, [view.idx]: Math.max(progress.scores[view.idx] || 0, score) } });
          onXP((first ? 40 : 10) + Math.round(score / 5));
          setView({ v: "done", idx: view.idx, score });
        }}
      />
    );
  }

  if (view.v === "done") {
    const lesson = chapters[view.idx];
    const cards = flashcards.filter(c => c.lessonId === lesson.id).slice(0, 6);
    const next = view.idx + 1 < chapters.length ? view.idx + 1 : null;
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="rounded-3xl p-6 text-center space-y-2" style={{ background: `linear-gradient(160deg, ${theme.accent}55, #0b0e18)` }}>
          <div className="text-5xl">🎉</div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">Chapter {view.idx + 1} complete</div>
          <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
          <div className="text-sm text-white/80">Accuracy {view.score}%</div>
        </div>
        <div className="glass rounded-2xl p-4 border border-success/25">
          <div className="text-[10px] font-bold text-success uppercase tracking-widest mb-1">What you learned</div>
          <p className="text-sm text-txt leading-relaxed">{lesson.summary}</p>
        </div>
        {cards.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-txt-dim uppercase tracking-widest">Remember these</div>
            {cards.map(c => (
              <div key={c.id} className="glass rounded-xl p-3 border border-white/10">
                <div className="text-sm font-semibold text-white">{c.front}</div>
                <div className="text-xs text-accent-light mt-0.5">{c.back}</div>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={() => setView({ v: "home" })} className="flex-1 glass border border-white/10 text-white font-semibold py-3.5 rounded-2xl">Chapter map</button>
          {next !== null
            ? <button onClick={() => setView({ v: "play", idx: next })} className="flex-1 btn-neon text-white font-semibold py-3.5 rounded-2xl">Next chapter →</button>
            : <button onClick={() => setView({ v: "boss" })} className="flex-1 btn-neon text-white font-semibold py-3.5 rounded-2xl">Final boss {theme.bossEmoji}</button>}
        </div>
      </div>
    );
  }

  if (view.v === "ending") {
    return (
      <div className="space-y-4 animate-fade-in text-center">
        <div className="rounded-3xl p-8 space-y-3" style={{ background: `linear-gradient(160deg, ${theme.accent}66, #0b0e18)` }}>
          <div className="text-6xl">🏆</div>
          <h2 className="text-2xl font-bold text-white">Course complete!</h2>
          <p className="text-sm text-white/85 leading-relaxed">{theme.ending}</p>
        </div>
        <button onClick={() => setView({ v: "home" })} className="w-full btn-neon text-white font-semibold py-3.5 rounded-2xl">Back to chapter map</button>
      </div>
    );
  }

  /* ----- home: cover + chapter map ----- */
  return (
    <div className="space-y-5 animate-fade-in">
      <button onClick={onExit} className="text-xs text-accent-light font-medium">← Games</button>
      <div className="relative overflow-hidden rounded-3xl p-5 min-h-[190px] flex flex-col justify-end" style={{ background: `linear-gradient(160deg, ${theme.accent}, #0b0e18 75%)` }}>
        <div className="absolute right-3 top-3 text-6xl opacity-90 animate-float">{theme.player}</div>
        <div className="absolute right-20 top-10 text-4xl opacity-60">{theme.mentor}</div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">{courseId} · Story course</div>
        <h2 className="text-2xl font-extrabold text-white leading-tight mt-1">{theme.title}</h2>
        <p className="text-xs text-white/80 mt-2 leading-relaxed">{theme.premise}</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden"><div className="h-full bg-white" style={{ width: `${chapters.length ? (progress.completed.length / chapters.length) * 100 : 0}%` }} /></div>
          <span className="text-[10px] text-white/80">{progress.completed.length}/{chapters.length}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold text-txt-dim uppercase tracking-widest">Chapters · course outline</div>
        <button onClick={toggleVoice} className={`text-[11px] px-3 py-1.5 rounded-full border ${voiceOn ? "border-accent/50 text-accent-light bg-accent/10" : "border-white/10 text-txt-dim"}`}>{voiceOn ? "🔊 Voice on" : "🔈 Voice off"}</button>
      </div>

      <div className="relative pl-6">
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-white/10" />
        {chapters.map((l, i) => {
          const done = progress.completed.includes(i);
          const open = unlocked(i);
          const current = open && !done;
          return (
            <button key={l.id} disabled={!open} onClick={() => setView({ v: "play", idx: i })}
              className={`relative w-full text-left mb-3 rounded-2xl p-3.5 pl-5 border transition-all ${current ? "bg-accent/15 border-accent/50 shadow-glow-sm" : done ? "glass border-success/25" : "glass border-white/5 opacity-50"}`}>
              <span className={`absolute -left-[22px] top-4 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${done ? "bg-success border-success text-white" : current ? "bg-accent border-accent-light text-white animate-pulse" : "bg-bg border-white/20 text-txt-dim"}`}>
                {done ? "✓" : open ? i + 1 : "🔒"}
              </span>
              <div className="text-[10px] uppercase tracking-widest text-txt-dim">Chapter {i + 1}{done && progress.scores[i] !== undefined ? ` · ${progress.scores[i]}%` : ""}</div>
              <div className="text-sm font-semibold text-white leading-snug">{l.title}</div>
              {current && <div className="text-[11px] text-accent-light mt-1 font-semibold">{i === 0 ? "Start here →" : "Continue →"}</div>}
            </button>
          );
        })}
        <button disabled={!allDone} onClick={() => setView({ v: "boss" })}
          className={`relative w-full text-left rounded-2xl p-4 pl-5 border ${allDone ? "bg-danger/15 border-danger/50" : "glass border-white/5 opacity-50"}`}>
          <span className="absolute -left-[22px] top-4 w-6 h-6 rounded-full flex items-center justify-center text-xs bg-bg border-2 border-danger/50">{theme.bossEmoji}</span>
          <div className="text-[10px] uppercase tracking-widest text-danger">Final boss</div>
          <div className="text-sm font-semibold text-white">{theme.bossName}</div>
          <div className="text-[11px] text-txt-dim">{allDone ? "Questions from every chapter. You're ready." : "Finish every chapter to unlock."}</div>
        </button>
      </div>
    </div>
  );
}

/* ---------------- chapter player ---------------- */

function ChapterPlayer({ chapterNo, total, lesson, script, characters, scenes, voiceOn, onToggleVoice, onExit, onFinish }: {
  chapterNo: number; total: number; lesson: Lesson; script: ChapterScript; characters: Record<string, Character>; scenes: Record<string, Scene>;
  voiceOn: boolean; onToggleVoice: () => void; onExit: () => void; onFinish: (score: number) => void;
}) {
  const beats = script.beats;
  const [i, setI] = useState(0);
  const [sceneKey, setSceneKey] = useState(script.scene);
  const [solved, setSolved] = useState(false);
  const stats = useRef({ tried: 0, firstTry: 0 });
  const beat = beats[i];

  // Scene changes are instant: apply and advance.
  useEffect(() => {
    if (beat?.t === "scene") { setSceneKey(beat.scene); setI(n => n + 1); }
  }, [beat]);

  useEffect(() => { setSolved(false); }, [i]);

  const interactive = beat && beat.t !== "say" && beat.t !== "scene";
  const next = () => {
    if (i + 1 >= beats.length) {
      const s = stats.current;
      onFinish(s.tried ? Math.round((s.firstTry / s.tried) * 100) : 100);
      return;
    }
    setI(i + 1);
  };
  const record = (firstTry: boolean) => { stats.current.tried++; if (firstTry) stats.current.firstTry++; setSolved(true); };

  const scene = scenes[sceneKey] || scenes.default;
  const speaker = beat && (beat.t === "say" ? characters[beat.who] : beat.t === "choice" && beat.who ? characters[beat.who] : null);
  const pct = Math.round((i / Math.max(beats.length, 1)) * 100);

  return (
    <div className="fixed inset-0 z-[65] flex flex-col bg-bg">
      {/* Scene */}
      <div className="relative flex-shrink-0 h-[34vh] min-h-[200px] overflow-hidden" style={{ background: `linear-gradient(180deg, ${scene.sky[0]}, ${scene.sky[1]})` }}>
        <div className="absolute inset-x-0 bottom-0 h-[30%]" style={{ background: `linear-gradient(180deg, ${scene.ground}cc, ${scene.ground})` }} />
        {scene.props.slice(0, 4).map((p, k) => (
          <div key={k} className="absolute text-4xl opacity-70 select-none" style={{ left: `${[8, 72, 30, 86][k]}%`, bottom: `${[22, 26, 12, 8][k]}%`, filter: "drop-shadow(0 6px 8px rgba(0,0,0,.45))" }}>{p}</div>
        ))}
        {speaker && (
          <div key={`${speaker.name}-${i}`} className="absolute left-1/2 -translate-x-1/2 bottom-[10%] flex flex-col items-center animate-slide-up">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-6xl border-4 shadow-2xl" style={{ background: `radial-gradient(circle at 30% 30%, ${speaker.color}aa, ${speaker.color}33)`, borderColor: speaker.color }}>{speaker.emoji}</div>
          </div>
        )}
        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 p-3 flex items-center gap-2" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.55), transparent)" }}>
          <button onClick={onExit} className="w-9 h-9 rounded-full bg-black/40 text-white text-lg flex items-center justify-center">✕</button>
          <div className="flex-1">
            <div className="text-[10px] text-white/75 uppercase tracking-widest">Chapter {chapterNo} of {total} · {scene.name}</div>
            <div className="h-1.5 rounded-full bg-white/20 mt-1 overflow-hidden"><div className="h-full bg-white transition-all duration-500" style={{ width: `${pct}%` }} /></div>
          </div>
          <button onClick={onToggleVoice} className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center">{voiceOn ? "🔊" : "🔈"}</button>
        </div>
        <div className="absolute bottom-2 left-3 right-3 text-[11px] text-white/70 font-semibold truncate">{lesson.title}</div>
      </div>

      {/* Dialogue / activity */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 max-w-2xl w-full mx-auto">
        {beat?.t === "say" && <SayBeat key={i} who={characters[beat.who] || characters.mentor} text={beat.text} voiceOn={voiceOn} onNext={next} />}
        {interactive && (
          <div key={i} className="space-y-3 animate-fade-in">
            {beat.t === "choice" && <ChoiceBeat beat={beat} who={beat.who ? characters[beat.who] : undefined} onSolved={record} solved={solved} />}
            {beat.t === "order" && <OrderBeat beat={beat} onSolved={record} solved={solved} />}
            {beat.t === "sort" && <SortBeat beat={beat} onSolved={record} solved={solved} />}
            {beat.t === "match" && <MatchBeat beat={beat} onSolved={record} solved={solved} />}
            {beat.t === "calc" && <CalcBeat beat={beat} onSolved={record} solved={solved} />}
            {beat.t === "blank" && <BlankBeat beat={beat} onSolved={record} solved={solved} />}
            {solved && <button onClick={next} className="w-full btn-neon text-white font-semibold py-3.5 rounded-2xl animate-fade-in">Continue →</button>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- beats ---------------- */

function SayBeat({ who, text, voiceOn, onNext }: { who: Character; text: string; voiceOn: boolean; onNext: () => void }) {
  const [shown, setShown] = useState(0);
  const done = shown >= text.length;
  useEffect(() => {
    setShown(0);
    if (voiceOn) speak(text);
    const id = window.setInterval(() => setShown(n => { if (n >= text.length) { window.clearInterval(id); return n; } return n + 2; }), 18);
    return () => window.clearInterval(id);
  }, [text, voiceOn]);

  return (
    <button onClick={() => (done ? onNext() : setShown(text.length))} className="w-full text-left animate-fade-in">
      <div className="inline-block text-[11px] font-bold px-3 py-1 rounded-t-xl text-white" style={{ background: who.color }}>{who.name}{who.role ? <span className="font-normal opacity-80"> · {who.role}</span> : null}</div>
      <div className="rounded-2xl rounded-tl-none p-4 border border-white/10 bg-white/[0.04] min-h-[7rem]">
        <p className="text-[16px] leading-relaxed text-white">{text.slice(0, shown)}<span className="opacity-0">{text.slice(shown)}</span></p>
      </div>
      <div className="flex justify-end mt-2">
        <span className={`text-xs font-semibold px-4 py-2 rounded-full ${done ? "bg-accent text-white" : "text-txt-dim"}`}>{done ? "Tap to continue ▶" : "…"}</span>
      </div>
    </button>
  );
}

function Feedback({ ok, text }: { ok: boolean; text: string }) {
  return <div className={`rounded-xl p-3 text-sm border animate-fade-in ${ok ? "bg-success/10 border-success/30 text-success" : "bg-warn/10 border-warn/30 text-warn"}`}>{ok ? "✅ " : "💡 "}{text}</div>;
}

function Prompt({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyber-DEFAULT">{label}</div>
      <p className="text-[15px] text-white font-semibold leading-snug mt-1">{text}</p>
    </div>
  );
}

function HintButton({ hint }: { hint?: string }) {
  const [open, setOpen] = useState(false);
  if (!hint) return null;
  return open
    ? <div className="rounded-xl p-3 text-xs bg-accent/10 border border-accent/30 text-accent-light">💡 {hint}</div>
    : <button onClick={() => setOpen(true)} className="text-xs text-accent-light underline underline-offset-4">Need a hint?</button>;
}

type Solved = (firstTry: boolean) => void;

function ChoiceBeat({ beat, who, onSolved, solved }: { beat: Extract<Beat, { t: "choice" }>; who?: Character; onSolved: Solved; solved: boolean }) {
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const pick = (n: number) => {
    if (solved || wrongPicks.includes(n)) return;
    setPicked(n);
    if (n === beat.correct) onSolved(wrongPicks.length === 0);
    else setWrongPicks(w => [...w, n]);
  };
  return (
    <>
      <Prompt label={who ? `${who.emoji} ${who.name} asks` : "Your move"} text={beat.prompt} />
      <div className="space-y-2">
        {beat.options.map((o, n) => {
          const isRight = solved && n === beat.correct;
          const isWrong = wrongPicks.includes(n);
          return (
            <button key={n} onClick={() => pick(n)} disabled={isWrong || solved}
              className={`w-full text-left rounded-2xl px-4 py-3 text-sm border transition-all ${isRight ? "bg-success/20 border-success text-white" : isWrong ? "bg-danger/10 border-danger/40 text-danger line-through opacity-70" : "bg-white/[0.04] border-white/10 text-white active:scale-[0.98]"}`}>
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && picked !== beat.correct && !solved && <Feedback ok={false} text={beat.wrong + " Try another option."} />}
      {solved && <Feedback ok text={beat.right} />}
      {!solved && <HintButton hint={beat.hint} />}
    </>
  );
}

function OrderBeat({ beat, onSolved, solved }: { beat: Extract<Beat, { t: "order" }>; onSolved: Solved; solved: boolean }) {
  const pool = useMemo(() => { let s = shuffle(beat.items); if (s.join() === beat.items.join()) s = s.reverse(); return s; }, [beat]);
  const [chosen, setChosen] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [wrong, setWrong] = useState(false);
  const check = () => {
    if (chosen.join("|") === beat.items.join("|")) onSolved(attempts === 0);
    else { setAttempts(a => a + 1); setWrong(true); }
  };
  return (
    <>
      <Prompt label="Put in order" text={beat.prompt} />
      <div className="rounded-2xl border border-dashed border-white/15 p-2 min-h-[3rem] space-y-1.5">
        {chosen.length === 0 && <div className="text-xs text-txt-dim p-2">Tap the items below in the correct order.</div>}
        {chosen.map((c, n) => (
          <button key={c} disabled={solved} onClick={() => { setChosen(chosen.filter(x => x !== c)); setWrong(false); }}
            className={`w-full text-left rounded-xl px-3 py-2.5 text-sm flex gap-2 ${solved ? "bg-success/20 text-white" : "bg-accent/20 text-white"}`}>
            <span className="font-bold text-accent-light">{n + 1}.</span>{c}
          </button>
        ))}
      </div>
      {!solved && (
        <div className="flex flex-wrap gap-2">
          {pool.filter(p => !chosen.includes(p)).map(p => (
            <button key={p} onClick={() => { setChosen([...chosen, p]); setWrong(false); }} className="rounded-xl px-3 py-2.5 text-sm bg-white/[0.06] border border-white/10 text-white active:scale-95">{p}</button>
          ))}
        </div>
      )}
      {wrong && !solved && <Feedback ok={false} text="Not quite the right order. Tap an item to remove it and try again." />}
      {solved && <Feedback ok text={beat.explain} />}
      {!solved && chosen.length === beat.items.length && <button onClick={check} className="w-full bg-cyber-DEFAULT/80 text-white font-semibold py-3 rounded-2xl">Check order</button>}
      {!solved && <HintButton hint={beat.hint} />}
    </>
  );
}

function SortBeat({ beat, onSolved, solved }: { beat: Extract<Beat, { t: "sort" }>; onSolved: Solved; solved: boolean }) {
  const items = useMemo(() => shuffle(beat.items), [beat]);
  const [placed, setPlaced] = useState<Record<string, number>>({});
  const [active, setActive] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const allPlaced = items.every(([t]) => placed[t] !== undefined);
  const wrongSet = checked ? new Set(items.filter(([t, b]) => placed[t] !== b).map(([t]) => t)) : new Set<string>();

  const check = () => {
    setChecked(true);
    const ok = items.every(([t, b]) => placed[t] === b);
    if (ok) onSolved(attempts === 0); else setAttempts(a => a + 1);
  };
  const drop = (b: number) => { if (!active || solved) return; setPlaced({ ...placed, [active]: b }); setActive(null); setChecked(false); };

  return (
    <>
      <Prompt label="Sort it out" text={beat.prompt} />
      <div className="flex flex-wrap gap-2">
        {items.filter(([t]) => placed[t] === undefined).map(([t]) => (
          <button key={t} onClick={() => setActive(active === t ? null : t)} className={`rounded-xl px-3 py-2 text-sm border ${active === t ? "bg-accent text-white border-accent" : "bg-white/[0.06] border-white/10 text-white"}`}>{t}</button>
        ))}
        {items.every(([t]) => placed[t] !== undefined) || <div className="text-[11px] text-txt-dim w-full">{active ? "Now tap the group it belongs to." : "Tap an item, then tap its group."}</div>}
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(beat.buckets.length, 3)}, minmax(0, 1fr))` }}>
        {beat.buckets.map((b, bi) => (
          <button key={b} onClick={() => drop(bi)} className={`rounded-2xl p-2.5 min-h-[6rem] text-left border transition-all ${active ? "border-accent/60 bg-accent/10" : "border-white/10 bg-white/[0.03]"}`}>
            <div className="text-[11px] font-bold text-white mb-1.5">{b}</div>
            <div className="space-y-1">
              {items.filter(([t]) => placed[t] === bi).map(([t]) => (
                <div key={t} onClick={e => { if (solved) return; e.stopPropagation(); const p = { ...placed }; delete p[t]; setPlaced(p); setChecked(false); }}
                  className={`text-[11px] rounded-lg px-2 py-1.5 ${solved ? "bg-success/25 text-white" : wrongSet.has(t) ? "bg-danger/25 text-danger" : "bg-white/10 text-white"}`}>{t}</div>
              ))}
            </div>
          </button>
        ))}
      </div>
      {checked && !solved && <Feedback ok={false} text="The red ones are in the wrong group. Tap them to take them out and try again." />}
      {solved && <Feedback ok text={beat.explain} />}
      {!solved && allPlaced && <button onClick={check} className="w-full bg-cyber-DEFAULT/80 text-white font-semibold py-3 rounded-2xl">Check</button>}
      {!solved && <HintButton hint={beat.hint} />}
    </>
  );
}

function MatchBeat({ beat, onSolved, solved }: { beat: Extract<Beat, { t: "match" }>; onSolved: Solved; solved: boolean }) {
  const left = useMemo(() => shuffle(beat.pairs.map(p => p[0])), [beat]);
  const right = useMemo(() => shuffle(beat.pairs.map(p => p[1])), [beat]);
  const [sel, setSel] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [bad, setBad] = useState<string | null>(null);
  const misses = useRef(0);
  const answer = (r: string) => {
    if (!sel || solved) return;
    const ok = beat.pairs.some(([a, b]) => a === sel && b === r);
    if (ok) {
      const nd = [...done, sel];
      setDone(nd); setSel(null);
      if (nd.length === beat.pairs.length) onSolved(misses.current === 0);
    } else { misses.current++; setBad(r); window.setTimeout(() => setBad(null), 600); }
  };
  const matchedRight = new Set(beat.pairs.filter(([a]) => done.includes(a)).map(([, b]) => b));
  return (
    <>
      <Prompt label="Match the pairs" text={beat.prompt} />
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          {left.map(l => (
            <button key={l} disabled={done.includes(l)} onClick={() => setSel(l)}
              className={`w-full text-left rounded-xl px-3 py-2.5 text-[13px] border min-h-[3.25rem] ${done.includes(l) ? "bg-success/15 border-success/40 text-success" : sel === l ? "bg-accent text-white border-accent" : "bg-white/[0.05] border-white/10 text-white"}`}>{l}</button>
          ))}
        </div>
        <div className="space-y-2">
          {right.map(r => (
            <button key={r} disabled={matchedRight.has(r)} onClick={() => answer(r)}
              className={`w-full text-left rounded-xl px-3 py-2.5 text-[12px] border min-h-[3.25rem] ${matchedRight.has(r) ? "bg-success/15 border-success/40 text-success" : bad === r ? "bg-danger/25 border-danger text-white" : "bg-white/[0.05] border-white/10 text-white"}`}>{r}</button>
          ))}
        </div>
      </div>
      {!solved && <div className="text-[11px] text-txt-dim">{sel ? "Now tap its match on the right." : "Tap an item on the left first."}</div>}
      {solved && <Feedback ok text={beat.explain} />}
    </>
  );
}

function CalcBeat({ beat, onSolved, solved }: { beat: Extract<Beat, { t: "calc" }>; onSolved: Solved; solved: boolean }) {
  const [val, setVal] = useState("");
  const [tries, setTries] = useState(0);
  const [wrong, setWrong] = useState(false);
  const check = () => {
    const n = parseFloat(val.replace(/,/g, ""));
    const tol = beat.tolerance ?? Math.max(Math.abs(beat.answer) * 0.01, 0.01);
    if (!isNaN(n) && Math.abs(n - beat.answer) <= tol) onSolved(tries === 0);
    else { setTries(t => t + 1); setWrong(true); }
  };
  return (
    <>
      <Prompt label="Work it out" text={beat.prompt} />
      <div className="flex gap-2 items-center">
        <input inputMode="decimal" value={val} disabled={solved} onChange={e => { setVal(e.target.value); setWrong(false); }} placeholder="Your answer"
          className="flex-1 rounded-2xl bg-white/[0.06] border border-white/15 px-4 py-3 text-lg text-white focus:outline-none focus:border-accent" />
        {beat.unit && <span className="text-sm text-txt-dim">{beat.unit}</span>}
      </div>
      {!solved && <button onClick={check} disabled={!val.trim()} className="w-full bg-cyber-DEFAULT/80 text-white font-semibold py-3 rounded-2xl disabled:opacity-40">Check</button>}
      {wrong && !solved && <Feedback ok={false} text={tries >= 2 ? `${beat.hint} (The answer is ${beat.answer}${beat.unit ? " " + beat.unit : ""}.)` : beat.hint} />}
      {solved && <Feedback ok text={beat.explain} />}
    </>
  );
}

function BlankBeat({ beat, onSolved, solved }: { beat: Extract<Beat, { t: "blank" }>; onSolved: Solved; solved: boolean }) {
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [parts] = useState(() => beat.prompt.split("___"));
  const pick = (n: number) => {
    if (solved || wrongPicks.includes(n)) return;
    if (n === beat.correct) onSolved(wrongPicks.length === 0); else setWrongPicks([...wrongPicks, n]);
  };
  return (
    <>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyber-DEFAULT">Fill the gap</div>
      <p className="text-[16px] text-white leading-relaxed">
        {parts[0]}
        <span className={`inline-block min-w-[5rem] mx-1 px-2 rounded-lg border-b-2 text-center ${solved ? "border-success text-success font-semibold" : "border-accent text-accent-light"}`}>{solved ? beat.options[beat.correct] : "?"}</span>
        {parts[1]}
      </p>
      <div className="flex flex-wrap gap-2">
        {beat.options.map((o, n) => (
          <button key={o} onClick={() => pick(n)} disabled={solved || wrongPicks.includes(n)}
            className={`rounded-xl px-4 py-2.5 text-sm border ${solved && n === beat.correct ? "bg-success/20 border-success text-white" : wrongPicks.includes(n) ? "border-danger/40 text-danger line-through opacity-60" : "bg-white/[0.06] border-white/10 text-white"}`}>{o}</button>
        ))}
      </div>
      {wrongPicks.length > 0 && !solved && <Feedback ok={false} text="Not that one. Try again." />}
      {solved && <Feedback ok text={beat.explain} />}
    </>
  );
}
