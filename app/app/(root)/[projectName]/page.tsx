import DocumentEditor from '@/components/document_editor/DocumentEditor';
import Sidebar from '@/components/sidebar/Sidebar';

interface RootProps {
  params: {
    projectName: string;
  };
}

export default function ViewerPage({ params }: RootProps) {
  return (
    <main className='w-full min-h-screen flex'>
      <Sidebar projectId={params.projectName} isViewer={true} />
      <DocumentEditor projectId={params.projectName} isViewer={true} />
    </main>
  );
}
