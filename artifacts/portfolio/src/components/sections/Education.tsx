import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const education = [
  {
    degree: "Licence Professionnelle — Ingénierie des Systèmes Informatiques et Logiciels",
    institution: "EST Essaouira",
    location: "Essaouira, Morocco",
    period: "2023 — 2024",
    description:
      "Advanced study of software engineering, system design, and professional IT practices. Focused on building scalable and maintainable software systems.",
    highlights: ["Software Engineering", "System Architecture", "Web Development", "Project Management"],
  },
  {
    degree: "Diplôme Universitaire de Technologie — Génie Informatique",
    institution: "EST Essaouira",
    location: "Essaouira, Morocco",
    period: "2021 — 2023",
    description:
      "Two-year technology degree covering computer science fundamentals, programming, databases, networks, and applied software development.",
    highlights: ["Algorithms & Data Structures", "Databases", "Networks", "OOP & Design Patterns"],
  },
  {
    degree: "Baccalauréat — Sciences Physiques et Chimiques",
    institution: "Lycée Okba Bnou Nafie BirJdid",
    location: "BirJdid, Morocco",
    period: "2020 — 2021",
    description:
      "Scientific baccalaureate with specialisation in Physics and Chemistry, building strong analytical and problem-solving foundations.",
    highlights: ["Physics", "Chemistry", "Mathematics", "Scientific Method"],
  },
];

const DEFAULT_LANGUAGES = [
  { lang: "Arabic", level: "Native", pct: 100 },
  { lang: "French", level: "Professional", pct: 85 },
  { lang: "English", level: "Professional", pct: 80 },
];

export default function Education() {
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

  const displayEducation = data?.education || education;
  const displayLanguages = data?.languages || DEFAULT_LANGUAGES;

  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30" data-testid="section-education" ref={ref}>
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
            06
          </motion.span>
          <span className="relative z-10 text-primary font-mono text-sm tracking-widest uppercase">06. Education</span>
          <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-foreground">Academic Background</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border/60" />
          <div className="space-y-6">
            {displayEducation.map((edu: any, i: number) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-16 md:pl-20"
                data-testid={`education-${i}`}
              >
                <div className="absolute left-4 md:left-5 top-1.5 w-5 h-5 rounded-full border-2 border-primary/40 bg-primary/10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>

                <div className="bg-card border border-border/60 rounded-2xl p-5 sm:p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-base leading-tight">{edu.degree}</h3>
                      <p className="text-primary font-semibold text-sm mt-0.5">{edu.institution}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{edu.location}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-background border border-border/60 px-3 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{edu.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {edu.highlights?.map((h: string) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 text-xs font-mono bg-primary/10 border border-primary/20 text-primary rounded-md"
                        data-testid={`edu-highlight-${h.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages spoken */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <div className="bg-card border border-border/60 rounded-2xl p-5 sm:p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">Languages</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {displayLanguages.map((l: any) => (
                <div key={l.lang} className="p-3 rounded-lg bg-background border border-border/60">
                  <p className="text-sm font-semibold text-foreground">{l.lang}</p>
                  <p className="text-xs text-muted-foreground mb-2">{l.level}</p>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${l.pct}%` } : {}}
                      transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
