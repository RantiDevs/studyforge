/* Visual-novel lesson scripts. Each chapter (one lesson, in course-outline order) is a list of beats:
   characters explain in short lines, and interactive beats make the learner do something. */

export interface Character { name: string; emoji: string; color: string; role?: string }
export interface Scene { name: string; sky: [string, string]; ground: string; props: string[] }

export type Beat =
  | { t: "scene"; scene: string }
  | { t: "say"; who: string; text: string }
  | { t: "choice"; who?: string; prompt: string; options: string[]; correct: number; right: string; wrong: string; hint?: string }
  | { t: "order"; prompt: string; items: string[]; explain: string; hint?: string }          // items in correct order
  | { t: "sort"; prompt: string; buckets: string[]; items: [string, number][]; explain: string; hint?: string }
  | { t: "match"; prompt: string; pairs: [string, string][]; explain: string }
  | { t: "calc"; prompt: string; answer: number; tolerance?: number; unit?: string; hint: string; explain: string }
  | { t: "blank"; prompt: string; options: string[]; correct: number; explain: string };       // prompt contains ___

export interface ChapterScript { lesson: number; scene: string; beats: Beat[] }

export interface CourseScript {
  characters: Record<string, Character>;
  scenes: Record<string, Scene>;
  chapters: ChapterScript[];
}
