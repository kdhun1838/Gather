import { createRequestActionTypes } from '../../lib/createRequestSaga';

export const TEMP_SET_USER = 'user/TEMP_USER' as const;
export const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');

export const tempSetUser = ({ user }: { user: any }) => ({
  type: TEMP_SET_USER,
  payload: user,
});

export const check = ({ user, error }: { user: any; error: any }) => ({
  type: CHECK,
  payload: {
    user,
    error,
  },
});
