import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiExpress, SiNestjs, SiGraphql, SiPostgresql, SiMongodb,
  SiMysql, SiRedis, SiDocker, SiGit, SiGithub, SiLinux,
} from "react-icons/si";
import { Globe } from "lucide-react";

const categories = [
  {
    title: "Frontend",
    accent: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500/20",
    glow: "rgba(139,92,246,0.12)",
    bg: "from-violet-500/5 to-transparent",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB", level: 95 },
      { name: "Next.js", icon: SiNextdotjs, color: "#6366f1", level: 90 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 92 },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 93 },
      { name: "HTML / CSS", icon: Globe, color: "#E34F26", level: 97 },
    ],
  },
  {
    title: "Backend",
    accent: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500/20",
    glow: "rgba(99,102,241,0.12)",
    bg: "from-indigo-500/5 to-transparent",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 90 },
      { name: "Express", icon: SiExpress, color: "#888888", level: 88 },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E", level: 82 },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098", level: 78 },
    ],
  },
  {
    title: "Database",
    accent: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    glow: "rgba(59,130,246,0.12)",
    bg: "from-blue-500/5 to-transparent",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: 87 },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 85 },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 83 },
      { name: "Redis", icon: SiRedis, color: "#DC382D", level: 75 },
    ],
  },
  {
    title: "DevOps & Tools",
    accent: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/20",
    glow: "rgba(168,85,247,0.12)",
    bg: "from-purple-500/5 to-transparent",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED", level: 82 },
      { name: "Git", icon: SiGit, color: "#F05032", level: 94 },
      { name: "GitHub", icon: SiGithub, color: "#6366f1", level: 93 },
      { name: "Linux", icon: SiLinux, color: "#e2a600", level: 80 },
    ],
  },
];

function ContributionGrid({ level }: { level: number }) {
  const weeks = 15;
  const days = 7;
  const cells = Array.from({ length: weeks * days }, (_, i) => {
    const base = (i / (weeks * days)) * level;
    const rand = Math.random() * 30;
    return Math.max(0, Math.min(100, base + rand));
  });

  return (
    <div className="flex gap-0.5 mt-3 flex-wrap">
      {Array.from({ length: weeks }, (_, w) => (
        <div key={w} className="flex flex-col gap-0.5">
          {Array.from({ length: days }, (_, d) => {
            const val = cells[w * days + d];
            const opacity = val < 10 ? 0.07 : val < 30 ? 0.25 : val < 60 ? 0.5 : val < 80 ? 0.75 : 1;
            return (
              <div
                key={d}
                className="w-2.5 h-2.5 rounded-sm bg-primary"
                style={{ opacity }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30" data-testid="section-skills" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-12 sm:mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase">02. Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold">Tech Stack</h2>
          <p className="text-muted-foreground max-w-xl mt-2">
            Technologies I work with — visualized as contribution intensity.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.12 }}
              className={`rounded-2xl border ${cat.border} bg-gradient-to-b ${cat.bg} bg-card p-5 sm:p-6 hover:shadow-lg transition-all duration-300 group`}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${cat.glow}`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ``; }}
              data-testid={`skill-category-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <h3 className={`font-mono text-xs font-bold uppercase tracking-widest ${cat.accent} mb-4`}>
                {cat.title}
              </h3>
              <div className="space-y-3">
                {cat.skills.map((skill, si) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: ci * 0.1 + si * 0.07 + 0.2 }}
                      className="flex items-center gap-3 group/skill"
                      data-testid={`skill-${skill.name.toLowerCase().replace(/[\s./]+/g, "-")}`}
                    >
                      <div className="w-7 h-7 rounded-md bg-background border border-border/60 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5" style={{ color: skill.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono text-muted-foreground group-hover/skill:text-foreground transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs font-mono text-primary/70">{skill.level}%</span>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-primary"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: ci * 0.1 + si * 0.1 + 0.4, ease: "easeOut" }}
                            style={{ boxShadow: "0 0 8px rgba(139,92,246,0.4)" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground mt-4 mb-1">Activity graph</p>
                <ContributionGrid level={cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
