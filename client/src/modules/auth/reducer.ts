import { AuthState, AuthAction } from './type';
import { CHANGE_FIELD, INITIALIZE_FORM } from './action';

const initialState: AuthState = {
  login: {
    username: '',
    password: '',
  },
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
};

function auth(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state,
        [action.payload.name]: {
          ...state.login,
          [action.payload.key]: action.payload.value,
        },
      };
    case INITIALIZE_FORM:
      return {
        ...state,
        login: {
          ...initialState.login,
        },
        register: {
          ...initialState.register,
        },
      };
    default:
      return state;
  }
}

export default auth;
