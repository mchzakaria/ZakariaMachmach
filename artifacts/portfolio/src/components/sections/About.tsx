import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Coffee, Zap } from "lucide-react";

const stats = [
  { icon: Calendar, label: "Years Experience", value: "5+" },
  { icon: Coffee, label: "Projects Delivered", value: "30+" },
  { icon: Zap, label: "Technologies", value: "20+" },
  { icon: MapPin, label: "Based in", value: "Morocco" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6" data-testid="section-about" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase">01. About</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative">
              <div className="w-full max-w-sm mx-auto aspect-square rounded-2xl bg-card border border-border/60 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold font-mono text-primary">ZM</span>
                    </div>
                    <p className="text-muted-foreground font-mono text-sm">Full Stack Developer</p>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-card border border-border/60 rounded-xl px-4 py-2 shadow-xl"
              >
                <span className="text-xs font-mono text-muted-foreground">5+ years</span>
                <p className="text-sm font-bold text-foreground">of experience</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a passionate <span className="text-foreground font-semibold">Full Stack Web Developer</span> who
              loves building clean, scalable, and high-performance web applications. I care deeply about every
              layer of the stack — from database schema design to pixel-perfect UI.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Constantly learning and evolving with the tech landscape, I bring both technical depth and
              creative problem-solving to every project. Whether it's architecting a robust API or crafting
              an intuitive user interface, I'm driven by the challenge of making complex things feel simple.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Based in Morocco, I work with clients and teams worldwide, delivering production-ready solutions
              that are built to last.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="bg-card border border-border/60 rounded-xl p-4 hover:border-primary/40 transition-colors"
                  data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className="w-4 h-4 text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground font-mono">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
