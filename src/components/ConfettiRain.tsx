import { motion } from "framer-motion";
import { useMemo } from "react";

const CONFETTI_COLORS = [
  "hsl(0 80% 50%)",    // red
  "hsl(50 100% 50%)",  // yellow
  "hsl(220 80% 50%)",  // blue
  "hsl(0 85% 62%)",    // light red
  "hsl(48 100% 60%)",  // light yellow
  "hsl(220 75% 62%)",  // light blue
  "hsl(0 0% 100%)",    // white
  "hsl(50 100% 45%)",  // deep yellow
];

const SHAPES = ["rounded-full", "rounded-sm", "rounded-none rotate-45"];

interface ConfettiRainProps {
  count?: number;
  className?: string;
}

const ConfettiRain = ({ count = 25, className = "" }: ConfettiRainProps) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        shape: SHAPES[i % SHAPES.length],
        size: Math.random() * 8 + 4,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 6,
        startY: -10 - Math.random() * 20,
        drift: Math.random() * 60 - 30,
      })),
    [count]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.shape}`}
          style={{
            width: p.size,
            height: p.size * (p.shape.includes("full") ? 1 : 0.6),
            background: p.color,
            left: p.left,
            top: `${p.startY}%`,
          }}
          animate={{
            y: [0, window.innerHeight * 1.2],
            x: [0, p.drift],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [0.9, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiRain;
