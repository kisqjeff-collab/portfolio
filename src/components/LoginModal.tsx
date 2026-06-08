"use client";

import { useState } from "react";
import { useAuth } from "@/lib/useAuth";

interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const { signIn } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(password);
      onClose();
    } catch {
      setError("비밀번호가 틀렸습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-xs shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-900 mb-5 text-center">
          관리자 로그인
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
