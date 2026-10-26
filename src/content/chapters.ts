// Copy for the chapters after the train ride. Sourced from the CV
// (CV_M_Zulfi_Fahreza.pdf); nothing here is invented. Edit freely.

// ---------- Hall II · Selected work ----------

/** A small engineering drawing: columns of boxes, left to right, with arrows between columns. */
export type Plate = { columns: string[][]; note: string };

export type Exhibit = {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  /** The one figure that sums the work up. */
  figure: { value: string; label: string };
  medium: string;
  points: string[];
  plate: Plate;
};

export const exhibits: Exhibit[] = [
  {
    id: "arche",
    title: "Arche Framework",
    subtitle: "Internal AI delivery automation",
    context: "MGG Software · built with 2 other engineers",
    figure: { value: "Days → hours", label: "document turnaround" },
    medium: "TypeScript, Node.js, Python, PostgreSQL, Docker, multi-LLM",
    points: [
      "Turns a project's requirements into delivery artifacts: functional and technical documents, flowcharts and code scaffolding.",
      "Provider-agnostic LLM layer over 4+ model providers, with per-task model routing, automatic failover on provider errors, and per-run token and cost accounting.",
      "Agentic orchestration with a planner/executor split, tool calling, schema-constrained output and retry-with-repair, so every artifact comes out as validated structured output instead of free text.",
      "A diagram pipeline emits Mermaid and PlantUML from the same requirement model the documents use, so diagrams and specs cannot drift apart.",
      "Code generation from the technical spec scaffolds data models and API layers, gated behind human review before anything reaches the repository.",
    ],
    plate: {
      columns: [["Requirements"], ["Planner", "LLM router · 4+ providers"], ["Executor · tools"], ["Docs", "Mermaid / PlantUML", "Code scaffold"]],
      note: "every artifact reviewed against requirements before client sign-off",
    },
  },
  {
    id: "agentdeck",
    title: "AgentDeck",
    subtitle: "Self-hosted AI agent fleet orchestration",
    context: "Personal project",
    figure: { value: "1 binary", label: "no sidecar services" },
    medium: "Go, PostgreSQL 16, React 19, Docker",
    points: [
      "An orchestration board for AI agent fleets in Go and PostgreSQL 16: one binary, no sidecar services, deployed with Docker Compose.",
      "A per-run and per-step cost ledger in integer micro-USD, so sub-cent spend keeps full precision instead of rounding to $0.00.",
      "Approval gates for sensitive agent actions with an inbox and audit trail, plus a four-role RBAC matrix with server-side tenant isolation (a foreign org returns 403, an unknown one 404).",
      "React 19 + Vite SPA with Redux Toolkit, RTK Query and dnd-kit.",
      "Tests run against a pinned PostgreSQL 16 image; migrations run on boot inside a single advisory-locked transaction.",
    ],
    plate: {
      columns: [["React 19 SPA"], ["Go binary", "approval gates · RBAC"], ["PostgreSQL 16", "cost ledger · µUSD"]],
      note: "docker compose up: the whole fleet board",
    },
  },
  {
    id: "assay",
    title: "Assay",
    subtitle: "Active Socratic learning engine",
    context: "AI Builder Cup 2026 · Google Cloud × Hack2skill, JAPAC · Track 4",
    figure: { value: "3 devs", label: "one hackathon squad" },
    medium: "Next.js, Node.js, RAG, Google Cloud",
    points: [
      "Intent, role and an optional PDF produce a topic checklist and a chaptered syllabus; each chapter stays locked until the user passes an interview quiz.",
      "PDF-RAG grounding with optional Google Search grounding, plus a select-a-word interaction where the AI answers with a question instead of a summary.",
      "Replaced a binary honeypot gate with a scored dimension (+2 / −2 / 0 / −1) after research showed hard gates punish honest learners.",
      "Anti-cheat runs as an on-device MediaPipe focus mode.",
    ],
    plate: {
      columns: [["Intent · role · PDF"], ["Topic checklist"], ["Chaptered syllabus"], ["Interview quiz", "unlocks next chapter"]],
      note: "grounded in the PDF; answers with questions",
    },
  },
  {
    id: "nexalab",
    title: "Nexalab",
    subtitle: "Deeply nested task management",
    context: "Nexatriv · in design",
    figure: { value: "10,000+", label: "tasks per workspace, targeted" },
    medium: "Rust, PostgreSQL, React",
    points: [
      "A self-hosted task platform for deeply nested cross-team work: unlimited nesting depth, a dependency graph and role-scoped views.",
      "A Rust + PostgreSQL core for predictable latency, with an append-only activity log for auditable mutations.",
      "A free, fully self-hostable Solo tier, with team roles as a feature rather than a paywall.",
    ],
    plate: {
      columns: [["React"], ["Rust core", "dependency graph"], ["PostgreSQL", "append-only activity log"]],
      note: "unlimited nesting, role-scoped views",
    },
  },
  {
    id: "appeals",
    title: "Appeal Management System",
    subtitle: "Singapore government",
    context: "MGG Software · Fullstack Software Engineer",
    figure: { value: "End to end", label: "React frontend + Spring Boot backend" },
    medium: "React, TypeScript, Vite, Spring Boot, Docker, Azure",
    points: [
      "Appeal submission, review and decision workflows for a Singapore government system.",
      "Designed and implemented REST APIs for appeal processing, user roles and workflow management.",
      "Translated business requirements into system design and data flow; production troubleshooting to government compliance standards.",
      "Guided developers through development and maintenance, and wrote technical documentation for onboarding.",
    ],
    plate: {
      columns: [["Submit"], ["Review"], ["Decide"], ["Spring Boot APIs", "roles · workflow"]],
      note: "deployed on Azure under government compliance",
    },
  },
  {
    id: "parking",
    title: "Use of Parking Lots",
    subtitle: "Singapore government",
    context: "MGG Software · Fullstack Software Engineer",
    figure: { value: "3 parts", label: "inventory, allocation, usage" },
    medium: "React, Spring Boot, Azure, Docker",
    points: [
      "A government system for allocating and using parking lots: lot inventory, allocation rules and usage reporting.",
      "Frontend and backend features in React and Spring Boot, integrating the API layer with existing government services.",
      "Bug fixing, performance tuning and production troubleshooting under government security and compliance requirements.",
      "Technical and functional documentation; supported UAT with government stakeholders.",
    ],
    plate: {
      columns: [["Lot inventory"], ["Allocation rules"], ["Usage reporting"], ["Government services"]],
      note: "React + Spring Boot on Azure",
    },
  },
  {
    id: "sipas",
    title: "SIPAS e-Office",
    subtitle: "Document management system",
    context: "PT. Sekawan Media Informatika · Backend Developer",
    figure: { value: "Letters", label: "in, out, dispositions, archive" },
    medium: "PHP Falcon, ReactJS, Docker, Jest",
    points: [
      "A web-based document management system for incoming and outgoing letters, dispositions and digital archives.",
      "REST APIs within a microservices architecture for document management, user roles and workflow processing.",
      "Letter tracking and disposition logic, and optimised queries for document and transactional data.",
    ],
    plate: {
      columns: [["Incoming letter"], ["Disposition"], ["Tracking"], ["Digital archive"]],
      note: "microservices behind a React frontend",
    },
  },
];

// ---------- Hall III · Clients (luggage labels) ----------

export type Client = { name: string; country: string; what: string; medium: string; shape: "oval" | "round" | "rect" | "shield" };

export const clientsIntro =
  "At ICUBE by SIRCLO I built and maintained eCommerce for enterprise retail clients across Southeast Asia, in Magento (PHP) and Next.js PWAs.";

export const clients: Client[] = [
  { name: "Senheng", country: "Malaysia", what: "Consumer electronics eCommerce", medium: "Magento · Next.js PWA", shape: "oval" },
  { name: "Wacoal", country: "Philippines", what: "Global apparel brand store", medium: "Magento", shape: "round" },
  { name: "ERHA", country: "Indonesia", what: "Official skincare store", medium: "Magento", shape: "rect" },
  { name: "DatascripMall.ID", country: "Indonesia", what: "B2B & B2C commerce platform", medium: "Magento", shape: "shield" },
];

// ---------- Hall IV · Nexatriv ----------

export const nexatriv = {
  role: "Co-Founder & Software Engineer (part-time) · Jan 2026 – present · Malang",
  lede: "A software and AI studio, co-founded with two partners. I own the engineering function across three product lines planned for 2026.",
  items: [
    {
      title: "Nexalab",
      body: "A self-hosted task management platform for deeply nested cross-team work, targeting 10,000+ tasks per workspace, with a free Solo tier instead of per-seat pricing.",
    },
    {
      title: "ERP for SMEs",
      body: "Finance, inventory and HR, scoped as a modular monolith on PostgreSQL so each module ships on its own.",
    },
    {
      title: "Engineering standards",
      body: "Repo conventions, code review gates, and an AI-assisted delivery workflow reused across client and internal work.",
    },
  ],
};

// ---------- Hall V · The rantang (stack) ----------

export type Tier = { name: string; groups: { label: string; items: string[] }[] };

export const tiers: Tier[] = [
  {
    name: "Frontend & mobile",
    groups: [
      { label: "Web", items: ["React", "Next.js", "Vue.js", "TypeScript", "TailwindCSS", "Shadcn/UI", "Redux", "Zustand", "TanStack Query", "Vite", "PWA", "Electron"] },
      { label: "Mobile", items: ["Flutter", "React Native", "Dart"] },
    ],
  },
  {
    name: "Backend",
    groups: [
      { label: "Frameworks", items: ["Spring Boot", "Node.js", "NestJS", "Laravel", "Flask", "PHP Falcon", "GraphQL", "Microservices", "Hibernate"] },
      { label: "Languages", items: ["Java", "Go", "Rust", "Python", "PHP", "SQL"] },
    ],
  },
  {
    name: "Data, ops & testing",
    groups: [
      { label: "Data", items: ["PostgreSQL", "MySQL/MariaDB", "MSSQL", "Oracle", "MongoDB", "Redis", "Firebase", "Prisma"] },
      { label: "Ops", items: ["Docker", "Kubernetes", "GitHub Actions", "Nginx", "Vercel", "GCP", "AWS", "Azure", "Linux/VPS", "Sentry"] },
      { label: "Testing", items: ["Jest", "Cypress", "Playwright", "Postman", "Go testing"] },
    ],
  },
  {
    name: "AI",
    groups: [
      { label: "Building", items: ["Multi-agent orchestration", "Multi-LLM routing", "RAG", "Embeddings", "Function calling", "LLM fine-tuning", "MCP", "Prompt engineering"] },
      { label: "Daily tools", items: ["Claude Code", "Codex", "OpenCode", "GitHub Copilot", "Hermes Agent"] },
    ],
  },
];

// ---------- Hall VI · How I work (timetable) ----------

export type Leg = { station: string; what: string };

export const timetableIntro =
  "I run this AI-assisted delivery workflow for my team end to end. Every artifact is reviewed before it leaves the station.";

export const timetable: Leg[] = [
  { station: "Requirements", what: "Elicit and analyse them with the client, and commit the team to agreed scope and dates." },
  { station: "Flows", what: "Write the flows the team and the client work from." },
  { station: "UI", what: "Specify the screens and functional documentation." },
  { station: "Code", what: "Hands-on across React, Vanilla JS and backend services, with AI assistance." },
  { station: "Tests", what: "Test planning and validation for the team's work." },
  { station: "Documentation", what: "Technical and functional docs, generated and checked against requirements." },
  { station: "Review", what: "Requirements, flows, UI, code, tests and docs reviewed before release." },
  { station: "Release", what: "Shipped to the client on the committed date." },
];

export const timetableFigures = [
  { value: "~70%", label: "less feature rework" },
  { value: "90%", label: "of milestones on the committed date" },
  { value: "80%", label: "of releases accepted with no requirement-traceable defect" },
  { value: "5", label: "engineers mentored on the workflow" },
];

// ---------- Terminus · Contact ----------

export const contact = {
  emails: ["mrezalf0@gmail.com", "reza@nexatriv.com"],
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/m-zulfi-fahreza-552a1220b", note: "m-zulfi-fahreza" },
    { label: "GitHub", href: "https://github.com/v-reza", note: "v-reza" },
    { label: "Resume", href: "/resume.pdf", note: "PDF" },
  ],
  location: "Malang, East Java, Indonesia",
  languages: "Bahasa Indonesia (native) · English (professional working)",
};
