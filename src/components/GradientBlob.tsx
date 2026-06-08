"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const blobs = [
  {
    color: "rgba(59,130,246,0.35)",
    size: 500,
    duration: 20,
    x: ["-10%", "30%", "10%", "-10%"],
    y: ["10%", "-10%", "30%", "10%"],
  },
  {
    color: "rgba(139,92,246,0.3)",
    size: 450,
    duration: 25,
    x: ["60%", "40%", "70%", "60%"],
    y: ["-5%", "20%", "-10%", "-5%"],
  },
  {
    color: "rgba(96,165,250,0.25)",
    size: 400,
    duration: 22,
    x: ["20%", "50%", "30%", "20%"],
    y: ["50%", "30%", "60%", "50%"],
  },
];

export default function GradientBlob() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 30 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: "blur(80px)",
            x: smoothX,
            y: smoothY,
          }}
          animate={{
            left: blob.x,
            top: blob.y,
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
