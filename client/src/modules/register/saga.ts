import createRequestSaga from "../../lib/createRequestSaga";
import { GET_FORM, POST_FORM } from "./action";
import * as registerAPI from "../../lib/api/register";
import { takeLatest } from "redux-saga/effects";

const postFormSaga = createRequestSaga(POST_FORM, registerAPI.registerForm);
const getFormSaga = createRequestSaga(GET_FORM, registerAPI.getForm);

export function* registerSaga() {
  yield takeLatest(POST_FORM, postFormSaga);
  yield takeLatest(GET_FORM, getFormSaga);
}
