import createRequestSaga from "../../lib/createRequestSaga";
import { GET_FORM, POST_CLOSE, POST_DELETE, POST_FORM } from "./action";
import * as registerAPI from "../../lib/api/register";
import { takeLatest } from "redux-saga/effects";

const postFormSaga = createRequestSaga(POST_FORM, registerAPI.registerForm);
const getFormSaga = createRequestSaga(GET_FORM, registerAPI.getForm);
const postCloseSaga = createRequestSaga(POST_CLOSE, registerAPI.postClose);
const postDeleteSaga = createRequestSaga(POST_DELETE, registerAPI.postDelete);

export function* registerSaga() {
  yield takeLatest(POST_FORM, postFormSaga);
  yield takeLatest(GET_FORM, getFormSaga);
  yield takeLatest(POST_CLOSE, postCloseSaga);
  yield takeLatest(POST_CLOSE, postDeleteSaga);
}
