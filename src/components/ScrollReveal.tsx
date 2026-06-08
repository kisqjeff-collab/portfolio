"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const offsets = {
    up: { y: 60, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: offsets[direction].y,
        x: offsets[direction].x,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
