import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const seq = useRef<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      seq.current.push(e.key);
      if (seq.current.length > KONAMI.length) seq.current.shift();
      if (seq.current.join(",") === KONAMI.join(",")) {
        setActivated(true);
        seq.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { activated, dismiss: () => setActivated(false) };
}
