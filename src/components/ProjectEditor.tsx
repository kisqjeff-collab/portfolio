"use client";

import { useState, useRef } from "react";
import { Project, ProjectMedia } from "@/types";
import { addProject, updateProject, uploadMedia } from "@/lib/projects";

interface Props {
  project?: Project;
  onSave: () => void;
  onClose: () => void;
}

export default function ProjectEditor({ project, onSave, onClose }: Props) {
  const [title, setTitle] = useState(project?.title || "");
  const [subtitle, setSubtitle] = useState(project?.subtitle || "");
  const [description, setDescription] = useState(project?.description || "");
  const [tags, setTags] = useState(project?.tags.join(", ") || "");
  const [category, setCategory] = useState(project?.category || "contest");
  const [media, setMedia] = useState<ProjectMedia[]>(project?.media || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const slug = project?.id || title.replace(/\s+/g, "-").toLowerCase() || "new";
        const m = await uploadMedia(file, slug);
        setMedia((prev) => [...prev, m]);
      }
    } catch (err) {
      alert("업로드 실패: " + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title.trim()) return alert("제목을 입력해주세요.");
    setSaving(true);
    try {
      const data = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        category,
        media,
        order: project?.order ?? 99,
        visible: true,
      };
      if (project?.id && !["zzem", "ai-tools", "fliq", "gyeonggi-north", "kia", "gyeonggi-travel", "chai", "osulloc", "gohunjin", "restonic"].includes(project.id)) {
        await updateProject(project.id, data);
      } else {
        await addProject(data);
      }
      onSave();
    } catch (err) {
      alert("저장 실패: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    { value: "work", label: "업무" },
    { value: "hackathon", label: "해커톤" },
    { value: "contest", label: "공모전" },
    { value: "activity", label: "대외활동" },
    { value: "design", label: "디자인" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          {project ? "프로젝트 수정" : "새 프로젝트"}
        </h2>
        <div className="space-y-4">
          <input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="부제 (선택)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <input
            placeholder="태그 (쉼표 구분: AI 영상, 공모전, 수상)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Media */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">미디어</span>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="text-xs text-blue-500 hover:text-blue-600 font-medium"
              >
                {uploading ? "업로드 중..." : "+ 파일 추가"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="video/*,image/*,.pdf"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
            </div>
            {media.length > 0 && (
              <div className="space-y-2">
                {media.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                  >
                    <span className="text-xs font-medium text-gray-500 uppercase w-12">
                      {m.type}
                    </span>
                    <span className="text-xs text-gray-400 truncate flex-1">
                      {m.url.split("/").pop()}
                    </span>
                    <button
                      onClick={() => removeMedia(i)}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
