import { RegisterState } from "./type";
import { createRequestActionTypes } from "../../lib/createRequestSaga";

export const UNLOAD_FORM = "register/UNLOAD_FORM" as const;
export const CHANGE_FORM = "register/CHANGE_FORM" as const;
export const [POST_FORM, POST_FORM_SUCCESS, POST_FORM_FAILURE] =
  createRequestActionTypes("register/POST_FORM" as const);
export const [GET_FORM, GET_FORM_SUCCESS, GET_FORM_FAILURE] =
  createRequestActionTypes("register/GET_FORM" as const);
export const [POST_CLOSE, POST_CLOSE_SUCCESS, POST_CLOSE_FAILURE] =
  createRequestActionTypes("register/POST_CLOSE" as const);
export const [POST_DELETE, POST_DELETE_SUCCESS, POST_DELETE_FAILURE] =
  createRequestActionTypes("register/POST_DELETE" as const);

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

export const postForm = (form: RegisterState) => ({
  type: POST_FORM,
  payload: {
    form,
  },
});

export const getForm = (postId: Number) => ({
  type: GET_FORM,
  payload: {
    postId,
  },
});

export const postClose = (postId: Number) => ({
  type: POST_CLOSE,
  payload: {
    postId,
  },
});

export const postDelete = (postId: Number) => ({
  type: POST_CLOSE,
  payload: {
    postId,
  },
});