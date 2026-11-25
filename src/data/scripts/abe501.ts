import type { Beat, CourseScript } from "./types";

/* ABE 501 "The Factory Turnaround": teaching scripts for each chapter, in course-outline order.
   Content comes from the ABE 501 course materials. */

const say = (who: string, text: string): Beat => ({ t: "say", who, text });
const scene = (s: string): Beat => ({ t: "scene", scene: s });

const script: CourseScript = {
  characters: {
    ada: { name: "Mentor Ada", emoji: "👩🏾‍💼", color: "#6366f1", role: "Your mentor" },
    bayo: { name: "Mr Bayo", emoji: "👨🏾‍🔧", color: "#f59e0b", role: "Production foreman" },
    okafor: { name: "Chief Okafor", emoji: "🧔🏾", color: "#ef4444", role: "Board chairman" },
    funmi: { name: "Funmi", emoji: "👩🏾‍💻", color: "#10b981", role: "HR officer" },
    musa: { name: "Musa", emoji: "👷🏾‍♂️", color: "#eab308", role: "Safety officer" },
    you: { name: "You", emoji: "👷", color: "#06b6d4", role: "New engineering manager" },
  },
  scenes: {
    gate: { name: "Factory gate", sky: ["#1e3a5f", "#0f172a"], ground: "#3f3f46", props: ["🏭", "🚚", "🌳", "🚧"] },
    admin: { name: "Admin block", sky: ["#312e81", "#111827"], ground: "#374151", props: ["🗄️", "🖥️", "🪴", "📋"] },
    boardroom: { name: "Boardroom", sky: ["#4c1d1d", "#111827"], ground: "#3b2f2f", props: ["🪑", "📊", "☕", "🖼️"] },
    floor: { name: "Shop floor", sky: ["#1f2937", "#0b0f19"], ground: "#52525b", props: ["⚙️", "🛢️", "📦", "🧰"] },
    planning: { name: "Planning office", sky: ["#0c4a6e", "#0f172a"], ground: "#334155", props: ["🗺️", "📈", "🖥️", "📅"] },
    line: { name: "Production line", sky: ["#14532d", "#0b1410"], ground: "#3f4a3f", props: ["🏭", "⚙️", "📦", "🔩"] },
    site: { name: "Expansion site", sky: ["#7c2d12", "#1c1410"], ground: "#57534e", props: ["🏗️", "🚧", "🦺", "🧱"] },
  },
  chapters: [
    /* 1 Essence of management */
    { lesson: 1, scene: "gate", beats: [
      scene("gate"),
      say("okafor", "Welcome to Harmattan AgroWorks. I'll be honest with you: we're losing money, output is falling, and the staff are unhappy. That's why we hired you as our new Engineering Manager."),
      say("ada", "Don't panic! I'm Ada, and I'll be your mentor. Before you touch a single machine, you need to understand what management actually is."),
      say("ada", "Your course defines management as designing and maintaining an environment where people, working together in groups, efficiently accomplish selected aims."),
      say("ada", "Even simpler: management is getting things done THROUGH other people. You won't fix this factory alone. You'll fix it through the people in it."),
      { t: "choice", who: "ada", prompt: "So, in your own words, what is management?", options: ["Doing all the important work yourself", "Getting things done through other people", "Keeping workers under strict surveillance", "Making as much money as possible, by any means"], correct: 1, right: "Yes! Management is achieving goals through people, by building the right environment for them.", wrong: "Not quite. Think about how one manager could possibly run a whole factory.", hint: "You can't run a factory alone." },
      say("ada", "Management needs five ingredients: an OBJECTIVE, RESOURCES, METHODS, an ORGANIZATIONAL SETTING, and PEOPLE."),
      say("ada", "And engineering management? It's the fusion of engineering and business: your technical problem-solving plus management's planning and organizing, taking a project from idea to completion."),
      say("bayo", "Madam, with respect, is management even a real subject? Isn't it just common sense?"),
      say("ada", "Good question, Mr Bayo! Managing in practice is an ART: know-how applied to real situations. But the organized knowledge behind it is a SCIENCE. So management is BOTH."),
      { t: "blank", prompt: "Managing as practice is an art, while the organized knowledge underlying it is a ___.", options: ["science", "hobby", "religion", "secret"], correct: 0, explain: "Right: management is both an art and a science, and they complement each other. This is a favourite exam question!" },
      say("ada", "Now, what makes management special? Your lecture slides list seven features. Let's sort a few of them out with real examples."),
      { t: "match", prompt: "Match each feature of management to what it means.", pairs: [["Economic resource", "A factor of production that makes land, labour and capital productive"], ["Goal oriented", "Success is measured by how well goals are achieved"], ["Integrative force", "Combines people and machines; aligns personal and company goals"], ["Universal", "Applies in business, hospitals, schools and the army alike"]], explain: "Also remember: distinct process, system of authority, and multi-disciplinary. Seven features in all." },
      say("ada", "Finally, the goal. Every manager, in any organization, aims to create a SURPLUS: reach the goal with the least time, money, materials and personal dissatisfaction."),
      { t: "choice", who: "okafor", prompt: "So what should your aim be here at AgroWorks?", options: ["Hire as many people as possible", "Create a surplus: achieve our goals with the least waste", "Avoid making any decisions", "Spend the full budget every year"], correct: 1, right: "Exactly. In a business the surplus is profit; in a university it's knowledge and service.", wrong: "Think about what all managers have in common, in any organization.", hint: "The word starts with 'S'." },
      say("ada", "Brilliant start. Remember the eight things excellent companies share: action-oriented, close to customers, autonomy and entrepreneurship, productivity through people, a strong philosophy, sticking to what they know best, a simple lean structure, and the right mix of central and decentral control."),
      say("ada", "Next, I'll take you to the admin block, where you'll learn the five jobs every manager does."),
    ] },

    /* 2 Functions */
    { lesson: 2, scene: "admin", beats: [
      scene("admin"),
      say("funmi", "Welcome to admin! Honestly, it's chaos. Nobody plans, nobody checks results, and when something goes wrong everyone blames everyone else."),
      say("ada", "That's because nobody is doing the five functions of management properly. The list your course uses comes from Koontz and O'Donnell: Planning, Organizing, Staffing, Directing (or Leading), and Controlling."),
      { t: "order", prompt: "Put the five management functions in their usual order (POSDC).", items: ["Planning", "Organizing", "Staffing", "Directing", "Controlling"], explain: "P-O-S-D-C. A trick to remember it: 'Please Organize Staff, Direct, Control'.", hint: "It starts with deciding what to do, and ends with checking the results." },
      say("ada", "PLANNING is deciding in advance what to do, when, how and who will do it. Koontz says it bridges the gap from where we are to where we want to be."),
      say("ada", "Here's a subtle point examiners love: no real plan exists until a DECISION commits resources. Before that, it's only a study or a proposal."),
      say("ada", "ORGANIZING builds the structure: identify activities, group them, assign duties, delegate authority, and coordinate. STAFFING puts the right person in the right job: square pegs in square holes."),
      say("ada", "DIRECTING is the 'life-spark' of the enterprise. Planning, organizing and staffing only prepare the work; directing sets people in motion. It has four elements: supervision, motivation, leadership and communication."),
      { t: "sort", prompt: "Funmi has a pile of tasks. Which function does each belong to?", buckets: ["Planning", "Staffing", "Controlling"], items: [["Deciding next year's production target", 0], ["Interviewing new technicians", 1], ["Comparing this month's output with the target", 2], ["Training new hires on the dryer", 1], ["Choosing how to reach the target", 0], ["Correcting a fall in quality", 2]], explain: "Planning decides the future, staffing handles people in positions, and controlling checks results against plans and corrects them.", hint: "Ask: is this about the future, about people in jobs, or about checking results?" },
      say("ada", "CONTROLLING follows four steps, and the THIRD step comes up in exams a lot. Watch carefully."),
      { t: "order", prompt: "Arrange the steps of controlling.", items: ["Set standards", "Measure actual performance", "Compare performance with standards", "Take corrective action"], explain: "Set, measure, compare, correct. The third step is COMPARING with the standard to find deviations.", hint: "You can't compare until you've measured, and you can't measure against nothing." },
      say("ada", "Controls also differ by timing: FEEDFORWARD control prevents problems before they happen, CONCURRENT control spots variances while work is going on, and FEEDBACK control evaluates finished work to improve next time."),
      { t: "choice", who: "funmi", prompt: "We inspect every machine before the shift starts so breakdowns never happen. Which type of control is that?", options: ["Feedback control", "Concurrent control", "Feedforward control", "No control at all"], correct: 2, right: "Correct: anticipating and preventing problems is feedforward control.", wrong: "This happens BEFORE any problem occurs.", hint: "Feed-FORWARD looks ahead." },
      say("ada", "Other writers list functions differently. Fayol: forecast and plan, organize, command, coordinate, control. Gulick gave us POSDCORB."),
      { t: "match", prompt: "Decode Gulick's POSDCORB.", pairs: [["P", "Planning"], ["S", "Staffing"], ["CO", "Co-ordinating"], ["R", "Reporting"], ["B", "Budgeting"]], explain: "POSDCORB = Planning, Organizing, Staffing, Directing, Co-ordinating, Reporting, Budgeting." },
      say("ada", "Last idea: COORDINATION. Some people call it a sixth function. Your notes say it's the ESSENCE of managing: every function exists to harmonize individual efforts toward group goals."),
      say("funmi", "Now I understand why we were in chaos. Thank you, both of you!"),
    ] },

    /* 3 Levels, skills, types */
    { lesson: 3, scene: "boardroom", beats: [
      scene("boardroom"),
      say("okafor", "In this boardroom we set direction. Do you know where you fit in the hierarchy, young manager?"),
      say("ada", "Organizations look like a pyramid with three levels. TOP managers (the board, CEO, CFO, COO) set goals, strategy and policy. MIDDLE managers (general, branch and department managers) turn those decisions into action. FIRST-LINE managers (supervisors, foremen) manage the workers directly."),
      { t: "sort", prompt: "Place each person at the right level of management.", buckets: ["Top", "Middle", "First-line"], items: [["Board chairman", 0], ["CEO", 0], ["Branch manager", 1], ["Department manager", 1], ["Shift supervisor", 2], ["Foreman", 2]], explain: "First-line managers are the only managers who manage NON-managers.", hint: "Who sets the direction, who passes it down, and who works directly with the workers?" },
      say("okafor", "And remember: this board hires, monitors, evaluates and fires the managing director. We also set policy, adopt bylaws, name committees, set dividends and issue shares."),
      say("ada", "Each level needs a different mix of three skills. CONCEPTUAL skill means seeing the whole organization as a system. HUMAN skill means working with people. TECHNICAL skill means knowing the work methods."),
      { t: "choice", who: "ada", prompt: "Which skill matters MOST for top managers?", options: ["Technical", "Conceptual", "Typing speed", "Manual dexterity"], correct: 1, right: "Yes. Top managers must see how every part connects. Technical skill matters most at supervisory level, and human skill matters at every level.", wrong: "Top managers rarely operate machines themselves.", hint: "Think 'big picture'." },
      say("ada", "Top managers spend more time PLANNING and ORGANIZING; first-line supervisors spend more time LEADING."),
      say("ada", "Management also has areas: financial, production and operations, human resources, marketing, IT, and administrative."),
      { t: "match", prompt: "Match the manager to the job.", pairs: [["Marketing manager", "Plans, prices and promotes products"], ["Financial manager", "Obtains money and uses funds for goals"], ["IT manager", "Implements and controls technology applications"], ["HR manager", "Handles staffing, including interviewing"]], explain: "Administrative managers coordinate all these specialists." },
      say("bayo", "Madam, I've worked under many managers. Some of them were... interesting."),
      say("ada", "Your notes describe manager TYPES by their habits. Let's see if you can spot them."),
      { t: "match", prompt: "Identify each type of manager.", pairs: [["Talks endlessly, dominates every meeting, gives no solutions", "Lion-hearted"], ["'We've always done it this way'", "Historically minded"], ["Blames every problem on lack of money", "One-track"], ["Waits for the majority before taking a stand", "Silent type"], ["Everything is yes or no, all or nothing", "Horn of the dilemma"]], explain: "Others: keep-it-simple, perfectionist, railroad (obsessed with time and machines) and autocratic." },
      { t: "choice", who: "ada", prompt: "When an engineer moves into management, what's hard to learn?", options: ["Trusting others", "Working through others", "Taking satisfaction in others' work", "All of the above"], correct: 3, right: "All three. You go from doing the work to getting it done through people.", wrong: "There's more than one adjustment.", hint: "Read every option carefully." },
    ] },

    /* 4 Leadership */
    { lesson: 4, scene: "floor", beats: [
      scene("floor"),
      say("bayo", "The workers on this floor don't listen to managers. They listen to people they respect."),
      say("ada", "That's the difference between authority and leadership. LEADERSHIP is influencing and supporting others to work enthusiastically toward objectives."),
      say("ada", "There are three main leadership styles. AUTOCRATIC: the leader decides everything alone. DEMOCRATIC (participative): decisions are shared with the group. LAISSEZ-FAIRE (free-rein): the group decides its own methods."),
      { t: "sort", prompt: "Which leadership style is each manager using?", buckets: ["Autocratic", "Democratic", "Laissez-faire"], items: [["'I've decided. Just do it.'", 0], ["'Let's vote on the new shift pattern.'", 1], ["'Organize yourselves however you like.'", 2], ["'Give me your ideas, then we decide together.'", 1], ["'No discussion. My decision is final.'", 0]], explain: "Free-rein's big downside: little managerial control and a high degree of risk.", hint: "Who makes the decision: the leader, the group together, or the group alone?" },
      { t: "choice", who: "musa", prompt: "A fire alarm goes off in the boiler house. Which style fits best right now?", options: ["Laissez-faire: let everyone decide", "Democratic: hold a vote", "Autocratic: give clear, fast orders", "Wait and see"], correct: 2, right: "Right. In emergencies, when there's no time and the leader knows more, autocratic works best. The best style depends on the situation.", wrong: "There's no time for discussion during an emergency.", hint: "Speed matters most." },
      say("ada", "Blake and Mouton's MANAGERIAL GRID (1964) rates leaders on two things: concern for PEOPLE and concern for PRODUCTION."),
      say("ada", "Influence comes from power, and there are four sources you must know."),
      { t: "match", prompt: "Match each source of power.", pairs: [["Legitimate", "Comes from your position in the hierarchy"], ["Reward", "You can give bonuses and promotions"], ["Coercive", "Compliance through threats or punishment"], ["Referent", "People want to be identified with you"]], explain: "Mr Bayo has referent power: the workers admire him." },
      say("ada", "Henry Mintzberg watched five CEOs and found that managers play ten roles, in three groups."),
      { t: "sort", prompt: "Sort Mintzberg's roles into their groups.", buckets: ["Interpersonal", "Informational", "Decisional"], items: [["Figurehead", 0], ["Liaison", 0], ["Disseminator", 1], ["Spokesperson", 1], ["Negotiator", 2], ["Resource allocator", 2], ["Disturbance handler", 2]], explain: "Leader is also interpersonal; monitor/recipient is informational; entrepreneur is decisional. Criticism: five CEOs is far too small a sample.", hint: "Interpersonal is about people, informational about passing information, decisional about choices." },
      say("bayo", "So if I want the workers' trust, I lead by example and by respect, not by shouting. Understood, Madam."),
    ] },

    /* 5 Viable organization */
    { lesson: 5, scene: "admin", beats: [
      scene("admin"),
      say("funmi", "Our organization chart is twenty years old. Half the departments don't exist anymore, and people fight about who does what."),
      say("ada", "Then let's build a VIABLE organization. Dr Odeyemi's notes give six steps."),
      { t: "order", prompt: "Arrange the six steps to a viable organization.", items: ["Avoid mistakes by planning", "Avoid organizational inflexibility", "Make staff work effective", "Avoid conflict by clarification", "Ensure understanding of organizing", "Promote the right organization culture"], explain: "Plan, stay flexible, make staff effective, clarify, teach, build culture.", hint: "It starts with planning and ends with culture." },
      say("ada", "Step one has two parts: first PLAN FOR THE IDEAL structure, then MODIFY IT FOR THE HUMAN FACTOR. If the people you have don't fit the ideal, adjust the structure to their abilities."),
      say("ada", "Step two: old companies become rigid, like this one. The cure is REORGANIZATION, and accepting the NEED FOR READJUSTMENT AND CHANGE."),
      { t: "choice", who: "funmi", prompt: "Which of these is NOT a way to avoid organizational inflexibility?", options: ["Reorganization", "Accepting the need for readjustment and change", "Avoiding all change", "Abolishing outdated regional offices"], correct: 2, right: "Correct. Refusing all change IS inflexibility.", wrong: "Inflexibility means refusing to adapt.", hint: "Which option would keep the company rigid?" },
      say("ada", "Step three, making staff work effective: make line managers listen to staff, keep staff informed, and require COMPLETE staff work."),
      say("ada", "Step four, avoiding conflict by clarification: use organization charts, accurate job descriptions, clear authority relationships and specific goals for every position."),
      say("ada", "Step six is culture. Your notes compare Environment A, which is autocratic, centralized and top-down, with Environment B, which is participative, decentralized and open."),
      { t: "sort", prompt: "Which environment does each describe?", buckets: ["Environment A", "Environment B"], items: [["People selected by friendship", 0], ["People selected on performance", 1], ["Communication flows only top-down", 0], ["Communication flows in every direction", 1], ["Strict control by superiors", 0], ["Lots of self-control", 1]], explain: "Environment B is the culture you want at AgroWorks." },
      say("ada", "Don't forget the INFORMAL organization: personal networks that never appear on the chart, like 'the morning tea regulars' or 'the Friday football gang'. They matter too."),
      { t: "choice", who: "ada", prompt: "For a role to be meaningful, it must have:", options: ["Verifiable objectives", "Clear major duties", "An understood area of authority", "All three"], correct: 3, right: "All three. That's the nature of organizing.", wrong: "A role needs more than one thing.", hint: "Look for the most complete answer." },
    ] },

    /* 6 Productivity & motivation */
    { lesson: 6, scene: "line", beats: [
      scene("line"),
      say("bayo", "The board says productivity is falling. But what does 'productivity' even mean?"),
      say("ada", "Productivity = OUTPUT divided by INPUT, over a period of time, with quality taken into account. You raise it by increasing output, cutting input, or both."),
      { t: "calc", prompt: "Last week the line made 600 hoe blades using 300 labour-hours. What was the labour productivity, in blades per labour-hour?", answer: 2, unit: "blades/hr", hint: "Labour productivity = output divided by labour input.", explain: "600 ÷ 300 = 2 blades per labour-hour." },
      { t: "calc", prompt: "After new jigs were fitted, output rose to 750 blades in the same 300 hours. What's the new labour productivity?", answer: 2.5, unit: "blades/hr", hint: "Same formula: divide the new output by the same input.", explain: "750 ÷ 300 = 2.5. That's a 25% improvement from better methods." },
      say("ada", "That's PARTIAL productivity, using one input. Others are capital, material and energy productivity. TOTAL productivity uses all tangible inputs together."),
      { t: "blank", prompt: "The ratio of output to material input is called ___ productivity.", options: ["material", "labour", "total", "capital"], correct: 0, explain: "Material productivity = output ÷ material input." },
      say("ada", "Now two words people always confuse. EFFECTIVENESS means achieving the objective. EFFICIENCY means achieving it with the least resources."),
      { t: "choice", who: "bayo", prompt: "We had 15 days to repair the boiler, and we finished in exactly 15 days. Were we...", options: ["Effective", "Efficient", "Neither", "Productive"], correct: 0, right: "Effective: you met the objective. If you'd also used less labour and material, you'd be efficient too.", wrong: "You met the deadline. Which word means 'achieved the objective'?", hint: "Effective = Objective achieved." },
      say("ada", "Next: appraising managers. It has been called the 'Achilles' heel' of staffing, yet it decides who gets promoted."),
      say("ada", "Appraise managers on two things: results against VERIFIABLE OBJECTIVES, and performance AS a manager, meaning how well they plan, organize, staff, lead and control."),
      { t: "order", prompt: "The three kinds of appraisal review, from the biggest to the most frequent:", items: ["Comprehensive review (at least yearly)", "Progress or periodic reviews", "Continuous monitoring"], explain: "One big yearly review, supported by frequent short check-ins and continuous monitoring." },
      say("ada", "And motivation: it's the process of ACTIVATING behaviour, SUSTAINING it, and DIRECTING it toward a goal. Managers usually want three rewards: opportunity, power and income."),
      { t: "choice", who: "ada", prompt: "In Maslow's hierarchy, a worker's need for food, water and rest is a...", options: ["Physiological need", "Esteem need", "Self-actualization need", "Security need"], correct: 0, right: "Yes, the base of the pyramid. Other theories to know are Herzberg's two-factor theory and expectancy theory.", wrong: "These are the most basic survival needs.", hint: "Body-related needs." },
    ] },

    /* 7 Organizing task & structures */
    { lesson: 7, scene: "admin", beats: [
      scene("admin"),
      say("okafor", "We're planning a second product line, cassava flour. How should we structure the company?"),
      say("ada", "First, two terms. DIVISION OF LABOUR decides what goes into each job. DEPARTMENTATION groups related jobs into units such as departments."),
      { t: "choice", who: "ada", prompt: "Grouping related jobs and activities into major subunits is called...", options: ["Division of labour", "Departmentation", "Delegation", "Span of control"], correct: 1, right: "Departmentation (also called departmentalization).", wrong: "This is about GROUPING jobs into units.", hint: "Think 'department'." },
      say("ada", "Now the structures. FUNCTIONAL groups people by specialty. DIVISIONAL gives each product or region its own full set of functions. MATRIX makes people report to both a functional manager AND a project manager."),
      { t: "match", prompt: "Match each structure to its description.", pairs: [["Functional", "Engineering in one unit, marketing in another"], ["Divisional", "A separate unit, with all functions, for each product"], ["Matrix", "Two bosses: functional plus project"], ["Network", "Outsources work to partner firms"], ["Virtual", "Exists through software and the Internet"]], explain: "Also: bureaucratic (Weber), flat, team, projectized and pre-bureaucratic." },
      say("bayo", "Two bosses? That sounds like trouble."),
      say("ada", "It can be! The matrix's big weakness is DUAL ACCOUNTABILITY, the 'dual boss', plus conflict between project and functional managers. Its strength is balancing human resources across projects."),
      { t: "sort", prompt: "Strength or weakness of a MATRIX structure?", buckets: ["Strength", "Weakness"], items: [["Balances use of human resources", 0], ["Dual boss confusion", 1], ["Conflict between managers", 1], ["Shares skills across projects", 0]], explain: "Matrix comes in three forms: weak (functional), balanced, and strong (project)." },
      say("ada", "Max Weber described BUREAUCRACY: clearly defined roles, a hierarchy, and respect for merit. It suits large, complex organizations."),
      { t: "choice", who: "okafor", prompt: "We need a temporary committee just to plan the cassava launch. What do we call it?", options: ["Standing committee", "Ad hoc committee", "Board of directors", "Union"], correct: 1, right: "Ad hoc: short-term, with a limited life. A standing committee is permanent.", wrong: "This committee will be disbanded after the launch.", hint: "Temporary." },
      { t: "choice", who: "ada", prompt: "Our cassava project gets a project manager with full authority and their own budget. That's a...", options: ["Functional organization", "Projectized organization", "Weak matrix", "Informal organization"], correct: 1, right: "Projectized. Good schedule and cost control, but staff may worry about their next assignment.", wrong: "Full authority and budget for the project manager.", hint: "Project-ized." },
    ] },

    /* 8 Span & delegation */
    { lesson: 8, scene: "admin", beats: [
      scene("admin"),
      say("funmi", "Our general manager approves EVERYTHING, even pen requests. Nothing moves."),
      say("ada", "That's a delegation problem. But first: SPAN OF CONTROL is how many people one manager can supervise effectively."),
      { t: "sort", prompt: "What does each span create?", buckets: ["Wide span", "Narrow span"], items: [["Few levels (flat)", 0], ["Many levels (tall)", 1], ["Higher management costs", 1], ["Managers too involved in subordinates' work", 1], ["Faster communication", 0]], explain: "Wide span means few levels; narrow span means many levels, which are expensive and slow." },
      say("ada", "Many levels cause three problems: they're EXPENSIVE, they COMPLICATE COMMUNICATION (messages get distorted on the way down), and they COMPLICATE PLANNING AND CONTROL."),
      say("ada", "Next: power vs authority. POWER is the ability to influence others. AUTHORITY is the right, attached to a position, to make decisions affecting others."),
      { t: "match", prompt: "Match the three kinds of authority.", pairs: [["Line authority", "Direct command over subordinates"], ["Staff authority", "Right to advise a superior"], ["Functional authority", "Oversees a specialty anywhere in the firm"]], explain: "A consultant advising the MD is using staff authority." },
      say("ada", "The SCALAR PRINCIPLE: the clearer the line of authority from the top to every position, the clearer the responsibility and the better the communication."),
      say("ada", "Now, delegation. It has four steps."),
      { t: "order", prompt: "Order the four steps of delegation.", items: ["Determine the results expected", "Assign tasks to the position", "Delegate authority for those tasks", "Hold the person responsible"], explain: "And remember: you can delegate authority, but you can never delegate away your own responsibility." },
      say("ada", "Most delegation failures aren't about knowledge. They're about ATTITUDE. There are five attitudes a manager needs."),
      { t: "sort", prompt: "Which attitudes support delegation?", buckets: ["Good for delegation", "Blocks delegation"], items: [["Receptiveness to others' ideas", 0], ["Strong 'Not Invented Here' feeling", 1], ["Willingness to let go", 0], ["Checking every tiny step", 1], ["Willingness to allow some mistakes", 0], ["Trusting subordinates", 0], ["Using broad controls for feedback", 0]], explain: "The five: receptiveness, letting go, allowing mistakes, trust, and broad controls." },
      say("funmi", "I'll show this to our GM. Maybe pen requests can finally be approved at my level!"),
    ] },

    /* 9 Theories */
    { lesson: 9, scene: "boardroom", beats: [
      scene("boardroom"),
      say("okafor", "In my day, management was just experience. Where did all this theory come from?"),
      say("ada", "From two streams, Chief. Frederick Winslow TAYLOR, an American industrial engineer, started scientific management from engineering in the late 1800s. Elton MAYO and Mary Parker FOLLETT came later, from the social sciences."),
      say("ada", "Henri FAYOL gave us 14 principles of management. Let's test the most examined ones."),
      { t: "match", prompt: "Match Fayol's principles.", pairs: [["Unity of command", "Each worker has only one boss"], ["Unity of direction", "Everyone moves toward one objective"], ["Scalar chain", "A chain of authority from top to bottom"], ["Esprit de corps", "Team spirit and harmony"], ["Equity", "Treat employees fairly"]], explain: "Others: division of work, authority, discipline, subordination of individual interest, remuneration, centralization, order, stability of tenure, initiative." },
      say("ada", "Harold KOONTZ called the many competing approaches 'the management theory jungle'. You should know a few."),
      { t: "match", prompt: "Match the approach to its big idea.", pairs: [["Contingency", "There's no one best way; it depends on the situation"], ["Systems", "The organization is an open system interacting with its environment"], ["Reengineering", "Radical redesign for dramatic results"], ["Empirical (case)", "Learning from past cases"], ["Mathematical", "Management as models and symbols"]], explain: "Your course uses the management PROCESS (operational) approach, built around the five functions." },
      { t: "choice", who: "ada", prompt: "Which one is part of McKinsey's 7-S framework?", options: ["Shared values", "Sales", "Speed", "Shareholders"], correct: 0, right: "Strategy, Structure, Systems, Style, Staff, Shared values, Skills.", wrong: "Think about culture and beliefs.", hint: "Something the whole organization holds in common." },
      say("ada", "The SYSTEMS view ties it together: the firm takes INPUTS from the environment, TRANSFORMS them through the five functions, and exports OUTPUTS, all while responding to economic, technological, social, political and ethical forces."),
      { t: "order", prompt: "Arrange the systems model.", items: ["Inputs from the environment", "Transformation through managerial functions", "Outputs to the environment"], explain: "Input, transform, output, with feedback all the while." },
    ] },

    /* 10 Planning & forecasting */
    { lesson: 10, scene: "planning", beats: [
      scene("planning"),
      say("okafor", "The board wants next year's plan and a sales forecast by Friday."),
      say("ada", "Plans come in three levels. STRATEGIC: top management, 2 to 10 years. TACTICAL (intermediate): middle management, about a year. OPERATIONAL: lower management, days to weeks."),
      { t: "sort", prompt: "Which level of plan is each?", buckets: ["Strategic", "Tactical", "Operational"], items: [["Become Nigeria's top cassava processor in 10 years", 0], ["This year's departmental budget allocation", 1], ["Tomorrow's shift roster", 2], ["Merge with a rival company", 0], ["This week's maintenance schedule", 2]], explain: "Strategic is long-range and top-level; operational is short and specific." },
      say("ada", "Plans also differ in how often you use them. STANDING plans are used again and again: policies, procedures and rules. SINGLE-USE plans are for one-off situations: programs, projects and budgets."),
      { t: "match", prompt: "Match each type of plan.", pairs: [["Policy", "A broad guideline for recurring decisions"], ["Procedure", "The exact series of steps to follow"], ["Rule", "Requires or forbids an action"], ["Program", "Coordinates a large set of activities"], ["Budget", "Projected spending and where the money comes from"]], explain: "'No smoking in the mill' is a rule. A program is bigger than a project." },
      say("ada", "Now forecasting. It predicts the future, mainly SALES, so we know how much to produce. There are two types: SHORT-TERM (3 to 12 months) and LONG-TERM (5 to 20 years)."),
      { t: "choice", who: "okafor", prompt: "We're deciding whether to build a whole new factory. Which forecast do we need?", options: ["Short-term", "Long-term", "Weekly", "None"], correct: 1, right: "Long-term (5 to 20 years), used by capital-heavy industries like refineries and assembly plants.", wrong: "A new factory lasts decades.", hint: "Big capital investment means a long horizon." },
      say("ada", "Four forecasting methods: POLLING OF SALESMEN, SURVEY OF BUYERS, ECONOMIC INDICATORS and STATISTICAL METHODS such as regression."),
      { t: "choice", who: "ada", prompt: "Our salesmen are paid commission and always predict huge sales. That's a known weakness of...", options: ["Polling of salesmen", "Economic indicators", "Survey of buyers", "Regression"], correct: 0, right: "Yes: over-zealous salesmen can produce faulty results.", wrong: "Whose opinion might be biased by their own interest?", hint: "Who earns commission?" },
      { t: "order", prompt: "Arrange the forecasting procedure.", items: ["State the problem", "Define the scope", "Set objectives", "Choose the method", "Collect data on relevant variables", "Find the best predictive relationship", "Make the forecast", "Cross-check for consistency"], explain: "Eight steps, from stating the problem to cross-checking. A good method is fairly accurate, simple to use and cost-conscious." },
    ] },

    /* 11 Techniques */
    { lesson: 11, scene: "site", beats: [
      scene("site"),
      say("okafor", "The expansion is approved. You're the project manager. Don't let it run late or over budget!"),
      say("ada", "A project manager has five goals: finish ON TIME, UNDER BUDGET, MEET THE REQUIREMENTS, keep CUSTOMERS happy, and keep the TEAM happy. And the most essential attribute is LEADERSHIP."),
      { t: "choice", who: "ada", prompt: "Which is NOT one of the five goals of a project manager?", options: ["Finish on time", "Keep customers happy", "Hire the biggest team possible", "Meet the requirements"], correct: 2, right: "Right. Team size isn't a goal; a HAPPY team is.", wrong: "Check the list again: time, budget, requirements, customers, team.", hint: "Bigger isn't better." },
      say("ada", "Tools: a GANTT chart shows tasks as bars against time. The CRITICAL PATH METHOD uses ONE time estimate per activity. PERT uses THREE: optimistic, most likely and pessimistic."),
      { t: "calc", prompt: "Three tasks must happen one after another: site clearing (4 days), foundation (6 days), steel frame (5 days). How long is this critical path?", answer: 15, unit: "days", hint: "On a critical path, tasks happen in sequence, so add their durations.", explain: "4 + 6 + 5 = 15 days. Any delay on this path delays the whole project." },
      { t: "blank", prompt: "PERT uses ___ time estimates for each activity.", options: ["three", "one", "two", "five"], correct: 0, explain: "Optimistic, most likely, pessimistic. CPM uses just one." },
      say("ada", "Decisions next. Start by ARTICULATING THE PROBLEM, and end by EVALUATING THE RESULTS. Evaluate alternatives either QUALITATIVELY (intuition and judgement) or QUANTITATIVELY (rational analysis)."),
      { t: "match", prompt: "Match the quantitative tool to its use.", pairs: [["Queuing theory", "Number of service counters that minimizes waiting time and cost"], ["Sampling theory", "Statistical samples for quality control"], ["Decision theory", "Rational choices with limited information"], ["Marginal analysis", "Expand while extra benefit exceeds extra cost"]], explain: "Linear programming and simulation are also quantitative tools." },
      say("ada", "Finally, risk. You can AVOID it, REDUCE it, SHARE (transfer) it, or ABSORB it."),
      { t: "sort", prompt: "Which risk response is each?", buckets: ["Share", "Absorb", "Avoid"], items: [["Buying insurance on the new boiler", 0], ["Adding 10 spare days to the schedule", 1], ["Switching to a proven supplier instead of a risky one", 2], ["Keeping a management reserve fund", 1]], explain: "Insurance shares the risk; buffers absorb it; changing technology or supplier avoids it." },
      say("ada", "Bonus mnemonic: SMEAC = Situation, Mission, Execution, Administration (what do we need to get it done?), Communication."),
    ] },

    /* 12 Production */
    { lesson: 12, scene: "line", beats: [
      scene("line"),
      say("bayo", "This is my world: the production line. Raw cassava in, flour out."),
      say("ada", "Production management is planning and regulating the operations that TRANSFORM materials into finished products. It works through the 5 Ps."),
      { t: "match", prompt: "Complete the 5 Ps of production management.", pairs: [["Products", "What we make"], ["Plant", "The factory and its machines"], ["Process", "How materials are transformed"], ["Programs", "Production schedules and plans"], ["People", "The workforce"]], explain: "When all five are integrated, production management succeeds." },
      { t: "choice", who: "ada", prompt: "Which is NOT an objective of production management?", options: ["Right quality", "Right quantity", "Whenever-it's-ready time", "Pre-established cost"], correct: 2, right: "The objectives are right quality, right quantity, PREDETERMINED time and pre-established cost.", wrong: "Production runs to a schedule.", hint: "Timing is planned, not random." },
      say("ada", "There are five production types. Let's classify some real Nigerian examples."),
      { t: "sort", prompt: "Which production type is each?", buckets: ["Jobbing", "Batch", "Mass/flow", "Process", "Project"], items: [["Tailor sewing one agbada", 0], ["Paint made in lots of 500 tins", 1], ["Car assembly line", 2], ["Cement plant running 24/7", 3], ["Building the Second Niger Bridge", 4], ["Sugar refinery", 3]], explain: "Process production makes one product continuously; project production has a definite start and end.", hint: "Is it one-off, in lots, on a continuous line, a continuous single product, or a one-time project?" },
      say("ada", "PPC, Production Planning and Control, has ten functions, including ROUTING (the path work follows), SCHEDULING (timetables for each operation), DISPATCHING (releasing the orders) and INSPECTION."),
      { t: "order", prompt: "Order these PPC steps for one job.", items: ["Routing", "Scheduling", "Dispatching", "Inspection"], explain: "Decide the path, set the timetable, release the work, then inspect it." },
      { t: "blank", prompt: "Developing timetables that say how long each operation takes is called ___.", options: ["scheduling", "routing", "plotting", "expediting"], correct: 0, explain: "Scheduling is the heart of work scheduling, a topic in your course outline." },
      say("ada", "And to sell the flour: marketing's 4 Ps are PRODUCT, PRICE, PLACE and PROMOTION."),
      { t: "choice", who: "funmi", prompt: "Which one is NOT among the 4 Ps of marketing?", options: ["Product", "Price", "Publicity", "Place"], correct: 2, right: "Publicity is a promotion TOOL (unpaid news coverage), not one of the 4 Ps.", wrong: "Three of these are in the 4 Ps.", hint: "The fourth P is Promotion." },
    ] },

    /* 13 Staffing & communication */
    { lesson: 13, scene: "admin", beats: [
      scene("admin"),
      say("funmi", "The expansion needs 40 new staff. Where do I even start?"),
      say("ada", "Follow the staffing process from start to finish."),
      { t: "order", prompt: "Arrange the staffing process.", items: ["Forecast HR needs", "Programming (set personnel goals)", "Recruitment", "Selection", "Induction and orientation", "Training and development", "Performance appraisal"], explain: "Recruitment ATTRACTS applicants; selection CHOOSES among them." },
      { t: "choice", who: "funmi", prompt: "Attracting qualified people to apply for our vacancies is...", options: ["Selection", "Recruitment", "Induction", "Transfer"], correct: 1, right: "Recruitment. Selection comes next: choosing those most likely to succeed.", wrong: "This step happens BEFORE choosing anyone.", hint: "Getting applicants in the door." },
      { t: "match", prompt: "Match each employee movement.", pairs: [["Promotion", "Higher pay and more responsibility"], ["Transfer", "Different job, same level"], ["Demotion", "Less pay or responsibility"], ["Separation", "Leaving the organization"]], explain: "Training improves performance in the PRESENT job; development prepares people for future roles." },
      say("ada", "Communication is sharing information through symbols. It has four functions: INFORMATION, MOTIVATION, EMOTIVE and CONTROL."),
      { t: "choice", who: "ada", prompt: "Staff are anxious after rumours of layoffs. Which function of communication releases those feelings?", options: ["Information", "Emotive", "Control", "Motivation"], correct: 1, right: "Emotive. Repressed feelings cause anxiety, which hurts performance.", wrong: "This is about feelings.", hint: "Emotions." },
      say("ada", "Good industrial relations, meaning peace and harmony between management and staff, come from fairness, clear roles and open communication. Autocratic management breeds unrest."),
      { t: "choice", who: "bayo", prompt: "Two managers secretly fight over who controls the new warehouse. What type of conflict is that?", options: ["Technical opinion conflict", "Politics", "Ambiguous roles", "Procedural conflict"], correct: 1, right: "Politics: conflict over territorial power or hidden agendas.", wrong: "It's about power and territory.", hint: "Power struggles." },
    ] },

    /* 14 Safety */
    { lesson: 14, scene: "site", beats: [
      scene("site"),
      say("musa", "Sir, yesterday a forklift nearly hit a worker at the loading bay. Nobody was hurt, thank God."),
      say("ada", "That was a NEAR MISS, which makes it an INCIDENT: an undesired event that COULD have caused an accident. An ACCIDENT is when harm or loss actually happens."),
      { t: "sort", prompt: "Incident or accident?", buckets: ["Incident", "Accident"], items: [["A forklift nearly hits a worker", 0], ["A worker's hand is injured by a conveyor", 1], ["A gas leak is found and fixed before anyone notices", 0], ["A fire damages the warehouse", 1]], explain: "Treat near misses seriously. They are warnings of future accidents." },
      say("ada", "Two words that matter: a HAZARD is the POTENTIAL to cause harm. RISK is the LIKELIHOOD that the harm actually happens."),
      { t: "match", prompt: "Hazard or risk?", pairs: [["An unguarded conveyor belt", "Hazard (potential for harm)"], ["The chance a worker gets caught in it this year", "Risk (likelihood)"], ["Safety", "The control of accidental loss"]], explain: "You remove or guard hazards to reduce risk." },
      say("musa", "Why should the company spend money on safety, though?"),
      say("ada", "Three reasons. MORAL: no one comes to work to be hurt. COST: Piper Alpha killed 167 people and cost over £2 billion. LEGAL: in the UK, the Health and Safety at Work Act 1974 makes it an obligation."),
      { t: "choice", who: "musa", prompt: "Which is NOT one of the three main reasons for preventing accidents?", options: ["Moral", "Cost", "Legislation", "Advertising"], correct: 3, right: "Correct: moral, cost and legal.", wrong: "Think: conscience, money and the law.", hint: "Which one has nothing to do with safety?" },
      say("ada", "The ACCIDENT COST ICEBERG: insured costs are only the tip. Lost production, investigations, repairs and low morale are hidden below the water."),
      { t: "choice", who: "ada", prompt: "In UK quarries (1983 to 1993), what caused the largest share of fatal accidents?", options: ["Conveyors", "Vehicles", "Overhead power lines", "Crusher blockages"], correct: 1, right: "Vehicles caused 41%: being run over, falling off edges, overturning and collisions. Musa's forklift worry was spot on.", wrong: "Think about what moves around a site constantly.", hint: "Musa's near miss involved one." },
      say("okafor", "Productive, organized and now safe. You've turned AgroWorks around. The board is proud of you."),
      say("ada", "You've finished every chapter. Only the Board's Final Audit remains. Good luck!"),
    ] },
  ],
};

export default script;
