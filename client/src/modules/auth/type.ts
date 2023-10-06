import { changeField, initializeForm } from './action';

export type AuthAction =
  | ReturnType<typeof changeField>
  | ReturnType<typeof initializeForm>;

export type AuthState = {
  login: {
    username: string;
    password: string;
  };
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
  };
};
