import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "  ____  __ __  ____    ___  ____   ___  _____ ",
  " |    ||  T  ||    \\  /  _]|    \\ /  _]/ ___/ ",
  " |__  ||  |  ||  D  )/  [_ |  D  )  [_(   \\_ ",
  " __|  ||  |  ||    /Y    _]|    /Y    _]\\__  T",
  "/  |  ||  :  ||    \\|   [_ |    \\|   [_ /  \\ |",
  "\\  `  |l     ||  .  Y     T|  .  Y     T\\    |",
  " \\____|\\__,__||__|\\_l_____ll__|\\_l_____j \\___j",
  "",
  "  You found the Easter Egg!",
  "",
  "  const developer = {",
  "    name: 'Zakaria MACHMACH',",
  "    level: 'Senior',",
  "    superPower: 'coffee => code',",
  "    secretCode: 'up up down down left right left right B A',",
  "    message: 'Hire me. I know the Konami Code.'",
  "  }",
];

export default function KonamiEasterEgg({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99998] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateX: -20 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-card border border-primary/40 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl shadow-primary/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-background/50 border-b border-border/60">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-primary">easter_egg.ts - SECRET</span>
            <button
              onClick={onClose}
              className="ml-auto text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2"
              data-testid="easter-egg-close"
            >
              x close
            </button>
          </div>
          <div className="p-6 font-mono text-xs md:text-sm overflow-x-auto">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                className={
                  line.startsWith("  const") || line.includes(": '") || line.includes("}")
                    ? "text-violet-400"
                    : line.includes("Easter Egg")
                    ? "text-yellow-400 font-bold text-base"
                    : line.startsWith("  //")
                    ? "text-green-500"
                    : "text-primary/80"
                }
              >
                {line || "\u00a0"}
              </motion.div>
            ))}
          </div>
          <div className="px-6 pb-6">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xs font-mono text-muted-foreground"
            >
              {'>'} Click anywhere to close_
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
