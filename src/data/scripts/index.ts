import type { CourseScript } from "./types";
import abe501 from "./abe501";
import abe573 from "./abe573";

const SCRIPTS: Record<string, CourseScript> = { ABE501: abe501, ABE573: abe573 };

export function getScript(courseId: string): CourseScript | undefined {
  return SCRIPTS[courseId];
}
