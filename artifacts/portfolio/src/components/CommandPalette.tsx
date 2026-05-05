import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, Zap, X } from "lucide-react";

const sections = [
  { id: "hero", label: "Home", icon: "🏠", description: "Back to top" },
  { id: "about", label: "About", icon: "👤", description: "Who I am" },
  { id: "skills", label: "Skills", icon: "⚡", description: "My tech stack" },
  { id: "services", label: "Services", icon: "🛠", description: "What I offer" },
  { id: "projects", label: "Projects", icon: "🚀", description: "Selected work" },
  { id: "experience", label: "Experience", icon: "💼", description: "Professional journey" },
  { id: "education", label: "Education", icon: "🎓", description: "Academic background" },
  { id: "contact", label: "Contact", icon: "📨", description: "Get in touch" },
];

const actions = [
  { id: "email", label: "Send Email", icon: "✉️", description: "zakaria.machmach@gmail.com", action: () => window.open("mailto:zakaria.machmach@gmail.com") },
  { id: "github", label: "Open GitHub", icon: "🐙", description: "github.com/zakariamachmach", action: () => window.open("https://github.com/zakariamachmach", "_blank") },
  { id: "linkedin", label: "Open LinkedIn", icon: "💼", description: "linkedin.com/in/zakariamachmach", action: () => window.open("https://linkedin.com/in/zakariamachmach", "_blank") },
];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = [
    ...sections.map((s) => ({ ...s, type: "nav" as const })),
    ...actions.map((a) => ({ ...a, type: "action" as const })),
  ];

  const filtered = allItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleSelect = (item: (typeof allItems)[0]) => {
    if (item.type === "action" && "action" in item) {
      (item as typeof actions[0]).action();
    } else {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") setSelected((s) => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) handleSelect(filtered[selected]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selected]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[9991] w-full max-w-lg px-4"
          >
            <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections, actions..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono"
                  data-testid="command-palette-input"
                />
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-6 font-mono">No results found</p>
                )}
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === selected ? "bg-primary/10" : "hover:bg-white/5"
                    }`}
                    data-testid={`cmd-item-${item.id}`}
                  >
                    <span className="text-base w-6 text-center">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </div>
                    {i === selected && (
                      <span className="text-xs font-mono text-primary/60 flex-shrink-0">↵</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="border-t border-border/60 px-4 py-2 flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <kbd className="bg-background border border-border/60 rounded px-1 py-0.5 text-xs">↑↓</kbd> navigate
                </span>
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <kbd className="bg-background border border-border/60 rounded px-1 py-0.5 text-xs">↵</kbd> select
                </span>
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <kbd className="bg-background border border-border/60 rounded px-1 py-0.5 text-xs">esc</kbd> close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
