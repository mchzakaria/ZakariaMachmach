import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Layers } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const projects = [
  {
    name: "Smart Task Management Microservice",
    description:
      "Scalable task management system built as a standalone microservice used by multiple applications. Features hierarchical tasks with automatic updates, secure multi-tenant access with JWT authentication, and modern interfaces including Kanban, sprint planning, and dashboards.",
    tech: ["TypeScript", "React", "Node.js", "JWT", "PostgreSQL"],
    github: "https://github.com/mchzakaria",
    demo: "#",
    gradient: "from-violet-500/10 to-indigo-500/10",
    border: "hover:border-violet-400/40",
    accent: "text-violet-500 dark:text-violet-400",
  },
  {
    name: "Centralized Logging System",
    description:
      "Centralized log management system using Go with an agent-to-server architecture for secure log transmission. Implements fault-tolerant delivery with local buffering and retries, and enables real-time log visualization via Server-Sent Events (SSE).",
    tech: ["Go", "SQLite", "SSE", "REST API"],
    github: "https://github.com/mchzakaria",
    demo: "#",
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "hover:border-blue-400/40",
    accent: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "Système de Gestion du Bureau d'Ordre",
    description:
      "Centralised web application automating administrative flows for a financial firm. Manages mail routing, tracks regulatory documents with digital signatures, and ensures full visitor traceability.",
    tech: ["MongoDB", "Express", "React", "Node.js", "TailwindCSS"],
    github: "https://github.com/mchzakaria",
    demo: "#",
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "hover:border-emerald-400/40",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    name: "Plateforme de Gestion des Examens",
    description:
      "University exam management platform enabling scheduling, student assignment, room allocation, and result tracking — built with a modern React frontend and a RESTful Express backend.",
    tech: ["React", "ExpressJS", "MongoDB", "TailwindCSS"],
    github: "https://github.com/mchzakaria",
    demo: "#",
    gradient: "from-orange-500/10 to-amber-500/10",
    border: "hover:border-orange-400/40",
    accent: "text-orange-500 dark:text-orange-400",
  },
  {
    name: "Application Mobile POS",
    description:
      "Mobile Point of Sale system designed and built during an internship at Voie Informatique. Covers product management, sales transactions, inventory tracking, and reporting — all within a smooth Flutter UI.",
    tech: ["Flutter", "Dart", "PHP", "MySQL"],
    github: "https://github.com/mchzakaria",
    demo: "#",
    gradient: "from-pink-500/10 to-rose-500/10",
    border: "hover:border-pink-400/40",
    accent: "text-pink-500 dark:text-pink-400",
  },
];

import { useQuery } from "@tanstack/react-query";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { data } = useQuery({
    queryKey: ["/api/data"],
    queryFn: async () => {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    }
  });

  const displayProjects = data?.projects || projects;

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30" data-testid="section-projects" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col gap-2 mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 1.4, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8 }}
            className="absolute -top-10 -left-2 sm:-left-4 text-[7rem] sm:text-[9rem] font-extrabold font-mono leading-none select-none pointer-events-none text-foreground/[0.04]"
            aria-hidden="true"
          >
            04
          </motion.span>
          <span className="relative z-10 text-primary font-mono text-sm tracking-widest uppercase">04. Projects</span>
          <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-foreground">Selected Work</h2>
          <p className="relative z-10 text-muted-foreground max-w-xl mt-2">
            Real projects — from microservices and real-time systems to mobile apps and admin platforms.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6" style={{ perspective: "1200px" }}>
          {displayProjects.map((project: any, i: number) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard
                className={`group relative rounded-2xl border border-border/60 bg-gradient-to-br ${project.gradient} p-5 sm:p-6 ${project.border} transition-all duration-300 flex flex-col h-full`}
                data-testid={`project-card-${i}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-background/70 border border-border/60 flex items-center justify-center">
                    <Layers className={`w-4 h-4 ${project.accent}`} />
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`project-github-${i}`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`project-demo-${i}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{project.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((t: string) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono bg-background/70 border border-border/60 text-muted-foreground rounded-md hover:text-foreground transition-colors"
                      data-testid={`project-tech-${t.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
