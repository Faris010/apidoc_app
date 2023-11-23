'use client';

import { useState } from 'react';
import DocumentEditor from '@/components/document_editor/DocumentEditor';
import Sidebar from '@/components/sidebar/Sidebar';
import DocumentSearch from '@/components/document_search/DocumentSearch';
import { useToggle } from '@/hooks/useToggle';

interface RootProps {
  params: {
    projectId: string;
  };
}

export default function ProjectPage({ params }: RootProps) {
  const [blockSearchFilter, setBlockSearchFilter] = useState<string>('');
  const [isSidebarOpenOnMobile, setIsSidebarOpenOnMobile] = useToggle(false);
  return (
    <main className='w-full min-h-screen flex'>
      <Sidebar
        projectId={params.projectId}
        isViewer={false}
        setBlockSearchFilter={setBlockSearchFilter}
        blockSearchFilter={blockSearchFilter}
        isSidebarOpenOnMobile={isSidebarOpenOnMobile}
        setIsSidebarOpenOnMobile={setIsSidebarOpenOnMobile}
      />
      {blockSearchFilter != '' ? (
        <DocumentSearch
          blockSearchFilter={blockSearchFilter}
          projectId={params.projectId}
          setBlockSearchFilter={setBlockSearchFilter}
          setIsSidebarOpenOnMobile={setIsSidebarOpenOnMobile}
          isSidebarOpenOnMobile={isSidebarOpenOnMobile}
        />
      ) : (
        <DocumentEditor
          projectId={params.projectId}
          isViewer={false}
          setIsSidebarOpenOnMobile={setIsSidebarOpenOnMobile}
          isSidebarOpenOnMobile={isSidebarOpenOnMobile}
        />
      )}
    </main>
  );
}
