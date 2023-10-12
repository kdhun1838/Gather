import client from './client';
import { AxiosResponse } from 'axios';
import { AuthState } from '../../modules/auth/type';
export const Login = ({ login }: AuthState): Promise<AxiosResponse> => {
  console.log('loginform==============', login);
  return client.post('/auth/login', login);
};

export const Register = ({ register }: AuthState): Promise<AxiosResponse> => {
  console.log('signup=============>', register);
  return client.post('/auth/signup', register);
};

export const check = () => client.get('/auth/check');
