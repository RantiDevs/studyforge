import type { Lesson, QuizQuestion, Flashcard } from "../lib/types";

/* Compact authoring format for course content built from the course materials. */
export type L = [title: string, type: "prerequisite" | "module", content: string, keyTerms: string[], summary: string];
export type Q = [question: string, options: string[], correctIndex: number, explanation: string, lesson?: number];
export type C = [front: string, back: string, lesson?: number];

export interface CourseContent {
  courseId: string;
  lessons: Lesson[];
  quizzes: QuizQuestion[];
  flashcards: Flashcard[];
}

export function buildCourse(courseId: string, lessons: L[], quizzes: Q[], cards: C[]): CourseContent {
  // A fixed past date makes every new card due immediately.
  const due = "2000-01-01";
  return {
    courseId,
    lessons: lessons.map(([title, type, content, keyTerms, summary], i) => ({
      id: `${courseId}-M${i + 1}`, courseId, title, type, order: i, content, keyTerms, summary,
    })),
    quizzes: quizzes.map(([question, options, correctIndex, explanation, lesson], i) => ({
      id: `${courseId}-MQ${i + 1}`, courseId, question, options, correctIndex, explanation,
      ...(lesson ? { lessonId: `${courseId}-M${lesson}` } : {}),
    })),
    flashcards: cards.map(([front, back, lesson], i) => ({
      id: `${courseId}-MF${i + 1}`, courseId, front, back, interval: 0, easeFactor: 2.5, repetitions: 0, nextReview: due,
      ...(lesson ? { lessonId: `${courseId}-M${lesson}` } : {}),
    })),
  };
}
