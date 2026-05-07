import {
  SiReact, SiTypescript, SiTailwindcss, SiJavascript,
  SiNodedotjs, SiExpress, SiPhp, SiSpring, SiSymfony,
  SiPostgresql, SiMongodb, SiMysql, SiRedis, SiSupabase,
  SiGit, SiDocker, SiDart, SiFlutter, SiGo,
} from "react-icons/si";

const techs = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#888" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
  { name: "Symfony", icon: SiSymfony, color: "#888" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
  { name: "Dart", icon: SiDart, color: "#0175C2" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

function MarqueePill({ name, icon: Icon, color }: { name: string; icon: React.ElementType; color: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm mx-2 whitespace-nowrap hover:border-primary/40 transition-colors group/pill shrink-0">
      <Icon className="w-4 h-4 shrink-0 transition-transform group-hover/pill:scale-110" style={{ color }} />
      <span className="text-sm font-mono text-muted-foreground group-hover/pill:text-foreground transition-colors">{name}</span>
    </div>
  );
}

export default function TechMarquee() {
  const doubled = [...techs, ...techs];

  return (
    <div className="relative py-6 overflow-hidden border-y border-border/40 bg-background/50" data-testid="tech-marquee">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex marquee-track">
        {doubled.map((t, i) => (
          <MarqueePill key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}
