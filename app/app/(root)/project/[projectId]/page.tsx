'use client';

import { useState } from 'react';
import DocumentEditor from '@/components/document_editor/DocumentEditor';
import Sidebar from '@/components/sidebar/Sidebar';
import DocumentSearch from '@/components/document_search/DocumentSearch';

interface RootProps {
  params: {
    projectId: string;
  };
}

export default function ProjectPage({ params }: RootProps) {
  const [blockSearchFilter, setBlockSearchFilter] = useState<string>('');
  return (
    <main className='w-full min-h-screen flex'>
      <Sidebar
        projectId={params.projectId}
        isViewer={false}
        setBlockSearchFilter={setBlockSearchFilter}
        blockSearchFilter={blockSearchFilter}
      />
      {blockSearchFilter != '' ? (
        <DocumentSearch
          blockSearchFilter={blockSearchFilter}
          projectId={params.projectId}
          setBlockSearchFilter={setBlockSearchFilter}
        />
      ) : (
        <DocumentEditor projectId={params.projectId} isViewer={false} />
      )}
    </main>
  );
}
