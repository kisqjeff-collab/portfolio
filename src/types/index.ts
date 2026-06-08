export interface ProjectMedia {
  type: "video" | "image" | "pdf";
  url: string;
  thumbnail?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  category: string;
  media: ProjectMedia[];
  order: number;
  visible: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
}
