import { changeForm, postForm } from "../actions/registerAction";

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
export type RegisterAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof postForm>;
