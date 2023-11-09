import { TSection } from '@/types/types';
import api from '@/utils/api';


export async function addSection(section: TSection, projectId: string) {
  await api.post(`/api/section/${projectId}`, section);
}

export async function getSectionByProjectId(projectId: string) {
  const response = await api.get(`/api/section/projectId/${projectId}`);
  return response;
}

export async function getSectionById(id: string | null) {
  const response = await fetch(`http://localhost:5287/api/section/${id}`);
  if (response.ok) {
    return await response.json();
  }
}

export async function deleteSection(id: number) {
  await api.delete(`/api/section/${id}`);
}

export async function editSection(section: TSection) {
  await api.put('/api/section', section);
}
