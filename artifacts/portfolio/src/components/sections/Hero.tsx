import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";

const TERMINAL_SEQUENCE = [
  { cmd: "whoami", output: "zakaria.machmach", type: "result" as const },
  { cmd: "cat role.txt", output: "Full Stack Web Developer", type: "result" as const },
  { cmd: "ls skills/", output: "React/  Node.js/  TypeScript/  PostgreSQL/  Docker/  ...", type: "result" as const },
  { cmd: "cat status.json", output: '{ "available": true, "looking_for": "next_challenge" }', type: "result" as const },
  { cmd: "./run portfolio.sh", output: null, type: "action" as const },
];

function useTypewriter(text: string, speed = 40, active = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return { displayed, done };
}

function TerminalLine({ cmd, output, type, active, onDone }: {
  cmd: string;
  output: string | null;
  type: "result" | "action";
  active: boolean;
  onDone: () => void;
}) {
  const { displayed, done } = useTypewriter(cmd, 50, active);

  useEffect(() => {
    if (done) {
      const delay = type === "action" ? 600 : 300;
      setTimeout(onDone, delay);
    }
  }, [done]);

  if (!active && !done) return null;

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 flex-shrink-0">❯</span>
        <span className="text-foreground font-mono">
          {displayed}
          {!done && <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse align-text-bottom" />}
        </span>
      </div>
      {done && output && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`pl-5 font-mono text-sm ${type === "action" ? "text-yellow-400" : "text-muted-foreground"}`}
        >
          {output}
        </motion.div>
      )}
      {done && type === "action" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pl-5 font-mono text-sm text-primary"
        >
          ✓ Portfolio ready. Welcome.
        </motion.div>
      )}
    </div>
  );
}

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const [showMain, setShowMain] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepDone = (i: number) => {
    setCompletedSteps((p) => [...p, i]);
    if (i < TERMINAL_SEQUENCE.length - 1) {
      setTimeout(() => setActiveStep(i + 1), 200);
    } else {
      setTimeout(() => setShowMain(true), 700);
    }
  };

  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20" data-testid="section-hero">
      <div className="relative z-10 max-w-3xl mx-auto w-full space-y-8">
        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card/80 backdrop-blur-sm border border-border/60 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-background/50 border-b border-border/60">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="flex items-center gap-1.5 ml-2">
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">portfolio — ~/ — zsh</span>
            </div>
          </div>
          <div className="p-5 font-mono text-sm space-y-3 min-h-[200px]">
            {TERMINAL_SEQUENCE.map((step, i) => (
              (i <= activeStep || completedSteps.includes(i)) && (
                <TerminalLine
                  key={i}
                  cmd={step.cmd}
                  output={step.output}
                  type={step.type}
                  active={i === activeStep}
                  onDone={() => handleStepDone(i)}
                />
              )
            ))}
            {!showMain && activeStep === TERMINAL_SEQUENCE.length - 1 && completedSteps.length < TERMINAL_SEQUENCE.length && (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">❯</span>
                <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Main content revealed after terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showMain ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight glitch-text" data-text="Zakaria MACHMACH">
              Zakaria{" "}
              <span className="text-primary relative">
                MACHMACH
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50"
                  initial={{ scaleX: 0 }}
                  animate={showMain ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </span>
            </h1>
            <p className="text-muted-foreground font-mono text-lg mt-3">
              <span className="text-primary">const</span> role ={" "}
              <span className="text-yellow-400">"Full Stack Web Developer"</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleScroll("#projects")}
              className="px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
              data-testid="hero-btn-projects"
            >
              See My Work
            </button>
            <button
              onClick={() => handleScroll("#contact")}
              className="px-7 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-white/5 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
              data-testid="hero-btn-contact"
            >
              Contact Me
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a href="https://github.com/zakariamachmach" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              data-testid="hero-link-github">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/zakariamachmach" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              data-testid="hero-link-linkedin">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:zakaria.machmach@gmail.com"
              className="w-10 h-10 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              data-testid="hero-link-email">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={showMain ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        onClick={() => handleScroll("#about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors z-10"
        data-testid="hero-scroll-down"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
