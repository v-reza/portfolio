export type StackItem = {
  /** File name in src/content/icons (no extension). */
  icon: string;
  name: string;
  /** Layer this tool belongs to. */
  layer: "frontend" | "backend" | "data" | "ai";
  /** Invert the mark for tiles whose brand colour is pure black. */
  invert?: boolean;
  /** Brighten a dark but coloured mark without shifting its hue. */
  lift?: boolean;
};

export const stackLayers = [
  { id: "all", label: "All layers" },
  { id: "frontend", label: "Frontend & mobile" },
  { id: "backend", label: "Backend & languages" },
  { id: "data", label: "Data, ops & testing" },
  { id: "ai", label: "AI & orchestration" },
] as const;

export const stackItems: StackItem[] = [
  // ---------- frontend & mobile ----------
  { icon: "react", name: "React", layer: "frontend" },
  { icon: "nextjs", name: "Next.js", layer: "frontend", invert: true },
  { icon: "vue", name: "Vue", layer: "frontend" },
  { icon: "typescript", name: "TypeScript", layer: "frontend" },
  { icon: "tailwindcss", name: "Tailwind", layer: "frontend" },
  { icon: "shadcn", name: "shadcn/ui", layer: "frontend", invert: true },
  { icon: "redux", name: "Redux", layer: "frontend" },
  { icon: "zustand", name: "Zustand", layer: "frontend" },
  { icon: "tanstack", name: "TanStack Query", layer: "frontend" },
  { icon: "vite", name: "Vite", layer: "frontend" },
  { icon: "electron", name: "Electron", layer: "frontend" },
  { icon: "pwa", name: "PWA", layer: "frontend", invert: true },
  { icon: "flutter", name: "Flutter", layer: "frontend" },
  { icon: "reactnative", name: "React Native", layer: "frontend" },
  { icon: "dart", name: "Dart", layer: "frontend" },

  // ---------- backend & languages ----------
  { icon: "springboot", name: "Spring Boot", layer: "backend" },
  { icon: "nodejs", name: "Node.js", layer: "backend" },
  { icon: "nestjs", name: "NestJS", layer: "backend" },
  { icon: "laravel", name: "Laravel", layer: "backend" },
  { icon: "flask", name: "Flask", layer: "backend" },
  { icon: "graphql", name: "GraphQL", layer: "backend" },
  { icon: "hibernate", name: "Hibernate", layer: "backend" },
  { icon: "java", name: "Java", layer: "backend" },
  { icon: "go", name: "Go", layer: "backend" },
  { icon: "rust", name: "Rust", layer: "backend", invert: true },
  { icon: "python", name: "Python", layer: "backend" },
  { icon: "php", name: "PHP", layer: "backend" },

  // ---------- data, ops & testing ----------
  { icon: "postgresql", name: "PostgreSQL", layer: "data" },
  { icon: "mysql", name: "MySQL", layer: "data" },
  { icon: "mssql", name: "SQL Server", layer: "data" },
  { icon: "oracle", name: "Oracle", layer: "data" },
  { icon: "mongodb", name: "MongoDB", layer: "data" },
  { icon: "redis", name: "Redis", layer: "data" },
  { icon: "firebase", name: "Firebase", layer: "data" },
  { icon: "prisma", name: "Prisma", layer: "data", lift: true },
  { icon: "docker", name: "Docker", layer: "data" },
  { icon: "kubernetes", name: "Kubernetes", layer: "data" },
  { icon: "githubactions", name: "GitHub Actions", layer: "data" },
  { icon: "nginx", name: "Nginx", layer: "data" },
  { icon: "vercel", name: "Vercel", layer: "data", invert: true },
  { icon: "gcp", name: "Google Cloud", layer: "data" },
  { icon: "aws", name: "AWS", layer: "data" },
  { icon: "azure", name: "Azure", layer: "data" },
  { icon: "linux", name: "Linux", layer: "data" },
  { icon: "sentry", name: "Sentry", layer: "data", lift: true },
  { icon: "jest", name: "Jest", layer: "data", lift: true },
  { icon: "cypress", name: "Cypress", layer: "data" },
  { icon: "playwright", name: "Playwright", layer: "data" },
  { icon: "postman", name: "Postman", layer: "data" },

  // ---------- ai & orchestration ----------
  { icon: "claude", name: "Claude", layer: "ai" },
  { icon: "codex", name: "Codex", layer: "ai" },
  { icon: "opencode", name: "OpenCode", layer: "ai", invert: true },
  { icon: "copilot", name: "Copilot", layer: "ai", invert: true },
  { icon: "mcp", name: "MCP", layer: "ai", invert: true },
];
