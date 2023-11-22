export type TUserLoginData = {
  username: string;
  password: string;
};

export type TImage = {
  imageUrl: string | ArrayBuffer | null;
  name: string;
  extension: string;
  size: string;
};

export type TProject = {
  id?: string;
  projectName: string;
  slug?: string;
  logo?: string;
  sections?: TSection[];
};

export type TNewProject = {
  projectName: string;
  logo: string;
};

export type TSection = {
  id?: string;
  name: string;
  title: string;
  projectId?: string;
  parentId?: string | null;
  blocks?: TBLock[];
};

export type TBLock = {
  id?: string;
  content?: string | null;
  image?: string | null;
  language: string;
  sortOrder: number;
  sectionId: string;
  blockTypeId: number;
};

export type TBlockType = {
  id: number;
  name: string;
  description: string;
};

export type TFormik = {
  name: string;
  title: string;
  projectId: string;
  parentId: string | null;
};

export type TLanguage = {
  id: number;
  name: string;
  label: string;
};
