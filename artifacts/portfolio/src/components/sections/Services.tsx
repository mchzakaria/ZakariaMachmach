import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Server, Paintbrush, Database, Gauge } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const services = [
  {
    icon: Globe,
    title: "Web App Development",
    description:
      "End-to-end development of modern, responsive web applications using React, Next.js, and TypeScript. From MVP to production-grade.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Server,
    title: "API & Backend Development",
    description:
      "Robust REST and GraphQL APIs with Node.js, Express, or NestJS. Secure, scalable, and well-documented backend systems.",
    tags: ["Node.js", "NestJS", "GraphQL"],
  },
  {
    icon: Paintbrush,
    title: "UI/UX Implementation",
    description:
      "Translating design mockups into pixel-perfect, animated, and accessible interfaces. Detail-obsessed front-end craftsmanship.",
    tags: ["Tailwind CSS", "Framer Motion", "Accessibility"],
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Schema design, query optimization, and migration management for PostgreSQL, MongoDB, and Redis. Data architecture that scales.",
    tags: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    description:
      "Lighthouse audits, Core Web Vitals optimization, server-side rendering, and SEO best practices for maximum reach and speed.",
    tags: ["SSR", "Core Web Vitals", "SEO"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-services" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col gap-2 mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 1.4, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8 }}
            className="absolute -top-10 -left-2 sm:-left-4 text-[7rem] sm:text-[9rem] font-extrabold font-mono leading-none select-none pointer-events-none text-foreground/[0.04]"
            aria-hidden="true"
          >
            03
          </motion.span>
          <span className="relative z-10 text-primary font-mono text-sm tracking-widest uppercase">03. Services</span>
          <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-foreground">What I Offer</h2>
          <p className="relative z-10 text-muted-foreground max-w-xl mt-2">
            From concept to deployment — I cover the full development lifecycle.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" style={{ perspective: "1200px" }}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TiltCard
                  className="group relative bg-card border border-border/60 rounded-2xl p-5 sm:p-6 hover:border-primary/40 transition-all duration-300 overflow-hidden h-full"
                  data-testid={`service-card-${i}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono bg-muted border border-border/60 text-muted-foreground rounded-md"
                          data-testid={`service-tag-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
