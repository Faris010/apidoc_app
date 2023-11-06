import { TUserLoginData } from '@/components/forms/login_form/LoginForm';
import api from '@/utils/api';

export async function login(userLoginData: TUserLoginData) {
  const response = await api.post('/api/auth/login', userLoginData);
  return response;
}
