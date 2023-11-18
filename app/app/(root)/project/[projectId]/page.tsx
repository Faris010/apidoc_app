import DocumentEditor from '@/components/document_editor/DocumentEditor';
import Sidebar from '@/components/sidebar/Sidebar';

interface RootProps {
  params: {
    projectId: string;
  };
}

export default async function ProjectPage({ params }: RootProps) {
  return (
    <main className='w-full min-h-screen flex'>
      <Sidebar projectId={params.projectId} isViewer={false} />
      <DocumentEditor projectId={params.projectId} isViewer={false} />
    </main>
  );
}
