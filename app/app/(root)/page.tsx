import Navbar from '@/components/Navbar';
import ProjectListing from '@/components/ProjectListing';
import { getAllProjects } from '@/services/project';
import { TProject } from '@/types/types';

export default async function Home() {
  let projects: TProject[] = await getAllProjects();
  return (
    <main className='min-h-screen flex flex-col items-center'>
      <Navbar />
      <ProjectListing projects={projects} />
    </main>
  );
}
