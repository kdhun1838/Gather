import { changeField, initializeForm, login, signup } from './action';

export type AuthAction =
  | ReturnType<typeof changeField>
  | ReturnType<typeof initializeForm>
  | ReturnType<typeof login>
  | ReturnType<typeof signup>;

export type AuthState = {
  login: LoginState;
  register: registerState;
  auth: any;
  authError: any;
  [key: string]: any;
};

export type LoginState = {
  id: string;
  password: string;
};

export type registerState = {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nick: string;
  email: string;
  tel: string;
  age: number;
  addr: string;
  gender: string;
};

type authState = {};
