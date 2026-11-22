"use client";
import { useState, useEffect, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

interface Course {
  id: string;
  title: string;
  credits: number;
  semester: "harmattan" | "rain";
  status: "C" | "R" | "E";
  color: string;
  icon: string;
}

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: "prerequisite" | "module";
  order: number;
  content: string;
  keyTerms: string[];
  summary: string;
}

interface QuizQuestion {
  id: string;
  courseId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Flashcard {
  id: string;
  courseId: string;
  front: string;
  back: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReview: string;
}

interface Upload {
  id: string;
  courseId: string;
  fileName: string;
  url: string;
  uploadedAt: string;
  contentGenerated: boolean;
}

interface Progress {
  xp: number;
  level: number;
  streak: number;
  lastStudyDate: string;
  lessonsCompleted: string[];
  quizAttempts: { questionId: string; correct: boolean; date: string }[];
  badges: string[];
  totalStudyMinutes: number;
}

type Tab = "dashboard" | "courses" | "study" | "quiz" | "upload" | "timetable";

/* ═══════════════════════════════════════════
   COURSE DATA — parsed from registration form
   ═══════════════════════════════════════════ */

const COURSES: Course[] = [
  // Harmattan
  { id: "ABE501", title: "Engineering Management", credits: 3, semester: "harmattan", status: "R", color: "#6366f1", icon: "\u{1F4CA}" },
  { id: "ABE573", title: "Engineer in Society", credits: 1, semester: "harmattan", status: "R", color: "#8b5cf6", icon: "\u{1F310}" },
  { id: "MEE551", title: "Refrigeration and Airconditioning", credits: 3, semester: "harmattan", status: "R", color: "#06b6d4", icon: "\u{2744}\u{FE0F}" },
  { id: "BME593", title: "Biomedical Engineering Project I", credits: 4, semester: "harmattan", status: "C", color: "#ec4899", icon: "\u{1F52C}" },
  { id: "BME503", title: "Principle of Biomedical Eng. Instrumentation", credits: 3, semester: "harmattan", status: "E", color: "#f59e0b", icon: "\u{1F50C}" },
  { id: "BME505", title: "Nanomedicine", credits: 3, semester: "harmattan", status: "E", color: "#10b981", icon: "\u{1F9EC}" },
  // Rain
  { id: "BUL506", title: "Engineering Law", credits: 3, semester: "rain", status: "R", color: "#64748b", icon: "\u{2696}\u{FE0F}" },
  { id: "ELE506", title: "Reliability & Maintainability of Electrical Systems", credits: 3, semester: "rain", status: "R", color: "#f97316", icon: "\u{26A1}" },
  { id: "BME502", title: "Biomedical Engineering Industries", credits: 3, semester: "rain", status: "C", color: "#14b8a6", icon: "\u{1F3ED}" },
  { id: "BME504", title: "Models of the Neuron", credits: 3, semester: "rain", status: "C", color: "#a855f7", icon: "\u{1F9E0}" },
  { id: "BME512", title: "Medical Imaging System", credits: 3, semester: "rain", status: "E", color: "#3b82f6", icon: "\u{1FA7B}" },
  { id: "BME594", title: "Biomedical Engineering Project II", credits: 4, semester: "rain", status: "C", color: "#ec4899", icon: "\u{1F4DD}" },
  { id: "BME216", title: "Human Physiology I", credits: 2, semester: "rain", status: "C", color: "#ef4444", icon: "\u{1FAC0}" },
  { id: "BME334", title: "Biomedical Instrumentation", credits: 3, semester: "rain", status: "C", color: "#eab308", icon: "\u{1F3AF}" },
  { id: "GET302", title: "Engineering Mathematics IV", credits: 3, semester: "rain", status: "R", color: "#6366f1", icon: "\u{1F4D0}" },
];

/* ═══════════════════════════════════════════
   STARTER CONTENT
   ═══════════════════════════════════════════ */

const STARTER_LESSONS: Lesson[] = [
  // ABE501 — Engineering Management
  {
    id: "ABE501-P1", courseId: "ABE501", title: "What Is Management?", type: "prerequisite", order: 0,
    content: `<h2>Management: The Foundation</h2>
<p>Before we talk about <em>engineering</em> management, you need to understand management itself.</p>
<p><strong>Management</strong> is the process of planning, organising, leading, and controlling resources (people, money, time, materials) to achieve specific goals efficiently.</p>
<h3>The Four Functions</h3>
<ol>
<li><strong>Planning</strong> — Deciding what needs to happen and how. Setting objectives, defining strategies.</li>
<li><strong>Organising</strong> — Arranging resources and tasks. Who does what? What tools are needed?</li>
<li><strong>Leading</strong> — Motivating and directing people. Communication, conflict resolution, team building.</li>
<li><strong>Controlling</strong> — Monitoring progress and correcting deviations. Are we on track?</li>
</ol>
<h3>Why Engineers Need This</h3>
<p>As an engineer, you will manage projects, budgets, teams, and timelines. A brilliant design that runs over budget or misses deadlines fails just as badly as a flawed one. Engineering management bridges the gap between technical excellence and real-world delivery.</p>`,
    keyTerms: ["management", "planning", "organising", "leading", "controlling"],
    summary: "Management is planning, organising, leading, and controlling resources to achieve goals. Engineers need it to deliver projects on time and budget."
  },
  {
    id: "ABE501-P2", courseId: "ABE501", title: "Project Life Cycle & Planning", type: "prerequisite", order: 1,
    content: `<h2>The Project Life Cycle</h2>
<p>Every engineering project moves through predictable phases:</p>
<ol>
<li><strong>Initiation</strong> — Define the problem. Is the project feasible? What is the scope?</li>
<li><strong>Planning</strong> — Break the work into tasks (Work Breakdown Structure). Estimate time and cost. Identify risks.</li>
<li><strong>Execution</strong> — Do the work. Build, test, iterate.</li>
<li><strong>Monitoring & Control</strong> — Track progress against the plan. Adjust when things drift.</li>
<li><strong>Closure</strong> — Deliver the product. Document lessons learned.</li>
</ol>
<h3>Work Breakdown Structure (WBS)</h3>
<p>A WBS breaks a large project into smaller, manageable pieces. Think of it like a tree:</p>
<ul>
<li>Level 0: The whole project</li>
<li>Level 1: Major deliverables</li>
<li>Level 2: Sub-deliverables</li>
<li>Level 3: Work packages (tasks you can assign to someone)</li>
</ul>
<h3>Gantt Charts</h3>
<p>A Gantt chart is a horizontal bar chart that shows tasks on the vertical axis and time on the horizontal axis. Each bar represents a task's start date, duration, and end date. Dependencies between tasks are shown with arrows.</p>`,
    keyTerms: ["project life cycle", "initiation", "WBS", "work breakdown structure", "Gantt chart"],
    summary: "Projects follow five phases from initiation to closure. WBS breaks work into manageable pieces. Gantt charts visualise schedules."
  },
  {
    id: "ABE501-M1", courseId: "ABE501", title: "Engineering Management: Scope and Role", type: "module", order: 2,
    content: `<h2>What Makes Engineering Management Different?</h2>
<p>Engineering management combines technical knowledge with management skills. Unlike general managers, engineering managers must:</p>
<ul>
<li>Understand the technical details of what their teams build</li>
<li>Make trade-off decisions between performance, cost, and schedule</li>
<li>Communicate technical risks to non-technical stakeholders</li>
<li>Manage innovation and R&D processes</li>
</ul>
<h3>Key Responsibilities</h3>
<p><strong>Resource allocation:</strong> Deciding how to distribute limited budget, equipment, and personnel across competing priorities.</p>
<p><strong>Quality management:</strong> Ensuring outputs meet specifications. This involves setting quality standards, inspection processes, and continuous improvement (Kaizen).</p>
<p><strong>Risk management:</strong> Identifying what could go wrong, estimating probability and impact, and planning responses (avoid, mitigate, transfer, or accept).</p>
<h3>Decision-Making Tools</h3>
<p>Engineering managers use quantitative tools:</p>
<ul>
<li><strong>Cost-Benefit Analysis (CBA)</strong> — Compare total costs vs. total benefits in monetary terms</li>
<li><strong>Decision matrices</strong> — Score options against weighted criteria</li>
<li><strong>Critical Path Method (CPM)</strong> — Find the longest sequence of dependent tasks to know the minimum project duration</li>
</ul>`,
    keyTerms: ["engineering management", "resource allocation", "quality management", "risk management", "CPM", "cost-benefit analysis"],
    summary: "Engineering managers blend technical depth with business skills. They allocate resources, manage quality and risk, and use quantitative tools like CBA and CPM."
  },

  // BME505 — Nanomedicine
  {
    id: "BME505-P1", courseId: "BME505", title: "Cell Biology Essentials", type: "prerequisite", order: 0,
    content: `<h2>The Cell: Life's Basic Unit</h2>
<p>Everything in nanomedicine happens at the cellular level, so you must understand cells first.</p>
<h3>Cell Structure</h3>
<ul>
<li><strong>Cell membrane</strong> — A phospholipid bilayer that controls what enters and leaves the cell. It is selectively permeable.</li>
<li><strong>Nucleus</strong> — Contains DNA (the genetic blueprint). Controls cell activities.</li>
<li><strong>Mitochondria</strong> — The cell's power plants. They convert glucose into ATP (energy currency).</li>
<li><strong>Ribosomes</strong> — Read mRNA instructions and build proteins.</li>
<li><strong>Endoplasmic reticulum (ER)</strong> — Rough ER (with ribosomes) makes proteins. Smooth ER makes lipids and detoxifies.</li>
<li><strong>Golgi apparatus</strong> — Packages and ships proteins to their destinations.</li>
</ul>
<h3>Why This Matters for Nanomedicine</h3>
<p>Nanoparticles must cross the cell membrane to deliver drugs inside cells. Understanding membrane structure tells us how to design particles that can pass through. The size of organelles (typically 100nm to 10µm) sets the scale nanomedicine works at.</p>`,
    keyTerms: ["cell membrane", "phospholipid bilayer", "nucleus", "mitochondria", "ATP", "ribosomes", "Golgi apparatus"],
    summary: "Cells are bounded by a phospholipid membrane and contain organelles like the nucleus, mitochondria, and ribosomes. Nanomedicine works at this cellular scale."
  },
  {
    id: "BME505-P2", courseId: "BME505", title: "Chemistry at the Nanoscale", type: "prerequisite", order: 1,
    content: `<h2>What Is the Nanoscale?</h2>
<p>1 nanometre (nm) = 10⁻⁹ metres = 0.000000001 m. For perspective:</p>
<ul>
<li>A human hair is about 80,000 nm wide</li>
<li>A red blood cell is about 7,000 nm</li>
<li>A DNA double helix is about 2 nm wide</li>
<li>A water molecule is about 0.275 nm</li>
</ul>
<p>Nanomedicine works in the 1–100 nm range, though some nanoparticles used in drug delivery are 100–300 nm.</p>
<h3>Surface Area to Volume Ratio</h3>
<p>As particles get smaller, their surface-area-to-volume ratio increases dramatically. A 1 cm cube has 6 cm² of surface per 1 cm³ of volume (ratio = 6). Cut it into 1 nm cubes and the total surface area explodes.</p>
<p>This matters because chemical reactions happen at surfaces. Smaller particles are more reactive, dissolve faster, and interact more with biological tissues.</p>
<h3>Key Nanomaterials</h3>
<ul>
<li><strong>Gold nanoparticles</strong> — Biocompatible, easy to functionalise, used in imaging and therapy</li>
<li><strong>Liposomes</strong> — Tiny spheres made of the same phospholipids as cell membranes. Used to encapsulate drugs.</li>
<li><strong>Polymeric nanoparticles</strong> — Made from biodegradable polymers like PLGA. Slowly release drugs over time.</li>
<li><strong>Quantum dots</strong> — Semiconductor nanocrystals that fluoresce. Used in imaging.</li>
</ul>`,
    keyTerms: ["nanoscale", "surface area to volume ratio", "gold nanoparticles", "liposomes", "PLGA", "quantum dots"],
    summary: "The nanoscale (1–100 nm) gives particles enormous surface area relative to volume, making them highly reactive. Key nanomaterials include liposomes, gold nanoparticles, and quantum dots."
  },
  {
    id: "BME505-M1", courseId: "BME505", title: "Introduction to Nanomedicine", type: "module", order: 2,
    content: `<h2>What Is Nanomedicine?</h2>
<p>Nanomedicine is the application of nanotechnology to medicine. It uses materials and devices at the nanoscale (1–100 nm) to diagnose, treat, and prevent disease.</p>
<h3>The Three Pillars</h3>
<ol>
<li><strong>Nanodiagnostics</strong> — Using nanoparticles to detect diseases earlier and more accurately. Example: quantum dots that light up when they bind to cancer markers in blood.</li>
<li><strong>Nanotherapeutics</strong> — Delivering drugs precisely to diseased cells while sparing healthy ones. Example: liposomes loaded with chemotherapy drugs that accumulate in tumours.</li>
<li><strong>Regenerative nanomedicine</strong> — Using nanomaterials as scaffolds to grow new tissue. Example: nanofibre meshes that guide bone regrowth.</li>
</ol>
<h3>The EPR Effect</h3>
<p>Tumours have leaky blood vessels with gaps of 100–800 nm. Normal blood vessels have much tighter gaps. Nanoparticles in the 20–200 nm range can slip through tumour vessel gaps but not normal ones. This is the <strong>Enhanced Permeability and Retention (EPR)</strong> effect — the foundation of passive tumour targeting.</p>
<h3>Challenges</h3>
<ul>
<li><strong>Toxicity</strong> — Some nanoparticles accumulate in the liver and kidneys</li>
<li><strong>Immune clearance</strong> — The body's immune system removes foreign particles quickly</li>
<li><strong>Manufacturing scale</strong> — Making uniform nanoparticles at industrial scale is difficult</li>
<li><strong>Regulatory</strong> — Nanoparticles don't fit neatly into existing drug or device regulations</li>
</ul>`,
    keyTerms: ["nanomedicine", "nanodiagnostics", "nanotherapeutics", "regenerative nanomedicine", "EPR effect", "passive targeting"],
    summary: "Nanomedicine uses nanoscale materials for diagnosis, drug delivery, and tissue regeneration. The EPR effect enables passive tumour targeting through leaky tumour blood vessels."
  },

  // BME503 — Biomedical Engineering Instrumentation
  {
    id: "BME503-P1", courseId: "BME503", title: "Electrical Fundamentals Review", type: "prerequisite", order: 0,
    content: `<h2>Electricity Basics for Instrumentation</h2>
<p>Biomedical instruments measure biological signals, which are electrical in nature. You need to understand basic circuit concepts.</p>
<h3>Voltage, Current, Resistance</h3>
<ul>
<li><strong>Voltage (V)</strong> — Electrical pressure. The force that pushes electrons through a conductor. Measured in volts.</li>
<li><strong>Current (I)</strong> — The flow of electrons. Measured in amperes (A). Biological signals are often in microamperes (µA).</li>
<li><strong>Resistance (R)</strong> — Opposition to current flow. Measured in ohms (Ω).</li>
</ul>
<p><strong>Ohm's Law: V = I × R</strong></p>
<p>This is the most fundamental equation in electronics. If you know any two values, you can find the third.</p>
<h3>Capacitors and Inductors</h3>
<p><strong>Capacitors</strong> store energy in an electric field. They block DC and pass AC. In biomedical circuits, they filter out unwanted frequencies.</p>
<p><strong>Inductors</strong> store energy in a magnetic field. They resist changes in current.</p>
<h3>Impedance</h3>
<p>In AC circuits (like biological signals), opposition to current is called <strong>impedance (Z)</strong>, not just resistance. Impedance includes resistance plus the effects of capacitors and inductors. Electrode-skin impedance is a critical factor in getting clean biological signals.</p>`,
    keyTerms: ["voltage", "current", "resistance", "Ohm's law", "capacitor", "inductor", "impedance"],
    summary: "Voltage pushes current through resistance (V=IR). In AC circuits like biological signals, impedance replaces resistance. Capacitors and inductors filter and shape signals."
  },
  {
    id: "BME503-P2", courseId: "BME503", title: "Sensors and Transducers", type: "prerequisite", order: 1,
    content: `<h2>Converting Biology to Electricity</h2>
<p>A <strong>transducer</strong> converts one form of energy into another. A <strong>sensor</strong> is a transducer that converts a physical quantity (temperature, pressure, light) into an electrical signal.</p>
<h3>Types of Biomedical Sensors</h3>
<ul>
<li><strong>Electrodes</strong> — Detect bioelectric signals (ECG for heart, EEG for brain, EMG for muscle). They convert ionic current in the body to electronic current in wires.</li>
<li><strong>Thermistors</strong> — Resistance changes with temperature. Used in body temperature monitoring.</li>
<li><strong>Strain gauges</strong> — Resistance changes when stretched. Used in blood pressure transducers.</li>
<li><strong>Photodetectors</strong> — Convert light to electrical signal. Used in pulse oximeters (SpO2).</li>
<li><strong>Piezoelectric sensors</strong> — Generate voltage when compressed. Used in ultrasound transducers.</li>
</ul>
<h3>Key Specifications</h3>
<p><strong>Sensitivity:</strong> How much the output changes per unit change in input. Higher is better for detecting small biological signals.</p>
<p><strong>Linearity:</strong> Does the output change proportionally with the input? Non-linear sensors need calibration curves.</p>
<p><strong>Signal-to-Noise Ratio (SNR):</strong> Biological signals are tiny (ECG ~ 1mV, EEG ~ 50µV). The sensor must pick up the signal without drowning it in noise.</p>`,
    keyTerms: ["transducer", "sensor", "electrode", "thermistor", "strain gauge", "piezoelectric", "sensitivity", "SNR"],
    summary: "Sensors convert physical quantities to electrical signals. Biomedical sensors include electrodes, thermistors, strain gauges, and piezoelectric sensors. Key specs are sensitivity, linearity, and SNR."
  },
  {
    id: "BME503-M1", courseId: "BME503", title: "The Biomedical Instrumentation System", type: "module", order: 2,
    content: `<h2>Block Diagram of a Biomedical Instrument</h2>
<p>Every biomedical instrument follows the same general structure:</p>
<ol>
<li><strong>Subject/Patient</strong> — The source of the biological signal</li>
<li><strong>Sensor/Transducer</strong> — Converts the biological quantity to an electrical signal</li>
<li><strong>Signal Conditioning</strong> — Amplifies, filters, and processes the raw signal</li>
<li><strong>ADC (Analog-to-Digital Converter)</strong> — Converts the continuous analog signal to discrete digital data</li>
<li><strong>Processing & Display</strong> — Computer analyses the data and presents it to the clinician</li>
<li><strong>Data Storage</strong> — Records for later review</li>
</ol>
<h3>Signal Conditioning</h3>
<p>Raw biological signals are weak and noisy. Signal conditioning includes:</p>
<ul>
<li><strong>Amplification</strong> — An instrumentation amplifier boosts the signal (gains of 100–10,000 are common for bio-signals)</li>
<li><strong>Filtering</strong> — Bandpass filters remove frequencies outside the signal's range (ECG: 0.05–100 Hz; EEG: 0.5–70 Hz)</li>
<li><strong>Isolation</strong> — Electrical isolation protects the patient from dangerous currents (leakage current must be < 10µA)</li>
</ul>
<h3>Patient Safety</h3>
<p>The most critical requirement. Medical instruments must:</p>
<ul>
<li>Limit leakage current to prevent electrocution</li>
<li>Use isolated power supplies</li>
<li>Meet IEC 60601 safety standards</li>
<li>Have redundant grounding</li>
</ul>`,
    keyTerms: ["signal conditioning", "instrumentation amplifier", "ADC", "bandpass filter", "electrical isolation", "IEC 60601", "leakage current"],
    summary: "Biomedical instruments follow a chain: sensor → signal conditioning → ADC → processing → display. Signal conditioning amplifies and filters weak bio-signals. Patient safety (IEC 60601) is the top priority."
  },
];

const STARTER_QUIZZES: QuizQuestion[] = [
  // ABE501
  { id: "ABE501-Q1", courseId: "ABE501", question: "Which of these is NOT one of the four functions of management?", options: ["Planning", "Marketing", "Organising", "Controlling"], correctIndex: 1, explanation: "The four functions are Planning, Organising, Leading, and Controlling. Marketing is a business function, not a management function." },
  { id: "ABE501-Q2", courseId: "ABE501", question: "What does a Work Breakdown Structure (WBS) do?", options: ["Calculates project cost", "Breaks a project into smaller manageable tasks", "Assigns team roles", "Tracks project delays"], correctIndex: 1, explanation: "A WBS decomposes a large project into progressively smaller pieces until you have assignable work packages." },
  { id: "ABE501-Q3", courseId: "ABE501", question: "The Critical Path Method (CPM) identifies:", options: ["The cheapest sequence of tasks", "The longest sequence of dependent tasks", "The most important team members", "The riskiest project phase"], correctIndex: 1, explanation: "CPM finds the longest chain of dependent tasks, which determines the minimum possible project duration. Any delay on the critical path delays the entire project." },
  { id: "ABE501-Q4", courseId: "ABE501", question: "What is a Gantt chart?", options: ["A pie chart of budget allocation", "A horizontal bar chart showing task schedules", "A flow diagram of decisions", "A scatter plot of project risks"], correctIndex: 1, explanation: "A Gantt chart uses horizontal bars to show each task's start date, duration, and end date against a timeline." },
  { id: "ABE501-Q5", courseId: "ABE501", question: "Cost-Benefit Analysis (CBA) compares:", options: ["Employee salaries vs. productivity", "Total project costs vs. total project benefits in monetary terms", "Past projects vs. current projects", "Internal costs vs. competitor costs"], correctIndex: 1, explanation: "CBA translates all costs and benefits into monetary values to determine whether a project's benefits outweigh its costs." },

  // BME505
  { id: "BME505-Q1", courseId: "BME505", question: "What is the approximate width of a DNA double helix?", options: ["2 nm", "20 nm", "200 nm", "2000 nm"], correctIndex: 0, explanation: "The DNA double helix is approximately 2 nm wide, placing it firmly in the nanoscale range." },
  { id: "BME505-Q2", courseId: "BME505", question: "Why are nanoparticles more chemically reactive than bulk materials?", options: ["They are hotter", "They have a much higher surface-area-to-volume ratio", "They contain different atoms", "They are electrically charged"], correctIndex: 1, explanation: "As particles shrink, their surface area relative to volume increases dramatically. Since chemical reactions happen at surfaces, smaller particles react faster." },
  { id: "BME505-Q3", courseId: "BME505", question: "The EPR effect allows nanoparticles to accumulate in tumours because:", options: ["Tumour cells attract nanoparticles magnetically", "Tumour blood vessels have gaps (100–800 nm) that normal vessels don't", "Tumours are warmer than normal tissue", "Cancer cells absorb all foreign particles"], correctIndex: 1, explanation: "Tumour vasculature is leaky with fenestrations of 100–800 nm. Nanoparticles of 20–200 nm pass through these gaps and are retained in the tumour (Enhanced Permeability and Retention)." },
  { id: "BME505-Q4", courseId: "BME505", question: "Liposomes are made of:", options: ["Gold atoms", "Carbon nanotubes", "Phospholipids (same as cell membranes)", "Silicon dioxide"], correctIndex: 2, explanation: "Liposomes are tiny spherical vesicles made of phospholipid bilayers, the same material as cell membranes, making them biocompatible and ideal for drug encapsulation." },
  { id: "BME505-Q5", courseId: "BME505", question: "Which organelle is called the 'powerhouse of the cell'?", options: ["Nucleus", "Golgi apparatus", "Mitochondria", "Ribosome"], correctIndex: 2, explanation: "Mitochondria convert glucose into ATP (adenosine triphosphate), the energy currency cells use to power their functions." },

  // BME503
  { id: "BME503-Q1", courseId: "BME503", question: "Ohm's Law states:", options: ["V = I / R", "V = I × R", "V = I + R", "V = R / I"], correctIndex: 1, explanation: "Ohm's Law: Voltage equals Current times Resistance (V = IR). This is the fundamental relationship in all electrical circuits." },
  { id: "BME503-Q2", courseId: "BME503", question: "What does a pulse oximeter use to measure blood oxygen?", options: ["Electrodes", "Thermistors", "Photodetectors", "Strain gauges"], correctIndex: 2, explanation: "Pulse oximeters shine red and infrared light through tissue and use photodetectors to measure how much light is absorbed by oxygenated vs. deoxygenated haemoglobin." },
  { id: "BME503-Q3", courseId: "BME503", question: "The maximum safe leakage current for a medical instrument is:", options: ["10 mA", "1 mA", "100 µA", "10 µA"], correctIndex: 3, explanation: "IEC 60601 limits leakage current to 10 µA for patient-connected instruments to prevent microshock, which can cause cardiac fibrillation." },
  { id: "BME503-Q4", courseId: "BME503", question: "An ECG signal is typically in the range of:", options: ["1 V", "100 mV", "1 mV", "1 µV"], correctIndex: 2, explanation: "The ECG (electrocardiogram) signal from skin surface electrodes is approximately 1 mV (1 millivolt), requiring significant amplification for processing." },
  { id: "BME503-Q5", courseId: "BME503", question: "Signal conditioning in biomedical instruments includes:", options: ["Only amplification", "Only filtering", "Amplification, filtering, and isolation", "Only analog-to-digital conversion"], correctIndex: 2, explanation: "Signal conditioning involves amplifying weak bio-signals, filtering out noise and unwanted frequencies, and providing electrical isolation for patient safety." },
];

const STARTER_FLASHCARDS: Flashcard[] = [
  // ABE501
  { id: "ABE501-F1", courseId: "ABE501", front: "What are the four functions of management?", back: "Planning, Organising, Leading, and Controlling", interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString() },
  { id: "ABE501-F2", courseId: "ABE501", front: "What is a Work Breakdown Structure (WBS)?", back: "A hierarchical decomposition of a project into progressively smaller, manageable work packages", interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString() },
  { id: "ABE501-F3", courseId: "ABE501", front: "What does the Critical Path Method (CPM) determine?", back: "The longest sequence of dependent tasks, which gives the minimum possible project duration", interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString() },
  // BME505
  { id: "BME505-F1", courseId: "BME505", front: "What is the EPR effect?", back: "Enhanced Permeability and Retention — nanoparticles (20–200 nm) passively accumulate in tumours because tumour blood vessels have gaps of 100–800 nm", interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString() },
  { id: "BME505-F2", courseId: "BME505", front: "What are liposomes?", back: "Tiny spherical vesicles made of phospholipid bilayers, used to encapsulate and deliver drugs", interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString() },
  { id: "BME505-F3", courseId: "BME505", front: "What is the nanoscale range?", back: "1–100 nm (10⁻⁹ to 10⁻⁷ metres)", interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString() },
  // BME503
  { id: "BME503-F1", courseId: "BME503", front: "State Ohm's Law", back: "V = I × R (Voltage = Current × Resistance)", interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString() },
  { id: "BME503-F2", courseId: "BME503", front: "What is impedance?", back: "The total opposition to current flow in an AC circuit, including resistance plus capacitive and inductive effects. Measured in ohms (Ω).", interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString() },
  { id: "BME503-F3", courseId: "BME503", front: "What is the maximum safe leakage current for medical instruments (IEC 60601)?", back: "10 µA (microamperes)", interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: new Date().toISOString() },
];

/* ═══════════════════════════════════════════
   SM-2 SPACED REPETITION ENGINE
   ═══════════════════════════════════════════ */

function sm2(card: Flashcard, quality: number): Flashcard {
  // quality: 0-5 (0-2 = fail, 3 = hard, 4 = good, 5 = easy)
  let { interval, easeFactor, repetitions } = card;
  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions++;
  } else {
    repetitions = 0;
    interval = 1;
  }
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const next = new Date();
  next.setDate(next.getDate() + interval);
  return { ...card, interval, easeFactor, repetitions, nextReview: next.toISOString() };
}

function getDueCards(cards: Flashcard[]): Flashcard[] {
  const now = new Date().toISOString();
  return cards.filter(c => c.nextReview <= now);
}

/* ═══════════════════════════════════════════
   XP & GAMIFICATION ENGINE
   ═══════════════════════════════════════════ */

const XP_VALUES = { lessonComplete: 50, quizCorrect: 20, quizPerfect: 100, flashcardReview: 10, streakBonus: 25 };
const BADGES = [
  { id: "first-lesson", name: "First Steps", desc: "Complete your first lesson", icon: "\u{1F476}", check: (p: Progress) => p.lessonsCompleted.length >= 1 },
  { id: "five-lessons", name: "Scholar", desc: "Complete 5 lessons", icon: "\u{1F4DA}", check: (p: Progress) => p.lessonsCompleted.length >= 5 },
  { id: "ten-lessons", name: "Knowledge Seeker", desc: "Complete 10 lessons", icon: "\u{1F393}", check: (p: Progress) => p.lessonsCompleted.length >= 10 },
  { id: "first-quiz", name: "Quiz Taker", desc: "Complete your first quiz", icon: "\u{270D}\u{FE0F}", check: (p: Progress) => p.quizAttempts.length >= 1 },
  { id: "perfect-quiz", name: "Perfect Score", desc: "Get 100% on a quiz", icon: "\u{1F31F}", check: (p: Progress) => { const byQ: Record<string, boolean[]> = {}; p.quizAttempts.forEach(a => { if (!byQ[a.questionId]) byQ[a.questionId] = []; byQ[a.questionId].push(a.correct); }); return Object.values(byQ).some(arr => arr.length > 0 && arr[arr.length - 1]); } },
  { id: "streak-3", name: "On Fire", desc: "3-day study streak", icon: "\u{1F525}", check: (p: Progress) => p.streak >= 3 },
  { id: "streak-7", name: "Unstoppable", desc: "7-day study streak", icon: "\u{1F4AA}", check: (p: Progress) => p.streak >= 7 },
  { id: "xp-500", name: "Rising Star", desc: "Earn 500 XP", icon: "\u{2B50}", check: (p: Progress) => p.xp >= 500 },
  { id: "xp-2000", name: "Powerhouse", desc: "Earn 2000 XP", icon: "\u{1F4A5}", check: (p: Progress) => p.xp >= 2000 },
];

function calcLevel(xp: number): number {
  return Math.floor(xp / 200) + 1;
}

function xpForNextLevel(xp: number): { current: number; needed: number } {
  const level = calcLevel(xp);
  const base = (level - 1) * 200;
  return { current: xp - base, needed: 200 };
}

/* ═══════════════════════════════════════════
   TIMETABLE GENERATOR
   ═══════════════════════════════════════════ */

function generateTimetable(semester: "harmattan" | "rain"): { day: string; slots: { time: string; courseId: string; activity: string }[] }[] {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const semCourses = COURSES.filter(c => c.semester === semester);
  const slots: { day: string; time: string; courseId: string; activity: string }[][] = days.map(() => []);
  const times = ["08:00", "09:30", "11:00", "14:00", "15:30"];
  let slotIdx = 0;
  semCourses.forEach(course => {
    const sessionsPerWeek = Math.max(1, Math.min(3, course.credits));
    for (let s = 0; s < sessionsPerWeek; s++) {
      const dayIdx = slotIdx % days.length;
      const timeIdx = Math.floor(slotIdx / days.length) % times.length;
      slots[dayIdx].push({
        time: times[timeIdx],
        courseId: course.id,
        activity: s === 0 ? "Lesson + Notes" : s === 1 ? "Practice + Quiz" : "Review + Flashcards",
      });
      slotIdx++;
    }
  });
  return days.map((day, i) => ({ day, slots: slots[i].sort((a, b) => a.time.localeCompare(b.time)) }));
}

/* ═══════════════════════════════════════════
   LOCAL STORAGE HELPERS
   ═══════════════════════════════════════════ */

const STORAGE_KEYS = {
  progress: "sf_progress",
  flashcards: "sf_flashcards",
  uploads: "sf_uploads",
  customLessons: "sf_lessons",
  customQuizzes: "sf_quizzes",
};

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveJSON(key: string, data: unknown) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

const defaultProgress: Progress = {
  xp: 0, level: 1, streak: 0, lastStudyDate: "",
  lessonsCompleted: [], quizAttempts: [], badges: [], totalStudyMinutes: 0,
};

/* ═══════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════ */

export default function StudyForge() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [customLessons, setCustomLessons] = useState<Lesson[]>([]);
  const [customQuizzes, setCustomQuizzes] = useState<QuizQuestion[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [xpPopup, setXpPopup] = useState<number | null>(null);
  const [newBadge, setNewBadge] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setProgress(loadJSON(STORAGE_KEYS.progress, defaultProgress));
    setFlashcards(loadJSON(STORAGE_KEYS.flashcards, STARTER_FLASHCARDS));
    setUploads(loadJSON(STORAGE_KEYS.uploads, []));
    setCustomLessons(loadJSON(STORAGE_KEYS.customLessons, []));
    setCustomQuizzes(loadJSON(STORAGE_KEYS.customQuizzes, []));
    setLoaded(true);
  }, []);

  // Save to localStorage on changes
  useEffect(() => { if (loaded) saveJSON(STORAGE_KEYS.progress, progress); }, [progress, loaded]);
  useEffect(() => { if (loaded) saveJSON(STORAGE_KEYS.flashcards, flashcards); }, [flashcards, loaded]);
  useEffect(() => { if (loaded) saveJSON(STORAGE_KEYS.uploads, uploads); }, [uploads, loaded]);
  useEffect(() => { if (loaded) saveJSON(STORAGE_KEYS.customLessons, customLessons); }, [customLessons, loaded]);
  useEffect(() => { if (loaded) saveJSON(STORAGE_KEYS.customQuizzes, customQuizzes); }, [customQuizzes, loaded]);

  // Update streak on mount
  useEffect(() => {
    if (!loaded) return;
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    setProgress(p => {
      if (p.lastStudyDate === today) return p;
      if (p.lastStudyDate === yesterday) return p; // streak maintained
      if (p.lastStudyDate && p.lastStudyDate < yesterday) return { ...p, streak: 0 };
      return p;
    });
  }, [loaded]);

  const allLessons = useMemo(() => [...STARTER_LESSONS, ...customLessons], [customLessons]);
  const allQuizzes = useMemo(() => [...STARTER_QUIZZES, ...customQuizzes], [customQuizzes]);

  const addXP = useCallback((amount: number) => {
    setXpPopup(amount);
    setTimeout(() => setXpPopup(null), 1200);
    setProgress(p => {
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      let newStreak = p.streak;
      if (p.lastStudyDate !== today) {
        newStreak = (p.lastStudyDate === yesterday || p.lastStudyDate === today) ? p.streak + 1 : 1;
      }
      const newXP = p.xp + amount + (p.lastStudyDate !== today ? XP_VALUES.streakBonus : 0);
      const updated = { ...p, xp: newXP, level: calcLevel(newXP), streak: newStreak, lastStudyDate: today };
      // Check for new badges
      BADGES.forEach(b => {
        if (!updated.badges.includes(b.id) && b.check(updated)) {
          updated.badges = [...updated.badges, b.id];
          setNewBadge(b.name);
          setTimeout(() => setNewBadge(null), 3000);
        }
      });
      return updated;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    if (progress.lessonsCompleted.includes(lessonId)) return;
    setProgress(p => ({ ...p, lessonsCompleted: [...p.lessonsCompleted, lessonId] }));
    addXP(XP_VALUES.lessonComplete);
  }, [progress.lessonsCompleted, addXP]);

  const getLessonsForCourse = useCallback((courseId: string) => {
    return allLessons.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order);
  }, [allLessons]);

  const getQuizzesForCourse = useCallback((courseId: string) => {
    return allQuizzes.filter(q => q.courseId === courseId);
  }, [allQuizzes]);

  const uploadsForCourse = useCallback((courseId: string) => {
    return uploads.filter(u => u.courseId === courseId);
  }, [uploads]);

  if (!loaded) {
    return <div className="flex items-center justify-center min-h-screen bg-bg"><div className="text-accent text-xl">Loading StudyForge...</div></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg pb-20">
      {/* XP Popup */}
      {xpPopup !== null && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-accent text-white px-4 py-2 rounded-full font-bold text-lg anim-xp shadow-lg shadow-accent/30">
          +{xpPopup} XP
        </div>
      )}
      {/* Badge Popup */}
      {newBadge && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-bg-card border border-accent/50 text-white px-5 py-3 rounded-xl font-semibold anim-slide shadow-xl">
          \u{1F3C6} Badge Unlocked: {newBadge}!
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">StudyForge</h1>
          <p className="text-xs text-txt-muted">500L Biomedical Engineering</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold text-warn flex items-center gap-1">
            {progress.streak > 0 && <><span className="text-base">\u{1F525}</span>{progress.streak}d</>}
          </div>
          <div className="bg-bg-card px-3 py-1 rounded-full text-sm font-semibold text-accent">
            Lv.{progress.level} · {progress.xp} XP
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full">
        {tab === "dashboard" && <DashboardTab progress={progress} allLessons={allLessons} flashcards={flashcards} onNavigate={(t, c) => { setTab(t); if (c) setSelectedCourse(c); }} />}
        {tab === "courses" && !selectedCourse && <CoursesTab progress={progress} allLessons={allLessons} allQuizzes={allQuizzes} onSelect={(id) => { setSelectedCourse(id); setTab("study"); }} />}
        {tab === "courses" && selectedCourse && <CourseDetailTab courseId={selectedCourse} lessons={getLessonsForCourse(selectedCourse)} quizzes={getQuizzesForCourse(selectedCourse)} uploads={uploadsForCourse(selectedCourse)} progress={progress} onBack={() => setSelectedCourse(null)} onStudy={(id) => { setSelectedLesson(id); setTab("study"); }} onQuiz={() => setTab("quiz")} />}
        {tab === "study" && <StudyTab courseId={selectedCourse} lessonId={selectedLesson} allLessons={allLessons} progress={progress} onComplete={completeLesson} onBack={() => { setSelectedLesson(null); if (!selectedCourse) setTab("courses"); }} onSelectCourse={(id) => setSelectedCourse(id)} onSelectLesson={(id) => setSelectedLesson(id)} />}
        {tab === "quiz" && <QuizTab courseId={selectedCourse} allQuizzes={allQuizzes} flashcards={flashcards} progress={progress} onAnswer={(qId, correct) => { setProgress(p => ({ ...p, quizAttempts: [...p.quizAttempts, { questionId: qId, correct, date: new Date().toISOString() }] })); if (correct) addXP(XP_VALUES.quizCorrect); }} onFlashcardReview={(cardId, quality) => { setFlashcards(cards => cards.map(c => c.id === cardId ? sm2(c, quality) : c)); addXP(XP_VALUES.flashcardReview); }} onSelectCourse={(id) => setSelectedCourse(id)} onBack={() => { if (!selectedCourse) setTab("dashboard"); }} />}
        {tab === "upload" && <UploadTab uploads={uploads} onUpload={(u) => setUploads(prev => [...prev, u])} onSelectCourse={(id) => setSelectedCourse(id)} />}
        {tab === "timetable" && <TimetableTab />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg-card/90 backdrop-blur-md border-t border-white/5 flex justify-around py-2 px-1 safe-bottom">
        {([
          { key: "dashboard" as Tab, icon: "\u{1F3E0}", label: "Home" },
          { key: "courses" as Tab, icon: "\u{1F4DA}", label: "Courses" },
          { key: "study" as Tab, icon: "\u{1F4D6}", label: "Study" },
          { key: "quiz" as Tab, icon: "\u{1F9E9}", label: "Quiz" },
          { key: "upload" as Tab, icon: "\u{1F4E4}", label: "Upload" },
          { key: "timetable" as Tab, icon: "\u{1F4C5}", label: "Schedule" },
        ]).map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); if (t.key === "courses") setSelectedCourse(null); if (t.key === "study" && !selectedCourse) setSelectedCourse(null); }} className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${tab === t.key ? "text-accent" : "text-txt-dim hover:text-txt-muted"}`}>
            <span className="text-lg">{t.icon}</span>
            <span className="text-[10px] font-medium">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TAB COMPONENTS
   ═══════════════════════════════════════════ */

function DashboardTab({ progress, allLessons, flashcards, onNavigate }: { progress: Progress; allLessons: Lesson[]; flashcards: Flashcard[]; onNavigate: (tab: Tab, courseId?: string) => void }) {
  const { current, needed } = xpForNextLevel(progress.xp);
  const dueCards = getDueCards(flashcards);
  const completedCount = progress.lessonsCompleted.length;
  const totalLessons = allLessons.length;
  const harmattanCourses = COURSES.filter(c => c.semester === "harmattan");
  const earnedBadges = BADGES.filter(b => progress.badges.includes(b.id));

  return (
    <div className="space-y-4 anim-fade">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-accent/20 to-accent-dim/10 rounded-2xl p-5 border border-accent/20">
        <h2 className="text-xl font-bold text-white mb-1">Welcome back, Meshack</h2>
        <p className="text-sm text-txt-muted">500L B.Eng. Biomedical Engineering · 2026/2027</p>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-txt-muted mb-1">
            <span>Level {progress.level}</span>
            <span>{current}/{needed} XP</span>
          </div>
          <div className="h-2.5 bg-bg rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-500" style={{ width: `${(current / needed) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-bg-card rounded-xl p-3 text-center border border-white/5">
          <div className="text-2xl font-bold text-accent">{progress.xp}</div>
          <div className="text-xs text-txt-muted">Total XP</div>
        </div>
        <div className="bg-bg-card rounded-xl p-3 text-center border border-white/5">
          <div className="text-2xl font-bold text-warn">{progress.streak}</div>
          <div className="text-xs text-txt-muted">Day Streak</div>
        </div>
        <div className="bg-bg-card rounded-xl p-3 text-center border border-white/5">
          <div className="text-2xl font-bold text-success">{completedCount}</div>
          <div className="text-xs text-txt-muted">Lessons Done</div>
        </div>
      </div>

      {/* Due Flashcards */}
      {dueCards.length > 0 && (
        <button onClick={() => onNavigate("quiz")} className="w-full bg-warn/10 border border-warn/30 rounded-xl p-4 text-left hover:bg-warn/15 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-warn font-semibold">{dueCards.length} flashcard{dueCards.length !== 1 ? "s" : ""} due for review</div>
              <div className="text-xs text-txt-muted mt-0.5">Spaced repetition keeps knowledge in long-term memory</div>
            </div>
            <span className="text-2xl">\u{1F4AC}</span>
          </div>
        </button>
      )}

      {/* Quick Start */}
      <div>
        <h3 className="text-sm font-semibold text-txt-muted uppercase tracking-wider mb-2">Harmattan Semester</h3>
        <div className="space-y-2">
          {harmattanCourses.map(course => {
            const lessons = allLessons.filter(l => l.courseId === course.id);
            const completed = lessons.filter(l => progress.lessonsCompleted.includes(l.id)).length;
            const pct = lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0;
            return (
              <button key={course.id} onClick={() => onNavigate("study", course.id)} className="w-full bg-bg-card rounded-xl p-3.5 border border-white/5 flex items-center gap-3 hover:bg-bg-hover transition-colors text-left">
                <div className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: course.color + "20" }}>{course.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{course.id}: {course.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-bg rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: course.color }} />
                    </div>
                    <span className="text-xs text-txt-dim">{pct}%</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      {earnedBadges.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-txt-muted uppercase tracking-wider mb-2">Badges Earned</h3>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map(b => (
              <div key={b.id} className="bg-bg-card border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="text-lg">{b.icon}</span>
                <span className="text-xs font-medium text-txt">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CoursesTab({ progress, allLessons, allQuizzes, onSelect }: { progress: Progress; allLessons: Lesson[]; allQuizzes: QuizQuestion[]; onSelect: (id: string) => void }) {
  const [sem, setSem] = useState<"harmattan" | "rain">("harmattan");
  const filtered = COURSES.filter(c => c.semester === sem);

  return (
    <div className="space-y-4 anim-fade">
      <h2 className="text-xl font-bold text-white">Courses</h2>
      {/* Semester Toggle */}
      <div className="flex bg-bg-card rounded-xl p-1 border border-white/5">
        {(["harmattan", "rain"] as const).map(s => (
          <button key={s} onClick={() => setSem(s)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${sem === s ? "bg-accent text-white" : "text-txt-muted hover:text-white"}`}>
            {s === "harmattan" ? "Harmattan" : "Rain"} Semester
          </button>
        ))}
      </div>
      {/* Course Cards */}
      <div className="space-y-2">
        {filtered.map(course => {
          const lessons = allLessons.filter(l => l.courseId === course.id);
          const quizzes = allQuizzes.filter(q => q.courseId === course.id);
          const completed = lessons.filter(l => progress.lessonsCompleted.includes(l.id)).length;
          return (
            <button key={course.id} onClick={() => onSelect(course.id)} className="w-full bg-bg-card rounded-xl p-4 border border-white/5 hover:bg-bg-hover transition-colors text-left">
              <div className="flex items-start gap-3">
                <div className="text-2xl w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: course.color + "20" }}>{course.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-txt-dim">{course.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${course.status === "C" ? "bg-accent/20 text-accent-light" : course.status === "R" ? "bg-warn/20 text-warn" : "bg-success/20 text-success"}`}>
                      {course.status === "C" ? "Core" : course.status === "R" ? "Required" : "Elective"}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">{course.title}</div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-txt-dim">
                    <span>{course.credits} credits</span>
                    <span>{lessons.length} lesson{lessons.length !== 1 ? "s" : ""}</span>
                    <span>{quizzes.length} question{quizzes.length !== 1 ? "s" : ""}</span>
                  </div>
                  {lessons.length > 0 && (
                    <div className="mt-2 h-1.5 bg-bg rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(completed / lessons.length) * 100}%`, backgroundColor: course.color }} />
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="text-center text-xs text-txt-dim pt-2">
        {sem === "harmattan" ? "17" : "27"} credit units · {filtered.length} courses
      </div>
    </div>
  );
}

function CourseDetailTab({ courseId, lessons, quizzes, uploads, progress, onBack, onStudy, onQuiz }: {
  courseId: string; lessons: Lesson[]; quizzes: QuizQuestion[]; uploads: Upload[]; progress: Progress;
  onBack: () => void; onStudy: (lessonId: string) => void; onQuiz: () => void;
}) {
  const course = COURSES.find(c => c.id === courseId)!;
  const prereqs = lessons.filter(l => l.type === "prerequisite");
  const modules = lessons.filter(l => l.type === "module");

  return (
    <div className="space-y-4 anim-fade">
      <button onClick={onBack} className="text-sm text-accent flex items-center gap-1 hover:underline">← All Courses</button>
      <div className="flex items-center gap-3">
        <div className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: course.color + "20" }}>{course.icon}</div>
        <div>
          <div className="text-xs font-mono text-txt-dim">{course.id}</div>
          <h2 className="text-lg font-bold text-white">{course.title}</h2>
          <div className="text-xs text-txt-muted">{course.credits} credits · {course.status === "C" ? "Core" : course.status === "R" ? "Required" : "Elective"}</div>
        </div>
      </div>

      {/* Prerequisites */}
      {prereqs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-txt-muted uppercase tracking-wider mb-2">Prerequisites (Start Here)</h3>
          <div className="space-y-1.5">
            {prereqs.map(l => (
              <button key={l.id} onClick={() => onStudy(l.id)} className="w-full bg-bg-card rounded-lg p-3 border border-white/5 flex items-center gap-3 hover:bg-bg-hover transition-colors text-left">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${progress.lessonsCompleted.includes(l.id) ? "bg-success text-white" : "bg-bg border border-white/20 text-txt-dim"}`}>
                  {progress.lessonsCompleted.includes(l.id) ? "✓" : l.order + 1}
                </div>
                <span className="text-sm text-white">{l.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Module Lessons */}
      {modules.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-txt-muted uppercase tracking-wider mb-2">Course Material</h3>
          <div className="space-y-1.5">
            {modules.map(l => (
              <button key={l.id} onClick={() => onStudy(l.id)} className="w-full bg-bg-card rounded-lg p-3 border border-white/5 flex items-center gap-3 hover:bg-bg-hover transition-colors text-left">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${progress.lessonsCompleted.includes(l.id) ? "bg-success text-white" : "bg-bg border border-white/20 text-txt-dim"}`}>
                  {progress.lessonsCompleted.includes(l.id) ? "✓" : l.order + 1}
                </div>
                <span className="text-sm text-white">{l.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Button */}
      {quizzes.length > 0 && (
        <button onClick={onQuiz} className="w-full bg-accent/10 border border-accent/30 rounded-xl p-4 hover:bg-accent/15 transition-colors flex items-center justify-between">
          <div>
            <div className="text-accent font-semibold">Take Quiz</div>
            <div className="text-xs text-txt-muted">{quizzes.length} questions available</div>
          </div>
          <span className="text-2xl">\u{1F9E9}</span>
        </button>
      )}

      {/* Uploads */}
      <div>
        <h3 className="text-sm font-semibold text-txt-muted uppercase tracking-wider mb-2">Uploaded Materials</h3>
        {uploads.length === 0 ? (
          <div className="bg-bg-card rounded-xl p-4 border border-white/5 text-center text-sm text-txt-dim">No PDFs uploaded yet for this course</div>
        ) : (
          <div className="space-y-1.5">
            {uploads.map(u => (
              <div key={u.id} className="bg-bg-card rounded-lg p-3 border border-white/5 flex items-center gap-3">
                <span className="text-lg">\u{1F4C4}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{u.fileName}</div>
                  <div className="text-xs text-txt-dim">{new Date(u.uploadedAt).toLocaleDateString()}</div>
                </div>
                {u.contentGenerated && <span className="text-xs text-success">✓ Content generated</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {lessons.length === 0 && quizzes.length === 0 && (
        <div className="bg-bg-card rounded-xl p-6 border border-white/5 text-center">
          <div className="text-3xl mb-2">\u{1F4AD}</div>
          <div className="text-sm text-txt-muted">No content yet for this course. Upload your lecture PDFs, then ask Claude to generate lessons.</div>
        </div>
      )}
    </div>
  );
}

function StudyTab({ courseId, lessonId, allLessons, progress, onComplete, onBack, onSelectCourse, onSelectLesson }: {
  courseId: string | null; lessonId: string | null; allLessons: Lesson[]; progress: Progress;
  onComplete: (id: string) => void; onBack: () => void; onSelectCourse: (id: string) => void; onSelectLesson: (id: string) => void;
}) {
  // If no course selected, show course picker
  if (!courseId) {
    const coursesWithLessons = COURSES.filter(c => allLessons.some(l => l.courseId === c.id));
    return (
      <div className="space-y-4 anim-fade">
        <h2 className="text-xl font-bold text-white">Study</h2>
        <p className="text-sm text-txt-muted">Pick a course to start learning</p>
        <div className="space-y-2">
          {coursesWithLessons.map(c => (
            <button key={c.id} onClick={() => onSelectCourse(c.id)} className="w-full bg-bg-card rounded-xl p-4 border border-white/5 hover:bg-bg-hover transition-colors text-left flex items-center gap-3">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <div className="text-sm font-semibold text-white">{c.title}</div>
                <div className="text-xs text-txt-dim">{allLessons.filter(l => l.courseId === c.id).length} lessons</div>
              </div>
            </button>
          ))}
          {coursesWithLessons.length === 0 && (
            <div className="text-center text-txt-dim py-8">No lessons available yet. Upload PDFs and ask Claude to generate lessons.</div>
          )}
        </div>
      </div>
    );
  }

  const course = COURSES.find(c => c.id === courseId)!;
  const lessons = allLessons.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order);

  // If no lesson selected, show lesson list
  if (!lessonId) {
    return (
      <div className="space-y-4 anim-fade">
        <button onClick={onBack} className="text-sm text-accent flex items-center gap-1 hover:underline">← Back</button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{course.icon}</span>
          <h2 className="text-lg font-bold text-white">{course.title}</h2>
        </div>
        <div className="space-y-1.5">
          {lessons.map(l => (
            <button key={l.id} onClick={() => onSelectLesson(l.id)} className="w-full bg-bg-card rounded-lg p-3 border border-white/5 flex items-center gap-3 hover:bg-bg-hover transition-colors text-left">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${progress.lessonsCompleted.includes(l.id) ? "bg-success text-white" : "bg-bg border border-white/20 text-txt-dim"}`}>
                {progress.lessonsCompleted.includes(l.id) ? "✓" : l.order + 1}
              </div>
              <div>
                <div className="text-sm text-white">{l.title}</div>
                <div className="text-[10px] text-txt-dim uppercase">{l.type}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Show lesson content
  const lesson = allLessons.find(l => l.id === lessonId);
  if (!lesson) return <div className="text-txt-dim">Lesson not found</div>;
  const isComplete = progress.lessonsCompleted.includes(lesson.id);
  const lessonIdx = lessons.findIndex(l => l.id === lessonId);
  const nextLesson = lessons[lessonIdx + 1];

  return (
    <div className="space-y-4 anim-fade">
      <button onClick={() => onSelectLesson("")} className="text-sm text-accent flex items-center gap-1 hover:underline">← {course.title}</button>
      <div>
        <div className="text-[10px] uppercase text-txt-dim font-semibold tracking-wider">{lesson.type === "prerequisite" ? "Prerequisite" : "Module"} · Lesson {lesson.order + 1}</div>
        <h2 className="text-xl font-bold text-white mt-1">{lesson.title}</h2>
      </div>
      {/* Lesson content */}
      <div className="bg-bg-card rounded-xl p-5 border border-white/5 prose prose-invert prose-sm max-w-none
        [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-0 [&_h2]:mb-3
        [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-accent-light [&_h3]:mt-5 [&_h3]:mb-2
        [&_p]:text-txt [&_p]:leading-relaxed [&_p]:mb-3
        [&_ul]:space-y-1.5 [&_ul]:mb-3 [&_li]:text-txt [&_li]:leading-relaxed
        [&_ol]:space-y-1.5 [&_ol]:mb-3
        [&_strong]:text-white
        [&_em]:text-accent-light" dangerouslySetInnerHTML={{ __html: lesson.content }} />

      {/* Key terms */}
      {lesson.keyTerms.length > 0 && (
        <div className="bg-bg-card rounded-xl p-4 border border-accent/20">
          <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Key Terms</div>
          <div className="flex flex-wrap gap-1.5">
            {lesson.keyTerms.map(t => (
              <span key={t} className="bg-accent/10 text-accent-light text-xs px-2.5 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-bg-card rounded-xl p-4 border border-success/20">
        <div className="text-xs font-semibold text-success uppercase tracking-wider mb-1">Summary</div>
        <p className="text-sm text-txt leading-relaxed">{lesson.summary}</p>
      </div>

      {/* Complete Button */}
      <div className="flex gap-2">
        {!isComplete ? (
          <button onClick={() => onComplete(lesson.id)} className="flex-1 bg-accent hover:bg-accent-dim text-white font-semibold py-3 rounded-xl transition-colors">
            Mark as Complete (+{XP_VALUES.lessonComplete} XP)
          </button>
        ) : (
          <div className="flex-1 bg-success/10 text-success font-semibold py-3 rounded-xl text-center">✓ Completed</div>
        )}
        {nextLesson && (
          <button onClick={() => onSelectLesson(nextLesson.id)} className="bg-bg-card border border-white/10 text-white font-semibold py-3 px-4 rounded-xl hover:bg-bg-hover transition-colors">
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

function QuizTab({ courseId, allQuizzes, flashcards, progress, onAnswer, onFlashcardReview, onSelectCourse, onBack }: {
  courseId: string | null; allQuizzes: QuizQuestion[]; flashcards: Flashcard[]; progress: Progress;
  onAnswer: (qId: string, correct: boolean) => void; onFlashcardReview: (cardId: string, quality: number) => void;
  onSelectCourse: (id: string) => void; onBack: () => void;
}) {
  const [mode, setMode] = useState<"pick" | "quiz" | "flashcard" | "results">("pick");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const questions = courseId ? allQuizzes.filter(q => q.courseId === courseId) : allQuizzes;
  const dueCards = courseId ? getDueCards(flashcards).filter(c => c.courseId === courseId) : getDueCards(flashcards);

  if (mode === "pick") {
    return (
      <div className="space-y-4 anim-fade">
        <h2 className="text-xl font-bold text-white">Quiz & Flashcards</h2>

        {/* Course filter */}
        {!courseId && (
          <div>
            <div className="text-xs text-txt-dim mb-2">Filter by course (optional)</div>
            <div className="flex flex-wrap gap-1.5">
              {COURSES.filter(c => allQuizzes.some(q => q.courseId === c.id) || flashcards.some(f => f.courseId === c.id)).map(c => (
                <button key={c.id} onClick={() => onSelectCourse(c.id)} className="bg-bg-card border border-white/10 text-xs px-3 py-1.5 rounded-full text-txt-muted hover:text-white hover:border-accent/30 transition-colors">
                  {c.id}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quiz option */}
        {questions.length > 0 && (
          <button onClick={() => { setMode("quiz"); setCurrentQ(0); setScore(0); setSelected(null); setShowExplanation(false); }} className="w-full bg-bg-card rounded-xl p-5 border border-white/5 hover:bg-bg-hover transition-colors text-left">
            <div className="flex items-center gap-3">
              <span className="text-3xl">\u{1F9E9}</span>
              <div>
                <div className="text-white font-semibold">Multiple Choice Quiz</div>
                <div className="text-xs text-txt-muted">{questions.length} questions {courseId ? `for ${courseId}` : "across all courses"}</div>
              </div>
            </div>
          </button>
        )}

        {/* Flashcard option */}
        <button onClick={() => { setMode("flashcard"); setCurrentCard(0); setFlipped(false); }} className={`w-full rounded-xl p-5 border text-left transition-colors ${dueCards.length > 0 ? "bg-warn/10 border-warn/30 hover:bg-warn/15" : "bg-bg-card border-white/5 hover:bg-bg-hover"}`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">\u{1F4AC}</span>
            <div>
              <div className="text-white font-semibold">Flashcards</div>
              <div className="text-xs text-txt-muted">
                {dueCards.length > 0 ? `${dueCards.length} cards due for review` : `${(courseId ? flashcards.filter(f => f.courseId === courseId) : flashcards).length} total cards`}
              </div>
            </div>
          </div>
        </button>

        {questions.length === 0 && flashcards.length === 0 && (
          <div className="text-center py-8 text-txt-dim text-sm">No quizzes or flashcards available. Upload PDFs and ask Claude to generate them.</div>
        )}
      </div>
    );
  }

  if (mode === "quiz") {
    if (currentQ >= questions.length) {
      const pct = Math.round((score / questions.length) * 100);
      return (
        <div className="space-y-4 anim-slide text-center py-8">
          <div className="text-5xl">{pct >= 80 ? "\u{1F31F}" : pct >= 50 ? "\u{1F44D}" : "\u{1F4AA}"}</div>
          <h2 className="text-2xl font-bold text-white">Quiz Complete!</h2>
          <div className="text-4xl font-bold" style={{ color: pct >= 80 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444" }}>{pct}%</div>
          <p className="text-txt-muted">{score} of {questions.length} correct</p>
          <div className="flex gap-2 justify-center pt-4">
            <button onClick={() => { setMode("quiz"); setCurrentQ(0); setScore(0); setSelected(null); setShowExplanation(false); }} className="bg-accent text-white px-6 py-2.5 rounded-xl font-semibold">Retry</button>
            <button onClick={() => setMode("pick")} className="bg-bg-card border border-white/10 text-white px-6 py-2.5 rounded-xl font-semibold">Back</button>
          </div>
        </div>
      );
    }

    const q = questions[currentQ];
    return (
      <div className="space-y-4 anim-fade">
        <div className="flex items-center justify-between">
          <button onClick={() => setMode("pick")} className="text-sm text-accent">← Back</button>
          <span className="text-sm text-txt-dim">{currentQ + 1} / {questions.length}</span>
        </div>
        <div className="h-1.5 bg-bg-card rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
        <div className="bg-bg-card rounded-xl p-5 border border-white/5">
          <p className="text-white font-semibold text-base leading-relaxed">{q.question}</p>
        </div>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let style = "bg-bg-card border-white/5 hover:bg-bg-hover text-white";
            if (selected !== null) {
              if (i === q.correctIndex) style = "bg-success/15 border-success/40 text-success";
              else if (i === selected && i !== q.correctIndex) style = "bg-danger/15 border-danger/40 text-danger";
              else style = "bg-bg-card border-white/5 text-txt-dim opacity-50";
            }
            return (
              <button key={i} disabled={selected !== null} onClick={() => {
                setSelected(i);
                setShowExplanation(true);
                const correct = i === q.correctIndex;
                if (correct) setScore(s => s + 1);
                onAnswer(q.id, correct);
              }} className={`w-full rounded-xl p-3.5 border text-left transition-all text-sm font-medium ${style}`}>
                <span className="inline-block w-6 text-txt-dim">{String.fromCharCode(65 + i)}.</span> {opt}
              </button>
            );
          })}
        </div>
        {showExplanation && (
          <div className="bg-bg-card rounded-xl p-4 border border-accent/20 anim-slide">
            <div className="text-xs font-semibold text-accent uppercase mb-1">Explanation</div>
            <p className="text-sm text-txt leading-relaxed">{q.explanation}</p>
          </div>
        )}
        {selected !== null && (
          <button onClick={() => { setCurrentQ(cq => cq + 1); setSelected(null); setShowExplanation(false); }} className="w-full bg-accent text-white py-3 rounded-xl font-semibold">
            {currentQ + 1 < questions.length ? "Next Question" : "See Results"}
          </button>
        )}
      </div>
    );
  }

  if (mode === "flashcard") {
    const cards = dueCards.length > 0 ? dueCards : (courseId ? flashcards.filter(f => f.courseId === courseId) : flashcards);
    if (cards.length === 0) {
      return (
        <div className="text-center py-12 space-y-3">
          <div className="text-4xl">✅</div>
          <h3 className="text-lg font-bold text-white">All caught up!</h3>
          <p className="text-sm text-txt-muted">No flashcards due right now. Come back later.</p>
          <button onClick={() => setMode("pick")} className="bg-accent text-white px-6 py-2.5 rounded-xl font-semibold mt-4">Back</button>
        </div>
      );
    }
    if (currentCard >= cards.length) {
      return (
        <div className="text-center py-12 space-y-3 anim-slide">
          <div className="text-4xl">\u{1F389}</div>
          <h3 className="text-lg font-bold text-white">Review Complete!</h3>
          <p className="text-sm text-txt-muted">You reviewed {cards.length} card{cards.length !== 1 ? "s" : ""}</p>
          <button onClick={() => setMode("pick")} className="bg-accent text-white px-6 py-2.5 rounded-xl font-semibold mt-4">Done</button>
        </div>
      );
    }

    const card = cards[currentCard];
    const course = COURSES.find(c => c.id === card.courseId);

    return (
      <div className="space-y-4 anim-fade">
        <div className="flex items-center justify-between">
          <button onClick={() => setMode("pick")} className="text-sm text-accent">← Back</button>
          <span className="text-sm text-txt-dim">{currentCard + 1} / {cards.length}</span>
        </div>
        <div className="text-xs text-txt-dim text-center">{course?.id}: {course?.title}</div>
        <button onClick={() => setFlipped(!flipped)} className="w-full min-h-[200px] bg-bg-card rounded-2xl p-6 border border-white/10 flex items-center justify-center hover:border-accent/30 transition-all cursor-pointer">
          <div className={flipped ? "anim-flip" : ""}>
            <div className="text-[10px] uppercase text-txt-dim mb-2 font-semibold">{flipped ? "Answer" : "Question"}</div>
            <p className="text-lg text-white font-medium text-center leading-relaxed">{flipped ? card.back : card.front}</p>
          </div>
        </button>
        {!flipped && <p className="text-center text-xs text-txt-dim">Tap to reveal answer</p>}
        {flipped && (
          <div className="space-y-2 anim-slide">
            <p className="text-center text-xs text-txt-dim mb-1">How well did you know this?</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { q: 1, label: "Again", color: "bg-danger/15 border-danger/30 text-danger" },
                { q: 3, label: "Hard", color: "bg-warn/15 border-warn/30 text-warn" },
                { q: 5, label: "Easy", color: "bg-success/15 border-success/30 text-success" },
              ].map(({ q, label, color }) => (
                <button key={q} onClick={() => { onFlashcardReview(card.id, q); setCurrentCard(cc => cc + 1); setFlipped(false); }} className={`py-3 rounded-xl font-semibold border text-sm ${color}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function UploadTab({ uploads, onUpload, onSelectCourse }: { uploads: Upload[]; onUpload: (u: Upload) => void; onSelectCourse: (id: string) => void }) {
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0].id);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError("");
    setSuccess("");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

    if (!cloudName || !preset) {
      setError("Cloudinary not configured. Copy .env.local.example to .env.local and add your Cloudinary credentials.");
      return;
    }

    setUploading(true);
    let uploaded = 0;

    for (const file of Array.from(files)) {
      if (file.type !== "application/pdf") {
        setError(`${file.name} is not a PDF. Only PDFs are supported.`);
        continue;
      }
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);
        formData.append("folder", `studyforge/${selectedCourseId}`);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();

        onUpload({
          id: data.public_id || crypto.randomUUID(),
          courseId: selectedCourseId,
          fileName: file.name,
          url: data.secure_url,
          uploadedAt: new Date().toISOString(),
          contentGenerated: false,
        });
        uploaded++;
      } catch (e) {
        setError(`Failed to upload ${file.name}. Check your Cloudinary config.`);
      }
    }

    setUploading(false);
    if (uploaded > 0) setSuccess(`${uploaded} file${uploaded !== 1 ? "s" : ""} uploaded to ${selectedCourseId}`);
  };

  return (
    <div className="space-y-4 anim-fade">
      <h2 className="text-xl font-bold text-white">Upload Materials</h2>
      <p className="text-sm text-txt-muted">Upload your lecture PDFs. They go to Cloudinary, and you ask Claude to generate lessons from them.</p>

      {/* Course selector */}
      <div>
        <label className="text-xs text-txt-dim font-semibold uppercase tracking-wider block mb-1.5">Course</label>
        <select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)} className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/50 appearance-none">
          {COURSES.map(c => (
            <option key={c.id} value={c.id}>{c.id}: {c.title}</option>
          ))}
        </select>
      </div>

      {/* Upload zone */}
      <label className={`block w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${uploading ? "border-accent/50 bg-accent/5" : "border-white/10 hover:border-accent/30 hover:bg-bg-card"}`}>
        <input type="file" accept="application/pdf" multiple className="hidden" onChange={e => handleFiles(e.target.files)} disabled={uploading} />
        {uploading ? (
          <>
            <div className="text-3xl mb-2 animate-spin">\u{23F3}</div>
            <div className="text-sm text-accent">Uploading...</div>
          </>
        ) : (
          <>
            <div className="text-3xl mb-2">\u{1F4E4}</div>
            <div className="text-sm text-white font-semibold">Tap to select PDFs</div>
            <div className="text-xs text-txt-dim mt-1">Multiple files supported</div>
          </>
        )}
      </label>

      {error && <div className="bg-danger/10 border border-danger/30 rounded-xl p-3 text-sm text-danger">{error}</div>}
      {success && <div className="bg-success/10 border border-success/30 rounded-xl p-3 text-sm text-success">{success}</div>}

      {/* Upload history */}
      {uploads.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-txt-muted uppercase tracking-wider mb-2">Upload History</h3>
          <div className="space-y-1.5">
            {[...uploads].reverse().map(u => {
              const course = COURSES.find(c => c.id === u.courseId);
              return (
                <div key={u.id} className="bg-bg-card rounded-lg p-3 border border-white/5 flex items-center gap-3">
                  <span className="text-lg">\u{1F4C4}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">{u.fileName}</div>
                    <div className="text-xs text-txt-dim">{course?.id} · {new Date(u.uploadedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-bg-card rounded-xl p-4 border border-accent/20">
        <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">How it works</div>
        <ol className="text-sm text-txt space-y-1.5 list-decimal list-inside">
          <li>Upload your lecture PDFs here</li>
          <li>Open a Claude chat on claude.ai</li>
          <li>Attach the same PDFs and say: &quot;Generate StudyForge lessons for {selectedCourseId}&quot;</li>
          <li>Claude gives you a content file to import</li>
        </ol>
      </div>
    </div>
  );
}

function TimetableTab() {
  const [sem, setSem] = useState<"harmattan" | "rain">("harmattan");
  const timetable = useMemo(() => generateTimetable(sem), [sem]);

  return (
    <div className="space-y-4 anim-fade">
      <h2 className="text-xl font-bold text-white">Study Timetable</h2>
      <p className="text-sm text-txt-muted">Auto-generated based on credit weight</p>

      <div className="flex bg-bg-card rounded-xl p-1 border border-white/5">
        {(["harmattan", "rain"] as const).map(s => (
          <button key={s} onClick={() => setSem(s)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${sem === s ? "bg-accent text-white" : "text-txt-muted hover:text-white"}`}>
            {s === "harmattan" ? "Harmattan" : "Rain"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {timetable.map(day => (
          <div key={day.day} className="bg-bg-card rounded-xl border border-white/5 overflow-hidden">
            <div className="bg-bg-hover px-4 py-2 border-b border-white/5">
              <span className="text-sm font-semibold text-white">{day.day}</span>
            </div>
            {day.slots.length === 0 ? (
              <div className="px-4 py-3 text-sm text-txt-dim">Rest day</div>
            ) : (
              <div className="divide-y divide-white/5">
                {day.slots.map((slot, i) => {
                  const course = COURSES.find(c => c.id === slot.courseId);
                  return (
                    <div key={i} className="px-4 py-2.5 flex items-center gap-3">
                      <span className="text-xs font-mono text-txt-dim w-12">{slot.time}</span>
                      <div className="w-1 h-8 rounded-full" style={{ backgroundColor: course?.color || "#6366f1" }} />
                      <div>
                        <div className="text-sm text-white font-medium">{course?.id}</div>
                        <div className="text-xs text-txt-dim">{slot.activity}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
