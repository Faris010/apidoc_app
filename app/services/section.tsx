import { TSection } from '@/types/types';
import api from '@/utils/api';

export async function addSection(section: TSection, projectId: number) {
  await api.post(`/api/section/${projectId}`, section);
}

export async function getAllSections() {
  const response = await fetch(`http://localhost:5287/api/section/`, {
    cache: 'no-cache',
  });
  return response.json();
}

export async function getSectionByProjectId(projectId: number) {
  const response = await fetch(
    `http://localhost:5287/api/section/projectId/${projectId}`,
    {
      cache: 'no-cache',
    }
  );
  return response.json();
}

export async function getSectionById(id: number) {
  const response = await fetch(`http://localhost:5287/api/section/${id}`);
  if (response.ok) {
    return await response.json();
  }
}

export async function deleteSection(id: number) {
  await api.delete(`/api/section/${id}`);
}
