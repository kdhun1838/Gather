import { RegisterState } from "../types/registerType";


export const CHANGE_FORM = "register/CHANGE_FORM" as const;
export const POST_FORM = "register/POST_FORM" as const;

export const changeForm = ({ key, value }: { key: string; value: string }) => ({
  type: CHANGE_FORM,
  payload: {
    key,
    value,
  },
});

export const postForm = (form: RegisterState) => ({
  type: POST_FORM,
  payload: {
    form,
  },
});