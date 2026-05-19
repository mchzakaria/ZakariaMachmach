import { useQuery } from "@tanstack/react-query";

export type TerminalEntry = {
  cmd: string;
  output: string | null;
  type: "result" | "action";
};

export type HeroLink = {
  href: string;
  icon: "Github" | "Linkedin" | "Mail";
  testId: string;
};

export type Skill = {
  name: string;
  icon: string;
  color: string;
  level: number;
};

export type SkillCategory = {
  title: string;
  accent: string;
  border: string;
  glow: string;
  bg: string;
  skills: Skill[];
};

export type Project = {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  gradient: string;
  border: string;
  accent: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  stack: string[];
  current: boolean;
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
};

export type Language = {
  lang: string;
  level: string;
  pct: number;
};

export type ChatbotQuestion = {
  id: string;
  question: string;
  answer: string;
  section: "profile" | "skills" | "projects" | "experience" | "contact" | "cv";
};

export type PortfolioData = {
  hero: {
    terminal: TerminalEntry[];
    name: string;
    role: string;
    links: HeroLink[];
    cv: string;
  };
  about: {
    summary: string;
    superpower: string;
  };
  categories: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  chatbot: {
    welcome: string;
    questions: ChatbotQuestion[];
  };
};

export const fallbackPortfolioData: PortfolioData = {
  hero: {
    terminal: [
      { cmd: "whoami", output: "zakaria.machmach", type: "result" },
      { cmd: "cat role.txt", output: "Full Stack Web Developer", type: "result" },
      { cmd: "ls skills/", output: "React/  Node.js/  TypeScript/  PostgreSQL/  Go/  ...", type: "result" },
      { cmd: "cat status.json", output: '{ "available": true, "location": "Casablanca, Morocco" }', type: "result" },
      { cmd: "./run portfolio.sh", output: null, type: "action" },
    ],
    name: "Zakaria MACHMACH",
    role: "Full Stack Web Developer",
    links: [
      { href: "https://github.com/mchzakaria", icon: "Github", testId: "hero-link-github" },
      { href: "https://www.linkedin.com/in/zakaria-machmach-094428225/", icon: "Linkedin", testId: "hero-link-linkedin" },
      { href: "mailto:zakariamachmach03@gmail.com", icon: "Mail", testId: "hero-link-email" },
    ],
    cv: "/cv.pdf",
  },
  about: {
    summary: "Full Stack Web Developer based in Casablanca, Morocco, focused on practical web, API, real-time, and mobile systems.",
    superpower: "making complex systems simple to use",
  },
  categories: [
    {
      title: "Frontend",
      accent: "text-violet-600 dark:text-violet-400",
      border: "border-violet-500/20",
      glow: "rgba(139,92,246,0.12)",
      bg: "from-violet-500/5 to-transparent",
      skills: [
        { name: "React", icon: "SiReact", color: "#61DAFB", level: 92 },
        { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", level: 88 },
        { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", level: 90 },
        { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", level: 90 },
        { name: "HTML / CSS", icon: "Globe", color: "#E34F26", level: 95 },
      ],
    },
    {
      title: "Backend",
      accent: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-500/20",
      glow: "rgba(99,102,241,0.12)",
      bg: "from-indigo-500/5 to-transparent",
      skills: [
        { name: "Node.js", icon: "SiNodedotjs", color: "#339933", level: 88 },
        { name: "Express", icon: "SiExpress", color: "#888888", level: 87 },
        { name: "PHP", icon: "SiPhp", color: "#777BB4", level: 80 },
        { name: "Spring Boot", icon: "SiSpring", color: "#6DB33F", level: 72 },
        { name: "Symfony", icon: "SiSymfony", color: "#888888", level: 70 },
      ],
    },
    {
      title: "Databases & Cache",
      accent: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/20",
      glow: "rgba(59,130,246,0.12)",
      bg: "from-blue-500/5 to-transparent",
      skills: [
        { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1", level: 85 },
        { name: "MongoDB", icon: "SiMongodb", color: "#47A248", level: 85 },
        { name: "MySQL", icon: "SiMysql", color: "#4479A1", level: 83 },
        { name: "Redis", icon: "SiRedis", color: "#DC382D", level: 75 },
        { name: "Supabase", icon: "SiSupabase", color: "#3ECF8E", level: 72 },
      ],
    },
    {
      title: "Languages & Tools",
      accent: "text-purple-600 dark:text-purple-400",
      border: "border-purple-500/20",
      glow: "rgba(168,85,247,0.12)",
      bg: "from-purple-500/5 to-transparent",
      skills: [
        { name: "Go", icon: "SiGo", color: "#00ADD8", level: 75 },
        { name: "Dart / Flutter", icon: "SiFlutter", color: "#02569B", level: 78 },
        { name: "Java", icon: "Code2", color: "#f89820", level: 72 },
        { name: "Git", icon: "SiGit", color: "#F05032", level: 92 },
        { name: "Docker", icon: "SiDocker", color: "#2496ED", level: 78 },
      ],
    },
  ],
  projects: [
    {
      name: "MCP Server - Cloud-Hosted AI Gateway",
      description: "Designed and developed a production-ready cloud-hosted MCP server that exposes a SaaS platform as structured AI-callable tools, enabling AI clients like Claude and Cursor or any AI Agent to interact with the platform through natural language. Built with HTTP + SSE transport, session-based authentication, and a modular architecture supporting scalable multi-user integrations and dynamically extensible platform modules.",
      tech: ["TypeScript", "Node.js", "Express.js", "MCP SDK", "HTTP + SSE", "Zod", "Axios", "Docker"],
      github: "https://github.com/mchzakaria",
      demo: "#",
      gradient: "from-cyan-500/10 to-blue-500/10",
      border: "hover:border-cyan-400/40",
      accent: "text-cyan-500 dark:text-cyan-400",
    },
    {
      name: "Smart Task Management Microservice",
      description: "Scalable task management system built as a standalone microservice used by multiple applications. Features hierarchical tasks with automatic updates, secure multi-tenant access with JWT authentication, and modern interfaces including Kanban, sprint planning, and dashboards.",
      tech: ["TypeScript", "React", "Node.js", "JWT", "PostgreSQL"],
      github: "https://github.com/mchzakaria",
      demo: "#",
      gradient: "from-violet-500/10 to-indigo-500/10",
      border: "hover:border-violet-400/40",
      accent: "text-violet-500 dark:text-violet-400",
    },
    {
      name: "Centralized Logging System",
      description: "Centralized log management system using Go with an agent-to-server architecture for secure log transmission. Implements fault-tolerant delivery with local buffering and retries, and enables real-time log visualization via Server-Sent Events.",
      tech: ["Go", "SQLite", "SSE", "REST API"],
      github: "https://github.com/mchzakaria",
      demo: "#",
      gradient: "from-blue-500/10 to-cyan-500/10",
      border: "hover:border-blue-400/40",
      accent: "text-blue-500 dark:text-blue-400",
    },
  ],
  experience: [
    {
      role: "Full-Stack Developer",
      company: "TYTHON",
      period: "Oct 2025 - Present",
      location: "Casablanca, Morocco",
      type: "Full-time",
      description: "Developing CRUD interfaces connected to APIs with integrated statistical dashboards. Implemented real-time messaging between users and built a REST API using ExpressJS for backend data management.",
      stack: ["ReactJs", "ExpressJS", "Socket.io", "Node.js", "PostgreSQL", "TypeScript", "Supabase", "Redis", "REST API", "JWT", "OAuth 2.0", "TailwindCSS"],
      current: true,
    },
  ],
  education: [],
  languages: [
    { lang: "Arabic", level: "Native", pct: 100 },
    { lang: "French", level: "Professional", pct: 85 },
    { lang: "English", level: "Professional", pct: 80 },
  ],
  chatbot: {
    welcome: "Hi, I can answer quick questions about Zakaria's portfolio.",
    questions: [
      {
        id: "top-skills",
        question: "What are Zakaria's main skills?",
        answer: "Zakaria mainly works with React, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, MongoDB, Go, Flutter, Git, and Docker.",
        section: "skills",
      },
    ],
  },
};

export function usePortfolioData() {
  return useQuery<PortfolioData>({
    queryKey: ["/api/data"],
    queryFn: async () => {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error("Failed to fetch portfolio data");
      return res.json();
    },
    placeholderData: fallbackPortfolioData,
  });
}
