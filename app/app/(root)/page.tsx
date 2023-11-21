'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import ProjectListing from '@/components/project_components/ProjectListing';

export default function Home() {
  const [projectSearchFilter, setProjectSearchFilter] = useState<string>('');
  return (
    <main className='h-screen flex flex-col items-center bg-[#FBFBFA]'>
      <Navbar
        setProjectSearchFilter={setProjectSearchFilter}
        projectSearchFilter={projectSearchFilter}
      />
      <ProjectListing projectSearchFilter={projectSearchFilter} />
    </main>
  );
}
