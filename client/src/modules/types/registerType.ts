import { ActionType } from "typesafe-actions";
import {changeForm, postForm} from "../actions/registerAction";


export type RegisterState = {
    form: {
      title: string;
      category: string;
      personnel: number;
      online: string;
      position: string;
      contact: string;
      content: string;
    };
  };

export type PostFormSuccess = {
  form: RegisterState;
};

export type RegisterAction =
  | ActionType<typeof changeForm>
  | ActionType<typeof postForm>;