import {
  TEMP_SET_USER,
  CHECK,
  LOGOUT,
  USER_UPDATE,
  USER_UPDATE_ADMIN,
} from "./action";
import { UserState, UserAction } from "./type";

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
    case `${USER_UPDATE}_SUCCESS`:
      return {
        ...state,
        user: action.payload,
      };
    case `${USER_UPDATE}_FAILURE`:
      return {
        ...state,
        userError: action.payload,
      };
    case `${USER_UPDATE_ADMIN}_SUCCESS`:
      return {
        ...state,
      };
    case `${USER_UPDATE_ADMIN}_FAILURE`:
      return {
        ...state,
        userError: action.payload,
      };
    default:
      return state;
  }
}

export default user;
