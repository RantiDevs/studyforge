"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Flashcard, Lesson, QuizQuestion } from "../../lib/types";
import type { StoryTheme } from "../../data/stories";
import { BossBattle } from "../ThemedGames";

/* A 2D teaching adventure. Each lesson (in course-outline order) is a chapter:
   the mentor teaches each section at numbered stations, knowledge orbs recap flashcards,
   and the chapter challenge unlocks the door to the next chapter. */

const COLS = 11;
const ROWS = 15;
const PASS = 0.7;

type Cell = { x: number; y: number };
type ObjKind = "mentor" | "station" | "orb" | "terminal" | "door";
interface Obj { id: string; kind: ObjKind; x: number; y: number; index?: number; cardId?: string; emoji: string }

interface Section { heading: string; pages: string[] }

interface Save { chapter: number; stationsDone: number; collected: string[]; passed: boolean; finished: boolean; introSeen: boolean }
const blankSave = (chapter = 0): Save => ({ chapter, stationsDone: 0, collected: [], passed: false, finished: false, introSeen: false });

/* ---------- content helpers ---------- */

function textOf(html: string): string {
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || "").replace(/\s+/g, " ").trim();
}

function paginate(text: string, max = 260): string[] {
  const sentences = text.match(/[^.!?:]+[.!?:]*\s*/g) || [text];
  const pages: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + s).length > max && cur) { pages.push(cur.trim()); cur = s; } else cur += s;
  }
  if (cur.trim()) pages.push(cur.trim());
  return pages;
}

/** Split a lesson's HTML into teachable sections at its headings. */
function sectionsOf(lesson: Lesson): Section[] {
  const parts = lesson.content.split(/(?=<h[23][^>]*>)/i).map(p => p.trim()).filter(Boolean);
  const out: Section[] = [];
  for (const part of parts) {
    const m = part.match(/^<h[23][^>]*>([\s\S]*?)<\/h[23]>/i);
    const heading = m ? textOf(m[1]) : lesson.title;
    const body = m ? part.slice(m[0].length) : part;
    // Each paragraph / list item becomes its own talking point.
    const chunks = body.split(/<\/(?:p|li)>/i).map(textOf).filter(t => t.length > 1);
    const pages = chunks.flatMap(c => paginate(c));
    if (pages.length) out.push({ heading, pages });
  }
  if (!out.length) out.push({ heading: lesson.title, pages: paginate(textOf(lesson.content)) });
  return out;
}

/* ---------- map generation ---------- */

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h; }

interface World { walls: boolean[][]; scenery: (string | null)[][]; objs: Obj[]; start: Cell }

function buildWorld(seedKey: string, theme: StoryTheme, stationCount: number, cards: Flashcard[]): World {
  for (let attempt = 0; attempt < 40; attempt++) {
    const rand = rng(hash(seedKey) + attempt * 7919);
    const walls = Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) => x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1));
    const scenery: (string | null)[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    const start = { x: 1, y: ROWS - 2 };
    const door = { x: COLS - 2, y: 0 };
    walls[door.y][door.x] = false;
    const reserved = new Set([`${start.x},${start.y}`, `${door.x},1`, `${start.x + 1},${start.y}`, `${start.x},${start.y - 1}`]);
    const free = (x: number, y: number) => !walls[y][x] && !scenery[y][x] && !reserved.has(`${x},${y}`);

    // Scenery
    const nScenery = 12 + Math.floor(rand() * 6);
    for (let i = 0; i < nScenery; i++) {
      const x = 1 + Math.floor(rand() * (COLS - 2)), y = 2 + Math.floor(rand() * (ROWS - 4));
      if (free(x, y)) scenery[y][x] = theme.obstacles[Math.floor(rand() * theme.obstacles.length)];
    }

    const objs: Obj[] = [];
    const taken = new Set<string>();
    const place = (o: Omit<Obj, "x" | "y">, prefer?: (c: Cell) => boolean): boolean => {
      for (let t = 0; t < 300; t++) {
        const x = 1 + Math.floor(rand() * (COLS - 2)), y = 1 + Math.floor(rand() * (ROWS - 2));
        if (!free(x, y) || taken.has(`${x},${y}`)) continue;
        if (prefer && t < 200 && !prefer({ x, y })) continue;
        taken.add(`${x},${y}`);
        objs.push({ ...o, x, y });
        return true;
      }
      return false;
    };

    objs.push({ id: "door", kind: "door", x: door.x, y: door.y, emoji: theme.door });
    let ok = place({ id: "mentor", kind: "mentor", emoji: theme.mentor }, c => c.y > ROWS - 5 && c.x < 5);
    // Stations run roughly bottom-to-top so the lesson flows towards the exit.
    for (let i = 0; i < stationCount && ok; i++) {
      const band = ROWS - 3 - Math.floor(((i + 1) / (stationCount + 1)) * (ROWS - 5));
      ok = place({ id: `station-${i}`, kind: "station", index: i, emoji: "📋" }, c => Math.abs(c.y - band) <= 1);
    }
    ok = ok && place({ id: "terminal", kind: "terminal", emoji: theme.terminal }, c => c.y <= 3);
    cards.forEach(card => { if (ok) ok = place({ id: `orb-${card.id}`, kind: "orb", cardId: card.id, emoji: theme.orb }); });
    if (!ok) continue;

    // Every object must have a reachable walkable neighbour.
    const blocked = (x: number, y: number) => walls[y]?.[x] !== false || !!scenery[y][x] || objs.some(o => o.x === x && o.y === y);
    const seen = new Set<string>([`${start.x},${start.y}`]);
    const queue: Cell[] = [start];
    while (queue.length) {
      const c = queue.shift()!;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = c.x + dx, ny = c.y + dy;
        if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS || seen.has(`${nx},${ny}`) || blocked(nx, ny)) continue;
        seen.add(`${nx},${ny}`); queue.push({ x: nx, y: ny });
      }
    }
    const reachable = objs.every(o => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => seen.has(`${o.x + dx},${o.y + dy}`)));
    if (reachable) return { walls, scenery, objs, start };
  }
  // Fallback: empty room with objects in a line.
  const walls = Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) => x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1));
  walls[0][COLS - 2] = false;
  const objs: Obj[] = [{ id: "door", kind: "door", x: COLS - 2, y: 0, emoji: theme.door }, { id: "mentor", kind: "mentor", x: 2, y: ROWS - 3, emoji: theme.mentor }];
  for (let i = 0; i < stationCount; i++) objs.push({ id: `station-${i}`, kind: "station", index: i, x: 1 + ((i * 2) % (COLS - 2)), y: ROWS - 5 - Math.floor((i * 2) / (COLS - 2)) * 2, emoji: "📋" });
  objs.push({ id: "terminal", kind: "terminal", x: COLS - 4, y: 2, emoji: theme.terminal });
  cards.forEach((c, i) => objs.push({ id: `orb-${c.id}`, kind: "orb", cardId: c.id, x: 2 + (i % 7), y: 4 + Math.floor(i / 7), emoji: theme.orb }));
  return { walls, scenery: Array.from({ length: ROWS }, () => Array(COLS).fill(null)), objs, start: { x: 1, y: ROWS - 2 } };
}

/* ---------- component ---------- */

type Overlay =
  | { type: "none" }
  | { type: "intro" }
  | { type: "talk"; speaker: string; emoji: string; title?: string; pages: string[]; page: number; then?: () => void }
  | { type: "check"; q: QuizQuestion; picked: number | null; then: () => void }
  | { type: "card"; card: Flashcard; flipped: boolean }
  | { type: "challenge"; qs: QuizQuestion[]; i: number; picked: number | null; correct: number }
  | { type: "result"; correct: number; total: number }
  | { type: "boss" }
  | { type: "ending" };

export default function StoryGame({ courseId, theme, lessons, quizzes, flashcards, onXP, onExit }: {
  courseId: string; theme: StoryTheme; lessons: Lesson[]; quizzes: QuizQuestion[]; flashcards: Flashcard[];
  onXP: (n: number) => void; onExit: () => void;
}) {
  const chapters = useMemo(() => [...lessons].sort((a, b) => a.order - b.order), [lessons]);
  const saveKey = `sf_story_${courseId}`;
  const [save, setSave] = useState<Save>(blankSave());
  const [loaded, setLoaded] = useState(false);
  const [pos, setPos] = useState<Cell>({ x: 1, y: ROWS - 2 });
  const [overlay, setOverlay] = useState<Overlay>({ type: "none" });
  const [toast, setToast] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let s = blankSave();
    try { const raw = localStorage.getItem(saveKey); if (raw) s = { ...blankSave(), ...JSON.parse(raw) }; } catch { /* ignore */ }
    if (s.chapter >= chapters.length) s = { ...s, chapter: Math.max(0, chapters.length - 1) };
    setSave(s);
    setLoaded(true);
    setOverlay(s.introSeen ? { type: "none" } : { type: "intro" });
  }, [saveKey, chapters.length]);

  const persist = useCallback((s: Save) => {
    setSave(s);
    try { localStorage.setItem(saveKey, JSON.stringify(s)); } catch { /* ignore */ }
  }, [saveKey]);

  const lesson = chapters[save.chapter];
  const sections = useMemo(() => (lesson ? sectionsOf(lesson) : []), [lesson]);
  const chapterCards = useMemo(() => (lesson ? flashcards.filter(c => c.lessonId === lesson.id) : []), [flashcards, lesson]);
  const chapterQs = useMemo(() => (lesson ? quizzes.filter(q => q.lessonId === lesson.id) : []), [quizzes, lesson]);
  const world = useMemo(() => buildWorld(`${courseId}-${save.chapter}`, theme, sections.length, chapterCards), [courseId, save.chapter, theme, sections.length, chapterCards]);

  useEffect(() => { setPos(world.start); }, [world]);

  const flash = (msg: string) => { setToast(msg); window.setTimeout(() => setToast(t => (t === msg ? "" : t)), 2600); };

  /* ----- drawing ----- */
  useEffect(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const width = Math.min(wrap.clientWidth, 520);
    const tile = Math.floor(width / COLS);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = tile * COLS * dpr; canvas.height = tile * ROWS * dpr;
    canvas.style.width = `${tile * COLS}px`; canvas.style.height = `${tile * ROWS}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";

    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      ctx.fillStyle = world.walls[y][x] ? theme.wall : theme.floor[(x + y) % 2];
      ctx.fillRect(x * tile, y * tile, tile, tile);
    }
    ctx.font = `${Math.floor(tile * 0.72)}px sans-serif`;
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const s = world.scenery[y][x];
      if (s) { ctx.globalAlpha = 0.85; ctx.fillText(s, x * tile + tile / 2, y * tile + tile / 2 + 1); ctx.globalAlpha = 1; }
    }
    const nextStation = save.stationsDone;
    for (const o of world.objs) {
      if (o.kind === "orb" && save.collected.includes(o.cardId!)) continue;
      const cx = o.x * tile + tile / 2, cy = o.y * tile + tile / 2;
      const glow = (o.kind === "station" && o.index === nextStation) || (o.kind === "terminal" && learned && !save.passed) || (o.kind === "door" && save.passed);
      const dim = (o.kind === "station" && (o.index ?? 0) < nextStation) || (o.kind === "door" && !save.passed);
      if (glow) {
        ctx.fillStyle = theme.accent + "55";
        ctx.beginPath(); ctx.arc(cx, cy, tile * 0.52, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = dim ? 0.4 : 1;
      ctx.fillText(o.emoji, cx, cy + 1);
      ctx.globalAlpha = 1;
      if (o.kind === "station") {
        ctx.fillStyle = (o.index ?? 0) < nextStation ? "#10b981" : theme.accent;
        ctx.beginPath(); ctx.arc(o.x * tile + tile * 0.82, o.y * tile + tile * 0.2, tile * 0.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.floor(tile * 0.26)}px sans-serif`;
        ctx.fillText(String((o.index ?? 0) + 1), o.x * tile + tile * 0.82, o.y * tile + tile * 0.2 + 1);
        ctx.font = `${Math.floor(tile * 0.72)}px sans-serif`;
      }
    }
    ctx.fillText(theme.player, pos.x * tile + tile / 2, pos.y * tile + tile / 2 + 1);
  });

  const learned = save.stationsDone >= sections.length;
  const orbsLeft = chapterCards.filter(c => !save.collected.includes(c.id)).length;

  /* ----- interactions ----- */
  const talk = (title: string | undefined, pages: string[], then?: () => void) =>
    setOverlay({ type: "talk", speaker: theme.mentorName, emoji: theme.mentor, title, pages, page: 0, then });

  const teachStation = (i: number) => {
    const sec = sections[i];
    const intro = i === 0 ? `Let's begin with "${sec.heading}".` : `Next up: "${sec.heading}".`;
    const pages = [intro, ...sec.pages];
    const usedForChecks = chapterQs.filter((_, k) => k % Math.max(sections.length, 1) === i);
    const check = usedForChecks[0];
    talk(sec.heading, pages, () => {
      const finish = () => {
        persist({ ...save, stationsDone: Math.max(save.stationsDone, i + 1) });
        onXP(5);
        if (i + 1 >= sections.length) flash("Lesson complete! Collect the orbs, then take the challenge.");
        setOverlay({ type: "none" });
      };
      if (check) setOverlay({ type: "check", q: check, picked: null, then: finish });
      else finish();
    });
  };

  const interact = (o: Obj) => {
    switch (o.kind) {
      case "mentor": {
        const intro = theme.chapterIntros[save.chapter] || `Chapter ${save.chapter + 1}: ${lesson.title}.`;
        talk(`Chapter ${save.chapter + 1}: ${lesson.title}`, [
          intro,
          learned
            ? "You've covered everything here. Gather any orbs you missed, then head to the challenge station."
            : `I'll teach you this topic at ${sections.length} numbered station${sections.length === 1 ? "" : "s"}. Visit them in order. Station ${save.stationsDone + 1} is glowing.`,
        ]);
        break;
      }
      case "station": {
        const i = o.index ?? 0;
        if (i > save.stationsDone) { flash(`Let's go in order. Station ${save.stationsDone + 1} first!`); return; }
        teachStation(i);
        break;
      }
      case "orb": {
        const card = chapterCards.find(c => c.id === o.cardId);
        if (!card || save.collected.includes(card.id)) return;
        persist({ ...save, collected: [...save.collected, card.id] });
        onXP(5);
        setOverlay({ type: "card", card, flipped: false });
        break;
      }
      case "terminal": {
        if (save.passed) { flash("Challenge passed! The door is open."); return; }
        if (!learned) { flash(`Learn first: visit station ${save.stationsDone + 1}.`); return; }
        if (orbsLeft > 0) { flash(`Collect the remaining ${orbsLeft} knowledge orb${orbsLeft === 1 ? "" : "s"} first.`); return; }
        if (!chapterQs.length) { persist({ ...save, passed: true }); flash("Chapter complete! Head to the door."); return; }
        const qs = [...chapterQs].sort(() => Math.random() - 0.5);
        setOverlay({ type: "challenge", qs, i: 0, picked: null, correct: 0 });
        break;
      }
      case "door": {
        if (!save.passed) { flash("The door is locked. Pass the challenge to open it."); return; }
        if (save.chapter + 1 >= chapters.length) {
          if (save.finished) setOverlay({ type: "ending" });
          else setOverlay({ type: "boss" });
          return;
        }
        persist({ ...blankSave(save.chapter + 1), introSeen: true });
        break;
      }
    }
  };

  const move = useCallback((dx: number, dy: number) => {
    if (overlay.type !== "none") return;
    const nx = pos.x + dx, ny = pos.y + dy;
    if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) return;
    const obj = world.objs.find(o => o.x === nx && o.y === ny && !(o.kind === "orb" && save.collected.includes(o.cardId!)));
    if (obj) { interact(obj); return; }
    if (world.walls[ny][nx] || world.scenery[ny][nx]) return;
    setPos({ x: nx, y: ny });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay.type, pos, world, save]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
      const d = map[e.key];
      if (d) { e.preventDefault(); move(d[0], d[1]); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  // Hold-to-walk on the D-pad
  const holdRef = useRef<number | null>(null);
  const startHold = (dx: number, dy: number) => {
    move(dx, dy);
    if (holdRef.current) window.clearInterval(holdRef.current);
    holdRef.current = window.setInterval(() => move(dx, dy), 170);
  };
  const endHold = () => { if (holdRef.current) { window.clearInterval(holdRef.current); holdRef.current = null; } };
  useEffect(() => endHold, []);
  useEffect(() => { if (overlay.type !== "none") endHold(); }, [overlay.type]);

  if (!loaded || !lesson) {
    return <div className="text-center text-txt-dim py-10 text-sm">{chapters.length ? "Loading..." : "This course has no lessons yet."}</div>;
  }

  if (overlay.type === "boss") {
    return <BossBattle questions={quizzes} bossName={theme.bossName} bossEmoji={theme.bossEmoji}
      onXP={n => { onXP(n + 150); persist({ ...save, finished: true }); setOverlay({ type: "ending" }); }}
      onExit={() => setOverlay({ type: "none" })} />;
  }

  const restart = () => { persist({ ...blankSave(), introSeen: true }); setOverlay({ type: "none" }); };

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-xs text-accent-light font-medium">← Games</button>
        <span className="text-[10px] text-txt-dim">Chapter {save.chapter + 1}/{chapters.length}</span>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-txt-dim">{theme.title}</div>
        <h2 className="text-base font-bold text-white leading-tight">{lesson.title}</h2>
      </div>
      <div className="flex gap-3 text-[11px] text-txt-dim">
        <span>📖 {Math.min(save.stationsDone, sections.length)}/{sections.length} taught</span>
        <span>{theme.orb} {chapterCards.length - orbsLeft}/{chapterCards.length}</span>
        <span>{save.passed ? "✅ challenge passed" : `${theme.terminal} challenge`}</span>
      </div>

      <div ref={wrapRef} className="relative w-full flex justify-center">
        <canvas ref={canvasRef} className="rounded-xl border border-white/10 touch-none" />
        {toast && <div className="absolute top-2 left-2 right-2 glass-accent rounded-lg px-3 py-2 text-xs text-white text-center border border-accent/30">{toast}</div>}
      </div>

      {/* D-pad */}
      <div className="flex justify-center select-none">
        <div className="grid grid-cols-3 gap-1.5">
          {[[null, [0, -1], null], [[-1, 0], null, [1, 0]], [null, [0, 1], null]].flatMap((row, r) => row.map((d, c) => d ? (
            <button key={`${r}${c}`} onPointerDown={() => startHold(d[0], d[1])} onPointerUp={endHold} onPointerLeave={endHold} onPointerCancel={endHold}
              className="w-14 h-14 rounded-xl glass border border-white/10 text-white text-xl active:bg-accent/30">
              {d[1] === -1 ? "▲" : d[1] === 1 ? "▼" : d[0] === -1 ? "◀" : "▶"}
            </button>
          ) : <div key={`${r}${c}`} className="w-14 h-14" />))}
        </div>
      </div>
      <p className="text-center text-[10px] text-txt-dim">Walk into a person, station or object to interact. Glowing things are your next step.</p>

      {overlay.type !== "none" && (
        <div className="fixed inset-0 z-[70] bg-bg/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="w-full max-w-md card-3d rounded-2xl p-4 space-y-3 max-h-[85vh] overflow-y-auto">
            {overlay.type === "intro" && (
              <>
                <div className="text-3xl text-center">{theme.player}</div>
                <h3 className="text-lg font-bold text-gradient text-center">{theme.title}</h3>
                <p className="text-sm text-txt leading-relaxed">{theme.premise}</p>
                <p className="text-xs text-txt-dim">Each chapter is one topic from your course outline, in order. {theme.mentorName} {theme.mentor} will teach you at the numbered stations 📋, the {theme.orb} orbs hold key facts, and the {theme.terminal} challenge opens the {theme.door} door.</p>
                <button onClick={() => { persist({ ...save, introSeen: true }); setOverlay({ type: "none" }); }} className="w-full btn-neon text-white font-semibold py-3 rounded-xl">Begin the story</button>
              </>
            )}

            {overlay.type === "talk" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{overlay.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-accent-light">{overlay.speaker}</div>
                    {overlay.title && <div className="text-[10px] text-txt-dim">{overlay.title}</div>}
                  </div>
                  <span className="ml-auto text-[10px] text-txt-dim">{overlay.page + 1}/{overlay.pages.length}</span>
                </div>
                <p className="text-[15px] text-white leading-relaxed min-h-[4.5rem]">{overlay.pages[overlay.page]}</p>
                <div className="flex gap-2">
                  {overlay.page > 0 && <button onClick={() => setOverlay({ ...overlay, page: overlay.page - 1 })} className="glass border border-white/10 text-white px-4 py-2.5 rounded-xl text-sm">Back</button>}
                  <button onClick={() => {
                    if (overlay.page + 1 < overlay.pages.length) setOverlay({ ...overlay, page: overlay.page + 1 });
                    else if (overlay.then) overlay.then(); else setOverlay({ type: "none" });
                  }} className="flex-1 btn-neon text-white font-semibold py-2.5 rounded-xl text-sm">
                    {overlay.page + 1 < overlay.pages.length ? "Next" : overlay.then ? "Got it!" : "Close"}
                  </button>
                </div>
              </>
            )}

            {overlay.type === "check" && (
              <>
                <div className="text-[10px] uppercase tracking-widest text-txt-dim">Quick check · no pressure</div>
                <p className="text-sm text-white font-semibold">{overlay.q.question}</p>
                <div className="space-y-1.5">
                  {overlay.q.options.map((opt, n) => {
                    const st = overlay.picked === null ? "" : n === overlay.q.correctIndex ? "ok" : overlay.picked === n ? "bad" : "";
                    return <button key={n} onClick={() => overlay.picked === null && setOverlay({ ...overlay, picked: n })}
                      className={`w-full text-left rounded-xl p-2.5 text-sm border ${st === "ok" ? "bg-success/20 border-success text-success" : st === "bad" ? "bg-danger/20 border-danger text-danger" : "glass border-white/10 text-white"}`}>{opt}</button>;
                  })}
                </div>
                {overlay.picked !== null && (
                  <>
                    <div className="glass rounded-xl p-3 text-xs text-txt border border-white/10">
                      {theme.mentor} {overlay.picked === overlay.q.correctIndex ? "Exactly right! " : "Not quite, and that's how we learn. "}{overlay.q.explanation}
                    </div>
                    <button onClick={overlay.then} className="w-full btn-neon text-white font-semibold py-2.5 rounded-xl text-sm">Continue</button>
                  </>
                )}
              </>
            )}

            {overlay.type === "card" && (
              <>
                <div className="text-[10px] uppercase tracking-widest text-txt-dim">{theme.orb} Knowledge orb collected</div>
                <button onClick={() => setOverlay({ ...overlay, flipped: !overlay.flipped })} className="w-full rounded-xl p-5 glass-accent border border-accent/30 text-center min-h-[6rem]">
                  <div className="text-sm font-bold text-white">{overlay.card.front}</div>
                  {overlay.flipped ? <div className="text-sm text-accent-light mt-2">{overlay.card.back}</div> : <div className="text-[10px] text-txt-dim mt-2">Tap to reveal</div>}
                </button>
                <p className="text-[10px] text-txt-dim">Saved to your flashcards for spaced review.</p>
                <button onClick={() => setOverlay({ type: "none" })} className="w-full btn-neon text-white font-semibold py-2.5 rounded-xl text-sm">Keep exploring</button>
              </>
            )}

            {overlay.type === "challenge" && (() => {
              const q = overlay.qs[overlay.i];
              const last = overlay.i + 1 >= overlay.qs.length;
              return (
                <>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-txt-dim"><span>{theme.terminal} Chapter challenge</span><span>{overlay.i + 1}/{overlay.qs.length}</span></div>
                  <p className="text-sm text-white font-semibold">{q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, n) => {
                      const st = overlay.picked === null ? "" : n === q.correctIndex ? "ok" : overlay.picked === n ? "bad" : "";
                      return <button key={n} onClick={() => overlay.picked === null && setOverlay({ ...overlay, picked: n, correct: overlay.correct + (n === q.correctIndex ? 1 : 0) })}
                        className={`w-full text-left rounded-xl p-2.5 text-sm border ${st === "ok" ? "bg-success/20 border-success text-success" : st === "bad" ? "bg-danger/20 border-danger text-danger" : "glass border-white/10 text-white"}`}>{opt}</button>;
                    })}
                  </div>
                  {overlay.picked !== null && (
                    <>
                      {q.explanation && <div className="glass rounded-xl p-3 text-xs text-txt border border-white/10">{q.explanation}</div>}
                      <button onClick={() => {
                        if (!last) { setOverlay({ ...overlay, i: overlay.i + 1, picked: null }); return; }
                        const passed = overlay.correct / overlay.qs.length >= PASS;
                        if (passed) { persist({ ...save, passed: true }); onXP(30 + overlay.correct * 10); }
                        setOverlay({ type: "result", correct: overlay.correct, total: overlay.qs.length });
                      }} className="w-full btn-neon text-white font-semibold py-2.5 rounded-xl text-sm">{last ? "See result" : "Next"}</button>
                    </>
                  )}
                </>
              );
            })()}

            {overlay.type === "result" && (() => {
              const passed = overlay.correct / overlay.total >= PASS;
              return (
                <>
                  <div className="text-4xl text-center">{passed ? "🌟" : theme.mentor}</div>
                  <div className="text-center text-white font-bold">{passed ? "Challenge passed! The door is open." : `${overlay.correct}/${overlay.total}. So close!`}</div>
                  <p className="text-xs text-txt-dim text-center">{passed ? "Walk to the glowing door to continue the story." : `${theme.mentorName}: "Let's revisit the stations together. You need ${Math.round(PASS * 100)}% to pass, and you'll get there."`}</p>
                  {!passed && <button onClick={() => { persist({ ...save, stationsDone: 0 }); setOverlay({ type: "none" }); }} className="w-full glass border border-white/10 text-white py-2.5 rounded-xl text-sm">Review the lesson again</button>}
                  <button onClick={() => setOverlay({ type: "none" })} className="w-full btn-neon text-white font-semibold py-2.5 rounded-xl text-sm">{passed ? "Continue" : "Try again later"}</button>
                </>
              );
            })()}

            {overlay.type === "ending" && (
              <>
                <div className="text-4xl text-center">🏆</div>
                <h3 className="text-lg font-bold text-gradient text-center">Course complete!</h3>
                <p className="text-sm text-txt leading-relaxed">{theme.ending}</p>
                <button onClick={restart} className="w-full glass border border-white/10 text-white py-2.5 rounded-xl text-sm">Replay from chapter 1</button>
                <button onClick={onExit} className="w-full btn-neon text-white font-semibold py-2.5 rounded-xl text-sm">Back to games</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
