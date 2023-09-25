import { AxiosError } from "axios";
import { createAction, createAsyncAction } from "typesafe-actions";
import { PostFormSuccess, RegisterState } from "../types/registerType";

export const CHANGE_FORM = "register/CHANGE_FORM" as const;
export const POST_FORM = "register/POST_FORM";
export const POST_FORM_SUCCESS = "register/POST_FORM_SUCCESS";
export const POST_FORM_FAILURE = "register/POST_FORM_FAILURE";

// 기존 액션
// export const changeForm = ({ key, value }: { key: string; value: string }) => ({
//   type: CHANGE_FORM,
//   payload: {
//     key,
//     value,
//   },
// });

// export const postForm = (form: RegisterState) => ({
//   type: POST_FORM,
//   payload: {
//     form,
//   },
// });

// typesafe-actions 액션
export const changeForm = createAction(CHANGE_FORM)<{
  key: string;
  value: string;
}>();

export const postForm = createAsyncAction(
  POST_FORM,
  POST_FORM_SUCCESS,
  POST_FORM_FAILURE
)<RegisterState, PostFormSuccess, AxiosError>();
