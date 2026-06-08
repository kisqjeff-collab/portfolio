"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleHoverStart = () => setHovering(true);
    const handleHoverEnd = () => setHovering(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    const addHoverListeners = () => {
      document
        .querySelectorAll("a, button, [role='button'], video, .cursor-hover")
        .forEach((el) => {
          el.addEventListener("mouseenter", handleHoverStart);
          el.addEventListener("mouseleave", handleHoverEnd);
        });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: hovering ? 48 : 10,
            height: hovering ? 48 : 10,
            marginLeft: hovering ? -24 : -5,
            marginTop: hovering ? -24 : -5,
            opacity: hovering ? 0.5 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="rounded-full border border-gray-400/30"
          animate={{
            width: hovering ? 0 : 36,
            height: hovering ? 0 : 36,
            marginLeft: hovering ? 0 : -18,
            marginTop: hovering ? 0 : -18,
            opacity: hovering ? 0 : 0.6,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        />
      </motion.div>
    </>
  );
}
