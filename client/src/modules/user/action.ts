import { createRequestActionTypes } from '../../lib/createRequestSaga';
import { UserState } from './type';

export const TEMP_SET_USER = 'user/TEMP_USER' as const;
export const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');
export const LOGOUT = 'user/LOGOUT' as const;

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
