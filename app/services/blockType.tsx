import api from '@/utils/api';

export async function getBlockTypes() {
  const response = await api.get(`/api/blocktype/`);
  return response;
}
