import { RegisterState } from "../types/registerType";
import createRequestSaga from "../utils/createRequestSaga";
import * as registerAPI from "../lib/api/register";
import { takeLatest } from "redux-saga/effects";

export const UNLOAD_FORM = "register/UNLOAD_FORM" as const;
export const CHANGE_FORM = "register/CHANGE_FORM" as const;
export const POST_FORM = "register/POST_FORM" as const;

export const unloadForm = () => ({
  type: UNLOAD_FORM,
});

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

const postFormSaga = createRequestSaga(POST_FORM, registerAPI.registerForm);

export function* registerSaga() {
  yield takeLatest(POST_FORM, postFormSaga);
}
