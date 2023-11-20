import { TBLock } from '@/types/types';

export default async function handleSortOrderUpdate(
  blockList: TBLock[],
  block: string,
  targetedBlockId: string
) {
  const draggedBlockIndex = blockList.findIndex((b) => b.id === block);
  const targetedBlockIndex = blockList.findIndex(
    (b) => b.id === targetedBlockId
  );
  if (
    draggedBlockIndex !== -1 &&
    targetedBlockIndex !== -1 &&
    draggedBlockIndex !== targetedBlockIndex &&
    draggedBlockIndex - 1 !== targetedBlockIndex
  ) {
    const updatedBlockList = [...blockList];
    const [draggedBlock] = updatedBlockList.splice(draggedBlockIndex, 1);

    if (draggedBlock.sortOrder < blockList[targetedBlockIndex].sortOrder) {
      updatedBlockList.splice(targetedBlockIndex, 0, draggedBlock);
      draggedBlock.sortOrder = blockList[targetedBlockIndex].sortOrder;
      for (let i = 0; i < targetedBlockIndex; i++) {
        updatedBlockList[i].sortOrder--;
      }
    } else {
      updatedBlockList.splice(targetedBlockIndex + 1, 0, draggedBlock);
      draggedBlock.sortOrder = blockList[targetedBlockIndex].sortOrder + 1;
      for (let i = targetedBlockIndex + 2; i < draggedBlockIndex + 1; i++) {
        updatedBlockList[i].sortOrder++;
      }
    }
    return { success: true, updatedBlockList: updatedBlockList };
  }
  return { success: false, updatedBlockList: null };
}
