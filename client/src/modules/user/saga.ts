import * as authAPI from "../../lib/api/auth";
import {
  CHECK,
  CHECK_FAILURE,
  LOGOUT,
  USER_UPDATE,
  USER_UPDATE_ADMIN,
  USER_DEL,
} from "./action";
import { takeLatest, call } from "redux-saga/effects";
import createRequestSaga from "../../lib/function/createRequestSaga";

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const userupdateSaga = createRequestSaga(USER_UPDATE, authAPI.userupdate);
const userupdateAdminSaga = createRequestSaga(
  USER_UPDATE_ADMIN,
  authAPI.userupdate
);
const userdelSaga = createRequestSaga(USER_DEL, authAPI.userdel);

function checkFailureSaga() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("localStorage is not working");
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(USER_UPDATE, userupdateSaga);
  yield takeLatest(USER_UPDATE_ADMIN, userupdateAdminSaga);
  yield takeLatest(USER_DEL, userdelSaga);
}
