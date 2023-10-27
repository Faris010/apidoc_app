import { TUserLoginData } from '@/components/LoginForm';
import api from '@/utils/api';

export async function login(userLoginData: TUserLoginData) {
  const response = await api.post('/api/auth/login', userLoginData);
  return response;
}
