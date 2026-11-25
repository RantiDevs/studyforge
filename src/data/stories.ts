/* Story themes for the 2D course games. Each course's outline is the storyline:
   one chapter per lesson, in order, then a themed final boss. */

export interface StoryTheme {
  title: string;
  premise: string;
  player: string;        // emoji
  mentor: string;        // emoji
  mentorName: string;
  orb: string;           // knowledge pickup (a flashcard)
  terminal: string;      // challenge station (the quiz)
  door: string;
  obstacles: string[];   // themed scenery that blocks movement
  floor: [string, string];
  wall: string;
  accent: string;
  bossName: string;
  bossEmoji: string;
  chapterIntros: string[]; // one per chapter, in course-outline order
  ending: string;
}

const STORIES: Record<string, StoryTheme> = {
  ABE501: {
    title: "The Factory Turnaround",
    premise: "You've just been appointed Engineering Manager of Harmattan AgroWorks, a struggling agro-processing factory. Output is falling, staff are unhappy and the board is losing patience. Learn to manage, fix each department, and save the plant.",
    player: "👷", mentor: "👩‍💼", mentorName: "Mentor Ada",
    orb: "📘", terminal: "🖥️", door: "🚪",
    obstacles: ["⚙️", "📦", "🛢️", "🏭", "🧰"],
    floor: ["#1a1f2e", "#1d2333"], wall: "#2b3350", accent: "#6366f1",
    bossName: "The Board's Final Audit", bossEmoji: "📉",
    chapterIntros: [
      "Day 1, the factory gate. Before you touch a single machine, you need to understand what management actually is.",
      "The admin block. Every department is doing its own thing. Time to learn the five functions that hold a company together.",
      "The org chart room. Who manages whom? Meet the levels of management and the kinds of managers you'll work with.",
      "The planning office. The board wants a plan and a forecast for next season's production.",
      "Restructuring day. Authority is tangled and nobody knows who reports to whom. Organize the factory.",
      "The shop floor. Morale is low. Learn to lead, use power wisely and motivate your team.",
      "The production line. Output per worker is falling. Measure productivity and pick the right production system.",
      "The expansion project and a safety scare. Plan the project and make the factory safe.",
    ],
    ending: "The board is impressed. Harmattan AgroWorks is productive, organized and safe, and it's thanks to you. Promotion unlocked!",
  },
  ABE573: {
    title: "The Engineer's Oath",
    premise: "You're a fresh engineering graduate in Ilorin with a dream: to see your name on the COREN register. The journey takes you from the roots of knowledge to the heart of Nigeria's development. Watch out: a syndicate of quacks is undermining the profession.",
    player: "🧑‍🎓", mentor: "👨‍🏫", mentorName: "Engr. Bello",
    orb: "📜", terminal: "🏛️", door: "🚪",
    obstacles: ["🏗️", "🧱", "🌳", "🚧", "📚"],
    floor: ["#1c1a2b", "#201d31"], wall: "#352f55", accent: "#8b5cf6",
    bossName: "The Quack Syndicate", bossEmoji: "🦹",
    chapterIntros: [
      "The ancient library. Every engineer's journey starts with wisdom. Meet the philosophers and the scientific method.",
      "The workshop of inventions. Discover what technology and engineering really mean.",
      "The COREN office. Meet the engineering family and learn the road to registration.",
      "The construction site. See who does what among engineers, technologists, technicians and craftsmen.",
      "The hall of ethics. Codes, duties and the professional bodies that guard the profession.",
      "The training college. Uncover why Nigeria lacks qualified engineering personnel, and how to fix it.",
      "The nation's infrastructure map. Engineering's role in building Nigeria's future.",
    ],
    ending: "Your name is on the COREN register. You took the oath: public safety first, always. The quacks are exposed and Nigeria has one more true engineer.",
  },
};

const DEFAULT_THEME: StoryTheme = {
  title: "The Knowledge Quest",
  premise: "Explore each chapter of the course, learn from your mentor, collect knowledge and pass every challenge.",
  player: "🧑", mentor: "🧙", mentorName: "The Mentor",
  orb: "💎", terminal: "🧩", door: "🚪",
  obstacles: ["🪨", "🌲", "📦"],
  floor: ["#171a26", "#1a1e2c"], wall: "#2a3048", accent: "#7c3aed",
  bossName: "The Final Exam", bossEmoji: "👾",
  chapterIntros: [],
  ending: "You've mastered the whole course. Well done!",
};

export function getStory(courseId: string): StoryTheme {
  return STORIES[courseId] || DEFAULT_THEME;
}
