"use client";

import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "1157";
const STORAGE_KEY = "portfolio_admin";

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved === "true") setIsAdmin(true);
    setLoading(false);
  }, []);

  const signIn = async (password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsAdmin(true);
      return;
    }
    throw new Error("비밀번호가 틀렸습니다.");
  };

  const signOut = async () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  };

  return { loading, signIn, signOut, isAdmin };
}
