"use client";

import { useState, useEffect, useCallback } from "react";

const ADMIN_PASSWORD = "1157";
const STORAGE_KEY = "portfolio_admin";
const AUTH_EVENT = "portfolio_auth_change";

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const sync = useCallback(() => {
    setIsAdmin(sessionStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  useEffect(() => {
    sync();
    setLoading(false);
    window.addEventListener(AUTH_EVENT, sync);
    return () => window.removeEventListener(AUTH_EVENT, sync);
  }, [sync]);

  const signIn = async (password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      window.dispatchEvent(new Event(AUTH_EVENT));
      return;
    }
    throw new Error("비밀번호가 틀렸습니다.");
  };

  const signOut = async () => {
    sessionStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  return { loading, signIn, signOut, isAdmin };
}
