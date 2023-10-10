import createRequestSaga from "../../lib/createRequestSaga";
import { GET_LIST, GET_POPULAR_LIST, POST_FORM } from "./action";
import * as registerAPI from "../../lib/api/register";
import { takeLatest } from "redux-saga/effects";

const postFormSaga = createRequestSaga(POST_FORM, registerAPI.registerForm);

const getListSaga = createRequestSaga(GET_LIST, registerAPI.getList);

const getPopularListSaga = createRequestSaga(
  GET_POPULAR_LIST,
  registerAPI.getPopularList
);

export function* registerSaga() {
  yield takeLatest(POST_FORM, postFormSaga);
  yield takeLatest(GET_LIST, getListSaga);
  yield takeLatest(GET_POPULAR_LIST, getPopularListSaga);
}
