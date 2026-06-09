"use client";

import { motion } from "framer-motion";

interface Props {
  projectId: string;
}

const pipelineSteps = [
  { icon: "pencil", label: "프롬프트\n설계", color: "from-blue-400 to-blue-600" },
  { icon: "sparkle", label: "AI\n생성", color: "from-violet-400 to-violet-600" },
  { icon: "check", label: "QC\n검수", color: "from-emerald-400 to-emerald-600" },
  { icon: "rocket", label: "앱\n배포", color: "from-orange-400 to-orange-600" },
];

const tools = [
  { name: "Prompt Studio", desc: "시스템 프롬프트 설계", icon: "wand" },
  { name: "Edit Prompt", desc: "프롬프트 수정/최적화", icon: "edit" },
  { name: "Music Video", desc: "MV 프롬프트 생성", icon: "music" },
  { name: "Audio Cutter", desc: "음악 자동 분할", icon: "scissors" },
  { name: "Smoke Test", desc: "E2E 자동 검증", icon: "flask" },
  { name: "Session Wrap", desc: "세션 인수인계", icon: "bookmark" },
];

function Icon({ type, className }: { type: string; className?: string }) {
  const c = className || "w-5 h-5";
  switch (type) {
    case "pencil":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      );
    case "check":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "rocket":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      );
    case "wand":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      );
    case "edit":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
        </svg>
      );
    case "music":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
        </svg>
      );
    case "scissors":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
        </svg>
      );
    case "flask":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      );
    case "bookmark":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      );
    default:
      return null;
  }
}

function ZzemPipeline() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-blue-950/50 rounded-2xl p-8 flex flex-col justify-center border border-gray-800">
      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-6">
        Content Pipeline
      </p>
      <div className="flex items-center justify-between gap-2">
        {pipelineSteps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2 flex-1">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}
              >
                <Icon type={step.icon} className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-gray-400 text-center leading-tight whitespace-pre-line">
                {step.label}
              </span>
            </motion.div>
            {i < pipelineSteps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: i * 0.15 + 0.1 }}
                viewport={{ once: true }}
                className="w-8 h-px bg-gray-700 -mt-5 shrink-0"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        {["27 prompts", "6+ models", "792 commits"].map((stat, i) => (
          <motion.div
            key={stat}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            viewport={{ once: true }}
            className="flex-1 bg-gray-800/80 backdrop-blur rounded-lg px-3 py-2 text-center border border-gray-700"
          >
            <span className="text-xs font-bold text-gray-200">{stat}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AiToolsGrid() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-violet-950/50 rounded-2xl p-6 flex flex-col justify-center border border-gray-800">
      <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-4">
        10+ Custom Tools
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            className="bg-gray-800/90 backdrop-blur rounded-xl p-3 border border-gray-700 hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/5 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-violet-950 group-hover:bg-violet-900 flex items-center justify-center text-violet-400 mb-2 transition-colors">
              <Icon type={tool.icon} className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-semibold text-gray-200 leading-tight">
              {tool.name}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">{tool.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectVisual({ projectId }: Props) {
  switch (projectId) {
    case "zzem":
      return <ZzemPipeline />;
    case "ai-tools":
      return <AiToolsGrid />;
    default:
      return null;
  }
}
