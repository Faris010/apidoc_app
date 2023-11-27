'use client';

import { deleteSection } from '@/services/section';
import { TSection } from '@/types/types';

const handleSectionDelete = async (
  section: TSection,
  sectionList: TSection[],
  sectionId: string,
  router: any,
  pathname: string
) => {
  if (section.id) {
    const deletedSectionIndex = sectionList.findIndex(
      (s) => s.id === section.id
    );
    if (deletedSectionIndex !== -1) {
      await deleteSection(section.id);
      const updatedSectionList = sectionList.filter((s) => s.id != section.id);
      if (section.id === sectionId) {
        if (sectionList[deletedSectionIndex].parentId !== null) {
          console.log('Deleted sec with parent and redirect to parent sec');
          const parentSection = sectionList.find(
            (s) => s.id === section.parentId
          );
          router.replace(
            `?section=${parentSection?.name}&sectionId=${parentSection?.id}`
          );
        } else {
          router.replace(pathname);
        }
      }
      return { success: true, updatedSectionList: updatedSectionList };
    }
  }
  return { success: false, updatedSectionList: null };
};

export default handleSectionDelete;
