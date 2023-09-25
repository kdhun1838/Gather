import createRequestSaga from "../../utils/createRequestSaga";
import { POST_FORM } from "./action";
import * as registerAPI from "../../lib/api/register";
import { takeLatest } from "redux-saga/effects";

const postFormSaga = createRequestSaga(POST_FORM, registerAPI.registerForm);

export function* registerSaga() {
  yield takeLatest(POST_FORM, postFormSaga);
}
