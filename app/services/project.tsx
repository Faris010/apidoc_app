import { TNewProject, TProject } from '@/types/types';
import axios from 'axios';

export async function getAllProjects() {
  const response = await fetch(`http://localhost:5287/api/projects/`, {
    cache: 'no-cache',
  });
  return await response.json();
}

export async function addNewProject(projectData: TNewProject) {
  const response = axios.post(
    'http://localhost:5287/api/projects/',
    projectData
  );
  return response;
}

export async function editProject(updatedProject: TProject | null) {
  axios.put('http://localhost:5287/api/projects/', updatedProject);
}

export async function deleteProject(id: string | undefined) {
  axios.delete(`http://localhost:5287/api/projects/${id}`);
}
