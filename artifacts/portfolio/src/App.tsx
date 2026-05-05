import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import { useKonamiCode } from "@/hooks/useKonamiCode";

const queryClient = new QueryClient();

function AppContent() {
  const [loaded, setLoaded] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { activated: konamiOn, dismiss: dismissKonami } = useKonamiCode();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Console easter egg
  useEffect(() => {
    console.log(
      "%c👋 Hey developer! You found the console easter egg.",
      "color: #8b5cf6; font-size: 16px; font-weight: bold;"
    );
    console.log(
      "%c🚀 Zakaria MACHMACH — Full Stack Developer",
      "color: #a78bfa; font-size: 14px;"
    );
    console.log(
      "%c📧 zakaria.machmach@gmail.com | 🐙 github.com/zakariamachmach",
      "color: #6d28d9; font-size: 12px;"
    );
    console.log(
      "%c⌨️  Try the Konami code: ↑↑↓↓←→←→BA",
      "color: #7c3aed; font-size: 12px; font-style: italic;"
    );
  }, []);

  // Ctrl+K / Cmd+K command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      {konamiOn && <KonamiEasterEgg onClose={dismissKonami} />}

      {/* Command palette hint */}
      {loaded && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-card/80 backdrop-blur border border-border/60 rounded-xl text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-lg hover:shadow-primary/10 hover:shadow-xl"
            data-testid="cmd-palette-hint"
          >
            <span>Press</span>
            <kbd className="bg-background border border-border/60 rounded px-1.5 py-0.5 text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="bg-background border border-border/60 rounded px-1.5 py-0.5 text-xs">K</kbd>
          </button>
        </div>
      )}

      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Switch>
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
