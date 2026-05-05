import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      data-testid="section-hero"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono mb-8"
          data-testid="hero-badge"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Available for opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none mb-4"
          data-testid="hero-name"
        >
          Zakaria{" "}
          <span className="relative">
            <span className="text-primary">MACHMACH</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary/40 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl font-mono text-muted-foreground mt-6 mb-3"
          data-testid="hero-title"
        >
          Full Stack Web Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
          data-testid="hero-tagline"
        >
          Building scalable, performant web applications from database to deployment.
          Clean code. Real impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => handleScroll("#projects")}
            className="px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            data-testid="hero-btn-projects"
          >
            See My Work
          </button>
          <button
            onClick={() => handleScroll("#contact")}
            className="px-7 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-white/5 transition-all hover:border-primary/50"
            data-testid="hero-btn-contact"
          >
            Contact Me
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <a
            href="https://github.com/zakariamachmach"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10"
            data-testid="hero-link-github"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/zakariamachmach"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10"
            data-testid="hero-link-linkedin"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:zakaria.machmach@gmail.com"
            className="w-10 h-10 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10"
            data-testid="hero-link-email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => handleScroll("#about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        data-testid="hero-scroll-down"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
