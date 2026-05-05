import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";

const education = [
  {
    degree: "Bachelor's Degree in Computer Science",
    institution: "Universite Hassan II",
    location: "Casablanca, Morocco",
    period: "2017 — 2021",
    description:
      "Studied core computer science fundamentals including algorithms, data structures, operating systems, databases, and software engineering principles. Graduated with honors.",
    highlights: ["Algorithms & Data Structures", "Databases & SQL", "Software Engineering", "Networks & Security"],
  },
];

const certifications = [
  { name: "MongoDB Certified Developer", issuer: "MongoDB University", year: "2022" },
  { name: "Docker Certified Associate", issuer: "Docker, Inc.", year: "2023" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2023" },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-24 px-6 bg-card/30" data-testid="section-education" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase">06. Education</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Academic Background</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/30 transition-colors"
                data-testid={`education-${i}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base leading-tight">{edu.degree}</h3>
                    <p className="text-primary font-semibold text-sm mt-0.5">{edu.institution}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{edu.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-muted-foreground bg-background border border-border/60 px-3 py-1 rounded-full">
                    {edu.period}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{edu.description}</p>

                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 text-xs font-mono bg-primary/10 border border-primary/20 text-primary rounded-md"
                      data-testid={`edu-highlight-${h.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Certifications</h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/60 hover:border-primary/30 transition-colors"
                    data-testid={`cert-${i}`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                      {cert.year}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
