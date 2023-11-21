'use client';

import DocumentEditor from '@/components/document_editor/DocumentEditor';
import DocumentSearch from '@/components/document_search/DocumentSearch';
import Sidebar from '@/components/sidebar/Sidebar';
import { useState } from 'react';

interface RootProps {
  params: {
    projectName: string;
  };
}

export default function ViewerPage({ params }: RootProps) {
  const [blockSearchFilter, setBlockSearchFilter] = useState<string>('');
  return (
    <main className='w-full min-h-screen flex'>
      <Sidebar
        projectId={params.projectName}
        isViewer={true}
        setBlockSearchFilter={setBlockSearchFilter}
        blockSearchFilter={blockSearchFilter}
      />
      {blockSearchFilter != '' ? (
        <DocumentSearch
          blockSearchFilter={blockSearchFilter}
          projectId={params.projectName}
        />
      ) : (
        <DocumentEditor projectId={params.projectName} isViewer={true} />
      )}
    </main>
  );
}
