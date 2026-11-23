"use client";
import { useState } from "react";
import type { Lesson, QuizQuestion, Flashcard } from "../lib/types";

export interface ImportPayload {
  lessons: Lesson[];
  quizzes: QuizQuestion[];
  flashcards: Flashcard[];
}

const PROMPT = (courseId: string) => `Generate StudyForge content for ${courseId} from the attached material.
Reply with ONLY one JSON object (no markdown fences) in this shape:
{
  "lessons": [{ "title": "", "type": "prerequisite" | "module", "order": 0, "content": "<h2>..</h2><p>..</p> (HTML)", "keyTerms": ["..."], "summary": "" }],
  "quizzes": [{ "question": "", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "" }],
  "flashcards": [{ "front": "", "back": "" }]
}
Rules: explain simply, assume no prior knowledge, 4 options per quiz question, at least 5 lessons, 10 quiz questions, 10 flashcards.`;

function str(v: unknown, f = ""): string {
  return typeof v === "string" ? v : f;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseImport(raw: string, courseId: string): { data?: ImportPayload; error?: string } {
  let obj: any;
  try {
    const cleaned = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    obj = JSON.parse(cleaned);
  } catch {
    return { error: "That is not valid JSON. Paste exactly what Claude returned." };
  }
  const stamp = Date.now().toString(36);
  const lessons: Lesson[] = (Array.isArray(obj.lessons) ? obj.lessons : [])
    .filter((l: any) => l && l.title && l.content)
    .map((l: any, i: number) => ({
      id: `${courseId}-I${stamp}-${i}`, courseId, title: str(l.title),
      type: l.type === "prerequisite" ? "prerequisite" : "module",
      order: typeof l.order === "number" ? l.order : i, content: str(l.content),
      keyTerms: Array.isArray(l.keyTerms) ? l.keyTerms.map(String) : [], summary: str(l.summary),
    }));
  const quizzes: QuizQuestion[] = (Array.isArray(obj.quizzes) ? obj.quizzes : [])
    .filter((q: any) => q && q.question && Array.isArray(q.options) && q.options.length >= 2
      && Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex < q.options.length)
    .map((q: any, i: number) => ({
      id: `${courseId}-QI${stamp}-${i}`, courseId, question: str(q.question),
      options: q.options.map(String), correctIndex: q.correctIndex, explanation: str(q.explanation),
    }));
  const flashcards: Flashcard[] = (Array.isArray(obj.flashcards) ? obj.flashcards : [])
    .filter((f: any) => f && f.front && f.back)
    .map((f: any, i: number) => ({
      id: `${courseId}-FI${stamp}-${i}`, courseId, front: str(f.front), back: str(f.back),
      interval: 0, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString().slice(0, 10),
    }));
  if (!lessons.length && !quizzes.length && !flashcards.length) {
    return { error: "No valid lessons, quizzes or flashcards found in that JSON." };
  }
  return { data: { lessons, quizzes, flashcards } };
}

export default function ImportPanel({ courseId, onImport }: { courseId: string; onImport: (p: ImportPayload) => void }) {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT(courseId));
      setMsg({ ok: true, text: "Prompt copied. Paste it into Claude with your PDFs attached." });
    } catch {
      setMsg({ ok: false, text: "Could not copy to clipboard." });
    }
  };

  const doImport = () => {
    const { data, error } = parseImport(text, courseId);
    if (error || !data) { setMsg({ ok: false, text: error || "Import failed." }); return; }
    onImport(data);
    setText("");
    setMsg({ ok: true, text: `Imported ${data.lessons.length} lessons, ${data.quizzes.length} questions, ${data.flashcards.length} flashcards into ${courseId}.` });
  };

  return (
    <div className="glass-accent rounded-xl p-4 space-y-3">
      <div className="text-[10px] font-bold text-accent-light uppercase tracking-widest">Import content for {courseId}</div>
      <button onClick={copyPrompt} className="w-full glass border border-white/10 text-white text-sm font-semibold py-2.5 rounded-xl">Copy prompt for Claude</button>
      <textarea value={text} onChange={e => setText(e.target.value)} rows={6} placeholder="Paste Claude's JSON reply here"
        className="w-full glass border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-accent/50 bg-transparent" />
      <button onClick={doImport} disabled={!text.trim()} className="w-full btn-neon text-white font-semibold py-3 rounded-xl disabled:opacity-40">Import</button>
      {msg && <div className={`rounded-xl p-3 text-sm border ${msg.ok ? "bg-success/10 border-success/30 text-success" : "bg-danger/10 border-danger/30 text-danger"}`}>{msg.text}</div>}
    </div>
  );
}
