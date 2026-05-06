import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 group flex-shrink-0"
          data-testid="nav-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <span className="font-mono text-sm font-bold text-foreground tracking-wider">
            ZM<span className="text-primary">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-foreground/5 font-medium"
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-foreground/5 transition-all"
            data-testid="theme-toggle"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Hire Me CTA */}
          <button
            onClick={() => handleNav("#contact")}
            className="hidden sm:block px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            data-testid="nav-cta"
          >
            Hire Me
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="nav-menu-toggle"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menuOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <ul className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-foreground/5"
                    data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <button
                  onClick={() => handleNav("#contact")}
                  className="w-full px-4 py-2.5 text-sm bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  data-testid="mobile-nav-cta"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
