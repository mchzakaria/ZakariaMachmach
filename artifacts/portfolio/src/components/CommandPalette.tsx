import { useEffect, useState, useRef, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Home, User, Zap, Wrench, Rocket, Briefcase,
  GraduationCap, Mail, Github, Linkedin, CornerDownLeft,
  ArrowDown, ArrowUp,
} from "lucide-react";

type CommandItem =
  | {
      id: string;
      label: string;
      icon: ElementType;
      description: string;
      type: "nav";
    }
  | {
      id: string;
      label: string;
      icon: ElementType;
      description: string;
      type: "action";
      action: () => void;
    };

const sections: CommandItem[] = [
  { id: "hero", label: "Home", icon: Home, description: "Back to top", type: "nav" },
  { id: "about", label: "About", icon: User, description: "Who I am", type: "nav" },
  { id: "skills", label: "Skills", icon: Zap, description: "My tech stack", type: "nav" },
  { id: "services", label: "Services", icon: Wrench, description: "What I offer", type: "nav" },
  { id: "projects", label: "Projects", icon: Rocket, description: "Selected work", type: "nav" },
  { id: "experience", label: "Experience", icon: Briefcase, description: "Professional journey", type: "nav" },
  { id: "education", label: "Education", icon: GraduationCap, description: "Academic background", type: "nav" },
  { id: "contact", label: "Contact", icon: Mail, description: "Get in touch", type: "nav" },
];

const actions: CommandItem[] = [
  { id: "email", label: "Send Email", icon: Mail, description: "zakariamachmach03@gmail.com", type: "action", action: () => window.open("mailto:zakariamachmach03@gmail.com") },
  { id: "github", label: "Open GitHub", icon: Github, description: "github.com/mchzakaria", type: "action", action: () => window.open("https://github.com/mchzakaria", "_blank") },
  { id: "linkedin", label: "Open LinkedIn", icon: Linkedin, description: "linkedin.com/in/zakariamachmach", type: "action", action: () => window.open("https://www.linkedin.com/in/zakaria-machmach-094428225/", "_blank") },
];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = [...sections, ...actions];
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

  const handleSelect = (item: CommandItem) => {
    if (item.type === "action") {
      item.action();
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
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close command palette">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-6 font-mono">No results found</p>
                )}
                {filtered.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        i === selected ? "bg-primary/10" : "hover:bg-white/5"
                      }`}
                      data-testid={`cmd-item-${item.id}`}
                    >
                      <span className="w-6 flex justify-center text-muted-foreground">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                      </div>
                      {i === selected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="border-t border-border/60 px-4 py-2 flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <kbd className="bg-background border border-border/60 rounded px-1 py-0.5 text-xs flex items-center gap-0.5">
                    <ArrowUp className="w-3 h-3" />
                    <ArrowDown className="w-3 h-3" />
                  </kbd>
                  navigate
                </span>
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <kbd className="bg-background border border-border/60 rounded px-1 py-0.5 text-xs">
                    Enter
                  </kbd>
                  select
                </span>
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <kbd className="bg-background border border-border/60 rounded px-1 py-0.5 text-xs">Esc</kbd>
                  close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
