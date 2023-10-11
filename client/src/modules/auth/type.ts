import { changeField, initializeForm, login, signup } from './action';

export type AuthAction =
  | ReturnType<typeof changeField>
  | ReturnType<typeof initializeForm>
  | ReturnType<typeof login>
  | ReturnType<typeof signup>;

export type AuthState = {
  login: {
    id: string;
    password: string;
  };
  register: {
    id: string;
    password: string;
    passwordConfirm: string;
    name: string;
    nick: string;
    email: string;
    tel: number;
    age: number;
    grade: string;
    job: string;
    career: string;
    skill: string;
  };
  auth: any;
  authError: any;
  [key: string]: any;
};
