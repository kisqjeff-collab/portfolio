"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import ProjectCard from "@/components/ProjectCard";
import ProjectEditor from "@/components/ProjectEditor";
import GradientBlob from "@/components/GradientBlob";
import TypingText from "@/components/TypingText";
import { useAuth } from "@/lib/useAuth";
import { getProjects } from "@/lib/projects";
import { Project } from "@/types";

export default function Home() {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data.filter((p) => p.visible));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const stats = [
    { num: 27, suffix: "개", label: "시스템 프롬프트" },
    { num: 792, suffix: "+", label: "Git 커밋" },
    { num: 6, suffix: "+", label: "AI 모델 운용" },
    { num: 70, suffix: "%", label: "비용 절감" },
  ];

  const skills = [
    "프롬프트 엔지니어링",
    "AI 모델 운용",
    "콘텐츠 기획",
    "영상 제작",
    "Claude Code",
    "데이터 자동화",
    "AI 도구 제작",
    "UX/UI 디자인",
    "브랜딩",
  ];

  return (
    <main className="bg-gray-950 relative overflow-hidden">
      <Nav />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero */}
      <motion.section
        className="relative min-h-screen flex flex-col justify-center items-center text-center pt-20 px-8 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <GradientBlob />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-8"
          >
            AI Native Creator
          </motion.p>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-8">
            <TypingText text="AI를 잘 쓰는 게 아니라," speed={60} />
            <br />
            <TypingText
              text="AI와 함께 일하는 "
              speed={60}
              delay={1100}
            />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              <TypingText text="방식" speed={60} delay={2100} />
            </span>
            <TypingText text="을" speed={60} delay={2300} />
            <br />
            <TypingText text="설계합니다." speed={60} delay={2400} />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="text-lg text-gray-500 mb-16"
          >
            콘텐츠를 만드는 게 아니라, 콘텐츠가 나오는 구조를 만듭니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
            className="flex items-center justify-center gap-3 text-sm text-gray-500"
          >
            <span className="font-bold text-white">이윤균</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>뤼튼 AI 콘텐츠 크리에이터</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>중앙대학교 예술공학부</span>
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 3.5 },
              y: { repeat: Infinity, duration: 1.5, delay: 3.5 },
            }}
            className="w-6 h-10 rounded-full border-2 border-gray-700 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-3 rounded-full bg-gray-700" />
          </motion.div>
        </div>
      </motion.section>

      {/* Gradient Streak Divider */}
      <div className="relative h-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="absolute left-1/4 right-1/4 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      </div>

      {/* Stats */}
      <section className="py-24 px-8" id="about">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl bg-gradient-to-r from-blue-500/20 via-gray-800 to-violet-500/20 p-px">
              <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-b from-blue-400 to-blue-500 bg-clip-text text-transparent">
                        <CountUp end={s.num} suffix={s.suffix} />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{s.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* About */}
      <section className="py-24 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900 to-gray-900/50" />
        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              About Me
            </p>
            <h2 className="text-4xl font-extrabold text-white tracking-tight mb-12">
              AI와 함께 일합니다.
            </h2>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-10">
            <ScrollReveal delay={0.1}>
              <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wide mb-5">
                  현재 역할
                </h3>
                <p className="text-xl font-bold text-white mb-5">
                  뤼튼 · ZZEM 팀 AI 콘텐츠 크리에이터
                </p>
                <ul className="space-y-3 text-gray-400 text-sm leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    AI 영상/이미지 콘텐츠 기획·생성·QC 전체 파이프라인 운영
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    6개+ AI 모델 실무 운용
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    27개 시스템 프롬프트 직접 설계·관리
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    Claude Code 기반 어드민 시스템 설계·운영
                  </li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700/50 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all">
                <h3 className="text-sm font-bold text-violet-400 uppercase tracking-wide mb-5">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-full hover:bg-blue-950 hover:border-blue-500/30 hover:text-blue-400 transition-all cursor-default"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gradient Streak Divider */}
      <div className="relative h-24">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
      </div>

      {/* Projects */}
      <section className="py-24 px-8" id="projects">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-20">
              <div>
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
                  Selected Work
                </p>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">
                  Projects
                </h2>
              </div>
              {isAdmin && (
                <button
                  onClick={() => setShowNewProject(true)}
                  className="px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors"
                >
                  + 프로젝트 추가
                </button>
              )}
            </div>
          </ScrollReveal>

          <div className="space-y-32">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isAdmin={isAdmin}
                onUpdate={loadProjects}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Streak Divider */}
      <div className="relative h-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-gray-950" />
      </div>

      {/* Contact */}
      <section
        className="py-32 px-8 bg-gray-950 text-white relative overflow-hidden"
        id="contact"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-sm font-semibold text-blue-400 mb-6 tracking-widest uppercase">
              Contact
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-8">
              AI를 잘 쓰는 게 아니라,
              <br />
              AI와 함께 일하는 방식 자체를{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                설계합니다.
              </span>
            </h2>
            <p className="text-gray-500 text-sm mb-10">
              커밋 792개 · 시스템 프롬프트 27개 · AI 모델 6개+ 실무 운영 · 비용
              70% 절감
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <ul className="space-y-3 text-gray-400 mb-12">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                콘텐츠를 만드는 게 아니라, 콘텐츠가 나오는 구조를 설계합니다
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                한 번 겪은 실수는 규칙으로 박아서 두 번 안 겪게 만듭니다
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                반복되는 작업은 도구로 만들어서 다음부터 한 줄로 실행합니다
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                문제 정의는 사람이, 구현은 AI가 — 역할이 명확하니까 빠릅니다
              </li>
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex items-center gap-4">
              <a
                href="mailto:jeffkisq@naver.com"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25"
              >
                이메일 보내기
              </a>
              <span className="text-gray-600 text-sm">
                jeffkisq@naver.com
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {showNewProject && (
        <ProjectEditor
          onSave={() => {
            setShowNewProject(false);
            loadProjects();
          }}
          onClose={() => setShowNewProject(false)}
        />
      )}
    </main>
  );
}
