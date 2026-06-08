"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export default function TypingText({
  text,
  className = "",
  speed = 50,
  delay = 0,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-[3px] h-[1em] bg-blue-500 ml-1 align-middle"
        />
      )}
    </span>
  );
}
