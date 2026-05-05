import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Folder, FileCode, FolderOpen } from "lucide-react";

const fileTree = [
  { name: "portfolio/", icon: FolderOpen, depth: 0, active: false },
  { name: "src/", icon: FolderOpen, depth: 1, active: false },
  { name: "about.ts", icon: FileCode, depth: 2, active: true },
  { name: "skills.json", icon: FileCode, depth: 2, active: false },
  { name: "projects/", icon: Folder, depth: 2, active: false },
  { name: "contact.ts", icon: FileCode, depth: 2, active: false },
];

const codeLines = [
  { tokens: [{ text: "const", color: "text-violet-400" }, { text: " developer", color: "text-blue-300" }, { text: " = {", color: "text-foreground" }] },
  { tokens: [{ text: "  name", color: "text-cyan-300" }, { text: ": ", color: "text-foreground" }, { text: '"Zakaria MACHMACH"', color: "text-yellow-300" }, { text: ",", color: "text-foreground" }] },
  { tokens: [{ text: "  role", color: "text-cyan-300" }, { text: ": ", color: "text-foreground" }, { text: '"Full Stack Developer"', color: "text-yellow-300" }, { text: ",", color: "text-foreground" }] },
  { tokens: [{ text: "  location", color: "text-cyan-300" }, { text: ": ", color: "text-foreground" }, { text: '"Casablanca, Morocco"', color: "text-yellow-300" }, { text: ",", color: "text-foreground" }] },
  { tokens: [{ text: "  experience", color: "text-cyan-300" }, { text: ": ", color: "text-foreground" }, { text: '"5+ years"', color: "text-yellow-300" }, { text: ",", color: "text-foreground" }] },
  { tokens: [{ text: "  available", color: "text-cyan-300" }, { text: ": ", color: "text-foreground" }, { text: "true", color: "text-orange-400" }, { text: ",", color: "text-foreground" }] },
  { tokens: [{ text: "", color: "" }] },
  { tokens: [{ text: "  passion", color: "text-cyan-300" }, { text: ": (", color: "text-foreground" }, { text: "coffee", color: "text-orange-400" }, { text: ") => ", color: "text-foreground" }, { text: "code", color: "text-violet-400" }, { text: ",", color: "text-foreground" }] },
  { tokens: [{ text: "  superpower", color: "text-cyan-300" }, { text: ": ", color: "text-foreground" }, { text: '"making complex things feel simple"', color: "text-yellow-300" }, { text: ",", color: "text-foreground" }] },
  { tokens: [{ text: "", color: "" }] },
  { tokens: [{ text: "  skills", color: "text-cyan-300" }, { text: ": [", color: "text-foreground" }] },
  { tokens: [{ text: '    "React"', color: "text-yellow-300" }, { text: ", ", color: "text-foreground" }, { text: '"Node.js"', color: "text-yellow-300" }, { text: ", ", color: "text-foreground" }, { text: '"TypeScript"', color: "text-yellow-300" }, { text: ",", color: "text-foreground" }] },
  { tokens: [{ text: '    "PostgreSQL"', color: "text-yellow-300" }, { text: ", ", color: "text-foreground" }, { text: '"Docker"', color: "text-yellow-300" }, { text: ", ...", color: "text-muted-foreground" }] },
  { tokens: [{ text: "  ]", color: "text-foreground" }] },
  { tokens: [{ text: "}", color: "text-foreground" }] },
  { tokens: [{ text: "", color: "" }] },
  { tokens: [{ text: "export default", color: "text-violet-400" }, { text: " developer", color: "text-blue-300" }, { text: ";", color: "text-foreground" }] },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 px-6" data-testid="section-about" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-12"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase">01. About</span>
          <h2 className="text-3xl md:text-4xl font-bold">Who I Am</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* VS Code title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-background/60 border-b border-border/60">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="ml-3 flex items-center gap-1">
              <span className="text-xs font-mono text-muted-foreground">about.ts</span>
              <span className="text-xs text-muted-foreground/60">— portfolio</span>
            </div>
          </div>

          {/* VS Code tabs */}
          <div className="flex border-b border-border/40 bg-background/30">
            <div className="px-4 py-2 text-xs font-mono text-foreground border-r border-border/40 border-b-2 border-b-primary bg-card/50 flex items-center gap-1.5">
              <FileCode className="w-3 h-3 text-blue-400" />
              about.ts
            </div>
            <div className="px-4 py-2 text-xs font-mono text-muted-foreground border-r border-border/40 hover:bg-card/30 flex items-center gap-1.5">
              <FileCode className="w-3 h-3 text-yellow-400" />
              skills.json
            </div>
          </div>

          <div className="flex">
            {/* File tree sidebar */}
            <div className="hidden md:block w-48 bg-background/20 border-r border-border/40 p-3 shrink-0">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3 px-1">Explorer</p>
              {fileTree.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className={`flex items-center gap-1.5 px-1 py-0.5 rounded text-xs font-mono cursor-pointer transition-colors ${
                      f.active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                    style={{ paddingLeft: `${f.depth * 12 + 4}px` }}
                  >
                    <Icon className={`w-3 h-3 flex-shrink-0 ${f.active ? "text-blue-400" : "text-muted-foreground"}`} />
                    {f.name}
                  </motion.div>
                );
              })}
            </div>

            {/* Code area with line numbers */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex font-mono text-sm py-4">
                {/* Line numbers */}
                <div className="select-none pr-4 pl-4 text-right text-muted-foreground/40 shrink-0 space-y-0">
                  {codeLines.map((_, i) => (
                    <div key={i} className="leading-6 text-xs">{i + 1}</div>
                  ))}
                </div>
                {/* Code */}
                <div className="flex-1 pr-4 space-y-0">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.04 }}
                      className="leading-6 whitespace-nowrap hover:bg-white/3 transition-colors"
                    >
                      {line.tokens.map((t, j) => (
                        <span key={j} className={t.color}>{t.text} </span>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-1.5 bg-primary/10 border-t border-border/40 text-xs font-mono text-primary/80">
            <div className="flex items-center gap-4">
              <span>TypeScript</span>
              <span>UTF-8</span>
              <span>LF</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Ln 1, Col 1</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for hire
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
