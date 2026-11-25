import type { CourseContent } from "../build";
import abe501 from "./abe501";
import abe573 from "./abe573";

/* Courses whose content is built from the student's own course materials.
   These replace any placeholder starter content for the same course. */
export const MATERIAL_COURSES: CourseContent[] = [abe501, abe573];

export const MATERIAL_COURSE_IDS = new Set(MATERIAL_COURSES.map(c => c.courseId));
export const MATERIAL_LESSONS = MATERIAL_COURSES.flatMap(c => c.lessons);
export const MATERIAL_QUIZZES = MATERIAL_COURSES.flatMap(c => c.quizzes);
export const MATERIAL_FLASHCARDS = MATERIAL_COURSES.flatMap(c => c.flashcards);
