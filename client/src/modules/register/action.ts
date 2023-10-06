import { RegisterState } from "./type";
import { createRequestActionTypes } from "../../lib/createRequestSaga";

export const UNLOAD_FORM = "register/UNLOAD_FORM" as const;
export const CHANGE_FORM = "register/CHANGE_FORM" as const;
export const CHANGE_SORT_FORM = "register/CHANGE_SORT_FORM" as const;
export const CHANGE_DETAIL_SORT_FORM =
  "register/CHANGE_DETAIL_SORT_FORM" as const;
export const [GET_FORM, GET_FORM_SUCCESS, GET_FORM_FAILURE] =
  createRequestActionTypes("register/GET_FORM");
export const [POST_FORM, POST_FORM_SUCCESS, POST_FORM_FAILURE] =
  createRequestActionTypes("register/POST_FORM");

export const unloadForm = () => ({
  type: UNLOAD_FORM,
  payload: {},
});

export const changeForm = ({ key, value }: { key: string; value: string }) => ({
  type: CHANGE_FORM,
  payload: {
    key,
    value,
  },
});

export const changeSort = ({ key, value }: { key: string; value: string }) => ({
  type: CHANGE_SORT_FORM,
  payload: {
    key,
    value,
  },
});
export const changeDetailSort = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => ({
  type: CHANGE_DETAIL_SORT_FORM,
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

// export const getForm =
// const postFormSaga = createRequestSaga(POST_FORM, registerAPI.registerForm);

// export function* registerSaga() {
//   yield takeLatest(POST_FORM, postFormSaga);
// }
