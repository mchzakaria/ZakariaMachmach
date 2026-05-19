import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Layers } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { fallbackPortfolioData, usePortfolioData, type Project } from "@/lib/portfolioData";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data = fallbackPortfolioData } = usePortfolioData();
  const displayProjects = data.projects;

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
            Real projects - from microservices and real-time systems to mobile apps and admin platforms.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6" style={{ perspective: "1200px" }}>
          {displayProjects.map((project: Project, i: number) => (
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
                      aria-label={`Open ${project.name} GitHub`}
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
                        aria-label={`Open ${project.name} demo`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{project.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono bg-background/70 border border-border/60 text-muted-foreground rounded-md hover:text-foreground transition-colors"
                      data-testid={`project-tech-${tech.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {tech}
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
