import { useRef, type ElementType } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiTypescript, SiTailwindcss, SiJavascript,
  SiNodedotjs, SiExpress, SiPhp, SiSpring, SiSymfony,
  SiPostgresql, SiMongodb, SiMysql, SiRedis, SiSupabase,
  SiGit, SiDocker, SiDart, SiFlutter, SiGo,
} from "react-icons/si";
import { Globe, Code2 } from "lucide-react";
import { fallbackPortfolioData, usePortfolioData, type SkillCategory } from "@/lib/portfolioData";

const iconMap: Record<string, ElementType> = {
  SiReact, SiTypescript, SiTailwindcss, SiJavascript,
  SiNodedotjs, SiExpress, SiPhp, SiSpring, SiSymfony,
  SiPostgresql, SiMongodb, SiMysql, SiRedis, SiSupabase,
  SiGit, SiDocker, SiDart, SiFlutter, SiGo,
  Globe, Code2,
};

function activityValue(level: number, index: number) {
  const wave = Math.sin((index + 1) * (level + 17)) * 10000;
  const noise = wave - Math.floor(wave);
  const trend = (index / 125) * level * 0.35;
  return Math.max(0, Math.min(100, level * 0.35 + trend + noise * 45));
}

function ContributionGrid({ level }: { level: number }) {
  const weeks = 26;
  const days = 7;
  const cells = Array.from({ length: weeks * days }, (_, i) => activityValue(level, i));

  return (
    <div
      className="mt-3 grid w-full grid-flow-col grid-rows-7 justify-start gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 10px))` }}
      aria-label={`Activity intensity ${Math.round(level)} percent`}
    >
      {cells.map((val, i) => {
        const opacity = val < 10 ? 0.08 : val < 30 ? 0.25 : val < 60 ? 0.5 : val < 80 ? 0.75 : 1;
        return (
          <div
            key={i}
            className="h-2 w-2 rounded-[2px] bg-primary sm:h-2.5 sm:w-2.5"
            style={{ opacity }}
          />
        );
      })}
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data = fallbackPortfolioData } = usePortfolioData();
  const displayCategories = data.categories;

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30" data-testid="section-skills" ref={ref}>
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
            02
          </motion.span>
          <span className="relative z-10 text-primary font-mono text-sm tracking-widest uppercase">02. Skills</span>
          <h2 className="relative z-10 text-3xl md:text-4xl font-bold">Tech Stack</h2>
          <p className="relative z-10 text-muted-foreground max-w-xl mt-2">
            Technologies I work with - visualized as contribution intensity.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {displayCategories.map((cat: SkillCategory, ci: number) => {
            const averageLevel = cat.skills.reduce((sum, skill) => sum + skill.level, 0) / cat.skills.length;

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: ci * 0.12 }}
                className={`rounded-2xl border ${cat.border} bg-gradient-to-b ${cat.bg} bg-card p-5 sm:p-6 hover:shadow-lg transition-all duration-300 group`}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 30px ${cat.glow}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; }}
                data-testid={`skill-category-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <h3 className={`font-mono text-xs font-bold uppercase tracking-widest ${cat.accent} mb-4`}>
                  {cat.title}
                </h3>
                <div className="space-y-3">
                  {cat.skills.map((skill, si) => {
                    const Icon = iconMap[skill.icon] || Code2;
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
                  <ContributionGrid level={averageLevel} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
