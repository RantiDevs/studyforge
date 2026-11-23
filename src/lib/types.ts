
export interface Course {
  id: string;
  title: string;
  credits: number;
  semester: "harmattan" | "rain";
  status: "C" | "R" | "E";
  color: string;
  icon: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: "prerequisite" | "module";
  order: number;
  content: string;
  keyTerms: string[];
  summary: string;
}

export interface QuizQuestion {
  id: string;
  courseId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  courseId: string;
  front: string;
  back: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReview: string;
}

export interface Upload {
  id: string;
  courseId: string;
  fileName: string;
  url: string;
  uploadedAt: string;
  contentGenerated: boolean;
}

export interface Progress {
  xp: number;
  level: number;
  streak: number;
  lastStudyDate: string;
  lessonsCompleted: string[];
  quizAttempts: { questionId: string; correct: boolean; date: string }[];
  badges: string[];
  totalStudyMinutes: number;
}

export type Tab = "dashboard" | "courses" | "study" | "quiz" | "upload" | "timetable" | "games";
