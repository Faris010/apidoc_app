import Navbar from '@/components/Navbar';
import ProjectListing from '@/components/ProjectListing';

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center'>
      <Navbar />
      <ProjectListing />
    </main>
  );
}
