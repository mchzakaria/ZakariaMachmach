import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  { text: "> npm run portfolio", delay: 0, color: "text-green-400" },
  { text: "  Building Zakaria MACHMACH...", delay: 400, color: "text-muted-foreground" },
  { text: "  ✓ Experience loaded (5+ years)", delay: 900, color: "text-emerald-400" },
  { text: "  ✓ Projects compiled (30+)", delay: 1300, color: "text-emerald-400" },
  { text: "  ✓ Skills optimized (20+ technologies)", delay: 1700, color: "text-emerald-400" },
  { text: "  ✓ Passion level: maximum", delay: 2000, color: "text-emerald-400" },
  { text: "  Ready in 0.1ms  ⚡", delay: 2300, color: "text-primary font-bold" },
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        if (i === lines.length - 1) {
          setTimeout(() => setDone(true), 500);
          setTimeout(() => onDone(), 900);
        }
      }, line.delay);
    });
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] bg-background flex items-center justify-center"
        >
          <div className="w-full max-w-lg px-6">
            <div className="bg-card border border-border/60 rounded-2xl overflow-hidden">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-background/50 border-b border-border/60">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-muted-foreground">portfolio — zsh</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-2 min-h-[200px]">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.2 }}
                    className={line.color}
                  >
                    {line.text}
                    {i === visibleLines.length - 1 && !done && (
                      <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
