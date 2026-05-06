import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Terminal, Camera } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const TERMINAL_SEQUENCE = [
  { cmd: "whoami", output: "zakaria.machmach", type: "result" as const },
  { cmd: "cat role.txt", output: "Full Stack Web Developer", type: "result" as const },
  { cmd: "ls skills/", output: "React/  Node.js/  TypeScript/  PostgreSQL/  Docker/  ...", type: "result" as const },
  { cmd: "cat status.json", output: '{ "available": true, "looking_for": "next_challenge" }', type: "result" as const },
  { cmd: "./run portfolio.sh", output: null, type: "action" as const },
];

function useTypewriter(text: string, speed = 45, active = true) {
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
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return { displayed, done };
}

function TerminalLine({ cmd, output, type, active, onDone }: {
  cmd: string; output: string | null; type: "result" | "action"; active: boolean; onDone: () => void;
}) {
  const { displayed, done } = useTypewriter(cmd, 50, active);

  useEffect(() => {
    if (done) setTimeout(onDone, type === "action" ? 600 : 300);
  }, [done]);

  if (!active && !done) return null;

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-emerald-500 flex-shrink-0">❯</span>
        <span className="text-foreground font-mono truncate">
          {displayed}
          {!done && <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse align-text-bottom" />}
        </span>
      </div>
      {done && output && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className={`pl-5 font-mono text-sm break-all ${type === "action" ? "text-yellow-500 dark:text-yellow-400" : "text-muted-foreground"}`}
        >
          {output}
        </motion.div>
      )}
      {done && type === "action" && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="pl-5 font-mono text-sm text-primary"
        >
          ✓ Portfolio ready. Welcome.
        </motion.div>
      )}
    </div>
  );
}

function MoroccoTime() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-GB", {
      timeZone: "Africa/Casablanca",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", {
        timeZone: "Africa/Casablanca",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm text-xs font-mono text-muted-foreground"
      data-testid="morocco-time"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      <span>🇲🇦 Casablanca · {time} WET</span>
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
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-20 pb-10"
      data-testid="section-hero"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">

        {/* Main hero layout: photo card left, content right */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">

          {/* Career Profile Card — left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 self-start"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-primary/30 bg-card shadow-2xl"
              style={{
                width: "180px",
                boxShadow: "0 0 40px rgba(139,92,246,0.15), 0 20px 40px rgba(0,0,0,0.15)",
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/60 rounded-tl-xl z-10" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/60 rounded-tr-xl z-10" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl-xl z-10" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-xl z-10" />

              {/* Photo area */}
              <div className="relative" style={{ height: "216px" }}>
                <img
                  src="/avatar.jpg"
                  alt="Zakaria MACHMACH"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                {/* Fallback */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-2">
                    <span className="text-2xl font-extrabold text-primary font-mono">ZM</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    <Camera className="w-3 h-3" />
                    <span className="text-xs font-mono">add photo</span>
                  </div>
                </div>
                {/* Gradient fade to card */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Name plate */}
              <div className="px-3 pb-4 pt-1 bg-card">
                <p className="text-xs font-bold text-foreground font-mono leading-tight">Zakaria MACHMACH</p>
                <p className="text-xs text-primary font-mono mt-0.5">Full Stack Dev</p>
                <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-border/50">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"
                  />
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Available</span>
                </div>
              </div>

              {/* Scan line animation */}
              <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none z-20"
              />
            </div>
          </motion.div>

          {/* Right column: Terminal + headings + CTAs */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full bg-card/80 backdrop-blur-sm border border-border/60 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/60">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="flex items-center gap-1.5 ml-2">
                  <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground truncate">portfolio — ~/ — zsh</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 font-mono text-sm space-y-3 min-h-[150px]">
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
              </div>
            </motion.div>

            {/* Name + CTAs + Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showMain ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight glitch-text leading-tight" data-text="Zakaria MACHMACH">
                  Zakaria{" "}
                  <span className="text-primary relative inline-block">
                    MACHMACH
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50"
                      initial={{ scaleX: 0 }}
                      animate={showMain ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    />
                  </span>
                </h1>
                <p className="text-muted-foreground font-mono text-sm sm:text-base mt-2">
                  <span className="text-primary">const</span> role ={" "}
                  <span className="text-yellow-600 dark:text-yellow-400">"Full Stack Web Developer"</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton
                  onClick={() => handleScroll("#projects")}
                  className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/25 text-sm"
                  data-testid="hero-btn-projects"
                >
                  See My Work
                </MagneticButton>
                <MagneticButton
                  onClick={() => handleScroll("#contact")}
                  className="px-5 py-2.5 border border-border text-foreground font-semibold rounded-xl hover:bg-foreground/5 transition-all hover:border-primary/50 text-sm"
                  data-testid="hero-btn-contact"
                >
                  Contact Me
                </MagneticButton>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { href: "https://github.com/zakariamachmach", icon: Github, testId: "hero-link-github" },
                  { href: "https://linkedin.com/in/zakariamachmach", icon: Linkedin, testId: "hero-link-linkedin" },
                  { href: "mailto:zakaria.machmach@gmail.com", icon: Mail, testId: "hero-link-email" },
                ].map(({ href, icon: Icon, testId }) => (
                  <MagneticButton
                    key={testId}
                    as="a"
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="w-9 h-9 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10"
                    data-testid={testId}
                    strength={0.5}
                    radius={60}
                  >
                    <Icon className="w-4 h-4" />
                  </MagneticButton>
                ))}
                <MoroccoTime />
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={showMain ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        onClick={() => handleScroll("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors z-10"
        data-testid="hero-scroll-down"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
