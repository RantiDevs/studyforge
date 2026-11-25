import { buildCourse } from "../build";

/* ABE 501 Engineering Management (Prof. J. O. Olaoye, Prof. A. M. Ayanshola, Dr. S. O. Odeyemi).
   Built from every file in the course folder: Course Ware, Lecture Series 1, Lecture Notes 2,
   Creating a Viable Business Organization, Production Management, Industrial Safety,
   CBT question bank (200), CA compiled questions (2024/25), WTE compiled questions.
   Chapters follow the course outline order. */

export default buildCourse("ABE501", [
  /* 1 */
  ["The Essence of the Management Task", "prerequisite",
    `<h2>What management really is</h2>
<p>Welcome to Engineering Management! Let's start simple. Your course ware defines <strong>management</strong> as the process of designing and maintaining an environment in which people, working together in groups, efficiently accomplish selected aims.</p>
<p>Put even more simply: management is <strong>getting things done through other people</strong>. And to do that, management needs five things: an <strong>objective</strong>, <strong>resources</strong>, <strong>methods</strong>, an <strong>organizational setting</strong>, and <strong>people</strong>.</p>
<p>Other definitions you should recognise: Donald Cough called management "the art and science of decision making and leadership", and Louis Allen said simply "management is what a manager does". Henri Fayol saw it as forecasting, planning, organizing, commanding, coordinating and controlling.</p>
<p>The word itself comes from the Italian <em>maneggiare</em> (to handle or train horses), from the Latin <em>manus</em>, meaning hand.</p>
<h2>Engineering management</h2>
<p>Engineering management is the <strong>fusion of engineering and business</strong>. It's the career that brings together an engineer's technical problem-solving with management's planning and organizing abilities, to oversee complex work from conception to completion.</p>
<p>Formally, it is concerned with the design, installation and improvement of integrated systems of <strong>people, materials, information, equipment and energy</strong>, using mathematics, physical and social sciences together with engineering analysis.</p>
<p>Examples of engineering management areas: product development, manufacturing, construction, design engineering, industrial engineering and production. Engineering managers are trained to understand human resource management, finance, industrial psychology, quality control, operations research and environmental management.</p>
<h2>The essence (characteristics) of management</h2>
<p>Your lecture slides list seven features that make management a distinct activity:</p>
<ul>
<li><strong>An economic resource</strong>: management is a factor of production alongside land, labour and capital. Labour, capital and materials don't produce anything on their own; management is the catalyst that brings them together.</li>
<li><strong>Goal oriented</strong>: it is purposeful. Its success is measured by how well the organization's goals are achieved.</li>
<li><strong>A distinct process</strong>: planning, organizing, staffing, directing and controlling, so interwoven you can't fix their exact order.</li>
<li><strong>An integrative force</strong>: it combines human and non-human resources and harmonizes individual goals with organizational goals.</li>
<li><strong>A system of authority</strong>: a hierarchy of command and control. Authority reduces as you move down the levels.</li>
<li><strong>Multi-disciplinary</strong>: it borrows from engineering, psychology, sociology, anthropology and operations research.</li>
<li><strong>Universal</strong>: its principles apply in business, education, the military, government and hospitals alike.</li>
</ul>
<h2>Why management matters</h2>
<p>Management distributes work and machines for maximum output, coordinates staff activities, maintains discipline, keeps proper records, develops marketing and publicity, suggests new ideas, keeps good human relations (industrial peace), and ensures staff are fairly paid. Without effective management, organizations collapse in time.</p>
<h2>Science or art?</h2>
<p>Here's a classic exam favourite. Managing as a <strong>practice is an art</strong>: know-how applied to real situations. The <strong>organized knowledge</strong> behind it is a <strong>science</strong>. So management is <strong>both a science and an art</strong>, and the two complement each other. As your notes put it, executives who manage without the science must trust luck and intuition.</p>
<h2>The goal of every manager</h2>
<p>Every manager's aim is to <strong>create a surplus</strong>: achieve group goals with the least time, money, materials and personal dissatisfaction. In a business the surplus is profit; in a university it is knowledge and service.</p>
<p>The eight characteristics of excellent, most admired companies: they were <strong>oriented toward action</strong>, <strong>learned their customers' needs</strong>, promoted <strong>autonomy and entrepreneurship</strong>, achieved productivity through <strong>attention to their people</strong>, were driven by a <strong>company philosophy</strong> based on their leaders' values, <strong>focused on the business they knew best</strong>, had a <strong>simple structure with lean staff</strong>, and were <strong>centralized and decentralized as appropriate</strong>.</p>`,
    ["management", "engineering management", "surplus", "science and art", "economic resource"],
    "Management is getting things done through people: designing an environment where groups efficiently achieve aims. It is an economic resource, goal oriented, integrative, universal, and both an art (practice) and a science (knowledge). Every manager aims to create a surplus."],

  /* 2 */
  ["The Functions of Management", "prerequisite",
    `<h2>Five functions</h2>
<p>Different writers list management functions differently, so let's line them up. George and Jerry gave four (planning, organizing, actuating, controlling). Fayol said "to manage is to forecast and plan, to organize, to command, to coordinate and to control". Luther Gulick gave us the acronym <strong>POSDCORB</strong>: Planning, Organizing, Staffing, Directing, Co-ordinating, Reporting, Budgeting.</p>
<p>The most widely accepted list, from <strong>Koontz and O'Donnell</strong>, is the one your course uses: <strong>Planning, Organizing, Staffing, Directing (Leading) and Controlling</strong>. In practice they overlap and blend into each other.</p>
<h2>Planning</h2>
<p>Planning is the basic function. Koontz says "planning is deciding in advance what to do, when to do it and how to do it. It bridges the gap from where we are to where we want to be." A plan answers <strong>what</strong>, <strong>when</strong>, <strong>how</strong> and <strong>who</strong>.</p>
<p>Important point: <strong>no real plan exists until a decision commits resources</strong>. Before that, you only have a study or a proposal.</p>
<h2>Organizing</h2>
<p>Organizing brings together physical, financial and human resources and builds productive relationships among them. Fayol: "to organize a business is to provide it with everything useful to its functioning: raw material, tools, capital and personnel."</p>
<p>The organizing process: identify activities, classify and group them, assign duties, delegate authority and create responsibility, and coordinate authority-responsibility relationships.</p>
<h2>Staffing</h2>
<p>Staffing is manning the organization structure and keeping it manned: putting the <strong>right person on the right job</strong> (square pegs in square holes). It covers manpower planning, recruitment, selection and placement, training and development, remuneration, performance appraisal, promotions and transfers.</p>
<h2>Directing (leading)</h2>
<p>Directing is called the <strong>"life-spark" of the enterprise</strong>. Planning, organizing and staffing only prepare the work; directing sets people in motion. It has four elements:</p>
<ul>
<li><strong>Supervision</strong>: overseeing the work of subordinates.</li>
<li><strong>Motivation</strong>: inspiring subordinates with zeal to work, using monetary and non-monetary incentives.</li>
<li><strong>Leadership</strong>: guiding and influencing subordinates in the desired direction.</li>
<li><strong>Communication</strong>: passing information, experience and opinion; a "bridge of understanding".</li>
</ul>
<h2>Controlling</h2>
<p>Controlling measures accomplishment against standards and corrects deviations. Theo Haimann: "the process of checking whether or not proper progress is being made towards the objectives and acting, if necessary, to correct any deviation."</p>
<p>The four steps, in order (exam favourite, the <em>third</em> step is often asked):</p>
<ol>
<li>Establish standards of performance.</li>
<li>Measure actual performance.</li>
<li><strong>Compare</strong> actual performance with the standards and find deviations.</li>
<li>Take corrective action.</li>
</ol>
<p>Three types of control by timing: <strong>feedforward</strong> (anticipate and prevent problems), <strong>concurrent</strong> (detect variances while work is ongoing) and <strong>feedback</strong> (evaluate completed work to improve next time).</p>
<h2>Coordination: the essence of managership</h2>
<p>Some people call coordination a separate function. Your notes say it is better seen as the <strong>essence of managing</strong>: harmonizing individual efforts towards group goals. Every function contributes to it.</p>`,
    ["planning", "organizing", "staffing", "directing", "controlling", "POSDCORB", "coordination"],
    "The five functions (Koontz and O'Donnell) are planning, organizing, staffing, directing and controlling. Directing is the life-spark; controlling's steps are set standards, measure, compare, correct. Coordination is the essence of managing."],

  /* 3 */
  ["Levels, Skills, Areas and Types of Managers", "module",
    `<h2>Three levels of management</h2>
<p>Most organizations look like a pyramid, with three levels:</p>
<ul>
<li><strong>Top level</strong>: the board of directors, president, CEO, CFO, COO. They set goals, strategy and policy, approve capital budgets, appoint middle managers, and are accountable to shareholders and the public. Purely managerial, long-range.</li>
<li><strong>Middle level</strong>: general managers, branch and department managers. They turn top-level decisions into action, handle tactical planning, and guide lower managers. Partly managerial, partly operative.</li>
<li><strong>Lower (first-line) level</strong>: supervisors, foremen, section leads. They <strong>manage non-managers</strong>: assigning tasks, supervising daily operations, ensuring quality and quantity of production. Minimally managerial, short-term.</li>
</ul>
<p>Time spent on functions differs by level: top managers spend more time <strong>planning and organizing</strong>; first-line supervisors spend more time <strong>leading</strong>. Time on controlling varies only slightly.</p>
<h2>The board of directors and the CEO</h2>
<p>The <strong>board</strong> is elected by shareholders (usually at the AGM). It sets company policy and direction, adopts bylaws, names committees, <strong>hires, monitors, evaluates and fires</strong> the managing director and senior executives, determines dividends and issues shares. It bears <strong>collective responsibility</strong>.</p>
<p>The <strong>CEO</strong> (also called president or managing director) is responsible for the firm's overall operations and links the board with the rest of the firm.</p>
<h2>Managerial skills</h2>
<ul>
<li><strong>Conceptual skill</strong>: seeing the whole organization as a system, thinking analytically and creatively, being proactive. A problem in one part may come from another part. Most important at the <strong>top</strong>.</li>
<li><strong>Human relations skill</strong>: understanding and motivating people, guided by the Golden Rule ("do unto others..."). Important at <strong>every level</strong>.</li>
<li><strong>Technical skill</strong>: knowing your staff's methods and procedures. Most important at <strong>supervisory level</strong>, which is why engineering firms like managers who rose through the ranks.</li>
</ul>
<p>Lecture Series 1 adds <strong>leadership</strong> and <strong>analytical</strong> skills. Gaps can be closed through on-the-job training, seminars and workshops.</p>
<h2>Areas of management</h2>
<ul>
<li><strong>Financial management</strong>: obtaining money and using funds to further goals.</li>
<li><strong>Production and operations management</strong>: transforming resources into goods, services and ideas.</li>
<li><strong>Human resources management</strong>: staffing, including interviewing and hiring.</li>
<li><strong>Marketing management</strong>: planning, pricing, promoting and distributing products.</li>
<li><strong>IT management</strong>: implementing and controlling technology applications.</li>
<li><strong>Administrative management</strong>: managing the whole business and coordinating specialist managers.</li>
</ul>
<h2>Types of managers (Duft, 1989)</h2>
<p>Recognise these from their habits:</p>
<ul>
<li><strong>Silent type</strong>: never takes a stand until the majority has, so as not to be blamed alone. Suits routine government work.</li>
<li><strong>Keep-it-simple type</strong>: reduces everything to simple steps and ignores long-term side effects; creates new problems while solving old ones.</li>
<li><strong>Historically minded type</strong>: rose through the ranks; insists on doing things the way they were always done.</li>
<li><strong>One-track manager</strong>: blames every problem on one cause (for example, lack of money).</li>
<li><strong>Lion-hearted manager</strong>: talks a lot and dominates every discussion, but offers no specific solutions.</li>
<li><strong>Perfectionist</strong>: investigates everything endlessly; spends more time deciding than doing.</li>
<li><strong>Horn of the dilemma type</strong>: sees only yes or no, all or nothing.</li>
<li><strong>Railroad type</strong>: obsessed with time and schedules; prefers machines to people.</li>
<li><strong>Autocratic type</strong>: dictates everything and treats different ideas as enemies.</li>
</ul>
<h2>When an engineer becomes a manager</h2>
<p>The hardest adjustment is learning to <strong>trust others</strong>, to <strong>work through others</strong>, and to <strong>take satisfaction in others' work</strong>: all three. Your CBT bank says engineers become good managers through <strong>effective career planning</strong>.</p>`,
    ["top management", "first line manager", "conceptual skill", "technical skill", "board of directors"],
    "Top managers plan strategy, middle managers implement, first-line managers supervise non-managers. Conceptual skill matters most at the top and technical skill at supervisory level. Know the areas of management and Duft's manager types."],

  /* 4 */
  ["Patterns of Leadership", "module",
    `<h2>Who is a leader?</h2>
<p>A leader is a person who influences others to act so as to carry out specified objectives. <strong>Leadership</strong> is the process of influencing and supporting others to work enthusiastically toward objectives. Today's organizations need leaders who understand a fast-changing global environment.</p>
<p>A manager appointed to a position has formal authority, but authority alone isn't enough. Without personal competence, an <em>emergent leader</em> may rise from the group and reduce the manager to a figurehead.</p>
<h2>Leadership styles</h2>
<ul>
<li><strong>Autocratic (authoritarian)</strong>: all decision-making power is centralized in the leader. Fast decisions; best in emergencies or when the leader has far more expertise. Autocrats "tell" employees.</li>
<li><strong>Democratic (participative)</strong>: decisions are shared with group members, promoting their interests and social equality.</li>
<li><strong>Laissez-faire (free-rein)</strong>: subordinates get a free hand in setting their own policies and methods. Its downside: little managerial control and a high degree of risk.</li>
<li><strong>Narcissistic leadership</strong>: identified by Kets de Vries and Maccoby.</li>
<li><strong>Toxic leadership</strong>: abuses the leader-follower relationship and leaves the group worse off than they found it.</li>
</ul>
<p>The right style depends on the situation. In an emergency, autocratic may work best; with a motivated, expert team, democratic or laissez-faire may work better.</p>
<h2>The managerial grid</h2>
<p>Robert <strong>Blake and Jane Mouton</strong> (1964) built the managerial grid, a behavioural model with five styles based on a leader's <strong>concern for people</strong> versus <strong>concern for production (goal achievement)</strong>.</p>
<h2>Power: where influence comes from</h2>
<ul>
<li><strong>Legitimate power</strong>: from a higher position in the organization.</li>
<li><strong>Reward power</strong>: the ability to give rewards.</li>
<li><strong>Coercive power</strong>: compliance through threats or punishment.</li>
<li><strong>Referent power</strong>: people comply because they want to be identified with you.</li>
</ul>
<p>Traits of effective leaders include high personal drive, knowledge of the company and technology, and charisma. Greed is not one of them!</p>
<h2>Mintzberg's ten managerial roles</h2>
<p>Henry Mintzberg observed five CEOs and concluded managers play ten roles in three groups:</p>
<ul>
<li><strong>Interpersonal</strong>: figurehead (ceremonial duties), leader, liaison (with outsiders).</li>
<li><strong>Informational</strong>: recipient/monitor, disseminator (passing info to subordinates), spokesperson (to outsiders).</li>
<li><strong>Decisional</strong>: entrepreneur, disturbance handler, resource allocator, negotiator.</li>
</ul>
<p>Criticisms: the sample of five CEOs was far too small; many roles are really planning, organizing or leading in disguise; and key activities like structuring the organization and appraising managers are missing.</p>
<h2>Leadership and satisfaction</h2>
<p>The relationship between leader and worker strongly affects employee satisfaction. If the task is well structured and the leader relates well with staff, employee effectiveness is high.</p>`,
    ["leadership", "autocratic", "democratic", "laissez faire", "managerial grid", "referent power"],
    "Leadership is influencing people to work enthusiastically toward goals. Styles: autocratic, democratic, laissez-faire (plus narcissistic and toxic). Blake and Mouton's grid weighs concern for people against production. Power: legitimate, reward, coercive, referent. Mintzberg: ten roles in three groups."],

  /* 5 */
  ["Creating a Viable Organization", "module",
    `<h2>What makes an organization viable</h2>
<p>Organizing means developing an intentional structure of roles for effective performance, with a network of decision and communication centres. To work, the structure must be understood and its principles practised. Dr Odeyemi's notes give <strong>six steps</strong> to a viable organization:</p>
<h2>1. Avoid mistakes in organizing by planning</h2>
<ul>
<li><strong>Plan for the ideal</strong>: chart the main lines of organization, reflecting enterprise goals and the managers' philosophy, and sketch the authority relationships.</li>
<li><strong>Modify for the human factor</strong>: if available people don't fit the ideal structure and can't be pushed aside, adjust the structure to their capabilities and limitations.</li>
</ul>
<h2>2. Avoid organizational inflexibility</h2>
<p>Old companies often become too rigid to adapt to a changing environment, the first test of good structure. Signs: a pattern that no longer suits the times, regional offices that should be merged or abolished, or too much centralization for a large firm. The cure: <strong>reorganization</strong>, and accepting the <strong>need for readjustment and change</strong>.</p>
<h2>3. Make staff work effective</h2>
<p>The line-staff problem causes enormous inefficiency. Fix it by: understanding authority relationships, <strong>making line listen to staff</strong>, <strong>keeping staff informed</strong>, <strong>requiring complete staff work</strong>, and making staff work a way of organizational life.</p>
<h2>4. Avoid conflict by clarification</h2>
<p>Conflict often arises because people don't understand their own or their co-workers' assignments. Clarify through organization charts, accurate job descriptions, spelling out authority and information relationships, and specific goals for specific positions.</p>
<h2>5. Ensure understanding of organizing</h2>
<p>Every member must understand the structure. That takes teaching. And since <strong>formal organization</strong> is always supplemented by <strong>informal organization</strong>, people must understand both.</p>
<h2>6. Promote an appropriate organization culture</h2>
<p>Culture shapes how every function is carried out. Your notes contrast two environments:</p>
<ul>
<li><strong>Environment A</strong>: goals set autocratically; centralized decisions and narrowly defined authority; people selected by friendship; directive leadership with top-down communication; strict control focused on financial criteria.</li>
<li><strong>Environment B</strong>: participative goal-setting; decentralized, broadly defined authority; selection by performance; participative leadership with communication flowing top-down, bottom-up, horizontally and diagonally; self-control and multiple criteria.</li>
</ul>
<h2>Formal and informal organization</h2>
<p><strong>Formal organization</strong> is the intentional structure of roles. It should still be flexible, leaving room for discretion and creative talent.</p>
<p><strong>Informal organization</strong> is the network of personal relationships that forms when people associate, without a conscious joint purpose: the machine-shop group, the "Friday evening football gang", the "morning tea regulars". They don't appear on the organization chart but they matter.</p>
<h2>What every role needs</h2>
<p>For a role to be meaningful it must have: <strong>verifiable objectives</strong>, a <strong>clear idea of the major duties</strong>, and an <strong>understood area of discretion or authority</strong>.</p>`,
    ["viable organization", "inflexibility", "line and staff", "organization culture", "informal organization"],
    "A viable organization: plan (ideal, then modify for people), avoid inflexibility, make staff work effective, avoid conflict by clarification, ensure understanding, and promote the right culture. Know formal vs informal organization and what every role needs."],

  /* 6 */
  ["Productivity, Appraisal and Motivation", "module",
    `<h2>Productivity</h2>
<p><strong>Productivity = Output / Input</strong>, within a time period and with due consideration for quality. You can improve it by increasing output with the same input, decreasing input for the same output, or both.</p>
<ul>
<li><strong>Partial productivity</strong> = total output / one input. So <strong>labour productivity</strong> = output / labour input, <strong>capital productivity</strong> = output / capital input, <strong>material productivity</strong> = output / material input, <strong>energy productivity</strong> = output / energy input.</li>
<li><strong>Total productivity</strong> = total tangible output / total tangible input (human, material, capital and other inputs).</li>
</ul>
<p>Worked example: a workshop makes 600 hoe blades using 300 labour-hours. Labour productivity = 600 / 300 = <strong>2 blades per labour-hour</strong>. If better jigs raise output to 750 with the same hours, productivity rises to 2.5.</p>
<h2>Effectiveness vs efficiency</h2>
<p>Productivity implies both:</p>
<ul>
<li><strong>Effectiveness</strong> = achieving the objective. If you must finish a job in 15 days and you do, you are <em>effective</em>.</li>
<li><strong>Efficiency</strong> = achieving the end with the least resources. If you use less labour and material for the same output, you are <em>efficient</em>.</li>
</ul>
<p>Drucker's insight from your notes: the greatest opportunity for raising productivity lies in <strong>knowledge work and management</strong> itself.</p>
<h2>What affects productivity</h2>
<p>Factors: product, plant and equipment, technology, material and energy, the human factor, work method and management style. Improvement techniques are technology-based, employee-based, material-based, process-based, product-based and management-based.</p>
<h2>Appraising managers</h2>
<p>Managerial appraisal has been called the "Achilles' heel" of staffing, yet it's key to managing: it decides who is promotable and guides management development.</p>
<ul>
<li>Appraise performance in <strong>achieving goals</strong> (ideally against <strong>verifiable, pre-selected objectives</strong>) and performance <strong>as a manager</strong> (how well they plan, organize, staff, lead and control).</li>
<li>Three kinds of reviews: a <strong>comprehensive review</strong> (at least once a year), <strong>progress or periodic reviews</strong> (short, frequent), and <strong>continuous monitoring</strong>.</li>
</ul>
<h2>Rewards of managing</h2>
<p>Managers differ in age, economic position and maturity, but their wants usually include <strong>opportunity</strong> (a progressive career), <strong>power</strong> (to make a significant contribution) and <strong>income</strong>.</p>
<h2>Motivation</h2>
<p>Motivation is the process of <strong>activating behaviour, sustaining it, and directing it toward a goal</strong>. Contributing factors include willingness to do the job, self-confidence and need satisfaction.</p>
<p>Theories to know: <strong>Maslow's hierarchy of needs</strong> (physiological needs like food, drink and rest at the base; then security, social, esteem, and self-actualization at the top), <strong>Herzberg's two-factor theory</strong> and <strong>expectancy theory</strong>.</p>
<p>Motivating the workforce, instilling commitment and enthusiasm for the organization's goals, is a principal function of <strong>lower management</strong>.</p>`,
    ["productivity", "effectiveness", "efficiency", "appraisal", "motivation", "Maslow"],
    "Productivity is output over input; partial measures use one input (labour, capital, material, energy). Effectiveness is meeting the objective; efficiency is doing it with least resources. Appraise managers against verifiable objectives with comprehensive, periodic and continuous reviews."],

  /* 7 */
  ["The Organizing Task and Organizational Structures", "module",
    `<h2>What organizing involves</h2>
<p>Organizing is: identifying and classifying required activities; grouping activities to attain objectives; assigning each group to a manager with the authority (delegation) to supervise it; and providing for coordination <strong>horizontally</strong> (same level) and <strong>vertically</strong> (headquarters, division, department).</p>
<p>A structure should make clear <strong>who does what</strong> and <strong>who is responsible for what results</strong>, removing confusion and providing decision and communication networks.</p>
<h2>Division of labour and departmentation</h2>
<ul>
<li><strong>Division of labour</strong>: deciding the scope of work and how it is combined into a job.</li>
<li><strong>Departmentation (departmentalization)</strong>: grouping related jobs, activities or processes into major subunits to improve efficiency. A <strong>department</strong> is a distinct area or branch over which a manager has authority.</li>
</ul>
<h2>Types of organizational structure</h2>
<ul>
<li><strong>Pre-bureaucratic (entrepreneurial)</strong>: no standardized tasks, totally centralized; the leader makes all key decisions. Good for small new businesses.</li>
<li><strong>Bureaucratic</strong>: standardized, tall structures for large organizations. Max Weber's features: clearly defined roles, hierarchy, and respect for merit.</li>
<li><strong>Post-bureaucratic</strong>: decisions by dialogue and consensus, network rather than hierarchy (Charles Heckscher). Includes TQM and culture management.</li>
<li><strong>Functional</strong>: grouped by specialty (engineering, marketing). Efficient use of specialists, best for standardized goods at large volume, but weak communication between groups, slow and inflexible, with a weak customer interface.</li>
<li><strong>Divisional (product or market)</strong>: each division has all the functions it needs, for one product, customer or region. Suits large corporations with many product lines.</li>
<li><strong>Matrix</strong>: employees report to both a functional manager and a project manager. It balances the use of human resources well, but creates <strong>dual accountability (the "dual boss")</strong> and conflict between project and functional managers. Three forms: <strong>weak/functional</strong> (project manager has limited authority), <strong>balanced</strong> (power shared equally, hardest to maintain) and <strong>strong/project</strong> (project manager primarily responsible).</li>
<li><strong>Projectized</strong>: the project manager is responsible for completion and is assigned a budget. Good schedule and cost control, but people worry about future job assignments.</li>
<li><strong>Flat</strong>: few levels, common in start-ups.</li>
<li><strong>Team</strong>: the newest structure; self-managed teams (Whole Foods, Xerox, Motorola).</li>
<li><strong>Network</strong>: contracts out functions done better or cheaper elsewhere (H&amp;M uses about 700 suppliers).</li>
<li><strong>Virtual</strong>: a boundaryless organization enabled by software and the Internet.</li>
</ul>
<h2>Committees</h2>
<p>An <strong>ad hoc committee</strong> is created for a short-term purpose with a limited life. A <strong>standing committee</strong> is permanent and deals with ongoing issues.</p>
<h2>The organization chart</h2>
<p>A diagram of the organization's official positions and formal lines of authority. In a typical functional hierarchy, the chief engineer sits under the <strong>manufacturing manager</strong>.</p>`,
    ["departmentation", "division of labour", "functional structure", "matrix", "bureaucracy", "ad hoc committee"],
    "Organizing groups activities and assigns them to managers with authority. Departmentation groups jobs into subunits. Structures: pre-bureaucratic, bureaucratic (Weber), functional, divisional, matrix (dual boss; weak, balanced, strong), projectized, flat, team, network and virtual."],

  /* 8 */
  ["Span of Control and Delegation of Authority", "module",
    `<h2>Span of management</h2>
<p>The <strong>span of control (span of management)</strong> is the number of subordinates a manager can effectively supervise. Organization levels exist precisely because that number is limited.</p>
<p>The key relationship: a <strong>wide span means few levels</strong> (a flat organization); a <strong>narrow span means many levels</strong> (a tall organization).</p>
<p>Disadvantages of a narrow span: superiors get too involved in subordinates' work, many levels of management, high costs, and excessive distance between the lowest and top levels.</p>
<h2>Problems with organizational levels</h2>
<ol>
<li><strong>Levels are expensive</strong>: more managers, staff and facilities.</li>
<li><strong>Levels complicate communication</strong>: omissions and misinterpretations creep in as information passes down the line.</li>
<li><strong>Levels complicate planning and control</strong>: a clear plan at the top loses clarity as it is subdivided.</li>
</ol>
<h2>Power vs authority</h2>
<p><strong>Power</strong> is the ability to induce or influence the beliefs or actions of others. <strong>Authority</strong> is the right in a position to exercise discretion in making decisions affecting others. Authority is one type of power, power in an organizational setting. It is measured by the resources a manager can allocate without seeking approval.</p>
<h2>Line, staff and functional authority</h2>
<ul>
<li><strong>Line authority</strong>: a superior's right of direct supervision over a subordinate, a manager's right to tell subordinates what to do and see that they do it.</li>
<li><strong>Staff authority</strong>: a specialist's right to <em>advise</em> a superior (for example, a consultant).</li>
<li><strong>Functional authority</strong>: a specialist's right to oversee people involved in their specialty, wherever those people sit in the organization.</li>
</ul>
<p><strong>The scalar principle</strong>: the clearer the line of authority from the top position to every subordinate position, the clearer the responsibility for decisions and the more effective the communication.</p>
<h2>Decentralization</h2>
<p>Decentralization is the tendency to <strong>disperse decision-making authority</strong>. There can never be absolute centralization (no subordinate managers) or absolute decentralization (the manager's position would disappear). It is a philosophy: choose which decisions to push down and which to hold near the top, guide with policies, select and train people, and keep adequate controls.</p>
<h2>Delegation: four steps</h2>
<ol>
<li>Determine the results expected from a position.</li>
<li>Assign tasks to the position.</li>
<li>Delegate authority to accomplish those tasks.</li>
<li>Hold the person responsible for accomplishing them.</li>
</ol>
<p>You cannot delegate authority you don't have. And you can delegate authority, but <strong>not your responsibility</strong> for performance.</p>
<h2>Personal attitudes toward delegation</h2>
<p>Most delegation failures happen not because managers don't understand it, but because they won't apply it. The five attitudes needed:</p>
<ol>
<li><strong>Receptiveness</strong>: give others' ideas a chance; minimize the "NIH" (Not Invented Here) factor.</li>
<li><strong>Willingness to let go</strong>: stop making decisions for the position you left.</li>
<li><strong>Willingness to allow mistakes</strong>: treat their cost as an investment in development.</li>
<li><strong>Willingness to trust subordinates</strong>: or train or replace them.</li>
<li><strong>Willingness to establish and use broad controls</strong>: get feedback, rather than refusing to delegate out of fear.</li>
</ol>`,
    ["span of control", "scalar principle", "line authority", "staff authority", "decentralization", "delegation"],
    "Wide span means few levels; narrow span means many. Levels are costly and complicate communication, planning and control. Authority is power in a position; line commands, staff advises, functional oversees a specialty. Delegation: set results, assign tasks, delegate authority, hold responsible."],

  /* 9 */
  ["Organizational Theories and Approaches to Management", "module",
    `<h2>Where management science came from</h2>
<p>Ideas of management go back to the bureaucracies of ancient China, Egypt and Rome. Sir Thomas More's 16th-century enquiry into failing enterprises is cited as an origin of modern practice. Management as a <em>science</em> grew from two streams:</p>
<ul>
<li><strong>Physical sciences and engineering</strong>: late 19th century, led by the American industrial engineer <strong>Frederick Winslow Taylor</strong> (scientific management).</li>
<li><strong>Social sciences</strong>: early 20th century, <strong>Elton Mayo</strong> and <strong>Mary Parker Follett</strong> (human behaviour).</li>
</ul>
<p>Approaches developed since include scientific management, human behaviour management, quantitative approaches, management economics and accounting, principles of management, and management information systems.</p>
<h2>Fayol's 14 principles of management</h2>
<ol>
<li><strong>Division of work</strong>: specialization.</li>
<li><strong>Authority</strong> (with responsibility): whoever has authority assumes responsibility.</li>
<li><strong>Discipline</strong>: penalties applied judiciously.</li>
<li><strong>Unity of command</strong>: one boss per worker.</li>
<li><strong>Unity of direction</strong>: one common objective.</li>
<li><strong>Subordination of individual interest</strong> to the general interest.</li>
<li><strong>Remuneration</strong>: fair pay considering cost of living and conditions.</li>
<li><strong>Centralization</strong>: the right degree depends on the organization.</li>
<li><strong>Scalar chain</strong>: the chain of authority from president to supervisor.</li>
<li><strong>Order</strong>: a place for everything and everyone.</li>
<li><strong>Equity</strong>: treat employees fairly.</li>
<li><strong>Stability of tenure</strong>: retain productive employees.</li>
<li><strong>Initiative</strong>: encourage self-directed work.</li>
<li><strong>Esprit de corps</strong>: harmony and team spirit.</li>
</ol>
<h2>The management theory jungle</h2>
<p>Harold Koontz called the confusing variety of approaches "the management theory jungle". Your notes group them into 14:</p>
<ul>
<li><strong>Empirical/case</strong>: learns from cases, but situations differ and no principles emerge.</li>
<li><strong>Managerial roles</strong>: Mintzberg's ten roles from five CEOs.</li>
<li><strong>Contingency/situational</strong>: "there is no one best way"; practice depends on circumstances.</li>
<li><strong>Mathematical/management science</strong>: management as models and symbols; useful tool, but many things can't be modelled.</li>
<li><strong>Decision theory</strong>: focuses on decisions; too narrow and too wide at once.</li>
<li><strong>Reengineering</strong>: fundamental rethinking and radical redesign for dramatic results; can neglect people and the environment.</li>
<li><strong>Systems</strong>: organizations are <strong>open systems</strong> with boundaries that interact with the environment.</li>
<li><strong>Sociotechnical systems</strong>: the technical system strongly affects the social system.</li>
<li><strong>Cooperative social systems</strong>: interpersonal and group cooperation.</li>
<li><strong>Group behaviour</strong>: from sociology; large-group study is "organization behaviour".</li>
<li><strong>Interpersonal behaviour</strong>: human relations, leadership and motivation, from psychology.</li>
<li><strong>McKinsey's 7-S framework</strong>: strategy, structure, systems, style, staff, shared values, skills.</li>
<li><strong>Total Quality Management</strong>: quality as fitness for use (Juran) and conformance to requirements (Crosby); continuous improvement and teamwork.</li>
<li><strong>Management process (operational)</strong>: draws everything together around the five functions. This is your course's framework.</li>
</ul>
<h2>The systems approach</h2>
<p>An enterprise doesn't exist in a vacuum. It takes <strong>inputs</strong> from the environment, <strong>transforms</strong> them through planning, organizing, staffing, leading and controlling, and exports <strong>outputs</strong>. Managers must respond to the external environment: economic, technological, social, ecological, political and ethical.</p>`,
    ["Taylor", "Fayol", "unity of command", "contingency approach", "systems approach", "McKinsey"],
    "Management science grew from engineering (Taylor) and social science (Mayo, Follett). Know Fayol's 14 principles, Koontz's management theory jungle, the contingency and systems approaches, McKinsey's 7-S and TQM. The course uses the management process (operational) approach."],

  /* 10 */
  ["Planning and Forecasting", "module",
    `<h2>Types of plans by level</h2>
<ul>
<li><strong>Strategic plans</strong>: top management. Long-range objectives and overall strategy, 2 to 10 years ahead; diversification, mergers, acquisitions.</li>
<li><strong>Tactical (intermediate) plans</strong>: middle management. Implement strategy, about a year or less, reviewed periodically.</li>
<li><strong>Operational plans</strong>: lower management. Very short-term (a month, week or day), specific and actionable.</li>
</ul>
<p>Short-range plans cover less than a year (mainly first-line supervisors); long-range plans cover more than a year (middle and top managers).</p>
<h2>Standing vs single-use plans</h2>
<ul>
<li><strong>Standing plans</strong> are used again and again for recurring situations:
  <ul><li><strong>Policies</strong>: broad guidelines for recurring decisions.</li><li><strong>Procedures</strong>: the exact series of actions to take.</li><li><strong>Rules</strong>: statements that require or forbid an action.</li></ul></li>
<li><strong>Single-use plans</strong> are for unique situations:
  <ul><li><strong>Program</strong>: coordinates a large set of activities.</li><li><strong>Project</strong>: narrower than a program, often supporting one.</li><li><strong>Budget</strong>: projected expenditure for an activity and where the funds come from.</li></ul></li>
</ul>
<p>Functional plans: the <strong>marketing plan</strong>, <strong>production plan</strong> (output by product family), <strong>financial plan</strong> and <strong>human resource plan</strong>. The <strong>corporate mission</strong> states why the organization exists and what makes it distinct.</p>
<h2>Forecasting</h2>
<p>Forecasting predicts what will happen to the company. Most workers care about how many units to produce; someone has to decide that number. <strong>Sales forecasting</strong> is the most important type.</p>
<ul>
<li><strong>Short-term</strong>: 3 to 12 months, for products with monthly demand swings. It avoids over- or under-production, sets sales targets, controls raw-material costs and inventory.</li>
<li><strong>Long-term</strong>: 5 to 20 years, for capital-heavy industries (vehicle assembly, refineries, breweries, fertilizer plants) planning new factories or expansions.</li>
</ul>
<p>There are only <strong>two</strong> types in your notes: short-term and long-term.</p>
<h2>Four forecasting methods</h2>
<ol>
<li><strong>Polling of salesmen</strong>: survey salespeople in different locations. Over-zealous salesmen can skew results.</li>
<li><strong>Survey of buyers</strong>: ask consumers what and how much they'll buy; best with a good sample and anonymous respondents.</li>
<li><strong>Economic indicators</strong>: such as personal income (consumer goods), government construction contracts (building materials), vehicle registrations (spare parts).</li>
<li><strong>Statistical methods</strong>: regression on past sales; choose the best-fit equation by correlation coefficient.</li>
</ol>
<p>A good method must be <strong>fairly accurate</strong>, <strong>simple to use</strong> and <strong>cost-conscious</strong>.</p>
<h2>The forecasting procedure</h2>
<ol>
<li>State the problem.</li>
<li>Define the scope (short or long term).</li>
<li>Set objectives.</li>
<li>Choose the forecasting method.</li>
<li>Determine relevant variables and collect data.</li>
<li>Determine the best relationship for prediction.</li>
<li>Make the actual forecast.</li>
<li>Cross-check values for consistency.</li>
</ol>`,
    ["strategic plan", "operational plan", "policy", "procedure", "program", "forecasting"],
    "Strategic plans are top-level and long-range; tactical are middle; operational are short and specific. Standing plans are policies, procedures and rules; single-use plans are programs, projects and budgets. Forecasts are short-term (3 to 12 months) or long-term (5 to 20 years), by four methods."],

  /* 11 */
  ["Techniques in Engineering Management: Projects, Decisions and Risk", "module",
    `<h2>The project manager's five goals</h2>
<p>Jason Westland's five goals, set for every project:</p>
<ol>
<li><strong>Finish on time</strong>: manage scope with change control; track actual vs planned.</li>
<li><strong>Finish under budget</strong>: budget every cost type and track deviations.</li>
<li><strong>Meet the requirements</strong>: get detailed, unambiguous requirements at the start.</li>
<li><strong>Keep customers happy</strong>: manage expectations with honest, regular updates.</li>
<li><strong>Ensure a happy team</strong>: reward, recognise and play to strengths.</li>
</ol>
<p>The most essential attribute of a project manager is <strong>leadership</strong>, and they must be good at communication, human relations and leadership skills alike.</p>
<h2>Project planning tools</h2>
<ul>
<li><strong>Gantt chart</strong>: bars showing tasks against time.</li>
<li><strong>CPM (Critical Path Method)</strong>: uses <strong>one</strong> time estimate per activity. The critical path is the longest chain of dependent activities, and it fixes the project duration.</li>
<li><strong>PERT (Program Evaluation and Review Technique)</strong>: uses <strong>three</strong> time estimates per activity (optimistic, most likely, pessimistic).</li>
<li><strong>Linear responsibility chart</strong>: shows each stakeholder's responsibility for each project element.</li>
</ul>
<p>PERT/CPM give a framework for planning, scheduling, monitoring and control, show task interdependencies, and estimate completion dates and probabilities. A <strong>life-cycle model</strong> lets you monitor a project at each stage (the waterfall model suits IT projects). A careless project takes <strong>three times</strong> longer than expected, according to one of the project-management laws.</p>
<h2>Decision making</h2>
<p>Decision making is identifying and choosing alternative courses of action suited to the situation. It begins by <strong>articulating the problem or opportunity</strong> and ends by <strong>evaluating and adapting the results</strong>.</p>
<ul>
<li><strong>Qualitative evaluation</strong>: intuition and subjective judgement.</li>
<li><strong>Quantitative evaluation</strong>: rational and analytical techniques.</li>
</ul>
<p>Quantitative tools:</p>
<ul>
<li><strong>Queuing theory</strong>: the number of service units that minimizes both waiting time and service cost.</li>
<li><strong>Decision theory</strong>: rational decisions under limited information.</li>
<li><strong>Sampling theory</strong>: statistically chosen samples for quality control and market research.</li>
<li><strong>Linear programming</strong> and <strong>simulation</strong>.</li>
</ul>
<p><strong>SMEAC</strong> is a planning mnemonic: Situation, Mission, Execution, Administration ("what do we need to get it done?"), Communication.</p>
<h2>Marginal analysis</h2>
<p>Compare the <strong>extra</strong> benefit of one more unit of an activity with its <strong>extra</strong> cost. Keep expanding while marginal benefit exceeds marginal cost; the best point is where they are equal.</p>
<h2>Risk management</h2>
<p>Risk management covers any technique that reduces the probability of an accident or its consequences. Four responses:</p>
<ul>
<li><strong>Avoid</strong> (for example, use a different technology or supplier).</li>
<li><strong>Reduce</strong>.</li>
<li><strong>Share/transfer</strong>: buying insurance.</li>
<li><strong>Absorb</strong>: create buffers such as a management reserve or extra schedule time.</li>
</ul>
<p><strong>Risk-benefit analysis</strong> evaluates risks, costs and benefits of alternative projects or policies.</p>`,
    ["Gantt chart", "critical path", "PERT", "decision making", "queuing theory", "risk management"],
    "A project manager aims for on time, under budget, requirements met, happy customers and a happy team. CPM uses one time estimate, PERT uses three. Decisions use qualitative or quantitative evaluation. Risk can be avoided, reduced, shared (insurance) or absorbed (buffers)."],

  /* 12 */
  ["Production Management and Work Scheduling", "module",
    `<h2>What production management is</h2>
<p><strong>Production management</strong> is effectively planning and regulating the operations of the part of an enterprise that transforms materials into finished products. <strong>Operations management</strong> is planning, organizing and controlling operations to reach objectives efficiently and effectively.</p>
<p>The <strong>5 Ps</strong>: <strong>Products, Plant, Process, Programs, People</strong>. When these five are integrated, production management succeeds.</p>
<p>Objectives: <strong>right quality, right quantity, predetermined time, pre-established cost</strong>. Other objectives cover machinery and equipment, materials, manpower and supporting services.</p>
<h2>Scope</h2>
<ul>
<li><strong>Strategic level</strong>: design and development of new products, process design, facility location and layout, material handling design, capacity planning.</li>
<li><strong>Operational level</strong>: production planning, inventory control, maintenance and replacement, cost control and reduction.</li>
</ul>
<h2>Production Planning and Control (PPC)</h2>
<p>PPC directs and coordinates the firm's resources towards preset goals, starting from demand and delivery data. Its ten functions: <strong>materials</strong>, <strong>machines and equipment</strong>, <strong>methods</strong>, <strong>routing</strong>, <strong>estimating</strong>, <strong>scheduling</strong>, <strong>dispatching</strong>, <strong>expediting</strong>, <strong>inspection</strong> and <strong>evaluation</strong>.</p>
<h2>Work scheduling</h2>
<p><strong>Scheduling</strong> is the phase of production control that develops timetables saying how long each operation takes and when it happens. It sits between routing (the path work follows) and dispatching (releasing the work orders).</p>
<p>Related terms: <strong>product design</strong> (creating specifications), <strong>product planning</strong> (forecasting sales and arranging facilities), <strong>work-flow layout</strong> (physical arrangement of production), <strong>inventory control</strong> (keeping the right reserve stock), <strong>purchasing and materials management</strong>, and <strong>quality control</strong> (measuring products against standards).</p>
<h2>Five types of production</h2>
<ul>
<li><strong>Jobbing</strong>: one or a few units to customer specification, at a price fixed beforehand (repair shop, tailor). Highly skilled labour, limited PPC.</li>
<li><strong>Batch</strong>: limited quantities at regular intervals, stocked as finished goods (paint, chemicals, motor vehicles). General-purpose machines, flexible schedule, needs PPC.</li>
<li><strong>Mass and flow</strong>: large numbers of standard products (assembly of cars, radios, fans). Continuous flow, special-purpose machines, low-skilled labour, easy supervision.</li>
<li><strong>Process</strong>: a single product made continuously (sugar, steel, paper, cement). Highly mechanized, negligible work in progress.</li>
<li><strong>Project</strong>: complex activities in sequence with a definite start and end (roads, buildings). Fixed-position layout, risk of cost overrun.</li>
</ul>
<h2>A word on marketing</h2>
<p>Marketing moves goods from concept to customer. The <strong>4 Ps</strong>: <strong>Product, Price, Place, Promotion</strong> (publicity is <em>not</em> one of them). Promotion tools: <strong>advertising</strong> (paid mass-media messages), <strong>publicity</strong> (unpaid news coverage), <strong>sales promotion</strong> and <strong>personal selling</strong>. Peter Drucker said management's two basic tasks are <strong>marketing and innovation</strong>.</p>`,
    ["production management", "PPC", "scheduling", "batch production", "process production", "marketing"],
    "Production management transforms materials into products; its 5 Ps are products, plant, process, programs, people. PPC functions include routing, scheduling, dispatching and inspection. Production types: jobbing, batch, mass/flow, process, project. Marketing's 4 Ps: product, price, place, promotion."],

  /* 13 */
  ["Staffing, Communication and Industrial Relations", "module",
    `<h2>The staffing process</h2>
<p>Staffing determines human resource needs, then recruits, selects, trains and develops people. Step by step:</p>
<ol>
<li><strong>Forecasting</strong>: assess future human resource needs against current capability.</li>
<li><strong>Programming</strong>: translate the forecast into personnel objectives.</li>
<li><strong>Recruitment</strong>: attract qualified people to apply.</li>
<li><strong>Selection</strong>: choose those most likely to succeed. Tests include <em>performance tests</em> (current knowledge of a subject), aptitude, interest and personality tests.</li>
<li><strong>Induction and orientation</strong>: introduce the new employee to the company and colleagues.</li>
<li><strong>Training and development</strong>: training improves performance on the <em>present</em> job; development prepares for future roles. <em>Apprenticeship</em> combines on-the-job training with classroom instruction.</li>
<li><strong>Performance appraisal</strong>, then <strong>evaluation and control</strong> of the HR plan.</li>
</ol>
<p>Movements: <strong>promotion</strong> (higher pay and responsibility), <strong>transfer</strong> (same level, different job), <strong>demotion</strong> (less pay or responsibility, as punishment or temporary measure), and <strong>separation</strong> (voluntary or involuntary termination).</p>
<h2>Communication</h2>
<p>Communication is sharing information through symbols, including words and messages. Its four functions:</p>
<ul>
<li><strong>Information function</strong>: data for decision-making at every level.</li>
<li><strong>Motivation function</strong>: committing employees to objectives.</li>
<li><strong>Emotive function</strong>: when feelings are repressed, anxiety affects performance; communication lets feelings out.</li>
<li><strong>Control function</strong>.</li>
</ul>
<p><strong>Oral/verbal</strong> communication is transmitted through hearing or sight; <strong>nonverbal</strong> uses body language, time, space, touch, clothing and appearance.</p>
<h2>Industrial relations</h2>
<p>Good management maintains human relations among staff, ensuring <strong>industrial peace and harmony</strong>. Autocratic managers who treat different ideas as enemies risk industrial unrest and a workforce that operates in fear. Fair compensation, equity, stability of tenure and esprit de corps (Fayol) all support good industrial relations.</p>
<p>Managers also face conflicts. <strong>Politics</strong> is conflict over territorial power or hidden agendas; others include technical-opinion conflicts, ambiguous roles and procedural conflicts. Clarifying roles (job descriptions, charts) prevents many of them.</p>`,
    ["recruitment", "selection", "induction", "promotion", "communication", "industrial relations"],
    "Staffing runs from forecasting and programming through recruitment, selection, induction, training and appraisal. Promotion moves up, transfer across, demotion down; separation ends employment. Communication has information, motivation, emotive and control functions. Good management keeps industrial peace."],

  /* 14 */
  ["Industrial Safety", "module",
    `<h2>Key definitions</h2>
<ul>
<li><strong>Accident</strong>: undesired circumstances giving rise to ill health or injury, damage to property, plant, products or the environment, production losses or increased liabilities.</li>
<li><strong>Incident</strong>: undesired circumstances and <strong>near misses</strong> that could cause accidents.</li>
<li><strong>Ill health</strong>: acute and chronic ill health from physical, chemical or biological agents, including effects on mental health.</li>
<li><strong>Hazard</strong>: the <strong>potential to cause harm</strong>. Observable or predictable.</li>
<li><strong>Risk</strong>: the <strong>likelihood</strong> that a specified undesired event will occur when a hazard is realised. Not directly observable.</li>
<li><strong>Safety</strong>: the control of accidental loss.</li>
</ul>
<p>The chain: hazards and danger lead to risk, which leads to harm, which shows up as accidents, injuries, ill health and damage.</p>
<h2>Why prevent accidents?</h2>
<ol>
<li><strong>Moral/humane</strong>: no one comes to work to be injured or killed.</li>
<li><strong>Cost</strong>: accidents cost money. The Piper Alpha disaster killed 167 people and cost over £2 billion, including £746 million in direct insurance payouts.</li>
<li><strong>Legislation</strong>: organizations have a legal obligation. In the UK: the Health and Safety at Work Act 1974, the Management of Health and Safety at Work Regulations 1999, and the Quarry Regulations 1999.</li>
</ol>
<p>The <strong>accident cost iceberg</strong>: the visible, insured costs are only the tip; most costs (lost production, investigation, repairs, morale) are hidden below.</p>
<h2>What the statistics show</h2>
<p>UK reporting changed in 1996 under <strong>RIDDOR '95</strong> (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations), so later figures can't be compared with earlier ones.</p>
<p>In 1997/98, the quarry industry's fatal accident rate (20) was far above construction (6) and all industry (1).</p>
<p>Causes of fatal quarry accidents (1983 to 1993): <strong>vehicles 41%</strong> (run over, falling off edges, overturning, collisions), stumbling, falling or slipping 13%, conveyors 11%, other 11%, struck by falling objects or ground 8%, maintenance 5%, crusher blockages 4%, engulfment 4%, overhead power lines 3%.</p>
<h2>Safety as a management duty</h2>
<p>Safety is part of controlling: set safety standards, measure, compare and correct. Feedforward control is ideal for safety, anticipating hazards before anyone gets hurt.</p>`,
    ["accident", "incident", "hazard", "risk", "near miss", "RIDDOR"],
    "A hazard is the potential to cause harm; risk is the likelihood it happens. Incidents include near misses. Prevent accidents for moral, cost and legal reasons (Piper Alpha: 167 dead, over £2 billion). In quarries, vehicles cause 41% of fatal accidents."],
], [
  // 1 Essence
  ["According to the course, management is:", ["An art only", "A science only", "Both a science and an art", "Neither art nor science"], 2, "Practice is an art; the organized knowledge underlying it is a science.", 1],
  ["Engineering is described in the CBT bank as:", ["An art", "Both science and art", "A science", "Neither"], 1, "Like management, engineering combines scientific knowledge with practised art.", 1],
  ["Which definition of management belongs to Louis Allen?", ["The art and science of decision making", "Management is what a manager does", "To forecast and plan", "Marketing and innovation"], 1, "Allen: 'Management is what a manager does'.", 1],
  ["The aim of all managers is to:", ["Maximize staff numbers", "Create a surplus", "Avoid all risk", "Reduce output"], 1, "Achieve goals with the least time, money, materials and dissatisfaction.", 1],
  ["Management is called an 'economic resource' because:", ["It is free", "It is a factor of production that integrates labour, capital and materials", "It replaces workers", "It deals only with money"], 1, "It is the catalyst that makes the other factors productive.", 1],
  ["Management's principles apply equally in business, government, hospitals and the military. This feature is:", ["Goal orientation", "Universal application", "System of authority", "Integrative force"], 1, "Fayol suggested the principles apply in every situation.", 1],
  ["Activity combining technical knowledge with the ability to organize workers, materials, machinery and money is:", ["Engineering management", "Engineering technology", "General management", "Technical sales"], 0, "That is the classic definition of engineering management.", 1],
  ["Which is one of the eight characteristics of excellent companies?", ["Complex structure with large staff", "Focused on the business they knew best", "Ignored customer needs", "Fully centralized always"], 1, "They stuck to what they knew, with a simple structure and lean staff.", 1],
  // 2 Functions
  ["Which function anticipates problems, analyzes them and decides actions to reach goals?", ["Planning", "Leading", "Controlling", "Organizing"], 0, "Planning bridges where we are and where we want to be.", 2],
  ["Establishing relationships between people and things so resources focus on company goals is:", ["Planning", "Leading", "Controlling", "Organizing"], 3, "Organizing structures resources and activities.", 2],
  ["Selecting candidates and training personnel is:", ["Organizing", "Staffing", "Motivating", "Controlling"], 1, "Staffing mans the structure and keeps it manned.", 2],
  ["Checking for deviation from plans and taking corrective action is:", ["Organizing", "Planning", "Controlling", "Staffing"], 2, "Controlling measures and corrects performance.", 2],
  ["The most widely accepted list of management functions (POSDC) comes from:", ["Fayol", "Koontz and O'Donnell", "Taylor", "Gulick"], 1, "Planning, Organizing, Staffing, Directing, Controlling.", 2],
  ["In Gulick's POSDCORB, 'R' stands for:", ["Recruiting", "Reporting", "Reviewing", "Rewarding"], 1, "Planning, Organizing, Staffing, Directing, Co-ordinating, Reporting, Budgeting.", 2],
  ["Which function is called the 'life-spark' of the enterprise?", ["Planning", "Staffing", "Directing", "Controlling"], 2, "Directing sets people in motion; the others are preparation.", 2],
  ["What is the third step in the controlling cycle?", ["Set standards", "Measure performance", "Compare performance with standards", "Take corrective action"], 2, "Set, measure, compare, correct.", 2],
  ["Management anticipating problems and preventing them is:", ["Feedforward control", "Concurrent control", "Feedback control", "Post control"], 0, "Feedforward control acts before problems occur.", 2],
  ["Detecting variances while operations are ongoing is:", ["Feedforward control", "Concurrent control", "Feedback control", "Budget control"], 1, "Concurrent control happens during the activity.", 2],
  ["The course regards coordination as:", ["A separate sixth function", "The essence of managership", "A staff role", "Part of staffing"], 1, "Each function contributes to coordination.", 2],
  // 3 Levels & types
  ["First-line managers are responsible for:", ["Managing non-managers", "Managing through other managers", "Setting long-term plans", "Approving capital budgets"], 0, "They supervise workers directly.", 3],
  ["Who hires, monitors, evaluates and fires the managing director?", ["The marketing department", "The board of directors", "First-line supervisors", "The union"], 1, "That is a core power of the board.", 3],
  ["Which skill is most important for top managers?", ["Technical", "Conceptual", "Manual", "Clerical"], 1, "Top managers must see the organization as a whole system.", 3],
  ["Which skill is most important at supervisory level?", ["Technical", "Conceptual", "Political", "Financial"], 0, "Supervisors deal directly with work methods.", 3],
  ["Top managers spend more of their time on:", ["Leading", "Planning and organizing", "Operating machines", "Inspection"], 1, "First-line supervisors spend more time leading.", 3],
  ["Which manager plans, prices and promotes products and makes them available to customers?", ["Financial manager", "Marketing manager", "IT manager", "Administrative manager"], 1, "That's marketing management.", 3],
  ["Which manager implements, maintains and controls technology applications?", ["IT manager", "Financial manager", "Administrative manager", "HR manager"], 0, "Information technology management.", 3],
  ["The type of manager who talks a lot and dominates every discussion is the:", ["Silent type", "Lion-hearted manager", "Railroad type", "Perfectionist"], 1, "He rarely offers specific solutions.", 3],
  ["The manager who insists things be done the way they always were is the:", ["Historically minded type", "Keep-it-simple type", "One-track manager", "Autocratic type"], 0, "He rose through the ranks and refers to past decisions.", 3],
  ["The manager who blames every problem on one cause, such as lack of money, is the:", ["One-track manager", "Horn of the dilemma type", "Silent type", "Lion-hearted"], 0, "Such a manager needs counselling, say the notes.", 3],
  ["When an engineer enters management, which is hard to acquire?", ["Learning to trust others", "Learning to work through others", "Taking satisfaction in others' work", "All of the above"], 3, "All three adjustments are difficult.", 3],
  // 4 Leadership
  ["The process of influencing and supporting others to work enthusiastically toward objectives is:", ["Power", "Leadership", "Teamwork", "Charisma"], 1, "That is the definition of leadership.", 4],
  ["A leader who centralizes all decision-making power is:", ["Democratic", "Autocratic", "Laissez-faire", "Participative"], 1, "Autocrats 'tell' employees what to do.", 4],
  ["Which describes the free-rein style's main drawback?", ["Little managerial control and high risk", "Too many meetings", "Leader decides everything", "No delegation"], 0, "Subordinates have a free hand, so control is low.", 4],
  ["The managerial grid was developed by:", ["Taylor and Fayol", "Blake and Mouton", "Mayo and Follett", "Koontz and O'Donnell"], 1, "Robert Blake and Jane Mouton, 1964.", 4],
  ["A person in a higher position has power over those below. This is:", ["Legitimate power", "Referent power", "Coercive power", "Reward power"], 0, "Legitimate power comes from position.", 4],
  ["Compliance through threats or punishment is:", ["Legitimate power", "Referent power", "Coercive power", "Reward power"], 2, "Coercive power relies on punishment.", 4],
  ["Compliance because people want to be identified with the leader is:", ["Legitimate power", "Referent power", "Coercive power", "Reward power"], 1, "Referent power comes from admiration.", 4],
  ["Which is NOT a trait of an effective leader?", ["High personal drive", "Knowledge of the industry", "Charisma", "Greed"], 3, "Greed is not a leadership trait.", 4],
  ["Mintzberg grouped his ten roles into:", ["Interpersonal, informational and decisional", "Planning, organizing and controlling", "Top, middle and lower", "Line, staff and functional"], 0, "Three groups of roles.", 4],
  // 5 Viable organization
  ["Creating a viable organization involves:", ["Avoiding mistakes by planning", "Avoiding inflexibility", "Making staff work effective", "All of the above"], 3, "Plus clarification, understanding and culture: six steps.", 5],
  ["If available people don't fit the ideal structure, the notes say you should:", ["Fire them all", "Modify the structure for the human factor", "Ignore the problem", "Copy another company"], 1, "Planning for the ideal is followed by modification for the human factor.", 5],
  ["Ways to avoid organizational inflexibility include:", ["Reorganization and accepting the need for readjustment and change", "Avoiding all change", "Centralizing everything", "Adding more levels"], 0, "Reorganize and readjust as the environment changes.", 5],
  ["Conflict in organizations is reduced by clarification through:", ["Organization charts and accurate job descriptions", "Secret instructions", "Fewer managers", "Longer meetings"], 0, "Spell out roles, authority and goals.", 5],
  ["In 'Environment B' culture, communication flows:", ["Only top-down", "Top-down, bottom-up, horizontally and diagonally", "Only bottom-up", "Not at all"], 1, "Environment B is participative and open.", 5],
  ["The 'Friday evening football gang' is an example of:", ["Formal organization", "Informal organization", "A standing committee", "A division"], 1, "Informal relationships not on the chart.", 5],
  ["For a role to be meaningful it must include:", ["Verifiable objectives", "Clear major duties", "An understood area of authority", "All of the above"], 3, "All three are required.", 5],
  // 6 Productivity
  ["Productivity is:", ["Input / Output", "Output / Input", "Output minus Input", "Output x Input"], 1, "The output-input ratio within a period, with regard for quality.", 6],
  ["The ratio of output to material input is:", ["Labour productivity", "Capital productivity", "Material productivity", "Total productivity"], 2, "Partial productivity using material as the single input.", 6],
  ["A job due in 15 days is finished in 15 days. The engineer is:", ["Efficient", "Effective", "Reliable", "Qualified"], 1, "Effectiveness is achieving the objective.", 6],
  ["Using less labour and materials for the same output makes an engineer more:", ["Effective", "Efficient", "Economical only", "Famous"], 1, "Efficiency is the least resources for the end.", 6],
  ["The simplified model of performance appraisal includes:", ["Comprehensive review", "Progress or periodic reviews", "Continuous monitoring", "All of the above"], 3, "All three kinds of review.", 6],
  ["A formal comprehensive appraisal should be conducted at least:", ["Every ten years", "Once a year", "Once a decade", "Never"], 1, "Supplemented by frequent periodic reviews.", 6],
  ["An employee's need for food, drink and rest is a:", ["Physiological need", "Security need", "Esteem need", "Self-actualization need"], 0, "The base of Maslow's hierarchy.", 6],
  ["Activating, sustaining and directing behaviour toward a goal is:", ["Suppression", "Motivation", "Praising", "Unification"], 1, "That is the definition of motivation.", 6],
  ["Which is NOT a theory of motivation?", ["Maslow's hierarchy", "Expectancy theory", "Herzberg's two-factor theory", "Gagarin's theory"], 3, "There is no Gagarin's theory of motivation.", 6],
  ["Instilling commitment and enthusiasm in the workforce is a principal function of lower management called:", ["Directing", "Motivating", "Staffing", "Controlling"], 1, "Motivating, per the WTE answer.", 6],
  // 7 Organizing & structures
  ["Grouping related jobs, activities or processes into major subunits is:", ["Division of labour", "Delegation", "Departmentation", "Span of control"], 2, "Departmentation creates departments.", 7],
  ["Deciding the scope of work and how it is combined in a job is:", ["Division of labour", "Delegation", "Departmentation", "Span of control"], 0, "Division of labour.", 7],
  ["Partitioning an organization into subunits to improve efficiency is:", ["Segmentation", "Departmentalization", "Territorialization", "Division of labour"], 1, "Departmentalization.", 7],
  ["Weber's characteristics of bureaucracy include:", ["Clearly defined roles, hierarchy and respect for merit", "No rules", "Consensus decisions only", "No hierarchy"], 0, "Those are Weber's three listed features.", 7],
  ["Which structure leads to a 'dual boss' situation?", ["Functional", "Matrix", "Process", "Product"], 1, "Employees report to two managers.", 7],
  ["Which structure provides a sound basis for balancing the use of human resources and skills?", ["Functional", "Matrix", "Process", "Product"], 1, "The matrix balances resources across projects.", 7],
  ["A disadvantage of a matrix organization is:", ["Dual accountability of personnel", "Rapid reaction", "Efficient specialists", "Single customer contact"], 0, "Also conflict between project and functional managers.", 7],
  ["A disadvantage of a functional organization is:", ["Weak customer interface", "Too many bosses", "Expensive specialists", "Too flexible"], 0, "Functional silos communicate poorly with customers.", 7],
  ["In which organization is the project manager responsible for completion and given a budget?", ["Functional", "Matrix", "Projectized", "Process"], 2, "Projectized organizations give the PM full authority.", 7],
  ["Organization by division bringing together everyone for a product or customer is:", ["Functional", "Product or market organization", "Matrix", "Virtual"], 1, "Divisional (product/market) structure.", 7],
  ["A committee created for a short-term purpose is:", ["Ad hoc committee", "Standing committee", "Board", "Council"], 0, "Ad hoc committees have a limited life.", 7],
  ["A permanent committee dealing with ongoing issues is:", ["Ad hoc committee", "Standing committee", "Sinking committee", "Midget committee"], 1, "Standing committees are permanent.", 7],
  ["A diagram of official positions and formal lines of authority is the:", ["Organization chart", "Authority chart", "Control chart", "Gantt chart"], 0, "The organization chart.", 7],
  // 8 Span & delegation
  ["A wide span of management is associated with:", ["Many organizational levels", "Few organizational levels", "No managers", "Higher costs"], 1, "Wide span = flat; narrow span = tall.", 8],
  ["Which is a problem with many organizational levels?", ["They are expensive", "They complicate communication", "They complicate planning and control", "All of the above"], 3, "All three problems are listed.", 8],
  ["The right in a position to exercise discretion in decisions affecting others is:", ["Power", "Authority", "Leadership", "Charisma"], 1, "Authority is power in an organizational setting.", 8],
  ["A consultant giving advice to his superior is using:", ["Line authority", "Staff authority", "Functional authority", "Top authority"], 1, "Staff authority is advisory.", 8],
  ["A specialist's right to oversee personnel in that specialty anywhere in the organization is:", ["Line authority", "Staff authority", "Functional authority", "Head authority"], 2, "Functional authority.", 8],
  ["'The clearer the line of authority from the top to every subordinate, the clearer the responsibility.' This is the:", ["Unity of command", "Scalar principle", "Span principle", "Exception principle"], 1, "The scalar principle.", 8],
  ["The tendency to disperse decision-making authority is:", ["Centralization", "Decentralization", "Departmentation", "Coordination"], 1, "Decentralization is fundamental to delegation.", 8],
  ["The process of delegation involves:", ["Determining expected results", "Assigning tasks", "Delegating authority and holding the person responsible", "All of the above"], 3, "Four steps in all.", 8],
  ["A manager with little 'NIH factor' shows which attitude toward delegation?", ["Receptiveness", "Willingness to let go", "Distrust", "Rigidity"], 0, "Receptiveness means welcoming others' ideas.", 8],
  ["The amount of resources a manager can allocate without approval measures their:", ["Responsibility", "Leadership", "Authority", "Trade-off skill"], 2, "That is the measure of authority.", 8],
  // 9 Theories
  ["Scientific management is associated with:", ["Elton Mayo", "Frederick Taylor", "Mary Parker Follett", "Henry Mintzberg"], 1, "Taylor, the American industrial engineer.", 9],
  ["Fayol's principle that workers receive orders from only one manager is:", ["Unity of direction", "Unity of command", "Scalar chain", "Order"], 1, "Unity of command.", 9],
  ["Fayol's principle of encouraging harmony and good feeling among employees is:", ["Equity", "Initiative", "Esprit de corps", "Order"], 2, "Esprit de corps means team spirit.", 9],
  ["Who called the confusing variety of approaches 'the management theory jungle'?", ["Harold Koontz", "Peter Drucker", "Max Weber", "Henri Fayol"], 0, "Harold Koontz.", 9],
  ["The approach that says 'there is no one best way' and practice depends on circumstances is:", ["Empirical", "Contingency (situational)", "Mathematical", "Reengineering"], 1, "Contingency theory.", 9],
  ["The approach that sees organizations as open systems interacting with their environment is:", ["Systems approach", "Decision theory", "Case approach", "Group behaviour"], 0, "Systems approach.", 9],
  ["Fundamental rethinking and radical redesign for dramatic results describes:", ["TQM", "Reengineering", "Contingency", "Sociotechnical"], 1, "Reengineering.", 9],
  ["Which is one of McKinsey's 7 S's?", ["Shared values", "Sales", "Speed", "Scale"], 0, "Strategy, structure, systems, style, staff, shared values, skills.", 9],
  // 10 Planning & forecasting
  ["Strategic planning is undertaken by:", ["Lower management", "Middle management", "Top management", "Workers"], 2, "Long-range strategy comes from the top.", 10],
  ["Middle management undertakes:", ["Intermediate planning", "Strategic planning", "Operational planning", "Direct planning"], 0, "Tactical/intermediate planning.", 10],
  ["Determining how specific tasks are best done on time is:", ["Operational planning", "Intermediate planning", "Strategic planning", "Secondary planning"], 0, "Operational planning, a lower-management job.", 10],
  ["Plans used again and again for recurring situations are:", ["Single-use plans", "Standing plans", "Budgets", "Programs"], 1, "Policies, procedures and rules.", 10],
  ["Plans describing the exact series of actions to take are:", ["Policies", "Procedures", "Rules", "Goals"], 1, "Procedures.", 10],
  ["Statements that either require or forbid an action are:", ["Policies", "Procedures", "Rules", "Programs"], 2, "Rules.", 10],
  ["A plan designed to coordinate a large set of activities is a:", ["Project", "Budget", "Program", "Policy"], 2, "A program; projects are narrower.", 10],
  ["A plan setting projected expenditure and where funds will come from is a:", ["Project", "Budget", "Program", "Financial statement"], 1, "A budget.", 10],
  ["The two types of forecasting in the notes are:", ["Short-term and long-term", "Medium and short", "Daily and weekly", "Annual and decade"], 0, "Short (3 to 12 months) and long (5 to 20 years).", 10],
  ["Short-term forecasting covers:", ["1 to 2 weeks", "3 to 12 months", "5 to 20 years", "50 years"], 1, "Three to twelve months.", 10],
  ["A good forecasting method must be:", ["Fairly accurate", "Simple to use", "Cost-conscious", "All of the above"], 3, "All three characteristics.", 10],
  ["Which is a forecasting method?", ["Polling of salesmen", "Survey of buyers", "Economic indicators", "All of the above"], 3, "Plus statistical methods.", 10],
  ["The last step of the forecasting procedure is:", ["State the problem", "Choose a method", "Cross-check values for consistency", "Set objectives"], 2, "Cross-checking ensures consistency.", 10],
  // 11 Techniques
  ["The most essential attribute of a project manager is:", ["Leadership", "Charisma", "Communication skill", "Knowledge"], 0, "Per the CBT and WTE answers.", 11],
  ["Which network technique uses three time estimates per activity?", ["CPM", "PERT", "Gantt", "Forecasting"], 1, "PERT: optimistic, most likely, pessimistic.", 11],
  ["Which network technique uses one time estimate per activity?", ["CPM", "PERT", "Simulation", "Sampling"], 0, "The Critical Path Method.", 11],
  ["Which is NOT one of the five goals of a project manager?", ["Finish on time", "Finish under budget", "Maximize team size", "Keep customers happy"], 2, "The five: time, budget, requirements, happy customers, happy team.", 11],
  ["Determining the number of service units that minimizes waiting time and service cost uses:", ["Queuing theory", "Network model", "Sampling theory", "Simulation"], 0, "Queuing theory.", 11],
  ["Evaluating alternatives using intuition and subjective judgement is:", ["Quantitative evaluation", "Qualitative evaluation", "Relative evaluation", "Statistical evaluation"], 1, "Qualitative evaluation.", 11],
  ["The first step in decision making is to:", ["Make a choice", "Articulate the problem or opportunity", "Evaluate results", "Analyze the environment"], 1, "Start by defining the problem.", 11],
  ["Buying insurance is a form of:", ["Risk elimination", "Risk reduction", "Risk sharing", "Risk absorption"], 2, "Insurance shares/transfers risk.", 11],
  ["Creating a management reserve or extra schedule time means the manager decided to:", ["Avoid the risk", "Absorb the risk", "Share the risk", "Ignore the risk"], 1, "Buffers absorb risk.", 11],
  ["In SMEAC, the 'A' stands for:", ["Application", "Administration", "Action", "Analysis"], 1, "Situation, Mission, Execution, Administration, Communication.", 11],
  ["Which is NOT an element of the project management process?", ["Data and information", "Research and development", "Decision making", "Implementation and action"], 1, "R&D is not listed as a process element.", 11],
  // 12 Production
  ["Production management is:", ["Planning and regulating the operations that transform materials into finished products", "Selling products", "Hiring staff", "Auditing accounts"], 0, "That is its definition.", 12],
  ["Which is one of the 5 Ps of production management?", ["Price", "Plant", "Promotion", "Place"], 1, "Products, Plant, Process, Programs, People.", 12],
  ["Which is NOT an objective of production management?", ["Right quality", "Right quantity", "Unplanned time", "Pre-established cost"], 2, "The objective is predetermined time.", 12],
  ["Developing timetables specifying how long each operation takes is:", ["Plotting", "Scheduling", "Dispatching", "Routing"], 1, "Scheduling.", 12],
  ["Establishing and maintaining appropriate reserve stock levels is:", ["Work-flow layout", "Quality control", "Inventory control", "Purchasing"], 2, "Inventory control.", 12],
  ["Determining the physical arrangement of the production system is:", ["Work-flow layout", "Quality control", "Inventory control", "Scheduling"], 0, "Work-flow layout.", 12],
  ["Cement, sugar and steel plants are examples of:", ["Jobbing production", "Batch production", "Process production", "Project production"], 2, "A single product made continuously.", 12],
  ["A tailoring shop or repair shop is an example of:", ["Jobbing production", "Mass production", "Process production", "Flow production"], 0, "Made to customer specification.", 12],
  ["Roads and buildings are examples of:", ["Project production", "Batch production", "Mass production", "Process production"], 0, "Definite start and end.", 12],
  ["Which is NOT one of the four Ps of marketing?", ["Product", "Price", "Promotion", "Publicity"], 3, "The four Ps are product, price, place, promotion.", 12],
  ["Paid mass-media messages informing or persuading people are:", ["Advertising", "Publicity", "Personal selling", "Sales promotion"], 0, "Advertising is paid; publicity isn't.", 12],
  // 13 Staffing & communication
  ["Attracting qualified persons to apply for vacant positions is:", ["Forecasting", "Recruitment", "Selection", "Training"], 1, "Recruitment.", 13],
  ["Choosing from applicants those most likely to succeed is:", ["Recruitment", "Selection", "Induction", "Appraisal"], 1, "Selection.", 13],
  ["Introducing a new employee to the company and co-workers is:", ["Performance appraisal", "Induction and orientation", "Training", "Promotion"], 1, "Induction and orientation.", 13],
  ["Learning provided to improve performance on the present job is:", ["Training", "Development", "Vestibule", "Specialized courses"], 0, "Development prepares for future roles.", 13],
  ["Moving to a different job at the same level of responsibility is:", ["Promotion", "Transfer", "Demotion", "Separation"], 1, "Transfer.", 13],
  ["A test measuring a person's current knowledge of a subject is a:", ["Interest test", "Aptitude test", "Performance test", "Personality test"], 2, "Performance test.", 13],
  ["The communication function concerned with repressed feelings and anxiety is the:", ["Information function", "Emotive function", "Motivation function", "Control function"], 1, "Emotive function.", 13],
  ["Communication through body language, time, space and appearance is:", ["Verbal", "Oral", "Written", "Nonverbal"], 3, "Nonverbal.", 13],
  ["Conflict over territorial power or hidden agendas is:", ["Technical opinion conflict", "Politics", "Ambiguous roles", "Procedural conflict"], 1, "Politics.", 13],
  // 14 Safety
  ["Undesired circumstances giving rise to injury, damage or production losses are:", ["An incident", "An accident", "A hazard", "A risk"], 1, "Accident.", 14],
  ["A 'near miss' is classified as:", ["An accident", "An incident", "Ill health", "A hazard"], 1, "Incidents include near misses.", 14],
  ["The potential to cause harm is a:", ["Hazard", "Risk", "Incident", "Loss"], 0, "Hazard.", 14],
  ["The likelihood that a specified undesired event will occur is:", ["Hazard", "Risk", "Accident", "Danger"], 1, "Risk is not directly observable.", 14],
  ["Safety is defined in the notes as:", ["The absence of rules", "The control of accidental loss", "Insurance", "Wearing helmets"], 1, "The control of accidental loss.", 14],
  ["Which is NOT one of the three main reasons for preventing accidents?", ["Moral", "Cost", "Legislation", "Advertising"], 3, "Moral, cost and legal reasons.", 14],
  ["How many people died in the Piper Alpha disaster?", ["67", "167", "1,670", "16"], 1, "167 people, costing over £2 billion.", 14],
  ["The largest share of fatal quarry accidents (1983-93) was caused by:", ["Conveyors", "Vehicles", "Overhead lines", "Crushers"], 1, "Vehicles caused 41%.", 14],
]
, [
  ["Management (course definition)", "Designing and maintaining an environment in which people in groups efficiently accomplish selected aims.", 1],
  ["What management needs", "Objective, resources, methods, organizational setting, people.", 1],
  ["Science or art?", "Both: the practice is an art; the organized knowledge is a science.", 1],
  ["Seven features of management", "Economic resource, goal oriented, distinct process, integrative force, system of authority, multi-disciplinary, universal.", 1],
  ["Goal of all managers", "To create a surplus with the least time, money, materials and dissatisfaction.", 1],
  ["Five functions (Koontz & O'Donnell)", "Planning, Organizing, Staffing, Directing, Controlling.", 2],
  ["POSDCORB", "Planning, Organizing, Staffing, Directing, Co-ordinating, Reporting, Budgeting (Gulick).", 2],
  ["Four elements of directing", "Supervision, motivation, leadership, communication.", 2],
  ["Steps of controlling", "Set standards, measure performance, compare and find deviations, take corrective action.", 2],
  ["Feedforward / concurrent / feedback control", "Before (prevent) / during (detect) / after (evaluate) the activity.", 2],
  ["Three levels of management", "Top (strategy), middle (tactics), first-line (supervise non-managers).", 3],
  ["Skills by level", "Conceptual: top. Human: all levels. Technical: supervisory.", 3],
  ["Board of directors' powers", "Set policy, adopt bylaws, name committees, hire/fire the MD, set dividends, issue shares.", 3],
  ["Lion-hearted manager", "Talks a lot, dominates discussion, offers no specific solutions.", 3],
  ["Historically minded manager", "Rose through the ranks; does things the way they were always done.", 3],
  ["Leadership styles", "Autocratic, democratic (participative), laissez-faire (free-rein); also narcissistic and toxic.", 4],
  ["Managerial grid", "Blake and Mouton (1964): concern for people vs concern for production.", 4],
  ["Four sources of power", "Legitimate (position), reward, coercive (threats), referent (identification).", 4],
  ["Mintzberg's role groups", "Interpersonal, informational, decisional: ten roles.", 4],
  ["Six steps to a viable organization", "Plan (avoid mistakes), avoid inflexibility, effective staff work, clarify, ensure understanding, right culture.", 5],
  ["Informal organization", "Personal relationships not on the chart, e.g. the 'morning tea regulars'.", 5],
  ["Three things every role needs", "Verifiable objectives, clear duties, an understood area of authority.", 5],
  ["Productivity", "Output / Input within a time period, with regard for quality.", 6],
  ["Partial productivity measures", "Output divided by labour, capital, material or energy input.", 6],
  ["Effectiveness vs efficiency", "Achieving the objective vs achieving it with the least resources.", 6],
  ["Three kinds of appraisal review", "Comprehensive (yearly), progress/periodic, continuous monitoring.", 6],
  ["Rewards managers want", "Opportunity, power, income.", 6],
  ["Departmentation", "Grouping related jobs or activities into major subunits.", 7],
  ["Matrix structure", "Reports to both functional and project managers; dual boss; weak, balanced or strong forms.", 7],
  ["Weber's bureaucracy", "Clearly defined roles, hierarchy, respect for merit.", 7],
  ["Ad hoc vs standing committee", "Short-term, limited life vs permanent, ongoing.", 7],
  ["Span of control and levels", "Wide span = few levels (flat); narrow span = many levels (tall).", 8],
  ["Power vs authority", "Ability to influence vs right in a position to make decisions affecting others.", 8],
  ["Scalar principle", "Clearer line of authority from top to bottom = clearer responsibility and better communication.", 8],
  ["Four steps of delegation", "Determine results, assign tasks, delegate authority, hold responsible.", 8],
  ["Five attitudes toward delegation", "Receptiveness, letting go, allowing mistakes, trusting, using broad controls.", 8],
  ["Fayol's unity of command", "Each worker receives orders from only one manager.", 9],
  ["Esprit de corps", "Fayol's principle of harmony and team spirit.", 9],
  ["Contingency approach", "There is no one best way; practice depends on the situation.", 9],
  ["McKinsey 7-S", "Strategy, structure, systems, style, staff, shared values, skills.", 9],
  ["Strategic / tactical / operational plans", "Top, 2-10 yrs / middle, about a year / lower, day-to-day.", 10],
  ["Standing plans", "Policies (guidelines), procedures (exact steps), rules (require or forbid).", 10],
  ["Single-use plans", "Program (large set of activities), project (narrower), budget (spend and funding).", 10],
  ["Forecasting types", "Short-term (3-12 months) and long-term (5-20 years).", 10],
  ["Four forecasting methods", "Polling of salesmen, survey of buyers, economic indicators, statistical methods.", 10],
  ["Five goals of a project manager", "On time, under budget, meet requirements, happy customers, happy team.", 11],
  ["CPM vs PERT", "One time estimate per activity vs three (optimistic, most likely, pessimistic).", 11],
  ["Queuing theory", "Finds the number of service units minimizing waiting time and service cost.", 11],
  ["Four risk responses", "Avoid, reduce, share (insurance), absorb (buffers).", 11],
  ["SMEAC", "Situation, Mission, Execution, Administration, Communication.", 11],
  ["5 Ps of production management", "Products, Plant, Process, Programs, People.", 12],
  ["Objectives of production management", "Right quality, right quantity, predetermined time, pre-established cost.", 12],
  ["PPC functions", "Materials, machines, methods, routing, estimating, scheduling, dispatching, expediting, inspection, evaluation.", 12],
  ["Five types of production", "Jobbing, batch, mass/flow, process, project.", 12],
  ["4 Ps of marketing", "Product, Price, Place, Promotion.", 12],
  ["Staffing sequence", "Forecasting, programming, recruitment, selection, induction, training, appraisal, evaluation.", 13],
  ["Promotion / transfer / demotion / separation", "Up / across / down / out of the organization.", 13],
  ["Four functions of communication", "Information, motivation, emotive, control.", 13],
  ["Hazard vs risk", "Potential to cause harm vs likelihood that it happens.", 14],
  ["Accident vs incident", "Event causing harm or loss vs event (including near miss) that could cause one.", 14],
  ["Three reasons to prevent accidents", "Moral/humane, cost, legislation.", 14],
  ["Piper Alpha", "167 killed; over £2 billion cost, £746 million insurance payouts.", 14],
]);
