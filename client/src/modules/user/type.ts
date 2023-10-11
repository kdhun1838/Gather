import { tempSetUser, check } from './action';

export type UserState = {
  user: any;
  checkError: any;
};

export type UserAction = ReturnType<typeof tempSetUser>;
