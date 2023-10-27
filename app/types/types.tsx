export type TImage = {
  imageUrl: string | ArrayBuffer | null;
  name: string;
  extension: string;
  size: string;
};

export type TProject = {
  id: string;
  projectName: string;
  slug?: string;
  logo: string;
};

export type TNewProject = {
  id: string;
  projectName: string;
  logo: string;
};
