import DocumentEditor from '@/components/DocumentEditor';
import Sidebar from '@/components/Sidebar';

export default async function ProjectPage() {
  return (
    <main className='w-full min-h-screen flex'>
      <Sidebar />
      <DocumentEditor />
    </main>
  );
}
