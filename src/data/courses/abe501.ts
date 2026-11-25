import { buildCourse } from "../build";

/* ABE 501 Engineering Management. Built from: course ware (Olaoye & Akande), Lecture Series 1,
   Engineering Management Lecture Notes 2, Production Management, Industrial Safety, CBT question bank. */

export default buildCourse("ABE501", [
  ["What Management Really Is", "prerequisite",
    `<h2>Management in one sentence</h2>
<p>Your course notes define <strong>management</strong> as the process of designing and maintaining an environment in which people, working together in groups, efficiently accomplish selected aims.</p>
<p>A few things follow from that definition:</p>
<ul>
<li>It applies to <strong>every kind of organization</strong>: a factory, a hospital, a university, a church.</li>
<li>It applies at <strong>every level</strong>, from the board to the supervisor.</li>
<li>The aim of every manager is the same: to <strong>create a surplus</strong>. In a business that surplus is profit; in a university it is knowledge and service.</li>
</ul>
<h3>Engineering management</h3>
<p>Engineering management is the fusion of engineering and business. It combines the technical problem-solving of engineering with the planning and organizing abilities of management, to oversee complex work from conception to completion. Management, simply put, is <em>getting things done through others</em>, and it needs five things: an objective, resources, methods, an organizational setting and people.</p>
<h3>Science or art?</h3>
<p>Both. Managing as a <strong>practice</strong> is an art (know-how applied to real situations). The <strong>organized knowledge</strong> behind it is a science. They complement each other.</p>`,
    ["management", "surplus", "engineering management", "science and art"],
    "Management is designing an environment where groups efficiently achieve aims. It applies to all organizations and levels, aims to create a surplus, and is both an art (practice) and a science (knowledge)."],

  ["The Five Functions of a Manager", "prerequisite",
    `<h2>Planning, Organizing, Staffing, Leading, Controlling</h2>
<p>The framework in your notes (Koontz and O'Donnell) groups all management knowledge into <strong>five functions</strong>:</p>
<ol>
<li><strong>Planning</strong>: choosing objectives and the actions to reach them. No real plan exists until a decision commits resources.</li>
<li><strong>Organizing</strong>: creating an intentional structure of roles so every task is assigned to someone who can do it.</li>
<li><strong>Staffing</strong>: filling and keeping filled the positions: recruiting, selecting, training, appraising, paying.</li>
<li><strong>Leading (directing)</strong>: influencing people to contribute to goals, through motivation, leadership style and communication.</li>
<li><strong>Controlling</strong>: measuring performance against plans and correcting deviations.</li>
</ol>
<p><strong>Coordination</strong> is not a separate function. It is the <em>essence</em> of managing: harmonizing individual efforts towards group goals.</p>
<h3>Other classic lists you should know</h3>
<ul>
<li><strong>Henri Fayol</strong>: forecast and plan, organize, command, coordinate, control.</li>
<li><strong>Luther Gulick's POSDCORB</strong>: Planning, Organizing, Staffing, Directing, Co-ordinating, Reporting, Budgeting.</li>
</ul>
<h3>The four steps of control</h3>
<p>Set standards, measure actual performance, compare and find deviations, take corrective action.</p>`,
    ["planning", "organizing", "staffing", "leading", "controlling", "coordination", "POSDCORB"],
    "The five functions are planning, organizing, staffing, leading and controlling. Coordination is the essence of all of them. Know Fayol's list and Gulick's POSDCORB too."],

  ["Levels, Skills and Types of Managers", "module",
    `<h2>Three levels of management</h2>
<ul>
<li><strong>Top level</strong> (board, CEO, president): long-range strategic planning, policy, approving capital budgets.</li>
<li><strong>Middle level</strong> (general, branch and department managers): turn top-level decisions into action; tactical planning.</li>
<li><strong>Lower level</strong> (supervisors, foremen): direct the workers on the floor day to day.</li>
</ul>
<h3>Three managerial skills</h3>
<ul>
<li><strong>Conceptual</strong>: seeing the whole organization as a system. Most important at the top.</li>
<li><strong>Human relations</strong>: working with and motivating people. Important at every level.</li>
<li><strong>Technical</strong>: knowing the methods your staff use. Most important at supervisory level.</li>
</ul>
<p>Top managers spend more time planning and organizing; first-line supervisors spend more time leading.</p>
<h3>Types of managers (Duft, 1989)</h3>
<p>Your notes describe managers by their habits: the <strong>Silent</strong> type (waits for the majority), <strong>Keep-it-Simple</strong> (ignores long-term effects), <strong>Historically Minded</strong> (does it the way it was always done), <strong>One Track</strong> (blames everything on one cause), <strong>Lion-Hearted</strong> (talks a lot, decides little), <strong>Perfectionist</strong>, <strong>Horn of the Dilemma</strong> (all or nothing), <strong>Railroad</strong> (obsessed with time and machines) and <strong>Autocratic</strong>.</p>`,
    ["top management", "middle management", "conceptual skill", "technical skill", "human relations"],
    "Top, middle and lower management differ in focus. Conceptual skill matters most at the top, technical skill at supervisory level, and human skill everywhere."],

  ["Planning: Types of Plans and Forecasting", "module",
    `<h2>Three levels of plans</h2>
<ul>
<li><strong>Strategic plans</strong>: top management, long-range (2 to 10 years), the overall direction.</li>
<li><strong>Tactical (intermediate) plans</strong>: middle management, about a year, implementing strategy.</li>
<li><strong>Operational plans</strong>: lower management, very short term (a day, week or month), specific tasks.</li>
</ul>
<h3>Standing vs single-use plans</h3>
<ul>
<li><strong>Standing plans</strong> are used again and again: <strong>policies</strong> (broad guidelines), <strong>procedures</strong> (exact series of steps) and <strong>rules</strong> (require or forbid an action).</li>
<li><strong>Single-use plans</strong> are for one-off situations: <strong>programs</strong> (coordinate a large set of activities), <strong>projects</strong> (smaller, often supporting a program) and <strong>budgets</strong> (projected spending and where the money comes from).</li>
</ul>
<h3>Forecasting</h3>
<p>Forecasting predicts what will happen to the company in future. Sales forecasting decides how much to produce.</p>
<ul>
<li><strong>Short-term</strong>: 3 to 12 months, for products whose demand changes monthly.</li>
<li><strong>Long-term</strong>: 5 to 20 years, for heavy industries like refineries and assembly plants.</li>
</ul>
<p>Four methods: <strong>polling of salesmen</strong>, <strong>survey of buyers</strong>, <strong>economic indicators</strong>, and <strong>statistical methods</strong> such as regression. A good method is fairly accurate, simple and cost-conscious.</p>`,
    ["strategic plan", "tactical plan", "operational plan", "policy", "procedure", "forecasting"],
    "Strategic plans are top-level and long-range, tactical plans are middle-level, operational plans are short and specific. Standing plans repeat; single-use plans don't. Forecasts are short-term (3 to 12 months) or long-term (5 to 20 years)."],

  ["Organizing: Structure, Authority and Span of Control", "module",
    `<h2>Organizing the work</h2>
<p>Organizing means identifying activities, grouping them, assigning duties, <strong>delegating authority</strong> and coordinating the relationships.</p>
<h3>Organizational structures</h3>
<ul>
<li><strong>Functional</strong>: grouped by specialty (engineering, marketing). Efficient use of specialists, but slow and weak on customers.</li>
<li><strong>Divisional (product)</strong>: each division has all the functions it needs for one product or region.</li>
<li><strong>Matrix</strong>: employees report to both a functional manager and a project manager. Balances resources well, but creates the <strong>"dual boss"</strong> problem.</li>
<li><strong>Projectized</strong>: a project manager has full authority and budget.</li>
<li>Also: flat, team, network and virtual structures.</li>
</ul>
<h3>Three kinds of authority</h3>
<ul>
<li><strong>Line authority</strong>: a manager's right to tell subordinates what to do.</li>
<li><strong>Staff authority</strong>: a specialist's right to <em>advise</em> a superior.</li>
<li><strong>Functional authority</strong>: a specialist's right to oversee people in their specialty, wherever they sit.</li>
</ul>
<h3>Fayol's key principles</h3>
<p><strong>Division of work</strong>, <strong>authority with responsibility</strong>, <strong>unity of command</strong> (one boss per worker), <strong>unity of direction</strong>, <strong>scalar chain</strong> (the chain of authority from top to bottom), equity, stability of tenure, initiative and <strong>esprit de corps</strong> (team spirit).</p>
<p><strong>Span of control</strong> is the number of subordinates a manager directly supervises. <strong>Departmentalization</strong> is splitting the organization into subunits.</p>`,
    ["matrix", "line authority", "staff authority", "unity of command", "span of control", "departmentalization"],
    "Structures include functional, divisional, matrix (dual boss) and projectized. Line authority commands, staff authority advises, and functional authority oversees a specialty. Fayol's principles include unity of command and the scalar chain."],

  ["Leading: Leadership, Power and Motivation", "module",
    `<h2>Leadership styles</h2>
<ul>
<li><strong>Autocratic</strong>: the leader decides alone. Fast, useful in emergencies.</li>
<li><strong>Democratic (participative)</strong>: decisions are shared with the group.</li>
<li><strong>Laissez-faire (free-rein)</strong>: the group is left to decide its own methods.</li>
</ul>
<p>Blake and Mouton's <strong>managerial grid</strong> (1964) rates leaders on concern for people versus concern for results.</p>
<h3>Sources of power</h3>
<ul>
<li><strong>Legitimate</strong>: from your position.</li>
<li><strong>Reward</strong>: you can give rewards.</li>
<li><strong>Coercive</strong>: compliance through threats or punishment.</li>
<li><strong>Referent</strong>: people want to be identified with you.</li>
</ul>
<h3>Motivation</h3>
<p>Motivation activates, sustains and directs behaviour towards a goal. Theories to know: <strong>Maslow's hierarchy of needs</strong> (physiological needs such as food and rest come first, self-actualization last), <strong>Herzberg's two-factor theory</strong> and <strong>expectancy theory</strong>.</p>
<h3>Mintzberg's ten managerial roles</h3>
<p>Grouped into <strong>interpersonal</strong> (figurehead, leader, liaison), <strong>informational</strong> (recipient/monitor, disseminator, spokesperson) and <strong>decisional</strong> (entrepreneur, disturbance handler, resource allocator, negotiator).</p>`,
    ["autocratic", "democratic", "laissez faire", "referent power", "Maslow", "Mintzberg"],
    "Leadership styles are autocratic, democratic and laissez-faire. Power can be legitimate, reward, coercive or referent. Know Maslow, Herzberg and Mintzberg's ten roles in three groups."],

  ["Productivity and Production Management", "module",
    `<h2>Productivity</h2>
<p><strong>Productivity = Output / Input</strong>, within a time period and with due regard for quality. You raise it by increasing output, reducing input, or both.</p>
<ul>
<li><strong>Effectiveness</strong> is achieving the objective (finishing the job in the 20 days allowed).</li>
<li><strong>Efficiency</strong> is achieving it with the least resources (same output with less labour and material).</li>
<li><strong>Partial productivity</strong> uses one input (labour, capital, material, energy). <strong>Total productivity</strong> uses all tangible inputs.</li>
</ul>
<h3>Production management</h3>
<p>Planning and regulating the part of the enterprise that transforms materials into finished products. Its <strong>5 Ps</strong>: Products, Plant, Process, Programs, People. Its objectives: right quality, right quantity, predetermined time, pre-established cost.</p>
<h3>Five types of production</h3>
<ul>
<li><strong>Jobbing</strong>: one-offs to customer specification (tailor, repair shop).</li>
<li><strong>Batch</strong>: limited quantities at intervals (paint, chemicals).</li>
<li><strong>Mass and flow</strong>: continuous standard products (car assembly).</li>
<li><strong>Process</strong>: a single product continuously (cement, sugar, steel).</li>
<li><strong>Project</strong>: complex one-time work in sequence (roads, buildings).</li>
</ul>
<p>Production Planning and Control (PPC) functions include routing, estimating, <strong>scheduling</strong>, dispatching, expediting and inspection.</p>`,
    ["productivity", "effectiveness", "efficiency", "batch production", "mass production", "scheduling"],
    "Productivity is output divided by input. Effectiveness means meeting objectives; efficiency means using the least resources. Know the 5 Ps and the five production types: jobbing, batch, mass/flow, process and project."],

  ["Project Tools and Industrial Safety", "module",
    `<h2>Project planning tools</h2>
<p>A project manager must finish on time, within budget, meet requirements, keep customers happy and keep the team happy.</p>
<ul>
<li><strong>Gantt chart</strong>: a bar chart of tasks against time.</li>
<li><strong>CPM (Critical Path Method)</strong>: uses <em>one</em> time estimate per activity. The critical path is the longest chain of dependent tasks, and it sets the project duration.</li>
<li><strong>PERT (Program Evaluation and Review Technique)</strong>: uses <em>three</em> time estimates per activity (optimistic, most likely, pessimistic).</li>
</ul>
<p>Risk can be avoided, reduced, absorbed (for example with extra schedule time) or <strong>shared</strong> (for example by buying insurance).</p>
<h3>Industrial safety vocabulary</h3>
<ul>
<li><strong>Hazard</strong>: anything with the potential to cause harm.</li>
<li><strong>Risk</strong>: the likelihood that the harm will actually happen.</li>
<li><strong>Accident</strong>: an undesired event causing injury, ill health or damage.</li>
<li><strong>Incident</strong>: an undesired event, including a <em>near miss</em>, that could cause an accident.</li>
<li><strong>Safety</strong>: the control of accidental loss.</li>
</ul>
<p>Three reasons to prevent accidents: <strong>moral</strong> (no one comes to work to be hurt), <strong>cost</strong> (Piper Alpha killed 167 people and cost over £2 billion) and <strong>legal</strong> duty. In quarries, vehicles cause the largest share of fatal accidents (41%).</p>`,
    ["Gantt chart", "critical path", "PERT", "hazard", "risk", "near miss"],
    "CPM uses one time estimate per activity, PERT uses three. A hazard is potential harm; risk is the likelihood of that harm. Prevent accidents for moral, cost and legal reasons."],
], [
  ["According to the course notes, management is:", ["An art only", "A science only", "Both a science and an art", "Neither"], 2, "Managing as practice is an art; the organized knowledge behind it is a science.", 1],
  ["Which management function anticipates problems and decides future actions to reach goals?", ["Planning", "Leading", "Controlling", "Organizing"], 0, "Planning chooses objectives and the actions to achieve them.", 2],
  ["Establishing relationships between people and resources so they focus on company goals is:", ["Planning", "Leading", "Controlling", "Organizing"], 3, "Organizing creates an intentional structure of roles.", 2],
  ["Selecting candidates and training personnel belongs to which function?", ["Organizing", "Staffing", "Motivating", "Controlling"], 1, "Staffing fills and keeps filled the positions in the structure.", 2],
  ["Checking for deviation from the plan and taking corrective action is:", ["Organizing", "Planning", "Controlling", "Staffing"], 2, "Controlling measures performance and corrects deviations.", 2],
  ["In Gulick's POSDCORB, what does the 'B' stand for?", ["Benchmarking", "Budgeting", "Bargaining", "Briefing"], 1, "POSDCORB: Planning, Organizing, Staffing, Directing, Co-ordinating, Reporting, Budgeting.", 2],
  ["The notes describe coordination as:", ["A sixth separate function", "The essence of managership", "A staff function", "Part of staffing only"], 1, "Coordination harmonizes individual efforts and is the purpose of every function.", 2],
  ["Which skill matters most for top-level managers?", ["Technical", "Conceptual", "Clerical", "Manual"], 1, "Top managers need to see the whole organization as a system.", 3],
  ["Which skill matters most at supervisory level?", ["Technical", "Conceptual", "Political", "Financial"], 0, "Supervisors deal directly with work methods on the floor.", 3],
  ["Strategic planning is undertaken by:", ["Lower management", "Middle management", "Top management", "Workers"], 2, "Strategic plans set long-range direction and come from the top.", 4],
  ["Middle management mainly undertakes:", ["Intermediate (tactical) planning", "Strategic planning", "Operational planning", "No planning"], 0, "Middle managers implement strategy through tactical plans.", 4],
  ["Plans that are used again and again for recurring situations are:", ["Single-use plans", "Standing plans", "Short-range plans", "Budgets"], 1, "Policies, procedures and rules are standing plans.", 4],
  ["Statements that either require or forbid a certain action are:", ["Policies", "Procedures", "Rules", "Programs"], 2, "Rules leave no discretion.", 4],
  ["Short-term forecasting usually covers:", ["1 to 2 weeks", "3 to 12 months", "5 to 20 years", "50 years"], 1, "Short-term forecasts cover three to twelve months.", 4],
  ["Which structure can lead to a 'dual boss' problem?", ["Functional", "Matrix", "Process", "Product"], 1, "In a matrix, staff report to both a functional and a project manager.", 5],
  ["A consultant giving advice to his superior is using:", ["Line authority", "Staff authority", "Functional authority", "Top authority"], 1, "Staff authority is the right to advise.", 5],
  ["A manager's right to tell subordinates what to do is:", ["Line authority", "Staff authority", "Functional authority", "Referent power"], 0, "Line authority is direct command.", 5],
  ["Fayol's principle that each worker should receive orders from only one manager is:", ["Unity of direction", "Unity of command", "Scalar chain", "Centralization"], 1, "Unity of command means one boss per worker.", 5],
  ["Splitting an organization into subunits to improve efficiency is called:", ["Division of labour", "Segmentation", "Departmentalization", "Delegation"], 2, "Departmentalization groups related jobs into units.", 5],
  ["A committee created for a short-term purpose is:", ["Standing committee", "Ad hoc committee", "Board committee", "Permanent committee"], 1, "Ad hoc committees have a limited life.", 5],
  ["Compliance gained because people want to be identified with the leader is:", ["Legitimate power", "Referent power", "Coercive power", "Reward power"], 1, "Referent power comes from admiration and identification.", 6],
  ["Compliance gained through threats or punishment is:", ["Legitimate power", "Referent power", "Coercive power", "Reward power"], 2, "Coercive power relies on punishment.", 6],
  ["An employee's need for food, drink and rest is a:", ["Physiological need", "Security need", "Esteem need", "Self-actualization need"], 0, "Physiological needs sit at the base of Maslow's hierarchy.", 6],
  ["Mintzberg grouped his ten managerial roles into:", ["Two groups", "Three groups: interpersonal, informational, decisional", "Five functions", "Four Ps"], 1, "Interpersonal, informational and decisional roles.", 6],
  ["An engineer who finishes a 20-day job within 20 days is said to be:", ["Efficient", "Effective", "Productive", "Qualified"], 1, "Effectiveness means achieving the objective.", 7],
  ["Producing the same output with less labour and material makes an engineer more:", ["Effective", "Economical only", "Efficient", "Popular"], 2, "Efficiency means achieving ends with the least resources.", 7],
  ["Productivity is defined as:", ["Input / Output", "Output / Input", "Output minus Input", "Output x Input"], 1, "Productivity is the output-input ratio within a time period.", 7],
  ["Cement, sugar and steel plants are examples of:", ["Jobbing production", "Batch production", "Process production", "Project production"], 2, "Process production makes a single product continuously.", 7],
  ["Building roads and bridges is an example of:", ["Project production", "Mass production", "Batch production", "Process production"], 0, "Project production has a definite beginning and end.", 7],
  ["Which network technique uses three time estimates per activity?", ["CPM", "PERT", "Gantt chart", "Forecasting"], 1, "PERT uses optimistic, most likely and pessimistic estimates.", 8],
  ["Which technique uses only one time estimate per activity?", ["CPM", "PERT", "Simulation", "Sampling"], 0, "The Critical Path Method uses a single estimate.", 8],
  ["Buying insurance is a form of:", ["Risk elimination", "Risk reduction", "Risk sharing", "Risk absorption"], 2, "Insurance transfers or shares the risk with the insurer.", 8],
  ["Gathering information on a completed activity to improve next time is:", ["Feedforward control", "Concurrent control", "Feedback control", "Preventive control"], 2, "Feedback control looks back at results.", 2],
  ["In safety terms, the likelihood that harm will actually occur is:", ["Hazard", "Risk", "Incident", "Accident"], 1, "A hazard is potential harm; risk is its likelihood.", 8],
  ["A 'near miss' is classified as:", ["An accident", "An incident", "Ill health", "A hazard"], 1, "Incidents include near misses that could have caused accidents.", 8],
], [
  ["Management (course definition)", "Designing and maintaining an environment in which people working in groups efficiently accomplish selected aims.", 1],
  ["Five management functions", "Planning, Organizing, Staffing, Leading, Controlling.", 2],
  ["POSDCORB", "Planning, Organizing, Staffing, Directing, Co-ordinating, Reporting, Budgeting (Luther Gulick).", 2],
  ["Fayol's functions", "Forecast and plan, organize, command, coordinate, control.", 2],
  ["Coordination", "The essence of managership: harmonizing individual efforts towards group goals.", 2],
  ["Three managerial skills", "Conceptual (top), human relations (all levels), technical (supervisory).", 3],
  ["Strategic vs tactical vs operational plans", "Top/long-range vs middle/about a year vs lower/day-to-day.", 4],
  ["Policy vs procedure vs rule", "Broad guideline vs exact series of steps vs requires or forbids an action.", 4],
  ["Four forecasting methods", "Polling of salesmen, survey of buyers, economic indicators, statistical methods.", 4],
  ["Unity of command", "Each worker takes orders from only one manager.", 5],
  ["Scalar chain", "The chain of authority from the top manager down to the first-line supervisor.", 5],
  ["Line, staff and functional authority", "Command subordinates / advise a superior / oversee a specialty across the organization.", 5],
  ["Matrix structure", "Staff report to both a functional and a project manager; risk of a 'dual boss'.", 5],
  ["Span of control", "The number of subordinates a manager directly supervises.", 5],
  ["Four sources of power", "Legitimate, reward, coercive, referent.", 6],
  ["Mintzberg's role groups", "Interpersonal, informational, decisional (ten roles in all).", 6],
  ["Effectiveness vs efficiency", "Achieving the objective vs achieving it with the least resources.", 7],
  ["Productivity", "Output / Input over a time period, with due regard for quality.", 7],
  ["5 Ps of production management", "Products, Plant, Process, Programs, People.", 7],
  ["CPM vs PERT", "One time estimate per activity vs three time estimates per activity.", 8],
  ["Hazard vs risk", "Potential to cause harm vs likelihood that the harm occurs.", 8],
  ["Three reasons to prevent accidents", "Moral/humane, cost, legal obligation.", 8],
]);
