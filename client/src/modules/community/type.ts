import { changeForm, initForm } from "./action";

// 타입 정의
export type CommunityState = {
  form: {
    category: string;
    detail: string;
    title: string;
    content: string;
  };
};

export type CommunityAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof initForm>;
