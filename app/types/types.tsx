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
  id: number;
  projectName: string;
  slug?: string;
  logo: string;
  sections?: TSection[];
};

export type TNewProject = {
  id: number;
  projectName: string;
  logo: string;
};

export type TSection = {
  id: number;
  name: string;
  title: string;
  projectId: number;
  paredntId: number | null;
};
