import { AuthState, AuthAction } from './type';
import { CHANGE_FIELD, INITIALIZE_FORM, LOGIN, SIGNUP } from './action';

const initialState: AuthState = {
  login: {
    id: '',
    password: '',
  },
  register: {
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nick: '',
    email: '',
    tel: '',
    age: 0,
    grade: '',
  },
  auth: null,
  authError: null,
};

function auth(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case CHANGE_FIELD:
      if (
        'name' in action.payload &&
        'key' in action.payload &&
        'value' in action.payload
      ) {
        return {
          ...state,
          [action.payload.name]: {
            ...state[action.payload.name],
            [action.payload.key]: action.payload.value,
          },
        };
      }
      return state;
    case INITIALIZE_FORM:
      return {
        ...state,
        login: {
          ...initialState.login,
        },
        register: {
          ...initialState.register,
        },
        authError: null,
      };
    case `${LOGIN}_SUCCESS`:
      return {
        ...state,
        authError: null,
        login: {
          ...state.login,
        },
      };
    case `${LOGIN}_FAILURE`:
      return {
        ...state,
        authError: action.payload,
      };
    case `${SIGNUP}_SUCCESS`:
      return {
        ...state,
        authError: null,
        register: {
          ...state.auth,
        },
      };
    case `${SIGNUP}_FAILURE`:
      return {
        ...state,
        authError: action.payload,
      };
    default:
      return state;
  }
}

export default auth;
