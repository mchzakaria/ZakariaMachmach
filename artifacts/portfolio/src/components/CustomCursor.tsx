import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHovering(
        !!(el.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"))
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    const animate = () => {
      const lag = 0.12;
      dotPos.current.x += (pos.current.x - dotPos.current.x) * lag;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * lag;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 18}px, ${dotPos.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className={`w-2 h-2 rounded-full bg-primary transition-transform duration-100 ${
            isClicking ? "scale-50" : isHovering ? "scale-0" : "scale-100"
          }`}
        />
      </div>
      {/* Ring */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full border border-primary/60 transition-all duration-200 ${
            isHovering
              ? "w-12 h-12 bg-primary/10 border-primary"
              : isClicking
              ? "w-6 h-6 bg-primary/20"
              : "w-9 h-9"
          }`}
          style={{
            boxShadow: isHovering ? "0 0 20px rgba(139,92,246,0.3)" : "0 0 8px rgba(139,92,246,0.15)",
          }}
        />
      </div>
    </>
  );
}
