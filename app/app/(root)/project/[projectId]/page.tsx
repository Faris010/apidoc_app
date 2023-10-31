import DocumentEditor from '@/components/document_editor/DocumentEditor';
import Sidebar from '@/components/sidebar/Sidebar';

export default async function ProjectPage() {
  return (
    <main className='w-full min-h-screen flex'>
      <Sidebar />
      <DocumentEditor />
    </main>
  );
}
