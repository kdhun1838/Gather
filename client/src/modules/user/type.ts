import { tempSetUser, check, logout, userupdate } from './action';

export type UserState = {
  user: any;
  checkError: any;
};

export type UserAction =
  | ReturnType<typeof tempSetUser>
  | ReturnType<typeof check>
  | ReturnType<typeof logout>
  | ReturnType<typeof userupdate>;
