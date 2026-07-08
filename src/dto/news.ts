export interface NewsCategory {
  id: string;
  name_ru: string;
  name_kk: string;
  name_en: string;
}

export interface File {
  id: string;
  url: string;
  formats: {
    thumbnail: { url: string };
  };
}

export interface NewsArticle {
  id: string;
  documentId: string;
  category: NewsCategory;
  title_ru: string;
  title_kk: string;
  title_en: string;
  sub_description_ru: string;
  sub_description_kk: string;
  sub_description_en: string;
  description_ru: string;
  description_kk: string;
  description_en: string;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  image: File;
  files: File[];
}