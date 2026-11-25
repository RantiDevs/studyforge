import type { CourseScript } from "./types";
import abe501 from "./abe501";

const SCRIPTS: Record<string, CourseScript> = { ABE501: abe501 };

export function getScript(courseId: string): CourseScript | undefined {
  return SCRIPTS[courseId];
}
