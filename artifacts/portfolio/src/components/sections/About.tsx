import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileCode, FolderOpen, Folder } from "lucide-react";

const fileTree = [
  { name: "portfolio/", icon: FolderOpen, depth: 0 },
  { name: "src/", icon: FolderOpen, depth: 1 },
  { name: "about.ts", icon: FileCode, depth: 2, active: true },
  { name: "skills.json", icon: FileCode, depth: 2 },
  { name: "projects/", icon: Folder, depth: 2 },
  { name: "contact.ts", icon: FileCode, depth: 2 },
];

const codeLines = [
  { tokens: [{ t: "const", c: "text-violet-500 dark:text-violet-400" }, { t: " developer", c: "text-blue-600 dark:text-blue-300" }, { t: " = {", c: "text-foreground" }] },
  { tokens: [{ t: "  name", c: "text-cyan-600 dark:text-cyan-300" }, { t: ": ", c: "text-foreground" }, { t: '"Zakaria MACHMACH"', c: "text-amber-600 dark:text-yellow-300" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "  role", c: "text-cyan-600 dark:text-cyan-300" }, { t: ": ", c: "text-foreground" }, { t: '"Full Stack Web Developer"', c: "text-amber-600 dark:text-yellow-300" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "  location", c: "text-cyan-600 dark:text-cyan-300" }, { t: ": ", c: "text-foreground" }, { t: '"Casablanca, Morocco"', c: "text-amber-600 dark:text-yellow-300" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "  experience", c: "text-cyan-600 dark:text-cyan-300" }, { t: ": ", c: "text-foreground" }, { t: '"2+ years"', c: "text-amber-600 dark:text-yellow-300" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "  available", c: "text-cyan-600 dark:text-cyan-300" }, { t: ": ", c: "text-foreground" }, { t: "true", c: "text-orange-500 dark:text-orange-400" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "", c: "" }] },
  { tokens: [{ t: "  passion", c: "text-cyan-600 dark:text-cyan-300" }, { t: ": (", c: "text-foreground" }, { t: "coffee", c: "text-orange-500 dark:text-orange-400" }, { t: ") => ", c: "text-foreground" }, { t: "code", c: "text-violet-500 dark:text-violet-400" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "  superpower", c: "text-cyan-600 dark:text-cyan-300" }, { t: ": ", c: "text-foreground" }, { t: '"making complex simple"', c: "text-amber-600 dark:text-yellow-300" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "", c: "" }] },
  { tokens: [{ t: "  skills", c: "text-cyan-600 dark:text-cyan-300" }, { t: ": [", c: "text-foreground" }] },
  { tokens: [{ t: '    "React"', c: "text-amber-600 dark:text-yellow-300" }, { t: ", ", c: "text-foreground" }, { t: '"Node.js"', c: "text-amber-600 dark:text-yellow-300" }, { t: ", ", c: "text-foreground" }, { t: '"TypeScript"', c: "text-amber-600 dark:text-yellow-300" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: '    "PostgreSQL"', c: "text-amber-600 dark:text-yellow-300" }, { t: ", ", c: "text-foreground" }, { t: '"Go"', c: "text-amber-600 dark:text-yellow-300" }, { t: ", ", c: "text-foreground" }, { t: '"Flutter"', c: "text-amber-600 dark:text-yellow-300" }, { t: ", ...", c: "text-muted-foreground" }] },
  { tokens: [{ t: "  ]", c: "text-foreground" }] },
  { tokens: [{ t: "}", c: "text-foreground" }] },
  { tokens: [{ t: "", c: "" }] },
  { tokens: [{ t: "export default", c: "text-violet-500 dark:text-violet-400" }, { t: " developer", c: "text-blue-600 dark:text-blue-300" }, { t: ";", c: "text-foreground" }] },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-about" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col gap-2 mb-10 sm:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 1.4, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8 }}
            className="absolute -top-10 -left-2 sm:-left-4 text-[7rem] sm:text-[9rem] font-extrabold font-mono leading-none select-none pointer-events-none text-foreground/[0.04]"
            aria-hidden="true"
          >
            01
          </motion.span>
          <span className="relative z-10 text-primary font-mono text-sm tracking-widest uppercase">01. About</span>
          <h2 className="relative z-10 text-3xl md:text-4xl font-bold">Who I Am</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-muted/50 border-b border-border/60">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="ml-2 flex items-center gap-1">
              <span className="text-xs font-mono text-muted-foreground">about.ts</span>
              <span className="text-xs text-muted-foreground/60 hidden sm:inline">— portfolio</span>
            </div>
          </div>

          <div className="flex border-b border-border/40 bg-muted/20 overflow-x-auto">
            <div className="px-3 sm:px-4 py-2 text-xs font-mono text-foreground border-r border-border/40 border-b-2 border-b-primary bg-card/50 flex items-center gap-1.5 flex-shrink-0">
              <FileCode className="w-3 h-3 text-blue-500" />
              about.ts
            </div>
            <div className="px-3 sm:px-4 py-2 text-xs font-mono text-muted-foreground border-r border-border/40 hover:bg-card/30 flex items-center gap-1.5 flex-shrink-0">
              <FileCode className="w-3 h-3 text-yellow-500" />
              skills.json
            </div>
          </div>

          <div className="flex min-h-0">
            <div className="hidden md:block w-44 bg-muted/20 border-r border-border/40 p-3 shrink-0">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3 px-1">Explorer</p>
              {fileTree.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className={`flex items-center gap-1.5 py-0.5 rounded text-xs font-mono cursor-pointer transition-colors ${
                      "active" in f && f.active
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    }`}
                    style={{ paddingLeft: `${f.depth * 10 + 4}px` }}
                  >
                    <Icon className={`w-3 h-3 flex-shrink-0 ${"active" in f && f.active ? "text-blue-500" : "text-muted-foreground"}`} />
                    {f.name}
                  </motion.div>
                );
              })}
            </div>

            <div className="flex-1 overflow-x-auto">
              <div className="flex font-mono text-xs sm:text-sm py-4">
                <div className="select-none pr-3 pl-3 sm:pl-4 text-right text-muted-foreground/40 shrink-0">
                  {codeLines.map((_, i) => (
                    <div key={i} className="leading-6">{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1 pr-3 sm:pr-4">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.04 }}
                      className="leading-6 whitespace-nowrap hover:bg-foreground/[0.03] transition-colors"
                    >
                      {line.tokens.map((tok, j) => (
                        <span key={j} className={tok.c}>{tok.t}</span>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-primary/10 border-t border-border/40 text-xs font-mono text-primary/80 overflow-x-auto gap-4">
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <span>TypeScript</span>
              <span className="hidden sm:inline">UTF-8</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for hire</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
