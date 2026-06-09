"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Project } from "@/types";
import { deleteProject } from "@/lib/projects";
import ScrollReveal from "./ScrollReveal";
import ProjectEditor from "./ProjectEditor";
import ProjectVisual from "./ProjectVisual";
import VideoModal from "./VideoModal";
import ImageModal from "./ImageModal";

interface Props {
  project: Project;
  index: number;
  isAdmin: boolean;
  isFirst: boolean;
  isLast: boolean;
  onUpdate: () => void;
  onMove: (direction: "up" | "down") => void;
}

export default function ProjectCard({
  project,
  index,
  isAdmin,
  isFirst,
  isLast,
  onUpdate,
  onMove,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 200 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 200 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = mediaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(x * 12);
      rotateX.set(y * -12);
    },
    [rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const handleDelete = async () => {
    if (!confirm(`"${project.title}" 프로젝트를 삭제하시겠습니까?`)) return;
    try {
      await deleteProject(project.id);
      onUpdate();
    } catch (err) {
      alert("삭제 실패: " + (err as Error).message);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setVideoOpen(true);
  };

  const video = project.media.find((m) => m.type === "video");
  const images = project.media.filter((m) => m.type === "image");
  const pdf = project.media.find((m) => m.type === "pdf");
  const isPdfPreviewable = pdf && pdf.url.endsWith(".pdf");
  const hasVisual = project.id === "zzem" || project.id === "ai-tools";

  const thumbUrl = (url: string) => {
    const name = url.split("/").pop()?.replace(/\.[^.]+$/, "");
    return `/media/thumbs/${name}.jpg`;
  };

  return (
    <>
      <ScrollReveal delay={0.1}>
        <div
          className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16 items-center`}
        >
          {/* Media */}
          <motion.div
            ref={mediaRef}
            className="w-full md:w-1/2"
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              perspective: 800,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-blue-500/30 rounded-2xl opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500" />
              <div className="relative">
                {video ? (
                  <div
                    className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video ring-1 ring-gray-700/50 cursor-pointer"
                    onClick={handleVideoClick}
                  >
                    <video
                      ref={videoRef}
                      src={video.url}
                      poster={thumbUrl(video.url)}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="none"
                      onMouseEnter={() => videoRef.current?.play()}
                      onMouseLeave={() => {
                        videoRef.current?.pause();
                        if (videoRef.current) videoRef.current.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-100 group-hover:opacity-0 transition-opacity pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                        <svg
                          className="w-6 h-6 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : images.length > 0 ? (
                  <div
                    className={`grid ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-3`}
                  >
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-2xl overflow-hidden bg-gray-900 aspect-video ring-1 ring-gray-700/50 cursor-pointer"
                        onClick={() => setImageOpen(img.url)}
                      >
                        <img
                          src={img.url}
                          alt=""
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                ) : pdf && isPdfPreviewable ? (
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl overflow-hidden bg-gray-900 border border-gray-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all ring-1 ring-gray-800 relative group/pdf"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={thumbUrl(pdf.url)}
                        alt="PDF Preview"
                        className="w-full h-full object-contain bg-gray-900"
                      />
                      <div className="absolute inset-0 pointer-events-none" style={{
                        boxShadow: "inset 0 0 12px 8px rgb(17 24 39), inset 0 -20px 20px -5px rgb(17 24 39)",
                      }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/pdf:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                      <div className="px-5 py-2.5 bg-gray-800/90 backdrop-blur rounded-xl shadow-lg text-sm font-semibold text-blue-400 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        PDF 열기
                      </div>
                    </div>
                  </a>
                ) : pdf ? (
                  <a
                    href={pdf.url}
                    download
                    className="block rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 aspect-video flex items-center justify-center hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all ring-1 ring-gray-800 relative group/doc"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900/50 to-violet-900/50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-400 group-hover/doc:text-blue-400 transition-colors">
                        {pdf.url.endsWith(".pptx") ? "PPTX 다운로드" : "파일 다운로드"}
                      </span>
                    </div>
                  </a>
                ) : hasVisual ? (
                  <div>
                    <ProjectVisual projectId={project.id} />
                  </div>
                ) : (
                  <div className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 aspect-video flex items-center justify-center ring-1 ring-gray-700/50">
                    <span className="text-gray-600 text-sm">미디어 없음</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            {project.subtitle && (
              <p className="text-sm font-semibold text-blue-400 mb-2">
                {project.subtitle}
              </p>
            )}
            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
              {project.title}
            </h3>
            <p className="text-base text-gray-400 leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-800 text-gray-400 text-xs font-medium rounded-full border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {isAdmin && (
              <div className="flex items-center gap-2 mt-6">
                <div className="flex gap-1 mr-2">
                  <button
                    onClick={() => onMove("up")}
                    disabled={isFirst}
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onMove("down")}
                    disabled={isLast}
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-blue-950 text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-900 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-950 text-red-400 text-xs font-medium rounded-lg hover:bg-red-900 transition-colors"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {videoOpen && video && (
        <VideoModal
          url={video.url}
          title={project.title}
          onClose={() => setVideoOpen(false)}
        />
      )}

      {imageOpen && (
        <ImageModal url={imageOpen} onClose={() => setImageOpen(null)} />
      )}

      {editing && (
        <ProjectEditor
          project={project}
          onSave={() => {
            setEditing(false);
            onUpdate();
          }}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
