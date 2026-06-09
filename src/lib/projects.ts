"use client";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getDbInstance, getStorageInstance, isFirebaseConfigured } from "./firebase";
import { Project, ProjectMedia } from "@/types";

const COLLECTION = "portfolio_projects";

export const defaultProjects: Project[] = [
  {
    id: "zzem",
    title: "ZZEM 콘텐츠 파이프라인",
    subtitle: "뤼튼 · AI 콘텐츠 크리에이터",
    description:
      "프롬프트 설계부터 AI 영상 생성, QC 검수, 앱 배포까지 전체 파이프라인을 직접 설계·운영합니다. 27개 시스템 프롬프트, 6개 AI 모델 동시 운용.",
    tags: ["AI 영상", "프롬프트 엔지니어링", "파이프라인"],
    category: "work",
    media: [
      { type: "image", url: "/media/zzem-1.png" },
      { type: "image", url: "/media/zzem-2.png" },
      { type: "image", url: "/media/zzem-3.png" },
      { type: "image", url: "/media/zzem-4.png" },
    ],
    order: 0,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "ai-tools",
    title: "자체 제작 AI 도구",
    subtitle: "Claude Code Skills & Electron App",
    description:
      "반복되는 작업을 도구로 만들어 두고, 다음부터는 한 줄로 실행합니다. Prompt Studio, Edit Prompt, Music Video 생성기, Audio Batch Cutter 등 10개+ 도구.",
    tags: ["Claude Code", "자동화", "Electron"],
    category: "work",
    media: [],
    order: 1,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "fliq",
    title: "Fliq — 크리에이터의 놀이터",
    subtitle: "사내 AI 해커톤 · 데모데이 출품",
    description:
      "AI 영상 시리즈 연재·구독 모바일 플랫폼. 코드 0줄, 4시간 만에 AI로 5,000줄 앱 구현. 기획·경험 디렉션, 브랜드 디테일 담당.",
    tags: ["해커톤", "Next.js", "Claude Code"],
    category: "hackathon",
    media: [{ type: "pdf", url: "/media/fliq.pdf" }],
    order: 2,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "gyeonggi-north",
    title: "경기북부발전 AI 콘텐츠 캠프",
    subtitle: "2025.07 · 장려상 수상",
    description:
      "경기도 북부 미래 발전을 AI 스토리 영상으로 제작. 기획 및 영상 제작 참여.",
    tags: ["AI 영상", "공모전", "수상"],
    category: "contest",
    media: [{ type: "video", url: "/media/gyeonggi-north.mp4" }],
    order: 3,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "kia",
    title: "기아 크리에이터 8기",
    subtitle: "2025.08 — 2025.11 · 팀장",
    description:
      "KIA PV5를 AI 영상으로 판타지 영화처럼 표현. 1인 제작, 팀장으로 영상 제작 및 기획 참여.",
    tags: ["AI 영상", "브랜드", "팀장"],
    category: "activity",
    media: [{ type: "video", url: "/media/kia.mp4" }],
    order: 4,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "gyeonggi-travel",
    title: "경기도 해외관광 AI 공모전",
    subtitle: "2026.01 · 팀장, 2인 제작",
    description:
      "경기도 마스코트가 여행지를 여행하는 귀여운 뮤비 제작. Suno AI 음악 + AI 영상 결합.",
    tags: ["AI 영상", "공모전", "뮤직비디오"],
    category: "contest",
    media: [{ type: "video", url: "/media/gyeonggi-travel.mp4" }],
    order: 5,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "chai",
    title: "CHAI AI 광고 공모전",
    subtitle: "팀장 · AI 콘텐츠 기획 및 영상 제작",
    description:
      "AI를 활용한 브랜드 광고 영상 기획부터 최종 편집까지 전 과정 리드.",
    tags: ["AI 영상", "공모전", "광고"],
    category: "contest",
    media: [{ type: "video", url: "/media/chai.mp4" }],
    order: 6,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "osulloc",
    title: "아모레퍼시픽 AI 영상 공모전",
    subtitle: "팀원 (3인) · 오설록 광고영상 기획·제작",
    description:
      "AI 이미지 생성부터 영상 편집, 기획을 효과적으로 전달할 수 있도록 노력.",
    tags: ["AI 영상", "공모전", "광고"],
    category: "contest",
    media: [{ type: "video", url: "/media/osulloc.mp4" }],
    order: 7,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "gohunjin",
    title: "고훈진 AI 영상 공모전",
    subtitle: "개인 · 화장품 시네마틱 AI 영상",
    description: "화장품 브랜드의 프리미엄 이미지를 시네마틱 AI 영상으로 표현.",
    tags: ["AI 영상", "공모전", "시네마틱"],
    category: "contest",
    media: [{ type: "video", url: "/media/gohunjin.mp4" }],
    order: 8,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "restonic",
    title: "레스토닉 AI 영상 공모전",
    subtitle: "개인 · 매트리스 브랜드 AI 광고",
    description:
      "제품 특성을 살린 AI 영상 광고 컨셉 기획부터 제작까지 1인 완수.",
    tags: ["AI 영상", "공모전", "광고"],
    category: "contest",
    media: [{ type: "video", url: "/media/restonic.mp4" }],
    order: 9,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "design-portfolio",
    title: "디자인 포트폴리오",
    subtitle: "중앙대학교 예술공학부 · 브랜딩 / UI·UX / 제품",
    description:
      "HORIZEN — AI 시대 인간의 방향성을 담은 브랜딩. Signature Fit — 운동 기록·커뮤니티 앱 UI/UX. FITPICK — 맞춤형 보충제 브랜드 패키지 디자인.",
    tags: ["브랜딩", "UI/UX", "제품 디자인", "Figma"],
    category: "design",
    media: [
      { type: "image", url: "/media/design-branding-1.png" },
      { type: "image", url: "/media/design-branding-2.png" },
      { type: "image", url: "/media/design-uiux-1.png" },
      { type: "image", url: "/media/design-uiux-2.png" },
      { type: "image", url: "/media/design-product-1.png" },
      { type: "image", url: "/media/design-product-2.png" },
    ],
    order: 10,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "tryangle",
    title: "TryAngle IR Deck",
    subtitle: "사내 AI 해커톤 · IR 발표",
    description:
      "AI Native Camp 해커톤에서 제작한 IR 덱. 문제 정의부터 솔루션, 비즈니스 모델까지 팀 TryAngle의 발표 자료.",
    tags: ["해커톤", "IR", "기획"],
    category: "hackathon",
    media: [{ type: "pdf", url: "/media/tryangle-deck.pdf" }],
    order: 11,
    visible: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export async function getProjects(): Promise<Project[]> {
  if (!isFirebaseConfigured()) return defaultProjects;

  const firestore = getDbInstance();
  if (!firestore) return defaultProjects;

  try {
    const q = query(collection(firestore, COLLECTION), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return defaultProjects;
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as Project
    );
  } catch {
    return defaultProjects;
  }
}

export async function addProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const firestore = getDbInstance();
  if (!firestore) throw new Error("Firebase가 설정되지 않았습니다.");
  const now = Date.now();
  const docRef = await addDoc(collection(firestore, COLLECTION), {
    ...project,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

export async function updateProject(
  id: string,
  data: Partial<Project>
): Promise<void> {
  const firestore = getDbInstance();
  if (!firestore) throw new Error("Firebase가 설정되지 않았습니다.");
  await updateDoc(doc(firestore, COLLECTION, id), {
    ...data,
    updatedAt: Date.now(),
  });
}

export async function deleteProject(id: string): Promise<void> {
  const firestore = getDbInstance();
  if (!firestore) throw new Error("Firebase가 설정되지 않았습니다.");
  await deleteDoc(doc(firestore, COLLECTION, id));
}

export async function uploadMedia(
  file: File,
  projectSlug: string
): Promise<ProjectMedia> {
  const storageInstance = getStorageInstance();
  if (!storageInstance) throw new Error("Firebase가 설정되지 않았습니다.");
  const ext = file.name.split(".").pop() || "";
  const filename = `${Date.now()}.${ext}`;
  const path = `portfolio/${projectSlug}/${filename}`;
  const storageRef = ref(storageInstance, path);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  let type: ProjectMedia["type"] = "image";
  if (file.type.startsWith("video/")) type = "video";
  else if (file.type === "application/pdf") type = "pdf";

  return { type, url };
}

export async function deleteMedia(url: string): Promise<void> {
  const storageInstance = getStorageInstance();
  if (!storageInstance) return;
  try {
    const storageRef = ref(storageInstance, url);
    await deleteObject(storageRef);
  } catch {
    // file may not exist
  }
}
