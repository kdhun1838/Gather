import { UserState } from "./type";
import { createRequestActionTypes } from "../../lib/function/createRequestSaga";

export const TEMP_SET_USER = "user/TEMP_USER" as const;
export const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes("user/CHECK");
export const LOGOUT = "user/LOGOUT" as const;
export const [USER_UPDATE, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE] =
  createRequestActionTypes("user/USER_UPDATE");
export const [
  USER_UPDATE_ADMIN,
  USER_UPDATE_ADMIN_SUCCESS,
  USER_UPDATE_ADMIN_FAILURE,
] = createRequestActionTypes("user/USER_UPDATE_ADMIN");

export const [USER_DEL, USER_DEL_SUCCESS, USER_DEL_FAILURE] =
  createRequestActionTypes("user/USER_DEL");

export const tempSetUser = (user: UserState) => ({
  type: TEMP_SET_USER,
  payload: user,
});

export const check = (user: UserState) => ({
  type: CHECK,
  payload: user,
});

export const logout = (user: UserState) => ({
  type: LOGOUT,
  payload: user,
});

export const userupdate = (user: UserState) => ({
  type: USER_UPDATE,
  payload: user,
});

export const userupdateAdmin = (user: UserState) => ({
  type: USER_UPDATE_ADMIN,
  payload: user,
});

export const userdel = (user: UserState) => ({
  type: USER_DEL,
  payload: user,
});
