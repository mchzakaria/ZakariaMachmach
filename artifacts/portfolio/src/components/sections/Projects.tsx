import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Layers } from "lucide-react";

const projects = [
  {
    name: "TaskFlow",
    description:
      "A real-time project management platform with drag-and-drop Kanban boards, team collaboration, task assignments, and Slack-style notifications. Built for distributed teams.",
    tech: ["React", "Node.js", "Socket.io", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/zakariamachmach/taskflow",
    demo: "#",
    gradient: "from-violet-600/20 to-indigo-600/20",
    accent: "text-violet-400",
  },
  {
    name: "ShopAI",
    description:
      "E-commerce platform with AI-powered product recommendations, dynamic pricing, and a seamless checkout flow. Handles thousands of SKUs with advanced search and filtering.",
    tech: ["Next.js", "TypeScript", "NestJS", "MongoDB", "Stripe"],
    github: "https://github.com/zakariamachmach/shopai",
    demo: "#",
    gradient: "from-blue-600/20 to-cyan-600/20",
    accent: "text-blue-400",
  },
  {
    name: "DevBlog",
    description:
      "A developer-focused blogging platform with Markdown/MDX support, syntax highlighting, full-text search, tag-based navigation, and RSS feed generation.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/zakariamachmach/devblog",
    demo: "#",
    gradient: "from-emerald-600/20 to-teal-600/20",
    accent: "text-emerald-400",
  },
  {
    name: "PortalHR",
    description:
      "A comprehensive HR management system featuring employee onboarding, leave management, payroll summaries, performance reviews, and a role-based access control system.",
    tech: ["React", "NestJS", "GraphQL", "PostgreSQL", "Docker"],
    github: "https://github.com/zakariamachmach/portalhr",
    demo: "#",
    gradient: "from-orange-600/20 to-amber-600/20",
    accent: "text-orange-400",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 px-6 bg-card/30" data-testid="section-projects" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase">04. Projects</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Selected Work</h2>
          <p className="text-muted-foreground max-w-xl mt-2">
            A selection of projects that reflect my range — from real-time apps to e-commerce and beyond.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`group relative rounded-2xl border border-border/60 bg-gradient-to-br ${project.gradient} backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300 flex flex-col`}
              data-testid={`project-card-${project.name.toLowerCase()}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-background/50 border border-white/10 flex items-center justify-center">
                  <Layers className={`w-4 h-4 ${project.accent}`} />
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`project-github-${project.name.toLowerCase()}`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`project-demo-${project.name.toLowerCase()}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">{project.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono bg-background/60 border border-white/10 text-muted-foreground rounded-md hover:text-foreground transition-colors"
                    data-testid={`project-tech-${t.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
