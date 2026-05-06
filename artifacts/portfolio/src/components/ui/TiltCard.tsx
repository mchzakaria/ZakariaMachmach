import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
  "data-testid"?: string;
}

export default function TiltCard({
  children,
  className,
  tiltStrength = 10,
  "data-testid": testId,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-1, 1], [tiltStrength, -tiltStrength]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-tiltStrength, tiltStrength]), {
    stiffness: 300,
    damping: 30,
  });
  const glareX = useTransform(x, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [-1, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px * 2 - 1);
    y.set(py * 2 - 1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className ?? ""}`}
      data-testid={testId}
    >
      {children}
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.06) 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
