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
    color: "from-violet-500/20 to-violet-500/5",
    accent: "text-violet-400",
    border: "border-violet-500/20",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML / CSS", icon: Globe, color: "#E34F26" },
    ],
  },
  {
    title: "Backend",
    color: "from-indigo-500/20 to-indigo-500/5",
    accent: "text-indigo-400",
    border: "border-indigo-500/20",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
    ],
  },
  {
    title: "Database",
    color: "from-blue-500/20 to-blue-500/5",
    accent: "text-blue-400",
    border: "border-blue-500/20",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    title: "DevOps & Tools",
    color: "from-purple-500/20 to-purple-500/5",
    accent: "text-purple-400",
    border: "border-purple-500/20",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 px-6 bg-card/30" data-testid="section-skills" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase">02. Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Tech Stack</h2>
          <p className="text-muted-foreground max-w-xl mt-2">
            Technologies I work with daily — from client-side rendering to server infrastructure.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className={`rounded-2xl border ${cat.border} bg-gradient-to-b ${cat.color} p-6 flex flex-col gap-4`}
              data-testid={`skill-category-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <h3 className={`font-mono text-sm font-bold uppercase tracking-widest ${cat.accent}`}>
                {cat.title}
              </h3>
              <div className="flex flex-col gap-3">
                {cat.skills.map((skill, si) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: ci * 0.1 + si * 0.07 + 0.2 }}
                      className="flex items-center gap-3 group"
                      data-testid={`skill-${skill.name.toLowerCase().replace(/[\s./]+/g, "-")}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-background/50 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/25 transition-colors">
                        <Icon className="w-4 h-4" style={{ color: skill.color }} />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
