import { TEMP_SET_USER, CHECK, LOGOUT } from './action';
import { UserState, UserAction } from './type';

const initialState: UserState = {
  user: null,
  checkError: null,
};

function user(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case TEMP_SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case `${CHECK}_SUCCESS`:
      return {
        ...state,
        user: action.payload,
        checkError: null,
      };
    case `${CHECK}_FAILURE`:
      return {
        ...state,
        user: null,
        checkError: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export default user;
