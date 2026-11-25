"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Flashcard, Lesson, QuizQuestion } from "../lib/types";
import { BossBattle } from "./ThemedGames";

const KEY = "sf_journey";
const PASS = 0.7;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadProgress(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function saveProgress(p: Record<string, number>) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
}

export interface JourneyCourse { id: string; title: string; icon: string; color: string }

type Stage = "map" | "recap" | "match" | "quiz" | "result" | "boss";

export default function CourseJourney({ course, lessons, quizzes, flashcards, onXP, onExit }: {
  course: JourneyCourse; lessons: Lesson[]; quizzes: QuizQuestion[]; flashcards: Flashcard[];
  onXP: (n: number) => void; onExit: () => void;
}) {
  const levels = useMemo(() => [...lessons].sort((a, b) => a.order - b.order), [lessons]);
  const [cleared, setCleared] = useState(0);
  const [stage, setStage] = useState<Stage>("map");
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => { setCleared(loadProgress()[course.id] || 0); }, [course.id]);

  const lesson = levels[level];
  const lessonQuiz = useMemo(() => (lesson ? quizzes.filter(q => q.lessonId === lesson.id) : []), [quizzes, lesson]);
  const lessonCards = useMemo(() => (lesson ? flashcards.filter(c => c.lessonId === lesson.id) : []), [flashcards, lesson]);
  const allDone = cleared >= levels.length && levels.length > 0;

  const markCleared = (idx: number) => {
    const p = loadProgress();
    const next = Math.max(p[course.id] || 0, idx + 1);
    p[course.id] = next;
    saveProgress(p);
    setCleared(next);
  };

  const startLevel = (i: number) => { setLevel(i); setScore({ correct: 0, total: 0 }); setStage("recap"); };
  const afterRecap = () => {
    if (lessonCards.length >= 2) setStage("match");
    else if (lessonQuiz.length) setStage("quiz");
    else { markCleared(level); onXP(20); setStage("result"); }
  };
  const afterMatch = () => { if (lessonQuiz.length) setStage("quiz"); else { markCleared(level); setStage("result"); } };
  const afterQuiz = (correct: number, total: number) => {
    setScore({ correct, total });
    if (total === 0 || correct / total >= PASS) { markCleared(level); onXP(30 + correct * 10); }
    setStage("result");
  };

  if (stage === "boss") {
    return <BossBattle questions={quizzes} onXP={n => onXP(n + 100)} onExit={() => setStage("map")} />;
  }

  if (stage === "recap" && lesson) {
    return (
      <div className="space-y-4 animate-fade-in">
        <button onClick={() => setStage("map")} className="text-xs text-accent-light font-medium">← Journey map</button>
        <div className="text-[10px] uppercase tracking-widest text-txt-dim">Level {level + 1} of {levels.length} · Study first</div>
        <h2 className="text-lg font-bold text-white">{lesson.title}</h2>
        <div className="glass rounded-xl p-4 border border-success/20">
          <div className="text-[10px] font-bold text-success uppercase tracking-widest mb-1">Key idea</div>
          <p className="text-sm text-txt leading-relaxed">{lesson.summary}</p>
        </div>
        {lesson.keyTerms.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {lesson.keyTerms.map(t => <span key={t} className="bg-accent/10 text-accent-light text-[11px] px-2.5 py-1 rounded-full border border-accent/20">{t}</span>)}
          </div>
        )}
        <details className="card-3d rounded-2xl p-4">
          <summary className="text-sm text-white font-semibold cursor-pointer">Read the full lesson</summary>
          <div className="lesson-content mt-3" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </details>
        <button onClick={afterRecap} className="w-full btn-neon text-white font-semibold py-3.5 rounded-xl">I&apos;m ready, start the challenge</button>
      </div>
    );
  }

  if (stage === "match" && lesson) {
    return <LessonMatch cards={lessonCards} title={lesson.title} onDone={afterMatch} onExit={() => setStage("map")} />;
  }

  if (stage === "quiz" && lesson) {
    return <LessonQuiz questions={lessonQuiz} title={lesson.title} onDone={afterQuiz} onExit={() => setStage("map")} />;
  }

  if (stage === "result" && lesson) {
    const passed = score.total === 0 || score.correct / score.total >= PASS;
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="card-3d rounded-2xl p-6 text-center space-y-3">
          <div className="text-4xl">{passed ? "🌟" : "📖"}</div>
          <div className="text-white font-bold text-lg">{passed ? `Level ${level + 1} cleared!` : "Not quite yet"}</div>
          {score.total > 0 && <div className="text-sm text-txt-dim">{score.correct} of {score.total} correct (pass mark {Math.round(PASS * 100)}%)</div>}
          {!passed && <p className="text-xs text-txt-muted">Reread the key idea and try again. You&apos;ve got this.</p>}
          <div className="flex gap-2 justify-center">
            {!passed && <button onClick={() => startLevel(level)} className="btn-neon text-white font-semibold px-5 py-3 rounded-xl">Try again</button>}
            {passed && level + 1 < levels.length && <button onClick={() => startLevel(level + 1)} className="btn-neon text-white font-semibold px-5 py-3 rounded-xl">Next level →</button>}
            <button onClick={() => setStage("map")} className="glass border border-white/10 text-white font-semibold px-5 py-3 rounded-xl">Map</button>
          </div>
        </div>
      </div>
    );
  }

  // Journey map
  return (
    <div className="space-y-4 animate-fade-in">
      <button onClick={onExit} className="text-xs text-accent-light font-medium">← Games</button>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{course.icon}</span>
        <div>
          <h2 className="text-lg font-bold text-white">{course.id} Journey</h2>
          <div className="text-[11px] text-txt-dim">{Math.min(cleared, levels.length)} of {levels.length} levels cleared · follows the course outline</div>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full transition-all" style={{ width: `${levels.length ? (Math.min(cleared, levels.length) / levels.length) * 100 : 0}%`, background: course.color }} />
      </div>
      <div className="space-y-2">
        {levels.map((l, i) => {
          const done = i < cleared;
          const open = i <= cleared;
          return (
            <button key={l.id} disabled={!open} onClick={() => startLevel(i)}
              className={`w-full card-3d rounded-xl p-3 flex items-center gap-3 text-left ${open ? "" : "opacity-40"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${done ? "bg-success text-white" : open ? "bg-accent/20 text-accent-light border border-accent/40" : "border border-white/15 text-txt-dim"}`}>
                {done ? "✓" : open ? i + 1 : "🔒"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate">{l.title}</div>
                <div className="text-[10px] text-txt-dim">{quizzes.filter(q => q.lessonId === l.id).length} questions · {flashcards.filter(c => c.lessonId === l.id).length} cards</div>
              </div>
            </button>
          );
        })}
        <button disabled={!allDone || quizzes.length < 5} onClick={() => setStage("boss")}
          className={`w-full rounded-xl p-4 text-left border ${allDone ? "bg-danger/10 border-danger/40" : "glass border-white/10 opacity-40"}`}>
          <div className="text-sm font-bold text-white">🐉 Final Boss: the whole course</div>
          <div className="text-[11px] text-txt-dim">{allDone ? "Every topic, mixed. Defeat it for a big XP bonus." : "Clear every level to unlock."}</div>
        </button>
      </div>
    </div>
  );
}

function LessonMatch({ cards, title, onDone, onExit }: { cards: Flashcard[]; title: string; onDone: () => void; onExit: () => void }) {
  const pairs = useMemo(() => shuffle(cards).slice(0, 5), [cards]);
  const tiles = useMemo(() => shuffle(pairs.flatMap(c => [{ key: c.id + "f", id: c.id, text: c.front }, { key: c.id + "b", id: c.id, text: c.back }])), [pairs]);
  const [picked, setPicked] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const done = matched.length === pairs.length;

  const tap = (key: string) => {
    const tile = tiles.find(t => t.key === key)!;
    if (picked.length === 2 || picked.includes(key) || matched.includes(tile.id)) return;
    const next = [...picked, key];
    setPicked(next);
    if (next.length === 2) {
      const [a, b] = next.map(k => tiles.find(t => t.key === k)!);
      if (a.id === b.id) { setMatched(m => [...m, a.id]); setPicked([]); }
      else setTimeout(() => setPicked([]), 800);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <button onClick={onExit} className="text-xs text-accent-light font-medium">← Journey map</button>
      <div className="text-[10px] uppercase tracking-widest text-txt-dim">Step 1 · Match the pairs</div>
      <h2 className="text-base font-bold text-white">{title}</h2>
      {done ? (
        <div className="card-3d rounded-2xl p-5 text-center space-y-3">
          <div className="text-white font-bold">🧩 All matched!</div>
          <button onClick={onDone} className="btn-neon text-white font-semibold px-6 py-3 rounded-xl">On to the quiz →</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {tiles.map(t => {
            const isMatched = matched.includes(t.id);
            const isPicked = picked.includes(t.key);
            return (
              <button key={t.key} onClick={() => tap(t.key)}
                className={`rounded-xl p-2.5 min-h-[72px] text-[11px] leading-snug border transition-all ${isMatched ? "bg-success/15 border-success/40 text-success opacity-60" : isPicked ? "bg-accent/25 border-accent text-white" : "glass border-white/10 text-white"}`}>
                {t.text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LessonQuiz({ questions, title, onDone, onExit }: { questions: QuizQuestion[]; title: string; onDone: (correct: number, total: number) => void; onExit: () => void }) {
  const qs = useMemo(() => shuffle(questions), [questions]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const correct = useRef(0);
  const q = qs[i];

  const answer = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.correctIndex) correct.current++;
  };
  const next = () => {
    if (i + 1 >= qs.length) { onDone(correct.current, qs.length); return; }
    setI(i + 1);
    setPicked(null);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <button onClick={onExit} className="text-xs text-accent-light font-medium">← Journey map</button>
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-txt-dim">
        <span>Step 2 · Quiz</span><span>{i + 1} / {qs.length}</span>
      </div>
      <h2 className="text-base font-bold text-white">{title}</h2>
      <div className="card-3d rounded-2xl p-4 text-white text-sm font-semibold">{q.question}</div>
      <div className="space-y-2">
        {q.options.map((o, n) => {
          const st = picked === null ? "" : n === q.correctIndex ? "ok" : picked === n ? "bad" : "";
          return (
            <button key={n} onClick={() => answer(n)}
              className={`w-full text-left rounded-xl p-3 text-sm border transition-colors ${st === "ok" ? "bg-success/20 border-success text-success" : st === "bad" ? "bg-danger/20 border-danger text-danger" : "glass border-white/10 text-white"}`}>{o}</button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="space-y-3">
          {q.explanation && <div className="glass rounded-xl p-3 text-xs text-txt border border-white/10">{picked === q.correctIndex ? "✅ " : "💡 "}{q.explanation}</div>}
          <button onClick={next} className="w-full btn-neon text-white font-semibold py-3 rounded-xl">{i + 1 >= qs.length ? "See result" : "Next question →"}</button>
        </div>
      )}
    </div>
  );
}
