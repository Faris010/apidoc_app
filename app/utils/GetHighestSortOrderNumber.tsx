import { TBLock } from '@/types/types';

export function getHighestSortOrderNumber(blockList: TBLock[]): number {
  if ((blockList ?? []).length === 0) {
    return 0;
  }

  return blockList.reduce((maxSortOrder, block) => {
    return Math.max(maxSortOrder, block.sortOrder || 0);
  }, 0);
}
