import createRequestSaga from "../../lib/function/createRequestSaga";
import {
  GET_LIST,
  GET_POPULAR_LIST,
  POST_FORM,
  GET_FORM,
  POST_CLOSE,
  POST_DELETE,
  POST_COMMENT,
  GET_COMMENT,
  MODIFY_FORM,
} from "./action";
import * as registerAPI from "../../lib/api/register";
import { takeLatest } from "redux-saga/effects";

const postFormSaga = createRequestSaga(POST_FORM, registerAPI.registerForm);
const getFormSaga = createRequestSaga(GET_FORM, registerAPI.getForm);
const postCloseSaga = createRequestSaga(POST_CLOSE, registerAPI.postClose);
const postDeleteSaga = createRequestSaga(POST_DELETE, registerAPI.postDelete);
const modifyFormSaga = createRequestSaga(MODIFY_FORM, registerAPI.modifyForm);

const getListSaga = createRequestSaga(GET_LIST, registerAPI.getList);

const getPopularListSaga = createRequestSaga(
  GET_POPULAR_LIST,
  registerAPI.getPopularList
);

const postCommentSaga = createRequestSaga(
  POST_COMMENT,
  registerAPI.postComment
);

const getCommentSaga = createRequestSaga(
  GET_COMMENT,
  registerAPI.getComment
)

export function* registerSaga() {
  yield takeLatest(POST_FORM, postFormSaga);
  yield takeLatest(GET_LIST, getListSaga);
  yield takeLatest(GET_POPULAR_LIST, getPopularListSaga);
  yield takeLatest(GET_FORM, getFormSaga);
  yield takeLatest(POST_CLOSE, postCloseSaga);
  yield takeLatest(POST_DELETE, postDeleteSaga);
  yield takeLatest(POST_COMMENT, postCommentSaga);
  yield takeLatest(GET_COMMENT, getCommentSaga);
  yield takeLatest(MODIFY_FORM, modifyFormSaga);
}
