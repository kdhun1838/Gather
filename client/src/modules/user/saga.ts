import createRequestSaga from "../../lib/function/createRequestSaga";
import * as authAPI from "../../lib/api/auth";
import { CHECK } from "./action";
import { takeLatest } from "redux-saga/effects";

const checkSaga = createRequestSaga(CHECK, authAPI.check);

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
}
