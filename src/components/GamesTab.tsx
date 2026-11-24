"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Flashcard, Lesson, QuizQuestion } from "../lib/types";
import { BossBattle, TermHunt, TERM_RE } from "./ThemedGames";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Game = "menu" | "match" | "speed" | "boss" | "terms";

export default function GamesTab({ flashcards, quizzes, lessons, onXP }: { flashcards: Flashcard[]; quizzes: QuizQuestion[]; lessons: Lesson[]; onXP: (n: number) => void }) {
  const [game, setGame] = useState<Game>("menu");

  if (game === "match") return <MatchGame cards={flashcards} onXP={onXP} onExit={() => setGame("menu")} />;
  if (game === "speed") return <SpeedQuiz questions={quizzes} onXP={onXP} onExit={() => setGame("menu")} />;
  if (game === "boss") return <BossBattle questions={quizzes} onXP={onXP} onExit={() => setGame("menu")} />;
  if (game === "terms") return <TermHunt lessons={lessons} onXP={onXP} onExit={() => setGame("menu")} />;

  const termCount = lessons.reduce((n, l) => n + l.keyTerms.filter(t => TERM_RE.test(t)).length, 0);

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold text-gradient">Games</h2>
      <p className="text-xs text-txt-muted">Learn by playing. Every game earns XP.</p>
      <button onClick={() => setGame("match")} disabled={flashcards.length < 4} className="w-full card-3d rounded-xl p-4 text-left disabled:opacity-40">
        <div className="text-sm font-semibold text-white">🧩 Match Up</div>
        <div className="text-[11px] text-txt-dim">Pair each term with its definition. Fewer moves, more XP.{flashcards.length < 4 ? " Needs 4+ flashcards." : ""}</div>
      </button>
      <button onClick={() => setGame("speed")} disabled={quizzes.length < 3} className="w-full card-3d rounded-xl p-4 text-left disabled:opacity-40">
        <div className="text-sm font-semibold text-white">⚡ Speed Quiz</div>
        <div className="text-[11px] text-txt-dim">60 seconds. Answer as many as you can. Streaks multiply your score.{quizzes.length < 3 ? " Needs 3+ questions." : ""}</div>
      </button>
      <button onClick={() => setGame("boss")} disabled={quizzes.length < 5} className="w-full card-3d rounded-xl p-4 text-left disabled:opacity-40">
        <div className="text-sm font-semibold text-white">🐉 Boss Battle</div>
        <div className="text-[11px] text-txt-dim">Every right answer hurts the boss. Three wrong answers and you fall.{quizzes.length < 5 ? " Needs 5+ questions." : ""}</div>
      </button>
      <button onClick={() => setGame("terms")} disabled={termCount < 3} className="w-full card-3d rounded-xl p-4 text-left disabled:opacity-40">
        <div className="text-sm font-semibold text-white">🔤 Term Hunt</div>
        <div className="text-[11px] text-txt-dim">Guess the key term letter by letter from its lesson summary.{termCount < 3 ? " Needs lessons with key terms." : ""}</div>
      </button>
    </div>
  );
}

function Exit({ onExit }: { onExit: () => void }) {
  return <button onClick={onExit} className="text-xs text-accent-light font-medium">← Games</button>;
}

function MatchGame({ cards, onXP, onExit }: { cards: Flashcard[]; onXP: (n: number) => void; onExit: () => void }) {
  const PAIRS = 6;
  const [round, setRound] = useState(0);
  const pairs = useMemo(() => shuffle(cards).slice(0, Math.min(PAIRS, cards.length)), [cards, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const tiles = useMemo(
    () => shuffle(pairs.flatMap(c => [{ key: c.id + "f", id: c.id, text: c.front }, { key: c.id + "b", id: c.id, text: c.back }])),
    [pairs]
  );
  const [picked, setPicked] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const awarded = useRef(false);

  useEffect(() => { setPicked([]); setMatched([]); setMoves(0); awarded.current = false; }, [round]);

  const done = matched.length === pairs.length && pairs.length > 0;
  useEffect(() => {
    if (done && !awarded.current) {
      awarded.current = true;
      onXP(Math.max(20, 80 - (moves - pairs.length) * 5));
    }
  }, [done, moves, pairs.length, onXP]);

  const tap = (key: string) => {
    if (picked.length === 2 || picked.includes(key)) return;
    const tile = tiles.find(t => t.key === key)!;
    if (matched.includes(tile.id)) return;
    const next = [...picked, key];
    setPicked(next);
    if (next.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = next.map(k => tiles.find(t => t.key === k)!);
      if (a.id === b.id) { setMatched(m => [...m, a.id]); setPicked([]); }
      else setTimeout(() => setPicked([]), 800);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Exit onExit={onExit} />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">🧩 Match Up</h2>
        <span className="text-xs text-txt-dim">Moves: {moves}</span>
      </div>
      {done ? (
        <div className="card-3d rounded-2xl p-6 text-center space-y-3">
          <div className="text-3xl">🎉</div>
          <div className="text-white font-bold">Cleared in {moves} moves</div>
          <button onClick={() => setRound(r => r + 1)} className="btn-neon text-white font-semibold px-6 py-3 rounded-xl">Play again</button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {tiles.map(t => {
            const isMatched = matched.includes(t.id);
            const isPicked = picked.includes(t.key);
            return (
              <button key={t.key} onClick={() => tap(t.key)}
                className={`rounded-xl p-2 min-h-[84px] text-[11px] leading-snug transition-all border ${isMatched ? "bg-success/15 border-success/40 text-success opacity-60" : isPicked ? "bg-accent/25 border-accent text-white" : "glass border-white/10 text-white"}`}>
                {t.text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SpeedQuiz({ questions, onXP, onExit }: { questions: QuizQuestion[]; onXP: (n: number) => void; onExit: () => void }) {
  const DURATION = 60;
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [queue, setQueue] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [flash, setFlash] = useState<{ i: number; ok: boolean } | null>(null);
  const finished = started && timeLeft <= 0;
  const awarded = useRef(false);

  const start = () => {
    setQueue(shuffle(questions));
    setIdx(0); setScore(0); setCombo(0); setCorrectCount(0); setTimeLeft(DURATION); setFlash(null);
    awarded.current = false;
    setStarted(true);
  };

  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, timeLeft]);

  useEffect(() => {
    if (finished && !awarded.current) {
      awarded.current = true;
      if (score > 0) onXP(Math.min(150, Math.round(score / 2)));
    }
  }, [finished, score, onXP]);

  const q = queue.length ? queue[idx % queue.length] : null;

  const answer = (i: number) => {
    if (!q || flash || finished) return;
    const ok = i === q.correctIndex;
    setFlash({ i, ok });
    if (ok) { const c = combo + 1; setCombo(c); setScore(s => s + 10 * Math.min(c, 5)); setCorrectCount(n => n + 1); }
    else setCombo(0);
    setTimeout(() => { setFlash(null); setIdx(n => n + 1); }, 450);
  };

  if (!started || finished) {
    return (
      <div className="space-y-4 animate-fade-in">
        <Exit onExit={onExit} />
        <div className="card-3d rounded-2xl p-6 text-center space-y-3">
          <div className="text-3xl">⚡</div>
          {finished ? (
            <>
              <div className="text-white font-bold text-lg">Time&apos;s up! {score} points</div>
              <div className="text-xs text-txt-dim">{correctCount} correct answers</div>
            </>
          ) : (
            <div className="text-white font-bold">60 seconds. Go fast. Build a combo.</div>
          )}
          <button onClick={start} className="btn-neon text-white font-semibold px-6 py-3 rounded-xl">{finished ? "Play again" : "Start"}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center text-sm">
        <span className="text-warn font-bold">⏱ {timeLeft}s</span>
        <span className="text-white font-bold">{score} pts</span>
        <span className="text-accent-light font-bold">x{Math.min(combo, 5) || 1}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent to-cyber-DEFAULT transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / DURATION) * 100}%` }} />
      </div>
      {q && (
        <>
          <div className="card-3d rounded-2xl p-4 text-white text-sm font-semibold">{q.question}</div>
          <div className="space-y-2">
            {q.options.map((o, i) => {
              const state = flash ? (i === q.correctIndex ? "ok" : flash.i === i ? "bad" : "") : "";
              return (
                <button key={i} onClick={() => answer(i)}
                  className={`w-full text-left rounded-xl p-3 text-sm border transition-colors ${state === "ok" ? "bg-success/20 border-success text-success" : state === "bad" ? "bg-danger/20 border-danger text-danger" : "glass border-white/10 text-white"}`}>
                  {o}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
