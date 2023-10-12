import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "../../lib/function/createRequestSaga";
import * as authAPI from "../../lib/api/auth";
import { LOGIN, SIGNUP } from "./action";

const loginSaga = createRequestSaga(LOGIN, authAPI.Login);
const registerSaga = createRequestSaga(SIGNUP, authAPI.Register);

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNUP, registerSaga);
}
