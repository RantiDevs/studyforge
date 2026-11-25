import { buildCourse } from "../build";

/* ABE 573 Engineer in Society. Built from: ABE 573 class note (Nov-Dec 2024), ABE573 Lecturer Note
   (papers on engineering education/training in Nigeria and engineering's role in national development),
   ABE573 Past Questions. */

export default buildCourse("ABE573", [
  ["Society, Philosophy and Science", "prerequisite",
    `<h2>Where it all starts</h2>
<p><strong>Society</strong> is a group of people living together with the same interests under the same law.</p>
<p><strong>Philosophy</strong> comes from the Greek <em>philosophia</em>, "love of wisdom". The course studies three philosophers: <strong>Socrates</strong> (469 to 399 BC), <strong>Plato</strong> and <strong>Aristotle</strong>.</p>
<p>Socrates taught that you must recognise your own ignorance, be humble, accept that no one knows everything or is above mistakes, and that <strong>knowledge is power, freedom and wealth</strong>. There is no profit in arrogance.</p>
<h3>Science</h3>
<p>From the Greek <em>scientia</em>, "knowledge". Science is a systematic enterprise that builds and organizes knowledge as <strong>testable explanations and predictions</strong> about the universe, gained through observation and experiment.</p>
<p><strong>The scientific method:</strong> state the problem, collect data, form a hypothesis, test the hypothesis, draw conclusions.</p>
<p><strong>Three attributes of science:</strong> it can explain what has been observed, predict what has not yet been observed, and test those explanations with new data.</p>
<p>Science is classified by subject matter into <strong>natural science</strong> (physical and biological) and <strong>social science</strong> (economics, sociology, commerce).</p>`,
    ["society", "philosophy", "Socrates", "scientific method", "hypothesis"],
    "Philosophy means love of wisdom; Socrates taught humility and that knowledge is power. Science (scientia, knowledge) explains, predicts and tests, using the scientific method from problem to conclusion."],

  ["Technology and Engineering", "prerequisite",
    `<h2>Technology</h2>
<p>From the Greek <em>technologia</em>: <em>techne</em> (art, skill, craft) plus <em>logia</em> (study of). Technology is the making, use and knowledge of tools, machines, techniques and methods of organization to solve a problem or perform a function. It gives us the ability to control and adapt to our environment.</p>
<h3>Engineering</h3>
<p>Engineering is the profession in which knowledge of the mathematical and natural sciences, gained by study, experience and practice, is applied with <strong>judgement</strong> to develop ways of using the materials and forces of nature <strong>economically for the benefit of mankind</strong>.</p>
<p>The word comes from the Latin <em>ingenium</em>, meaning ingenuity or cleverness.</p>
<p>Engineering work covers research and development, design, construction, manufacture, installation, operation, sales and distribution.</p>
<h3>COREN's definition of engineering practice</h3>
<p>Any professional service or creative work requiring special knowledge of mathematics, physics and engineering: consultation, invention, research, teaching, planning, operation, maintenance, supervision of construction, designing, testing and commissioning of public utilities, structures, machines and works.</p>`,
    ["technology", "engineering", "ingenium", "COREN"],
    "Technology (techne + logia) is the knowledge and use of tools and methods. Engineering applies maths and science with judgement to use nature's materials and forces economically for mankind's benefit."],

  ["The Engineering Family and Registration", "module",
    `<h2>Four cadres (plus artisans)</h2>
<p>The engineering family is a <strong>pyramid</strong>: <strong>Engineers</strong> at the top, then <strong>Engineering Technologists</strong>, <strong>Engineering Technicians</strong> and <strong>Engineering Craftsmen</strong>. Artisans are unclassified. Each has a defined role, and no member is inferior in a team.</p>
<h3>Recommended ratios</h3>
<ul>
<li>Desirable ratio in an establishment: <strong>1 Engineer : 8 Technologists : 16 Technicians</strong>.</li>
<li>NSE (1980): <strong>1 : 6 : 60</strong> for Engineer : Technologist/Technician : Craftsman.</li>
<li>Okpalauwaekwe (2015): 1 : 5 : 40 : 4880 for the first phase of industrialization.</li>
</ul>
<p>Nigeria has the pyramid upside down: everyone wants to be an engineer, so universities and polytechnics have more students than technical and vocational colleges.</p>
<h3>Becoming a Registered Engineer</h3>
<p>You are not an engineer in Nigeria until your name is on the <strong>COREN register</strong>. You need both:</p>
<ul>
<li><strong>Academic qualification</strong>: at least a bachelor's degree in engineering from an accredited institution.</li>
<li><strong>Professional qualification</strong>: about four years of <strong>pupilage</strong> under an experienced Registered Engineer, then the professional exam by <strong>COREN or NSE</strong>.</li>
</ul>
<p>Registered engineers get a number starting with <strong>R</strong>. Engineers train roughly 75% formally and 25% practically; technologists about 60/40.</p>
<p><strong>SITSIE</strong> (Supervised Industrial Training Scheme in Engineering) is COREN's mandatory one-year internship immediately after graduation, before NYSC.</p>`,
    ["engineering family", "technologist", "technician", "craftsman", "pupilage", "SITSIE"],
    "Four cadres: engineer, technologist, technician, craftsman. Desirable ratio 1:8:16. Registration needs a degree, about four years of pupilage and the COREN/NSE exam. SITSIE is a one-year internship after graduation."],

  ["Roles of Each Cadre", "module",
    `<h2>Who does what</h2>
<ul>
<li><strong>Engineer</strong>: thinks in the abstract and links events that are not obviously connected. Plans, teaches, researches, designs and develops products and projects, and gives professional guidance in running complex plants. Heads the engineering establishment.</li>
<li><strong>Engineering Technologist</strong>: the technical supervisor. Applies known and proven techniques in executing and managing engineering works, solves practical problems in workshops and labs, and assists the engineer in design. Qualifies with a degree in engineering technology or an HND; professional body <strong>NATE</strong> (Nigerian Association of Technologists in Engineering).</li>
<li><strong>Engineering Technician</strong>: has specialized knowledge of a specific area and can do simple designs. Handles fault diagnosis, day-to-day operation and maintenance, and works as a foreman. <strong>Bridges the gap between craftsmen and engineers</strong>, translating the engineer's language for the craftsmen. Qualifies with an OND/ND or FTC.</li>
<li><strong>Craftsman</strong>: the skilled operator who carries out the hands-on work. Trained in technical colleges, tested through trade tests.</li>
</ul>
<h3>The fusion-of-roles problem</h3>
<p>When the cadres' roles blur, unqualified people end up practising engineering. The result is confusion, diluted standards, and accidents such as building collapses.</p>`,
    ["engineer", "technologist", "technician", "craftsman", "NATE", "foreman"],
    "Engineers plan, design and lead; technologists supervise and apply proven techniques; technicians bridge craftsmen and engineers and handle operation and maintenance; craftsmen do the hands-on work."],

  ["Ethics, Codes and Professional Bodies", "module",
    `<h2>Codes and standards</h2>
<p>Engineering ethics and the code of conduct guide relationships between engineers and their <strong>clients</strong>, the <strong>public</strong> and their <strong>colleagues</strong>. They protect people from injury (safety first), give engineers a better working environment, and build public confidence in the profession.</p>
<h3>Three groups of duties</h3>
<ul>
<li><strong>Duty to the client</strong>: serve faithfully and work only within your area of competence.</li>
<li><strong>Duty to the public</strong>: hold public safety paramount; report anything that endangers it to the appropriate authority.</li>
<li><strong>Duty to colleagues</strong>: support their professional development, credit their work, and report violations of the code.</li>
</ul>
<h3>Professional bodies</h3>
<ul>
<li><strong>COREN</strong> (Council for the Regulation of Engineering in Nigeria): the legal regulator for all cadres except artisans; keeps the register.</li>
<li><strong>NSE</strong> (Nigerian Society of Engineers): split into institutes such as NIMechE and NICE; conducts membership exams (MNSE, GMNSE).</li>
<li><strong>NATE</strong>: the body for engineering technologists.</li>
</ul>
<h3>A short history</h3>
<p>The first engineering was <strong>military engineering</strong>. Civilians taking on non-military works gave rise to <strong>civil engineering</strong>, and the field later split into many branches to allow specialization.</p>`,
    ["ethics", "code of conduct", "public safety", "COREN", "NSE", "military engineering"],
    "Ethics covers duties to the client, the public and colleagues, with public safety paramount. COREN regulates and registers; NSE and NATE are professional bodies. Engineering began as military engineering."],

  ["Engineering Training Challenges in Nigeria", "module",
    `<h2>Why there are too few qualified engineering personnel</h2>
<p>The main reason given: <strong>lack of proper awareness and guidance</strong> on professional training requirements.</p>
<h3>Key problems</h3>
<ul>
<li>Poor funding, outdated equipment and too few practical facilities.</li>
<li>Students struggle to find industrial placements for practical training.</li>
<li><strong>Quackery</strong>: Nigeria has more quacks than registered professionals. Quacks undercut prices and undermine public confidence and safety.</li>
<li>Most pupils don't know that technical colleges exist, so vocational education is under-used.</li>
<li>Irregular accreditation of programmes makes registration harder for graduates.</li>
<li>Curricula that are too theoretical and fall out of date.</li>
</ul>
<h3>Recommended fixes</h3>
<ul>
<li>Educate the public about hiring qualified, registered personnel.</li>
<li>Build industry-university partnerships for practical training.</li>
<li>Review curricula continuously, balancing theory with practical skills and adding emerging technologies.</li>
<li>Promote technical and vocational education to rebalance the cadres.</li>
<li>Commit to continuous professional development: workshops, conferences, certifications.</li>
</ul>`,
    ["quackery", "accreditation", "vocational education", "continuous learning"],
    "Personnel shortages come mainly from poor awareness of training requirements. Quackery, weak facilities and theory-heavy curricula hurt the profession. The fixes are public education, industry partnerships, curriculum review and vocational training."],

  ["Engineering and National Development", "module",
    `<h2>Engineering's role in Nigeria's challenges</h2>
<p>Nigeria faces slow private-sector growth, insecurity, an undiversified economy, deteriorating infrastructure, corruption and climate change. Engineering's chief responsibility is <strong>managing the infrastructure</strong> that every sector depends on: roads, rail, ports and airports; water and sewage; power generation, transmission and distribution; oil and gas with local content; dams, irrigation and erosion control; ICT; and buildings.</p>
<h3>The way forward (Hassan and Bitrus, 2020)</h3>
<ul>
<li><strong>Human resource development</strong>: train every cadre to be productive. An engineer in a developing country should use their hands as well as their brain.</li>
<li><strong>A state of emergency</strong> on engineering institutions and infrastructure.</li>
<li><strong>Innovation and public-private partnerships (PPP)</strong>: citizens already pay for generators and boreholes, so they are willing to pay for better services.</li>
<li><strong>Good governance</strong>: participatory, accountable, transparent and following the rule of law. Engineers should contest political offices.</li>
<li><strong>Fighting corruption</strong> through bodies such as the <strong>EFCC</strong> and <strong>ICPC</strong>.</li>
<li><strong>Incentives</strong>: scholarships and good pay to attract young people, especially women, into engineering.</li>
</ul>
<p>Sustainability means considering environmental, social and economic impact from a project's very start.</p>`,
    ["infrastructure", "public private partnership", "good governance", "sustainability"],
    "Engineering manages the infrastructure every sector relies on. The way forward is human resource development, PPPs, good governance, fighting corruption, incentives, and sustainable design from the start."],
], [
  ["'Philosophy' comes from the Greek word meaning:", ["Love of science", "Love of wisdom", "Study of society", "Knowledge of tools"], 1, "Philosophia means love of wisdom.", 1],
  ["Which philosopher lived from 469 to 399 BC?", ["Plato", "Aristotle", "Socrates", "Newton"], 2, "The note dates Socrates to 469-399 BC.", 1],
  ["What is the first step of the scientific method?", ["Form a hypothesis", "State the problem", "Collect data", "Draw conclusions"], 1, "State the problem, collect data, form and test a hypothesis, then conclude.", 1],
  ["Which is NOT an attribute of science?", ["Explaining what is observed", "Predicting what is not yet observed", "Testing with new data", "Accepting claims without evidence"], 3, "Science explains, predicts and tests.", 1],
  ["'Techne' in technology means:", ["Study", "Art, skill or craft", "Machine", "Power"], 1, "Techne = art/skill/craft; logia = study of.", 2],
  ["The word 'engineering' derives from the Latin 'ingenium', meaning:", ["Engine", "Ingenuity or cleverness", "Machine work", "Hard labour"], 1, "Ingenium means ingenuity or cleverness.", 2],
  ["Engineering applies science to use nature's materials and forces:", ["For profit only", "Economically for the benefit of mankind", "For military use only", "Without judgement"], 1, "That is the classic definition in the note.", 2],
  ["The engineering family consists of:", ["Engineers and scientists", "Engineers, technologists, technicians and craftsmen", "Engineers and artisans only", "Managers and workers"], 1, "Four cadres, with artisans unclassified.", 3],
  ["What is the desirable ratio of engineering cadres in an establishment?", ["1 Engineer : 4 Technologists", "1 Engineer : 8 Technologists : 16 Technicians", "2 Engineers : 10 Technicians", "1 Engineer : 6 Technologists"], 1, "One Engineer to eight Technologists and sixteen Technicians.", 3],
  ["The NSE's 1980 ratio for Engineer : Technologist/Technician : Craftsman was:", ["1:8:16", "1:6:60", "1:5:40", "1:2:3"], 1, "NSE suggested 1:6:60 in 1980.", 3],
  ["Before COREN registration, a graduate engineer must undergo:", ["Pupilage under an experienced Registered Engineer", "A PhD", "Military service only", "Nothing further"], 0, "About four years of pupilage, then the COREN/NSE exam.", 3],
  ["SITSIE is:", ["A COREN exam", "A mandatory one-year internship after graduation, before NYSC", "A type of degree", "An NSE institute"], 1, "Supervised Industrial Training Scheme in Engineering.", 3],
  ["Which cadre bridges the gap between craftsmen and professional engineers?", ["Engineering Technologists", "Engineering Technicians", "Engineering Managers", "Artisans"], 1, "Technicians translate the engineer's language for craftsmen.", 4],
  ["Which cadre serves as the technical supervisor and applies proven techniques?", ["Engineer", "Technologist", "Craftsman", "Artisan"], 1, "Technologists supervise technicians and craftsmen.", 4],
  ["NATE is the professional body for:", ["Engineers", "Engineering Technologists", "Artisans", "Scientists"], 1, "Nigerian Association of Technologists in Engineering.", 4],
  ["The main concern about fusion of roles among cadres is that:", ["It saves money", "It causes role confusion and practice by unqualified people", "It improves teamwork", "It reduces paperwork"], 1, "Blurred roles dilute standards and lead to accidents.", 4],
  ["Engineering ethics serves as:", ["A marketing tool", "The foundation for professional conduct and responsibility", "An optional guideline", "A tax rule"], 1, "Ethics underpins professional conduct.", 5],
  ["An engineer discovers their project may compromise public safety. They should:", ["Ignore it to meet the deadline", "Report it to the appropriate authority or ethics committee", "Quietly resign", "Tell only the contractor"], 1, "Public safety is paramount.", 5],
  ["Which is NOT a duty to the client?", ["Serving faithfully", "Keeping the client informed", "Working outside your competence for more profit", "Giving honest advice"], 2, "Engineers must work only within their competence.", 5],
  ["Which body legally regulates engineering practice in Nigeria?", ["NSE", "COREN", "NATE", "NUC"], 1, "COREN keeps the register for all cadres except artisans.", 5],
  ["The first type of engineering practised was:", ["Civil", "Mechanical", "Military", "Electrical"], 2, "Civil engineering grew out of non-military works.", 5],
  ["The main reason for the lack of professional engineering personnel in Nigeria is:", ["Lack of interest", "Lack of awareness and guidance on training requirements", "Too much theory", "High fees"], 1, "Per the course papers.", 6],
  ["Which is NOT a challenge faced by engineering training in Nigeria?", ["Lack of modern equipment", "Poor funding", "Oversupply of engineers in the job market", "Poor motivation"], 2, "Oversupply is not listed; shortage is the problem.", 6],
  ["The recommended strategy against quackery is:", ["Lower licensing standards", "Public awareness about hiring qualified personnel", "Shorter training", "Pay only registered engineers"], 1, "Educating the public is key.", 6],
  ["Quackery's impact on the profession is that it:", ["Raises standards", "Undermines public confidence and safety", "Has no effect", "Creates jobs for engineers"], 1, "Quacks cause failures and erode trust.", 6],
  ["Theoretical knowledge in engineering education should be:", ["Removed", "Balanced with practical skills", "The only focus", "Taught after graduation"], 1, "Balance theory and practice.", 6],
  ["Outdated curricula should be addressed by:", ["Keeping them unchanged", "Integrating emerging technologies and current industry practice", "Removing practical work", "Shortening programmes"], 1, "Continuous curriculum review.", 6],
  ["Engineering's chief responsibility in national development is:", ["Politics", "Managing the infrastructure that supports all sectors", "Banking", "Tax collection"], 1, "Per Hassan and Bitrus (2020).", 7],
  ["PPP stands for:", ["Public-Private Partnership", "Private Project Planning", "Public Policy Programme", "Planned Production Process"], 0, "PPPs bring the private sector into infrastructure.", 7],
  ["Which bodies were set up to fight corruption in Nigeria?", ["COREN and NSE", "EFCC and ICPC", "NATE and NUC", "NYSC and SITSIE"], 1, "The EFCC and ICPC investigate corrupt practices.", 7],
  ["For sustainability, environmental considerations should enter a project:", ["After completion", "From the project's inception", "Only if required by law", "Never"], 1, "Integrate sustainable design from the start.", 7],
], [
  ["Philosophy", "From Greek 'philosophia': love of wisdom.", 1],
  ["Socrates' core lesson", "Recognise your ignorance and be humble; knowledge is power, freedom and wealth.", 1],
  ["Scientific method", "State problem, collect data, form hypothesis, test hypothesis, draw conclusions.", 1],
  ["Three attributes of science", "Explain the observed, predict the unobserved, test with new data.", 1],
  ["Technology (word origin)", "Techne (art, skill, craft) + logia (study of).", 2],
  ["Engineering (definition)", "Applying maths and science with judgement to use nature's materials and forces economically for mankind.", 2],
  ["Ingenium", "Latin root of 'engineering': ingenuity, cleverness.", 2],
  ["Four engineering cadres", "Engineer, Technologist, Technician, Craftsman (artisans unclassified).", 3],
  ["Desirable cadre ratio", "1 Engineer : 8 Technologists : 16 Technicians.", 3],
  ["NSE 1980 ratio", "1 : 6 : 60 (Engineer : Technologist/Technician : Craftsman).", 3],
  ["Pupilage", "About four years of supervised practice under a Registered Engineer before the COREN/NSE exam.", 3],
  ["SITSIE", "Supervised Industrial Training Scheme in Engineering: a one-year internship after graduation, before NYSC.", 3],
  ["Technician's bridging role", "Links craftsmen and engineers, translating the engineer's language to the craftsmen.", 4],
  ["Technologist's role", "Technical supervisor; applies known and proven techniques; assists in design.", 4],
  ["NATE", "Nigerian Association of Technologists in Engineering.", 4],
  ["Three groups of ethical duties", "To the client, to the public, to colleagues.", 5],
  ["COREN", "Council for the Regulation of Engineering in Nigeria: the legal regulator that keeps the register.", 5],
  ["NSE", "Nigerian Society of Engineers: conducts exams; has institutes such as NIMechE and NICE.", 5],
  ["Quackery", "Practice by unqualified people; undermines public confidence and safety.", 6],
  ["Main cause of personnel shortage", "Lack of awareness and guidance on professional training requirements.", 6],
  ["PPP", "Public-Private Partnership for infrastructure and service delivery.", 7],
  ["Good governance", "Participatory, accountable, transparent, responsive and following the rule of law.", 7],
]);
