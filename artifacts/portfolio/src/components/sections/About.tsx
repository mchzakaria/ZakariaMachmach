import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FileCode, FolderOpen, Folder } from "lucide-react";
import { fallbackPortfolioData, usePortfolioData } from "@/lib/portfolioData";

type FileId = "about.ts" | "skills.json" | "projects.ts";
type CodeToken = { t: string; c: string };
type CodeLine = { tokens: CodeToken[] };

const token = {
  keyword: "text-violet-500 dark:text-violet-400",
  variable: "text-blue-600 dark:text-blue-300",
  key: "text-cyan-600 dark:text-cyan-300",
  string: "text-amber-600 dark:text-yellow-300",
  number: "text-orange-500 dark:text-orange-400",
  plain: "text-foreground",
  muted: "text-muted-foreground",
};

const fileTabs: { id: FileId; color: string }[] = [
  { id: "about.ts", color: "text-blue-500" },
  { id: "skills.json", color: "text-yellow-500" },
  { id: "projects.ts", color: "text-emerald-500" },
];

function line(...tokens: CodeToken[]): CodeLine {
  return { tokens };
}

function str(value: string) {
  return `"${value.replaceAll('"', '\\"')}"`;
}

function quotedList(values: string[], indent = "  ") {
  return values.map((value, index) =>
    line(
      { t: `${indent}${str(value)}`, c: token.string },
      { t: index === values.length - 1 ? "" : ",", c: token.plain },
    )
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFile, setActiveFile] = useState<FileId>("about.ts");
  const { data = fallbackPortfolioData } = usePortfolioData();

  const snippets = useMemo<Record<FileId, CodeLine[]>>(() => {
    const topSkills = data.categories.flatMap((cat) => cat.skills.map((skill) => skill.name)).slice(0, 8);
    const featuredProjects = data.projects.slice(0, 4);

    return {
      "about.ts": [
        line({ t: "const", c: token.keyword }, { t: " developer", c: token.variable }, { t: " = {", c: token.plain }),
        line({ t: "  name", c: token.key }, { t: ": ", c: token.plain }, { t: str(data.hero.name), c: token.string }, { t: ",", c: token.plain }),
        line({ t: "  role", c: token.key }, { t: ": ", c: token.plain }, { t: str(data.hero.role), c: token.string }, { t: ",", c: token.plain }),
        line({ t: "  location", c: token.key }, { t: ": ", c: token.plain }, { t: str("Casablanca, Morocco"), c: token.string }, { t: ",", c: token.plain }),
        line({ t: "  experience", c: token.key }, { t: ": ", c: token.plain }, { t: str("2+ years"), c: token.string }, { t: ",", c: token.plain }),
        line({ t: "  available", c: token.key }, { t: ": ", c: token.plain }, { t: "true", c: token.number }, { t: ",", c: token.plain }),
        line({ t: "", c: token.plain }),
        line({ t: "  summary", c: token.key }, { t: ": ", c: token.plain }, { t: str(data.about.summary), c: token.string }, { t: ",", c: token.plain }),
        line({ t: "  superpower", c: token.key }, { t: ": ", c: token.plain }, { t: str(data.about.superpower), c: token.string }, { t: ",", c: token.plain }),
        line({ t: "}", c: token.plain }),
        line({ t: "", c: token.plain }),
        line({ t: "export default", c: token.keyword }, { t: " developer", c: token.variable }, { t: ";", c: token.plain }),
      ],
      "skills.json": [
        line({ t: "{", c: token.plain }),
        line({ t: '  "primaryStack"', c: token.key }, { t: ": [", c: token.plain }, { t: " // strongest daily tools", c: token.muted }),
        ...quotedList(topSkills, "    "),
        line({ t: "  ],", c: token.plain }),
        line({ t: '  "categories"', c: token.key }, { t: ": [", c: token.plain }),
        ...data.categories.flatMap((cat, index) => [
          line({ t: "    {", c: token.plain }),
          line({ t: '      "name"', c: token.key }, { t: ": ", c: token.plain }, { t: str(cat.title), c: token.string }, { t: ",", c: token.plain }),
          line(
            { t: '      "average"', c: token.key },
            { t: ": ", c: token.plain },
            { t: `${Math.round(cat.skills.reduce((sum, skill) => sum + skill.level, 0) / cat.skills.length)}`, c: token.number },
            { t: ",", c: token.plain },
          ),
          line({ t: '      "skills"', c: token.key }, { t: ": [", c: token.plain }, { t: cat.skills.slice(0, 3).map((skill) => str(skill.name)).join(", "), c: token.string }, { t: "]", c: token.plain }),
          line({ t: `    }${index === data.categories.length - 1 ? "" : ","}`, c: token.plain }),
        ]),
        line({ t: "  ]", c: token.plain }),
        line({ t: "}", c: token.plain }),
      ],
      "projects.ts": [
        line({ t: "type", c: token.keyword }, { t: " Project", c: token.variable }, { t: " = {", c: token.plain }),
        line({ t: "  name", c: token.key }, { t: ": ", c: token.plain }, { t: "string", c: token.variable }, { t: ";", c: token.plain }),
        line({ t: "  focus", c: token.key }, { t: ": ", c: token.plain }, { t: "string", c: token.variable }, { t: ";", c: token.plain }),
        line({ t: "  stack", c: token.key }, { t: ": ", c: token.plain }, { t: "string[]", c: token.variable }, { t: ";", c: token.plain }),
        line({ t: "};", c: token.plain }),
        line({ t: "", c: token.plain }),
        line({ t: "export", c: token.keyword }, { t: " const", c: token.keyword }, { t: " featuredProjects", c: token.variable }, { t: ": ", c: token.plain }, { t: "Project[]", c: token.variable }, { t: " = [", c: token.plain }),
        ...featuredProjects.flatMap((project) => [
          line({ t: "  {", c: token.plain }),
          line({ t: "    name", c: token.key }, { t: ": ", c: token.plain }, { t: str(project.name), c: token.string }, { t: ",", c: token.plain }),
          line({ t: "    focus", c: token.key }, { t: ": ", c: token.plain }, { t: str(project.description.split(".")[0]), c: token.string }, { t: ",", c: token.plain }),
          line({ t: "    stack", c: token.key }, { t: ": [", c: token.plain }),
          ...quotedList(project.tech.slice(0, 5), "      "),
          line({ t: "    ]", c: token.plain }),
          line({ t: "  },", c: token.plain }),
        ]),
        line({ t: "];", c: token.plain }),
      ],
    };
  }, [data]);

  const activeLines = snippets[activeFile];
  const fileTree = [
    { name: "portfolio/", icon: FolderOpen, depth: 0 },
    { name: "src/", icon: FolderOpen, depth: 1 },
    { name: "about.ts", icon: FileCode, depth: 2, id: "about.ts" as FileId },
    { name: "skills.json", icon: FileCode, depth: 2, id: "skills.json" as FileId },
    { name: "projects.ts", icon: FileCode, depth: 2, id: "projects.ts" as FileId },
    { name: "contact.ts", icon: FileCode, depth: 2 },
  ];

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
              <span className="text-xs font-mono text-muted-foreground">{activeFile}</span>
              <span className="text-xs text-muted-foreground/60 hidden sm:inline">- portfolio</span>
            </div>
          </div>

          <div className="flex border-b border-border/40 bg-muted/20 overflow-x-auto">
            {fileTabs.map((file) => {
              const isActive = file.id === activeFile;
              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => setActiveFile(file.id)}
                  className={`px-3 sm:px-4 py-2 text-xs font-mono border-r border-border/40 flex items-center gap-1.5 flex-shrink-0 transition-colors ${
                    isActive
                      ? "text-foreground border-b-2 border-b-primary bg-card/50"
                      : "text-muted-foreground hover:bg-card/30 hover:text-foreground"
                  }`}
                  data-testid={`about-tab-${file.id.replace(".", "-")}`}
                >
                  <FileCode className={`w-3 h-3 ${file.color}`} />
                  {file.id}
                </button>
              );
            })}
          </div>

          <div className="flex min-h-0">
            <div className="hidden md:block w-44 bg-muted/20 border-r border-border/40 p-3 shrink-0">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3 px-1">Explorer</p>
              {fileTree.map((f, i) => {
                const Icon = f.icon;
                const isSelectable = "id" in f;
                const isActive = isSelectable && f.id === activeFile;
                const content = (
                  <>
                    <Icon className={`w-3 h-3 flex-shrink-0 ${isActive ? "text-blue-500" : "text-muted-foreground"}`} />
                    {f.name}
                  </>
                );

                return (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    {isSelectable ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (f.id) setActiveFile(f.id);
                        }}
                        className={`flex w-full items-center gap-1.5 py-0.5 rounded text-xs font-mono transition-colors text-left ${
                          isActive
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                        }`}
                        style={{ paddingLeft: `${f.depth * 10 + 4}px` }}
                      >
                        {content}
                      </button>
                    ) : (
                      <div
                        className="flex items-center gap-1.5 py-0.5 rounded text-xs font-mono text-muted-foreground"
                        style={{ paddingLeft: `${f.depth * 10 + 4}px` }}
                      >
                        {content}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="flex-1 overflow-x-auto">
              <div className="flex font-mono text-xs sm:text-sm py-4">
                <div className="select-none pr-3 pl-3 sm:pl-4 text-right text-muted-foreground/40 shrink-0">
                  {activeLines.map((_, i) => (
                    <div key={i} className="leading-6">{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1 pr-3 sm:pr-4">
                  {activeLines.map((codeLine, i) => (
                    <motion.div
                      key={`${activeFile}-${i}`}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.1 + i * 0.025 }}
                      className="leading-6 whitespace-nowrap hover:bg-foreground/[0.03] transition-colors"
                    >
                      {codeLine.tokens.map((tok, j) => (
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
              <span>{activeFile.endsWith(".json") ? "JSON" : "TypeScript"}</span>
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
