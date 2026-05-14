import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Terminal, FileText } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import profilePic from "@assets/ZakariaMachmachPic.jpg";
import { useQuery } from "@tanstack/react-query";

const ICON_MAP: Record<string, React.ElementType> = { Github, Linkedin, Mail };


const TERMINAL_SEQUENCE = [
  { cmd: "whoami", output: "zakaria.machmach", type: "result" as const },
  { cmd: "cat role.txt", output: "Full Stack Web Developer", type: "result" as const },
  { cmd: "ls skills/", output: "React/  Node.js/  TypeScript/  PostgreSQL/  Go/  ...", type: "result" as const },
  { cmd: "cat status.json", output: '{ "available": true, "location": "Casablanca, Morocco" }', type: "result" as const },
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

  const { data } = useQuery({
    queryKey: ["/api/data"],
    queryFn: async () => {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    }
  });

  const heroData = data?.hero;
  const terminalSequence = heroData?.terminal || TERMINAL_SEQUENCE;
  const heroName = heroData?.name || "Zakaria MACHMACH";
  const heroRole = heroData?.role || "Full Stack Web Developer";
  const heroCV = heroData?.cv || "/cv.pdf";
  const heroLinks = heroData?.links || [
    { href: "https://github.com/mchzakaria", icon: "Github", testId: "hero-link-github" },
    { href: "https://www.linkedin.com/in/zakaria-machmach-094428225/", icon: "Linkedin", testId: "hero-link-linkedin" },
    { href: "mailto:zakariamachmach03@gmail.com", icon: "Mail", testId: "hero-link-email" },
  ];

  const handleStepDone = (i: number) => {
    setCompletedSteps((p) => [...p, i]);
    if (i < terminalSequence.length - 1) {
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

        {/* Profile photo + Terminal side by side on lg, stacked on mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">

          {/* Profile photo — circular */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, hsl(252 87% 67%), transparent 60%, hsl(252 87% 67%))",
                  borderRadius: "50%",
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full opacity-30"
                style={{
                  background: "conic-gradient(from 180deg, hsl(280 70% 65%), transparent 60%, hsl(200 80% 60%))",
                  borderRadius: "50%",
                }}
              />
              <div
                className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-background bg-card z-10"
                style={{ boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}
              >
                <img
                  src={profilePic}
                  alt="Zakaria MACHMACH"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 z-20 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background shadow-lg shadow-emerald-500/50">
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-emerald-400"
                />
              </div>
            </div>
          </motion.div>

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
            <div className="p-4 sm:p-5 font-mono text-sm space-y-3 min-h-[160px]">
              {terminalSequence.map((step: any, i: number) => (
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
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showMain ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight glitch-text leading-tight" data-text={heroName}>
              {heroName.split(" ")[0]}{" "}
              <span className="text-primary relative inline-block">
                {heroName.split(" ").slice(1).join(" ")}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50"
                  initial={{ scaleX: 0 }}
                  animate={showMain ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </span>
            </h1>
            <p className="text-muted-foreground font-mono text-base sm:text-lg mt-3">
              <span className="text-primary">const</span> role ={" "}
              <span className="text-yellow-600 dark:text-yellow-400">"{heroRole}"</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <MagneticButton
              onClick={() => handleScroll("#projects")}
              className="px-6 sm:px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              data-testid="hero-btn-projects"
            >
              See My Work
            </MagneticButton>
            <MagneticButton
              onClick={() => handleScroll("#contact")}
              className="px-6 sm:px-7 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-foreground/5 transition-all hover:border-primary/50"
              data-testid="hero-btn-contact"
            >
              Contact Me
            </MagneticButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {heroLinks.map(({ href, icon, testId }: { href: string; icon: string; testId: string }) => {
              const Icon = ICON_MAP[icon] || Mail;
              return (
                <MagneticButton
                  key={testId}
                  as="a"
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="w-10 h-10 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10"
                  data-testid={testId}
                  strength={0.5}
                  radius={60}
                >
                  <Icon className="w-4 h-4" />
                </MagneticButton>
              );
            })}
            <MagneticButton
              as="a"
              href={heroCV}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10 text-xs font-mono"
              data-testid="hero-link-cv"
              strength={0.5}
              radius={60}
            >
              <FileText className="w-3.5 h-3.5" />
              CV
            </MagneticButton>
            <MoroccoTime />
          </div>
        </motion.div>
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
