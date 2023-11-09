import { TNewProject, TProject } from '@/types/types';
import api from '@/utils/api';

export async function getAllProjects() {
  const response = await api.get('/api/projects/');
  return response;
}

export async function addNewProject(projectData: TNewProject) {
  const response = await api.post('/api/projects/', projectData);
  return response;
}

export async function editProject(updatedProject: TProject) {
  await api.put('/api/projects/', updatedProject);
}

export async function deleteProject(id: string) {
  await api.delete(`/api/projects/${id}`);
}

export async function getProjectById(id: string) {
  const response = await fetch(`http://localhost:5287/api/projects/${id}`);
  return response.json();
}
