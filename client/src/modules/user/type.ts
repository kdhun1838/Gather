import { tempSetUser, check, logout, userupdate, userdel } from './action';

export type UserState = {
  user: any;
  checkError: any;
};

export type UserDetail = {
  userNum: number;
  id: string;
  name: string;
  nick: string;
  email: string;
  tel: string;
  age: number;
  grade: number;
  addr: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAction =
  | ReturnType<typeof tempSetUser>
  | ReturnType<typeof check>
  | ReturnType<typeof logout>
  | ReturnType<typeof userupdate>
  | ReturnType<typeof userdel>;
