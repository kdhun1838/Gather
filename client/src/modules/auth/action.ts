import { createRequestActionTypes } from '../../lib/createRequestSaga';
import { AuthState } from './type';

export const CHANGE_FIELD = 'auth/CHANGE_FIELD' as const;
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM' as const;

export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');
export const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes('auth/SIGNUP');

export const changeField = ({
  name,
  key,
  value,
}: {
  name: string;
  key: string;
  value: string;
}) => ({
  type: CHANGE_FIELD,
  payload: {
    name,
    key,
    value,
  },
});

export const initializeForm = (
  form: AuthState['login'] | AuthState['register']
) => ({
  type: INITIALIZE_FORM,
  payload: form,
});

export const login = (login: AuthState) => ({
  type: LOGIN,
  payload: {
    login,
  },
});

export const signup = (register: AuthState) => ({
  type: SIGNUP,
  payload: register,
});
