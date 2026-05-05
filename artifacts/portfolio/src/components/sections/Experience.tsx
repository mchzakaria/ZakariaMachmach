import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "TechNova",
    period: "2023 — Present",
    location: "Casablanca, Morocco",
    type: "Full-time",
    description:
      "Lead development of cloud-native SaaS products. Architecting microservices, building React frontends, and managing CI/CD pipelines. Key contributor to a 40% reduction in page load times.",
    stack: ["React", "NestJS", "PostgreSQL", "Docker", "AWS"],
    current: true,
  },
  {
    role: "Junior Full Stack Developer",
    company: "WebAgency",
    period: "2021 — 2023",
    location: "Rabat, Morocco",
    type: "Full-time",
    description:
      "Developed client-facing web applications across diverse verticals — e-commerce, real estate, and media. Delivered 15+ production projects and grew into a team lead role.",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    current: false,
  },
  {
    role: "Freelance Web Developer",
    company: "Self-employed",
    period: "2020 — 2021",
    location: "Remote",
    type: "Freelance",
    description:
      "Designed and built custom websites and web apps for small businesses. Handled everything from requirements gathering and UX design to deployment and maintenance.",
    stack: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
    current: false,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 px-6" data-testid="section-experience" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase">05. Experience</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Professional Journey</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border/60" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-16 md:pl-20"
                data-testid={`experience-${i}`}
              >
                {/* Node */}
                <div className={`absolute left-4 md:left-5 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${exp.current ? "border-primary bg-primary/20" : "border-border bg-background"}`}>
                  {exp.current && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </div>

                <div className="group bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Briefcase className="w-3.5 h-3.5 text-primary" />
                        <span className="text-primary font-semibold text-sm">{exp.company}</span>
                        <span className="text-muted-foreground text-xs">{exp.location}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-mono text-muted-foreground bg-card border border-border/60 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <div className="flex items-center justify-end gap-1 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs text-emerald-400 font-medium">Current</span>
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
