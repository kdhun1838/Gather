import { changeForm, initForm, getPosts, saveForm } from "./action";

// 타입 정의

type Form = {
  category: string;
  detail: string;
  title: string;
  content: string;
};

export type CommunityState = {
  form: Form;
  posts: any;
};

export type CommunityAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof initForm>
  | ReturnType<typeof saveForm>
  | ReturnType<typeof getPosts>;
