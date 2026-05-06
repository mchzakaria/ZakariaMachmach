import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  radius?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  "data-testid"?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  strength = 0.35,
  radius = 90,
  as = "button",
  href,
  target,
  rel,
  "data-testid": testId,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      setPos({ x: dx * strength, y: dy * strength });
    }
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const motionProps = {
    animate: pos,
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
    "data-testid": testId,
  };

  if (as === "a") {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
