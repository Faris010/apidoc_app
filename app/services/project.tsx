import { TNewProject, TProject } from '@/types/types';
import api from '@/utils/api';

export async function getAllProjects() {
  const response = await fetch(`http://localhost:5287/api/projects/`, {
    cache: 'no-cache',
  });
  return response.json();
}

export async function addNewProject(projectData: TNewProject) {
  const response = await api.post('/api/projects/', projectData);
  return response;
}

export async function editProject(updatedProject: TProject | null) {
  await api.put('/api/projects/', updatedProject);
}

export async function deleteProject(id: number) {
  await api.delete(`/api/projects/${id}`);
}

export async function getProjectById(id: number) {
  const response = await fetch(`http://localhost:5287/api/projects/${id}`);
  return response.json();
}
