import { TSection } from '@/types/types';
import api from '@/utils/api';

export async function addSection(section: TSection) {
  await api.post('/api/section', section);
}
