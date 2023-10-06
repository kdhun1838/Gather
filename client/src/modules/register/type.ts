import { changeForm, postForm, unloadForm } from "./action";
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
  register: any;
};
export type RegisterAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof postForm>
  | ReturnType<typeof unloadForm>;
