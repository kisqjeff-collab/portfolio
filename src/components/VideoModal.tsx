"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  url: string;
  title?: string;
  onClose: () => void;
}

export default function VideoModal({ url, title, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  }, []);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-10"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/50">
            <video
              ref={videoRef}
              src={url}
              className="w-full aspect-video"
              controls
              playsInline
              autoPlay
            />
          </div>

          {title && (
            <p className="mt-4 text-white/60 text-sm text-center">{title}</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
