"use client";

import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import LoginModal from "./LoginModal";

export default function Nav() {
  const { signOut, isAdmin } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-5 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <a href="#" className="text-lg font-bold tracking-tight text-white">
          YG<span className="text-blue-400">.</span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#projects"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#about"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </a>
          {isAdmin ? (
            <button
              onClick={() => signOut()}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              ●
            </button>
          )}
        </div>
      </nav>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
