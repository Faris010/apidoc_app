import Navbar from '@/components/navbar/Navbar';
import ProjectListing from '@/components/project_components/ProjectListing';
import { getAllProjects } from '@/services/project';
import { TProject } from '@/types/types';

export default async function Home() {
  let projects: TProject[] = await getAllProjects();
  return (
    <main className='min-h-screen flex flex-col items-center bg-[#FBFBFA]'>
      <Navbar />
      <ProjectListing projects={projects} />
    </main>
  );
}
