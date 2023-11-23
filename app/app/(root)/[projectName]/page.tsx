'use client';

import DocumentEditor from '@/components/document_editor/DocumentEditor';
import DocumentSearch from '@/components/document_search/DocumentSearch';
import Sidebar from '@/components/sidebar/Sidebar';
import { useToggle } from '@/hooks/useToggle';
import { useState } from 'react';

interface RootProps {
  params: {
    projectName: string;
  };
}

export default function ViewerPage({ params }: RootProps) {
  const [blockSearchFilter, setBlockSearchFilter] = useState<string>('');
  const [isSidebarOpenOnMobile, setIsSidebarOpenOnMobile] = useToggle(false);
  return (
    <main className='w-full min-h-screen flex'>
      <Sidebar
        projectId={params.projectName}
        isViewer={true}
        setBlockSearchFilter={setBlockSearchFilter}
        blockSearchFilter={blockSearchFilter}
        isSidebarOpenOnMobile={isSidebarOpenOnMobile}
        setIsSidebarOpenOnMobile={setIsSidebarOpenOnMobile}
      />
      {blockSearchFilter != '' ? (
        <DocumentSearch
          blockSearchFilter={blockSearchFilter}
          projectId={params.projectName}
          setBlockSearchFilter={setBlockSearchFilter}
          setIsSidebarOpenOnMobile={setIsSidebarOpenOnMobile}
          isSidebarOpenOnMobile={isSidebarOpenOnMobile}
        />
      ) : (
        <DocumentEditor
          projectId={params.projectName}
          isViewer={true}
          setIsSidebarOpenOnMobile={setIsSidebarOpenOnMobile}
          isSidebarOpenOnMobile={isSidebarOpenOnMobile}
        />
      )}
    </main>
  );
}
