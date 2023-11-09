import Navbar from '@/components/navbar/Navbar';
import ProjectListing from '@/components/project_components/ProjectListing';

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center bg-[#FBFBFA]'>
      <Navbar />
      <ProjectListing />
    </main>
  );
}
