import { deleteBlockById } from '@/services/block';

export default async function deleteBlock(blockId: string) {
  await deleteBlockById(blockId);
}
