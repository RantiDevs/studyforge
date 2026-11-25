"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Lesson, QuizQuestion } from "../lib/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const TERM_RE = /^[A-Za-z ]{3,18}$/;

function Exit({ onExit }: { onExit: () => void }) {
  return <button onClick={onExit} className="text-xs text-accent-light font-medium">← Games</button>;
}

export function BossBattle({ questions, onXP, onExit, bossName = "Boss", bossEmoji = "🐉" }: { questions: QuizQuestion[]; onXP: (n: number) => void; onExit: () => void; bossName?: string; bossEmoji?: string }) {
  const BOSS_HP = 8;
  const [round, setRound] = useState(0);
  const queue = useMemo(() => shuffle(questions), [questions, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [bossHp, setBossHp] = useState(BOSS_HP);
  const [lives, setLives] = useState(3);
  const [picked, setPicked] = useState<number | null>(null);
  const awarded = useRef(false);
  const won = bossHp <= 0;
  const lost = lives <= 0;

  useEffect(() => { setI(0); setBossHp(BOSS_HP); setLives(3); setPicked(null); awarded.current = false; }, [round]);
  useEffect(() => {
    if (won && !awarded.current) { awarded.current = true; onXP(60 + lives * 20); }
  }, [won, lives, onXP]);

  const q = queue[i % queue.length];
  const answer = (n: number) => {
    if (picked !== null || won || lost) return;
    setPicked(n);
    if (n === q.correctIndex) setBossHp(h => h - 1); else setLives(l => l - 1);
    setTimeout(() => { setPicked(null); setI(x => x + 1); }, 700);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Exit onExit={onExit} />
      <div className="card-3d rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-sm"><span className="text-white font-bold">{bossEmoji} {bossName}</span><span className="text-danger font-bold">{Math.max(bossHp, 0)}/{BOSS_HP}</span></div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-danger transition-all" style={{ width: `${(Math.max(bossHp, 0) / BOSS_HP) * 100}%` }} /></div>
        <div className="text-right text-sm">{"❤️".repeat(Math.max(lives, 0))}{"🖤".repeat(3 - Math.max(lives, 0))}</div>
      </div>
      {won || lost ? (
        <div className="card-3d rounded-2xl p-6 text-center space-y-3">
          <div className="text-3xl">{won ? "🏆" : "💀"}</div>
          <div className="text-white font-bold">{won ? `${bossName} defeated!` : "You were defeated"}</div>
          <button onClick={() => setRound(r => r + 1)} className="btn-neon text-white font-semibold px-6 py-3 rounded-xl">{won ? "Fight again" : "Try again"}</button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export function TermHunt({ lessons, onXP, onExit }: { lessons: Lesson[]; onXP: (n: number) => void; onExit: () => void }) {
  const pool = useMemo(
    () => lessons.flatMap(l => l.keyTerms.filter(t => TERM_RE.test(t)).map(t => ({ term: t.toUpperCase(), hint: l.summary, lesson: l.title }))),
    [lessons]
  );
  const [round, setRound] = useState(0);
  const item = useMemo(() => pool[Math.floor(Math.random() * pool.length)], [pool, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [guessed, setGuessed] = useState<string[]>([]);
  const awarded = useRef(false);
  useEffect(() => { setGuessed([]); awarded.current = false; }, [round]);

  const MAX_WRONG = 6;
  const wrong = guessed.filter(g => !item.term.includes(g)).length;
  const solved = item.term.split("").every(c => c === " " || guessed.includes(c));
  const lost = wrong >= MAX_WRONG;

  useEffect(() => {
    if (solved && !awarded.current) { awarded.current = true; onXP(15 + (MAX_WRONG - wrong) * 5); }
  }, [solved, wrong, onXP]);

  return (
    <div className="space-y-4 animate-fade-in">
      <Exit onExit={onExit} />
      <div className="card-3d rounded-2xl p-4 space-y-2">
        <div className="text-[10px] uppercase tracking-widest text-txt-dim">From: {item.lesson}</div>
        <p className="text-sm text-white leading-relaxed">{item.hint}</p>
      </div>
      <div className="text-center text-2xl font-mono tracking-[0.3em] text-accent-light break-words">
        {item.term.split("").map(c => (c === " " ? " " : guessed.includes(c) || lost ? c : "_")).join(" ")}
      </div>
      <div className="text-center text-xs text-txt-dim">Wrong guesses: {wrong}/{MAX_WRONG}</div>
      {solved || lost ? (
        <div className="card-3d rounded-2xl p-5 text-center space-y-3">
          <div className="text-white font-bold">{solved ? "🎉 Got it!" : `The term was ${item.term}`}</div>
          <button onClick={() => setRound(r => r + 1)} className="btn-neon text-white font-semibold px-6 py-3 rounded-xl">Next term</button>
        </div>
      ) : (
        <div className="grid grid-cols-9 gap-1">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(c => (
            <button key={c} disabled={guessed.includes(c)} onClick={() => setGuessed(g => [...g, c])}
              className={`py-2 rounded-lg text-xs font-bold border ${guessed.includes(c) ? (item.term.includes(c) ? "bg-success/20 border-success/40 text-success" : "bg-danger/20 border-danger/40 text-danger opacity-50") : "glass border-white/10 text-white"}`}>{c}</button>
          ))}
        </div>
      )}
    </div>
  );
}
