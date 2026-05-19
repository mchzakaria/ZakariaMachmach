import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";
import { fallbackPortfolioData, usePortfolioData, type Experience as ExperienceItem } from "@/lib/portfolioData";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data = fallbackPortfolioData } = usePortfolioData();
  const displayExperiences = data.experience;

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-experience" ref={ref}>
      <div className="max-w-5xl mx-auto">
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
            05
          </motion.span>
          <span className="relative z-10 text-primary font-mono text-sm tracking-widest uppercase">05. Experience</span>
          <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-foreground">Professional Journey</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border/60" />

          <div className="space-y-8">
            {displayExperiences.map((exp: ExperienceItem, i: number) => (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-16 md:pl-20"
                data-testid={`experience-${i}`}
              >
                <div className={`absolute left-4 md:left-5 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${exp.current ? "border-primary bg-primary/20" : "border-border bg-background"}`}>
                  {exp.current && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </div>

                <div className="group bg-card border border-border/60 rounded-2xl p-5 sm:p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Briefcase className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-primary font-semibold text-sm">{exp.company}</span>
                        <span className="text-muted-foreground text-xs">{exp.location}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground font-mono">{exp.type}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-mono text-muted-foreground bg-card border border-border/60 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <div className="flex items-center justify-end gap-1 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">Current</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono bg-background border border-border/60 text-muted-foreground rounded-md"
                        data-testid={`exp-tech-${tech.toLowerCase().replace(/[\s./]+/g, "-")}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
