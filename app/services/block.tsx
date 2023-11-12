import { TBLock } from '@/types/types';
import api from '@/utils/api';

export async function getSectionBlocks(sectionId: string) {
  const response = await api.get(`/api/block/sectionId/${sectionId}`);
  return response;
}

export async function addBlock(block: TBLock, sectionId: string) {
  await api.post(`/api/block/${sectionId}`, block);
}

export async function editBlock(block: TBLock) {
  await api.put('/api/block/', block);
}
