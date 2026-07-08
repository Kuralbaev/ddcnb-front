import type { File } from "./news";

export interface Team {
  id: string;
  documentId: string;
  fio: string;
  role: string;
  image?: File;
  description_ru: string;
  description_kk: string;
  description_en: string;
  level: number;
  main: boolean;
  publishedAt: string;
}