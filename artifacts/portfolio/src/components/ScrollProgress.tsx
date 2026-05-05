import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? scrolled / max : 0;
      setProgress(pct);
      spring.set(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [spring]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[9997] origin-left"
      style={{
        scaleX: spring,
        background: "linear-gradient(90deg, hsl(252 87% 67%), hsl(280 70% 65%), hsl(200 80% 60%))",
        boxShadow: "0 0 10px rgba(139,92,246,0.6)",
      }}
    />
  );
}
