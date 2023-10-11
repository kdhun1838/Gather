import client from './client';
import { AxiosResponse } from 'axios';

export const Login = ({
  id,
  password,
}: {
  id: string;
  password: string;
}): Promise<AxiosResponse> => {
  console.log('loginform==============');
  return client.post('/auth/login', { id, password });
};

export const Register = (auth: {
  id: string;
  password: string;
  name: string;
  nick: string;
  email: string;
  tel: number;
  age: number;
  grade: string;
  job: string;
  career: string;
  skill: string;
}): Promise<AxiosResponse> => {
  console.log('signup=============>');
  return client.post('/auth/signup', auth);
};

export const check = () => client.get('/auth/check');
