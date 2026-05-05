import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Heart } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/60 py-12 px-6 bg-card/20" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-mono text-sm font-bold text-foreground tracking-wider">
              ZM<span className="text-primary">.</span>
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`footer-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/zakariamachmach"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10"
              data-testid="footer-github"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/zakariamachmach"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10"
              data-testid="footer-linkedin"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:zakaria.machmach@gmail.com"
              className="w-9 h-9 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:bg-primary/10"
              data-testid="footer-email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} Zakaria MACHMACH. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-primary" /> using React &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
