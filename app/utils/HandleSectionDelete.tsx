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
      const sectionListWithoutParent = updatedSectionList.filter(
        (s) => s.parentId === null
      );
      if (section.id === sectionId) {
        if (sectionList[deletedSectionIndex].parentId !== null) {
          const parentSection = sectionList.find(
            (s) => s.id === section.parentId
          );
          router.replace(
            `?section=${parentSection?.name}&sectionId=${parentSection?.id}`
          );
        } else {
          if (sectionListWithoutParent.length > 0) {
            router.replace(
              `?section=${sectionListWithoutParent[0].name}&sectionId=${sectionListWithoutParent[0].id}`
            );
          } else {
            router.replace(pathname);
          }
        }
      }
      return { success: true, updatedSectionList: updatedSectionList };
    }
  }
  return { success: false, updatedSectionList: null };
};

export default handleSectionDelete;
